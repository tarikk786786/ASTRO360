export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  schemaType?: 'Organization' | 'SoftwareApplication' | 'FAQPage' | 'Article' | 'BreadcrumbList' | 'WebPage';
  breadcrumbs?: Array<{ name: string; item: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export const SEO_REGISTRY: Record<string, SEOMetadata> = {
  home: {
    title: 'ASTRO360 — Global Astrology Intelligence | Multi-Tradition Charts & Forecasts',
    description: 'Explore personalized birth charts, Vedic astrology, Western astrology, compatibility, Panchanga, Dashas, transits and multi-system forecasts with transparent calculations.',
    keywords: 'astrology, birth chart, vedic astrology, western astrology, kundli, panchang, dasha, astrology forecast, synastry',
    canonicalUrl: 'https://astro.tarikislam.in/',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
  },
  'birth-chart': {
    title: 'Free Birth Chart Calculator & Natal Placements | ASTRO360',
    description: 'Generate your free high-precision birth chart with exact planetary coordinates, rising sign (Ascendant), houses, and multi-tradition Vedic and Western interpretations.',
    keywords: 'birth chart calculator, free natal chart, rising sign calculator, moon sign, kundli generator, planetary positions',
    canonicalUrl: 'https://astro.tarikislam.in/birth-chart',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Birth Chart', item: 'https://astro.tarikislam.in/birth-chart' }
    ],
    faqs: [
      {
        question: 'What is a birth chart?',
        answer: 'A birth chart (natal chart or Kundli) is an astronomical snapshot of the sky at the exact moment and location of your birth, mapping the Sun, Moon, Ascendant, and planetary positions.'
      },
      {
        question: 'How accurate are ASTRO360 birth chart calculations?',
        answer: 'ASTRO360 computes celestial longitudes using JPL DE440 high-precision ephemeris algorithms accurate to within ±0.0001 arcdegrees.'
      }
    ]
  },
  'vedic-astrology': {
    title: 'Vedic Astrology (Jyotish) — Kundli, Nakshatras & Vimshottari Dasha | ASTRO360',
    description: 'Comprehensive Vedic astrology platform: Janam Kundli, 27 Nakshatras, D1–D60 Divisional Vargas, Vimshottari Dasha timeline, and classical Parashari rules.',
    keywords: 'vedic astrology, jyotish, janam kundli, nakshatra, vimshottari dasha, navamsa, d10 dashamsha, parashari',
    canonicalUrl: 'https://astro.tarikislam.in/vedic-astrology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Vedic Astrology', item: 'https://astro.tarikislam.in/vedic-astrology' }
    ]
  },
  'western-astrology': {
    title: 'Western Tropical Astrology — Natal Wheel, Transits & Aspects | ASTRO360',
    description: 'Explore Western tropical astrology with Placidus houses, planetary aspects, major transits, progressions, and modern psychological archetypes.',
    keywords: 'western astrology, tropical astrology, natal wheel, placidus houses, planetary aspects, progressions, solar return',
    canonicalUrl: 'https://astro.tarikislam.in/western-astrology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Western Astrology', item: 'https://astro.tarikislam.in/western-astrology' }
    ]
  },
  compatibility: {
    title: 'Astrology Compatibility & Synastry Calculator | ASTRO360',
    description: 'Compare birth charts across 36-Guna Ashta Koota Vedic matchmaking, Western synastry aspect overlays, and Chinese BaZi harmony scores.',
    keywords: 'astrology compatibility, synastry calculator, 36 guna match, kundli matching, relationship astrology, composite chart',
    canonicalUrl: 'https://astro.tarikislam.in/compatibility',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Compatibility', item: 'https://astro.tarikislam.in/compatibility' }
    ]
  },
  panchanga: {
    title: 'Live Panchanga Today — Tithi, Nakshatra, Yoga & Rahu Kalam | ASTRO360',
    description: 'Real-time Vedic Panchang ephemeris with accurate Tithi, Nakshatra, Karana, Yoga, Abhijit Muhurta, and Rahu Kalam timings for any global location.',
    keywords: 'panchang today, panchangam, tithi today, nakshatra today, rahu kalam, choghadiya, abhijit muhurta',
    canonicalUrl: 'https://astro.tarikislam.in/panchanga',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Panchanga', item: 'https://astro.tarikislam.in/panchanga' }
    ]
  },
  methodology: {
    title: 'How ASTRO360 Calculates — Transparent Ephemeris & AI Methodology | ASTRO360',
    description: 'Understand the deterministic 4-step pipeline: UTC time normalization ➔ JPL DE440 ephemeris ➔ Classical tradition rules ➔ Explainable AI presentation.',
    keywords: 'astrology methodology, astronomical calculations, ephemeris computation, explainable AI astrology, ASTRO360 architecture',
    canonicalUrl: 'https://astro.tarikislam.in/methodology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro.tarikislam.in/' },
      { name: 'Methodology', item: 'https://astro.tarikislam.in/methodology' }
    ]
  }
};

export function updatePageSEO(pageKey: string): void {
  if (typeof document === 'undefined') return;

  const data = SEO_REGISTRY[pageKey] || SEO_REGISTRY.home;

  // 1. Document Title
  document.title = data.title;

  // 2. Helper to set or update meta tag
  const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Standard Meta Tags
  setMeta('name', 'description', data.description);
  if (data.keywords) setMeta('name', 'keywords', data.keywords);

  // 4. OpenGraph Tags
  setMeta('property', 'og:title', data.title);
  setMeta('property', 'og:description', data.description);
  setMeta('property', 'og:type', data.ogType || 'website');
  if (data.canonicalUrl) setMeta('property', 'og:url', data.canonicalUrl);
  setMeta('property', 'og:image', data.ogImage || 'https://astro.tarikislam.in/favicon.svg');

  // 5. Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', data.title);
  setMeta('name', 'twitter:description', data.description);

  // 6. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', data.canonicalUrl || 'https://astro.tarikislam.in/');

  // 7. Inject Structured Data JSON-LD
  let scriptEl = document.querySelector('#astro360-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'astro360-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const schemaGraph: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ASTRO360',
      url: 'https://astro.tarikislam.in',
      logo: 'https://astro.tarikislam.in/favicon.svg',
      description: 'Universal Multi-Tradition Astrology Intelligence Platform'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ASTRO360 OMNI',
      operatingSystem: 'All Web Browsers',
      applicationCategory: 'LifestyleApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  ];

  if (data.breadcrumbs && data.breadcrumbs.length > 0) {
    schemaGraph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.breadcrumbs.map((b, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: b.name,
        item: b.item
      }))
    });
  }

  if (data.faqs && data.faqs.length > 0) {
    schemaGraph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    });
  }

  scriptEl.textContent = JSON.stringify(schemaGraph);
}
