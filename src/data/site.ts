/**
 * Central site configuration.
 *
 * NOTE: Every contact detail, name and social link below is a PLACEHOLDER.
 * Replace them with your real, verified details before this site goes live —
 * this is the one file to edit for that.
 */
export const site = {
  name: 'Mini Teacup Puppies 4 Homes',
  tagline: 'Family-Raised Mini Teacup Puppies',
  shortPitch: 'Tiny companions, big love.',
  foundedYear: 2015,
  soldCount: '300+',
  city: 'Your City',
  state: 'Your State',

  // --- SEO ---
  // Your live domain (no trailing slash). Used for canonical URLs & sitemap.
  url: 'https://miniteacuppuppies4homes.com',
  seoDescription:
    'Health-tested, home-raised Mini Teacup Puppies — Yorkie, Maltipoo, Poodle, Shih Tzu and Dachshund. Vet-checked, vaccinated and raised with love — US-based with international shipping available. Reserve your puppy today.',
  keywords:
    'teacup puppies, mini teacup puppies for sale, teacup Yorkie, teacup Maltipoo, teacup Poodle, teacup Shih Tzu, miniature Dachshund puppies, teacup puppy breeder, international puppy shipping',

  // --- Placeholder contact details ---
  // TODO: this is temporarily your own inbox so Resend's sandbox mode can
  // actually deliver test notifications. Switch back to the real business
  // email once you've verified a sending domain in Resend.
  email: 'broomuhams@gmail.com',
  phone: '+1 917-323-7641',
  // WhatsApp number in international format, digits only (e.g. 18125551234).
  // Leave blank to fall back to the contact page.
  whatsapp: '19173237641',
  // Left blank on purpose — no physical address is shown on the site.
  address: '',
  responseTime: 'We aim to reply within 24 hours.',

  // --- Placeholder registration / trust info ---
  registryNumber: '', // blank = the registration line is hidden

  // --- Placeholder social links ---
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
  },

  // --- Payment details shown to buyers at checkout so they can pay you. ---
  // Fill in the methods you use; any left blank are hidden automatically.
  payment: {
    zelle: '' as string, // Zelle email or phone number
    cashApp: '' as string, // $cashtag (with or without the $)
    chime: '' as string, // $ChimeSign, or the email/phone linked to Chime
    applePay: '' as string, // phone number or email linked to Apple Pay / Apple Cash
    instructions:
      'Please include your order reference in the payment note. Once paid, reply to your confirmation email or message us on WhatsApp with a screenshot and we will confirm your puppy. Puppies are held for 48 hours.' as string,
  },
} as const;

/** Builds a click-to-chat WhatsApp link for `site.whatsapp`, optionally pre-filled. */
export const waLink = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PetStore',
  name: site.name,
  description: site.seoDescription,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/logo.svg`,
  priceRange: '$$$',
  sameAs: ([site.social.facebook, site.social.instagram, site.social.tiktok] as string[]).filter((u) =>
    Boolean(u && u.trim()),
  ),
  areaServed: [{ '@type': 'Country', name: 'United States' }],
  // NOTE: aggregateRating / review markup intentionally omitted.
  // Google's review-snippet policy requires ratings to come from genuine,
  // verifiable customers. Re-add this ONLY with real reviews you have collected.
};

export const primaryNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Puppies', href: '/dogs' },
  { label: 'Puppy Contract', href: '/puppy-contract' },
  { label: 'Puppy Delivery', href: '/puppy-delivery' },
  { label: 'Contact', href: '/contact' },
] as const;

export const moreNavLinks = [
  { label: "FAQ's", href: '/faq' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Return & Refund Policy', href: '/return-refund-policy' },
] as const;
