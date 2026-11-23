import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { fetchPublishedBlogPostBySlugServer } from '@/lib/db.server';
import { site } from '@/data/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedBlogPostBySlugServer(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

// Give every H2/H3/H4 in the post body an id so table-of-contents links (#slug) work.
const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/gi, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const withHeadingIds = (html: string) =>
  html.replace(/<h([234])([^>]*)>([\s\S]*?)<\/h\1>/g, (match, level: string, attrs: string, inner: string) =>
    /\sid=/.test(attrs) ? match : '<h' + level + attrs + ' id="' + slugify(inner) + '">' + inner + '</h' + level + '>',
  );

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPublishedBlogPostBySlugServer(slug);

  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.url}/blog/${post.slug}` },
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/logo.svg` } },
    datePublished: post.date,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${site.url}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbJsonLd]) }} />
      <PageHero title={post.title} image={post.image} breadcrumb="Article">
        <p className="mt-4 text-cream/80">
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </PageHero>

      <section className="container-page py-14 md:py-20">
        <div className="prose prose-forest mx-auto lg:prose-lg" dangerouslySetInnerHTML={{ __html: withHeadingIds(post.content) }} />
        <div className="mt-16 text-center">
          <Link href="/blog" className="btn-ghost">
            &larr; Back to all posts
          </Link>
        </div>
      </section>
    </>
  );
}
