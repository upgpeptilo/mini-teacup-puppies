import type React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DogGallery from '@/components/DogGallery';
import DogGrid from '@/components/DogGrid';
import { ArrowRightIcon, CheckIcon, PawIcon, ShieldIcon, WhatsAppIcon } from '@/components/Icons';
import { site, waLink } from '@/data/site';
import { fetchPublicDogBySlugServer, fetchPublicDogsServer } from '@/lib/db.server';
import {
  careItems,
  dogUrl,
  goodWithItems,
  longDescriptionParagraphs,
  quickFacts,
  schemaAvailability,
  shortDescriptionOf,
} from '@/lib/puppy';
import type { Dog } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

const titleFor = (dog: Dog) => `${dog.name}: ${dog.breed} Puppy${dog.status === 'Sold' ? ' (Sold)' : ' for Sale'}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dog = await fetchPublicDogBySlugServer(decodeURIComponent(slug));
  if (!dog) return { title: 'Puppy Not Found', robots: { index: false } };

  const description = shortDescriptionOf(dog).slice(0, 160);
  return {
    title: titleFor(dog),
    description,
    alternates: { canonical: dogUrl(dog) },
    openGraph: {
      type: 'website',
      url: dogUrl(dog),
      title: titleFor(dog),
      description,
      images: dog.images.slice(0, 1),
    },
    twitter: { card: 'summary_large_image', title: titleFor(dog), description, images: dog.images.slice(0, 1) },
  };
}

/** Per-puppy FAQ, built only from this listing's data and the site's published policies. */
/* ---------- Long description formatting ----------
 * The admin "Long description" stays plain text. Blocks are separated by a
 * blank line. Optional lightweight markers add structure for SEO:
 *   ### Heading      -> <h3>   (## is treated as <h3> too; the page owns its <h2>s)
 *   #### Subheading  -> <h4>
 *   - item / * item  -> bulleted list
 *   1. item          -> numbered list
 *   **bold**         -> <strong>
 *   [text](https://example.com) -> external link
 * Text without markers renders exactly as before: one <p> per block.
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <strong key={`${keyPrefix}-b${n++}`} className="font-bold text-forest-800">
          {m[1]}
        </strong>,
      );
    } else {
      out.push(
        <a
          key={`${keyPrefix}-a${n++}`}
          href={m[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-forest-700 underline underline-offset-2 hover:text-ember"
        >
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function DescriptionBlock({ block }: { block: string }) {
  const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const nodes: React.ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      const k = `p${nodes.length}`;
      nodes.push(<p key={k}>{renderInline(para.join(' '), k)}</p>);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      const k = `l${nodes.length}`;
      const items = list.items.map((it, i) => <li key={i}>{renderInline(it, `${k}-${i}`)}</li>);
      nodes.push(
        list.ordered ? (
          <ol key={k} className="list-decimal space-y-2 pl-6">
            {items}
          </ol>
        ) : (
          <ul key={k} className="list-disc space-y-2 pl-6">
            {items}
          </ul>
        ),
      );
      list = null;
    }
  };

  for (const line of lines) {
    const h = /^(#{2,4})\s+(.+)$/.exec(line);
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+[.)]\s+(.+)$/.exec(line);
    if (h) {
      flushPara();
      flushList();
      const k = `h${nodes.length}`;
      nodes.push(
        h[1].length === 4 ? (
          <h4 key={k} className="pt-2 text-xl font-bold text-forest-800">
            {renderInline(h[2], k)}
          </h4>
        ) : (
          <h3 key={k} className="pt-4 text-2xl font-extrabold text-forest-800">
            {renderInline(h[2], k)}
          </h3>
        ),
      );
    } else if (ul || ol) {
      flushPara();
      const ordered = !!ol;
      if (list && list.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      list.items.push((ul ?? ol)![1]);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return <>{nodes}</>;
}

function faqsFor(dog: Dog): { q: string; a: string }[] {
  const care = careItems(dog);
  const faqs: { q: string; a: string }[] = [
    {
      q: `Is ${dog.name} still available?`,
      a:
        dog.status === 'Available'
          ? `Yes, ${dog.name} is available right now. Contact us to confirm before reserving, as availability can change quickly.`
          : dog.status === 'Pending'
            ? `${dog.name} currently has a reservation pending. Contact us to join the waiting list in case it falls through, or browse our other available puppies.`
            : `${dog.name} has found a new home. Browse our available puppies to find your match.`,
    },
    {
      q: `How much does ${dog.name} cost?`,
      a: `${dog.name}'s price is $${dog.price.toLocaleString()}.${
        dog.reservePrice ? ` A $${dog.reservePrice.toLocaleString()} deposit reserves ${dog.gender === 'Female' ? 'her' : 'him'} and is taken off the final balance.` : ' A deposit reserves your puppy and is taken off the final balance.'
      } Delivery is quoted separately based on your location.`,
    },
  ];
  if (care.length > 0) {
    faqs.push({
      q: `What comes with ${dog.name}?`,
      a: `${dog.name} is ${care.map((c) => c.toLowerCase()).join(', ')}. You also receive the vet and vaccination records and our written health guarantee.`,
    });
  }
  if (dog.weightLabel) {
    faqs.push({
      q: `How big will ${dog.name} get?`,
      a: `Our estimate for ${dog.name} is ${dog.weightLabel}. Adult size can't be guaranteed: it depends on genetics, diet and growth, so treat this as an estimate.`,
    });
  }
  faqs.push(
    {
      q: `Can ${dog.name} be delivered to me?`,
      a: 'Yes. Options include ground transport, a flight nanny who travels with your puppy, or local or airport pickup. We quote delivery once your puppy is reserved.',
    },
    {
      q: `How do I reserve ${dog.name}?`,
      a: `Send us a message about ${dog.name} through the contact form or WhatsApp. We confirm availability, answer your questions, and then a deposit holds ${dog.gender === 'Female' ? 'her' : 'him'} for you.`,
    },
  );
  return faqs;
}

export default async function DogPage({ params }: Props) {
  const { slug } = await params;
  const dog = await fetchPublicDogBySlugServer(decodeURIComponent(slug));
  if (!dog) notFound();

  const all = await fetchPublicDogsServer();
  const others = all.filter((d) => d.id !== dog.id && d.status !== 'Sold');
  const related = [
    ...others.filter((d) => d.breed.toLowerCase() === dog.breed.toLowerCase()),
    ...others.filter((d) => d.breed.toLowerCase() !== dog.breed.toLowerCase()),
  ].slice(0, 3);

  const short = shortDescriptionOf(dog);
  const longParas = longDescriptionParagraphs(dog);
  const facts = quickFacts(dog);
  const care = careItems(dog);
  const goodWith = goodWithItems(dog);
  const faqs = faqsFor(dog);
  const isSold = dog.status === 'Sold';
  const pronoun = dog.gender === 'Female' ? 'her' : 'him';
  const askMsg = `Hi! I'm interested in ${dog.name}, the ${dog.breed} puppy (${dogUrl(dog)}).`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${dogUrl(dog)}#product`,
    name: `${dog.name}, ${dog.breed} Puppy`,
    description: dog.shortDescription || short,
    image: dog.images,
    url: dogUrl(dog),
    sku: dog.id,
    category: `Puppies > ${dog.breed}`,
    brand: { '@type': 'Brand', name: site.name },
    color: dog.color || undefined,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Breed', value: dog.breed },
      { '@type': 'PropertyValue', name: 'Sex', value: dog.gender },
      { '@type': 'PropertyValue', name: 'Age', value: dog.ageLabel },
      dog.weightLabel && { '@type': 'PropertyValue', name: 'Expected adult weight', value: dog.weightLabel },
      dog.registry && { '@type': 'PropertyValue', name: 'Registry', value: dog.registry },
      { '@type': 'PropertyValue', name: 'Vet checked', value: dog.vetChecked },
      { '@type': 'PropertyValue', name: 'Vaccinated', value: dog.vaccinated },
      { '@type': 'PropertyValue', name: 'Microchipped', value: dog.microchipped },
    ].filter(Boolean),
    offers: {
      '@type': 'Offer',
      url: dogUrl(dog),
      price: dog.price,
      priceCurrency: 'USD',
      availability: schemaAvailability[dog.status],
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@type': 'Organization', name: site.name, url: site.url },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Available Puppies', item: `${site.url}/dogs` },
      { '@type': 'ListItem', position: 3, name: dog.name, item: dogUrl(dog) },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbJsonLd, faqJsonLd]) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-page pt-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-ember">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/dogs" className="hover:text-ember">Available Puppies</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold text-forest-800" aria-current="page">{dog.name}</li>
        </ol>
      </nav>

      {/* Above the fold: gallery + buy box */}
      <section className="container-page grid gap-10 py-8 lg:grid-cols-2 lg:gap-14">
        <DogGallery name={dog.name} breed={dog.breed} images={dog.images} videos={dog.videos} />

        <div>
          <span
            className={`badge ${
              dog.status === 'Available' ? 'bg-forest-100 text-forest-800' : dog.status === 'Pending' ? 'bg-ember-100 text-ember-700' : 'bg-ink/10 text-ink/70'
            }`}
          >
            {dog.status === 'Pending' ? 'Reservation pending' : dog.status}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-forest-800 sm:text-5xl">
            {dog.name} <span className="block text-2xl font-bold text-ink/70 sm:text-3xl">{dog.breed} puppy</span>
          </h1>
          <p className="mt-4 text-3xl font-extrabold text-ember">${dog.price.toLocaleString()}</p>

          {/* Short description: answer-first summary */}
          <p className="mt-5 text-lg leading-relaxed text-ink/85">{short}</p>

          {/* Quick facts */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl bg-sand/40 p-5 text-sm">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-muted">{f.label}</dt>
                <dd className="font-bold text-forest-800">{f.value}</dd>
              </div>
            ))}
          </dl>

          {!isSold ? (
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/contact?dog=${encodeURIComponent(dog.id)}`} className="btn-accent text-base">
                Ask about {dog.name} <ArrowRightIcon className="h-5 w-5" />
              </Link>
              {site.whatsapp && (
                <a href={waLink(askMsg)} target="_blank" rel="noopener noreferrer" className="btn-ghost text-base">
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                </a>
              )}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl bg-forest-50 p-5">
              <p className="font-bold text-forest-800">{dog.name} has found a home.</p>
              <Link href="/dogs" className="btn-primary mt-3">
                See available puppies <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          )}

          {care.length > 0 && (
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {care.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm font-medium text-ink/85">
                  <CheckIcon className="h-4 w-4 shrink-0 text-forest-600" /> {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Long description + details */}
      <section className="bg-sand/30 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-forest-800">About {dog.name}</h2>
            {longParas.length > 0 ? (
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/85">
                {longParas.map((p, i) => (
                  <DescriptionBlock key={i} block={p} />
                ))}
              </div>
            ) : (
              <p className="mt-5 text-lg leading-relaxed text-ink/85">
                {short} Message us for more photos, videos or a live video call to meet {pronoun} before you decide.
              </p>
            )}

            {dog.personality.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-extrabold text-forest-800">Personality</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {dog.personality.map((t) => (
                    <li key={t} className="badge bg-white text-forest-800 ring-1 ring-forest-100">
                      <PawIcon className="mr-1 h-3.5 w-3.5 text-ember" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {goodWith.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-extrabold text-forest-800">Good with</h3>
                <p className="mt-2 text-ink/85">{goodWith.join(', ')}</p>
              </div>
            )}
          </div>

          <aside className="card h-fit p-6">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-forest-800">
              <ShieldIcon className="h-5 w-5 text-forest-600" /> {dog.name}&apos;s details
            </h2>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {facts.map((f) => (
                  <tr key={f.label} className="border-b border-forest-100 last:border-0">
                    <th scope="row" className="py-2 pr-4 text-left font-medium text-muted">{f.label}</th>
                    <td className="py-2 text-right font-bold text-forest-800">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 space-y-2 text-sm">
              <Link href="/puppy-delivery" className="block font-semibold text-ember hover:underline">Delivery options →</Link>
              <Link href="/puppy-contract" className="block font-semibold text-ember hover:underline">Read the puppy contract →</Link>
              <Link href="/faq" className="block font-semibold text-ember hover:underline">General FAQ →</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-14 md:py-20">
        <h2 className="text-3xl font-extrabold text-forest-800">Questions about {dog.name}</h2>
        <div className="mt-6 divide-y divide-forest-100 rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5" open>
              <summary className="cursor-pointer list-none text-lg font-bold text-forest-800">{f.q}</summary>
              <p className="mt-2 leading-relaxed text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related puppies */}
      {related.length > 0 && (
        <section className="bg-sand/30 py-14 md:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold text-forest-800">More puppies you may love</h2>
              <Link href="/dogs" className="font-semibold text-ember hover:underline">
                View all puppies →
              </Link>
            </div>
            <div className="mt-8">
              <DogGrid dogs={related} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
