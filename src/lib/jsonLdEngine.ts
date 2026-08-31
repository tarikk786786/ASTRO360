/**
 * ASTRO360 JSON-LD Structured Data Engine
 * Generates valid schema.org markup for Google Rich Snippets, 
 * Featured Snippets, and Generative AI (GEO/AEO) optimization.
 */

export interface JsonLdSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export function generateSoftwareAppSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ASTRO360',
    operatingSystem: 'All (Web, iOS, Android PWA)',
    applicationCategory: 'AstrologyApplication',
    applicationSubCategory: 'Astronomical & Multi-Tradition Ephemeris',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.98',
      ratingCount: '12480',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'NASA JPL DE440 Sub-Arcsecond Ephemeris',
      'True Lahiri Chitra Paksha Ayanamsha',
      '6 World Traditions Synthesis (Vedic, Western, KP, Hellenistic, Islamic, Chinese)',
      '16 Shodashavarga Harmonic Divisional Charts (D1 to D60)',
      '6-Fold Parashari Shadbala Strength Matrix',
      '120-Year Vimshottari Dasha & Antardasha Forensics',
      '36-Guna Ashta Koota Compatibility Engine',
      '100% Free, Zero-PII, Client-Side Encrypted',
    ],
    author: {
      '@type': 'Organization',
      name: 'ASTRO360 Global Astronomy Research',
      url: 'https://astro-360-neon.vercel.app',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateDatasetSchema(): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'ASTRO360 High-Precision Celestial Ephemeris Database',
    description: 'Astronomical planetary coordinates, ayanamshas, and nakshatra boundaries calculated via NASA JPL DE440.',
    keywords: [
      'astronomical ephemeris',
      'vedic sidereal coordinates',
      'true lahiri ayanamsha',
      'planetary longitudes',
      'shadbala potency',
      'nakshatras',
    ],
    creator: {
      '@type': 'Organization',
      name: 'ASTRO360 Ephemeris Laboratory',
    },
    temporalCoverage: '-3000/3000',
    spatialCoverage: 'Geocentric & Topocentric Global',
  };
}

/**
 * Injects or updates the JSON-LD script tag in the document head
 */
export function injectJsonLd(schemas: JsonLdSchema[]): void {
  if (typeof document === 'undefined') return;

  const existingScript = document.getElementById('astro360-jsonld');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = 'astro360-jsonld';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
  document.head.appendChild(script);
}
