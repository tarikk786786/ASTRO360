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
    title: 'ASTRO360: Precision Astrology & Ephemeris Platform',
    description: 'Free high-precision birth charts, Vedic Jyotish, Western astrology, compatibility, Panchanga, and multi-tradition planetary forecasts.',
    keywords: 'astrology, birth chart, vedic astrology, western astrology, kundli, panchang, dasha, astrology forecast, synastry',
    canonicalUrl: 'https://astro-360-neon.vercel.app/',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
  },
  landing: {
    title: 'ASTRO360: Precision Astrology & Ephemeris Platform',
    description: 'Free high-precision birth charts, Vedic Jyotish, Western astrology, compatibility, Panchanga, and multi-tradition planetary forecasts.',
    keywords: 'astrology, birth chart, vedic astrology, western astrology, kundli, panchang, dasha, astrology forecast, synastry',
    canonicalUrl: 'https://astro-360-neon.vercel.app/',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
  },
  'birth-chart': {
    title: 'Free Birth Chart Calculator & Natal Placements',
    description: 'Generate your free high-precision birth chart with exact planetary coordinates, Ascendant rising sign, and house interpretations.',
    keywords: 'birth chart calculator, free natal chart, rising sign calculator, moon sign, kundli generator, planetary positions',
    canonicalUrl: 'https://astro-360-neon.vercel.app/birth-chart',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Birth Chart', item: 'https://astro-360-neon.vercel.app/birth-chart' }
    ],
    faqs: [
      {
        question: 'What is a birth chart?',
        answer: 'A birth chart is an astronomical snapshot of the sky at the moment and location of birth, mapping planetary positions and houses.'
      },
      {
        question: 'How accurate are ASTRO360 calculations?',
        answer: 'ASTRO360 computes planetary positions using JPL DE440 ephemeris algorithms accurate to within ±0.0001 arcdegrees.'
      }
    ]
  },
  'vedic-astrology': {
    title: 'Vedic Astrology: Janam Kundli & Nakshatra Suite',
    description: 'Comprehensive Vedic astrology platform: Janam Kundli, 27 Nakshatras, D1–D60 Divisional Vargas, and Vimshottari Dasha timeline.',
    keywords: 'vedic astrology, jyotish, janam kundli, nakshatra, vimshottari dasha, navamsa, d10 dashamsha, parashari',
    canonicalUrl: 'https://astro-360-neon.vercel.app/vedic-astrology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Vedic Astrology', item: 'https://astro-360-neon.vercel.app/vedic-astrology' }
    ]
  },
  'western-astrology': {
    title: 'Western Astrology: Natal Wheels & Planetary Aspects',
    description: 'Explore Western tropical astrology with Placidus houses, planetary aspects, major transits, progressions, and archetype analysis.',
    keywords: 'western astrology, tropical astrology, natal wheel, placidus houses, planetary aspects, progressions, solar return',
    canonicalUrl: 'https://astro-360-neon.vercel.app/western-astrology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Western Astrology', item: 'https://astro-360-neon.vercel.app/western-astrology' }
    ]
  },
  compatibility: {
    title: 'Astrology Compatibility & Synastry Calculator',
    description: 'Compare birth charts across 36-Guna Ashta Koota Vedic matchmaking, Western synastry aspect overlays, and relationship scores.',
    keywords: 'astrology compatibility, synastry calculator, 36 guna match, kundli matching, relationship astrology, composite chart',
    canonicalUrl: 'https://astro-360-neon.vercel.app/compatibility',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Compatibility', item: 'https://astro-360-neon.vercel.app/compatibility' }
    ]
  },
  panchanga: {
    title: 'Live Daily Panchang: Tithi, Nakshatra & Muhurta',
    description: 'Real-time Vedic Panchanga with accurate Tithi, Nakshatra, Karana, Yoga, Abhijit Muhurta, and Rahu Kalam timings for any location.',
    keywords: 'panchang today, panchangam, tithi today, nakshatra today, rahu kalam, choghadiya, abhijit muhurta',
    canonicalUrl: 'https://astro-360-neon.vercel.app/panchanga',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Panchanga', item: 'https://astro-360-neon.vercel.app/panchanga' }
    ]
  },
  transits: {
    title: 'Planetary Transits: Real-Time Ephemeris Tracker',
    description: 'Track live planetary transits, retrogrades, sign ingresses, and exact degree aspects with JPL DE440 ephemeris precision.',
    keywords: 'planetary transits, transit calculator, retrograde planets, planet ingress, transit aspects',
    canonicalUrl: 'https://astro-360-neon.vercel.app/transits',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Transits', item: 'https://astro-360-neon.vercel.app/transits' }
    ]
  },
  dasha: {
    title: 'Vimshottari Dasha Calculator & Life Timeline',
    description: 'Calculate your personal Vimshottari Dasha periods with active Mahadasha, Antardasha sub-periods, and life event forecasting.',
    keywords: 'vimshottari dasha calculator, dasha periods, mahadasha, antardasha, dasha timeline',
    canonicalUrl: 'https://astro-360-neon.vercel.app/dasha',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Dasha', item: 'https://astro-360-neon.vercel.app/dasha' }
    ]
  },
  muhurta: {
    title: 'Auspicious Muhurta Calculator: Timing Engine',
    description: 'Calculate favorable Muhurta timings for marriage, business, travel, and new beginnings with Vedic Panchanga algorithms.',
    keywords: 'muhurta calculator, auspicious timings, shubh muhurat, abhijit muhurta, electional astrology',
    canonicalUrl: 'https://astro-360-neon.vercel.app/muhurta',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Muhurta', item: 'https://astro-360-neon.vercel.app/muhurta' }
    ]
  },
  astrocartography: {
    title: 'Astrocartography: Planetary Location Lines',
    description: 'Discover your planetary power lines across the globe with interactive AC, MC, DC, and IC planetary line astrocartography mapping.',
    keywords: 'astrocartography, astro map, planetary lines, relocation astrology, locational astrology',
    canonicalUrl: 'https://astro-360-neon.vercel.app/astrocartography',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Astrocartography', item: 'https://astro-360-neon.vercel.app/astrocartography' }
    ]
  },
  methodology: {
    title: 'ASTRO360 Calculation Methodology & Ephemeris',
    description: 'Learn how ASTRO360 calculates: UTC time normalization, JPL DE440 ephemeris, classical tradition rules, and AI explainability.',
    keywords: 'astrology methodology, astronomical calculations, ephemeris computation, explainable AI astrology, ASTRO360 architecture',
    canonicalUrl: 'https://astro-360-neon.vercel.app/methodology',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Methodology', item: 'https://astro-360-neon.vercel.app/methodology' }
    ]
  },
  'learn/nakshatra': {
    title: '27 Nakshatras Guide: Vedic Lunar Mansions',
    description: 'Complete guide to the 27 Vedic Nakshatras, 108 Padas, ruling deities, planetary lords, Gana, Yoni, and personality traits.',
    keywords: 'nakshatra guide, 27 nakshatras, lunar mansions, pada, nakshatra lords, vedic nakshatra',
    canonicalUrl: 'https://astro-360-neon.vercel.app/learn/nakshatra',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Learn', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Nakshatras', item: 'https://astro-360-neon.vercel.app/learn/nakshatra' }
    ]
  },
  'learn/navamsa': {
    title: 'D9 Navamsa Chart: Vedic Divisional Astrology',
    description: 'Master the D9 Navamsha chart for marriage timing, inner dharma, soul purpose, and planetary strength assessment in Jyotish.',
    keywords: 'navamsa chart, d9 chart, navamsha reading, divisional charts, marriage astrology jyotish',
    canonicalUrl: 'https://astro-360-neon.vercel.app/learn/navamsa',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Learn', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Navamsa', item: 'https://astro-360-neon.vercel.app/learn/navamsa' }
    ]
  },
  'learn/vimshottari-dasha': {
    title: 'Vimshottari Dasha: Planetary Timeline Guide',
    description: 'Understand the 120-year Vimshottari Dasha cycle: Mahadasha, Antardasha, and Pratyantardasha timing in classical Jyotish.',
    keywords: 'vimshottari dasha guide, dasha system, mahadasha meaning, antardasha calculation, jyotish timeline',
    canonicalUrl: 'https://astro-360-neon.vercel.app/learn/vimshottari-dasha',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Learn', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Vimshottari Dasha', item: 'https://astro-360-neon.vercel.app/learn/vimshottari-dasha' }
    ]
  },
  'learn/astrology-houses': {
    title: '12 Astrology Houses: Meanings & Placements',
    description: 'Explore the 12 astrology houses: Bhavas in Vedic astrology, quadrant house systems (Placidus, Whole Sign), and house lords.',
    keywords: '12 astrology houses, bhavas, placidus houses, whole sign houses, kendra trikona, house lords',
    canonicalUrl: 'https://astro-360-neon.vercel.app/learn/astrology-houses',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Learn', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Astrology Houses', item: 'https://astro-360-neon.vercel.app/learn/astrology-houses' }
    ]
  },
  'seo-lab': {
    title: 'Free SEO Keyword Research Lab: Real Data Discovery',
    description: 'Free-first SEO keyword discovery, deterministic Google Trends momentum, 16 classical astrology clusters, and content briefs.',
    keywords: 'free keyword research, astrology seo, keyword clusters, google trends momentum, search intent analysis',
    canonicalUrl: 'https://astro-360-neon.vercel.app/seo-lab',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'SEO Lab', item: 'https://astro-360-neon.vercel.app/seo-lab' }
    ]
  },
  'backlink-lab': {
    title: 'Backlink Opportunity & Digital PR Lab',
    description: 'Ethical backlink discovery, competitor link gaps, unlinked brand mentions, transparent embed widgets, and live verification.',
    keywords: 'backlink discovery, digital pr astrology, competitor link gaps, unlinked brand mentions, ethical link building',
    canonicalUrl: 'https://astro-360-neon.vercel.app/backlink-lab',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Backlink Lab', item: 'https://astro-360-neon.vercel.app/backlink-lab' }
    ]
  },
  'free-tools': {
    title: 'Free Online Astrology Tools & Ephemeris Calculators',
    description: 'Access 8 free, ad-free astronomical calculators: Birth Chart, Moon Sign, Rising Sign, Nakshatra, Panchanga, and Compatibility.',
    keywords: 'free astrology tools, free birth chart, free kundli, free panchang, astrology calculators',
    canonicalUrl: 'https://astro-360-neon.vercel.app/?tab=free-tools',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Free Tools', item: 'https://astro-360-neon.vercel.app/?tab=free-tools' }
    ]
  },
  passport: {
    title: 'Cosmic Passport: Shareable Astronomical Identity Card',
    description: 'Generate your free, shareable Cosmic Passport card for Instagram Stories, WhatsApp, and Twitter with NASA JPL DE440 coordinates.',
    keywords: 'cosmic passport, astrology share card, instagram story birth chart, shareable natal chart',
    canonicalUrl: 'https://astro-360-neon.vercel.app/?tab=passport',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Cosmic Passport', item: 'https://astro-360-neon.vercel.app/?tab=passport' }
    ]
  },
  widgets: {
    title: 'Free Embeddable Astrology Widgets for Webmasters & Bloggers',
    description: 'Embed live Vedic Panchanga, 24-Hour Planetary Horas, Moon Phase, and 36-Guna Matcher into your blog or website with 1 line of HTML.',
    keywords: 'astrology widgets, embeddable panchang widget, free horoscope widget, wordpress astrology embed',
    canonicalUrl: 'https://astro-360-neon.vercel.app/?tab=widgets',
    ogType: 'website',
    schemaType: 'SoftwareApplication',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Embeddable Widgets', item: 'https://astro-360-neon.vercel.app/?tab=widgets' }
    ]
  },
  directory: {
    title: 'Global Celebrity Astrological Ephemeris & Knowledge Directory',
    description: 'Explore verified birth charts of historic luminaries (Einstein, Jobs, Vivekananda), 108 planetary houses, and 144 zodiac compatibility combinations.',
    keywords: 'celebrity birth charts, albert einstein kundli, steve jobs astrology, 108 planetary houses, zodiac compatibility directory',
    canonicalUrl: 'https://astro-360-neon.vercel.app/?tab=directory',
    ogType: 'article',
    schemaType: 'Article',
    breadcrumbs: [
      { name: 'Home', item: 'https://astro-360-neon.vercel.app/' },
      { name: 'Celebrity Directory', item: 'https://astro-360-neon.vercel.app/?tab=directory' }
    ]
  }
};

export function updatePageSEO(pageKey: string): void {
  if (typeof document === 'undefined') return;

  // Clean key for lookups (e.g. "learn-nakshatra" -> "learn/nakshatra")
  const normalizedKey = pageKey.replace(/^learn-/, 'learn/').replace(/^\/+/, '');
  const data = SEO_REGISTRY[normalizedKey] || SEO_REGISTRY[pageKey] || SEO_REGISTRY.home;

  // Derive exact self-referencing canonical URL
  const targetCanonical = data.canonicalUrl || (
    normalizedKey === 'home' || normalizedKey === 'landing' || normalizedKey === ''
      ? 'https://astro-360-neon.vercel.app/'
      : `https://astro-360-neon.vercel.app/${normalizedKey}`
  );

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
  setMeta('property', 'og:url', targetCanonical);
  setMeta('property', 'og:image', data.ogImage || 'https://astro-360-neon.vercel.app/favicon.svg');

  // 5. Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', data.title);
  setMeta('name', 'twitter:description', data.description);

  // 6. Canonical Link (Self-referencing for every individual page)
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', targetCanonical);

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
      url: 'https://astro-360-neon.vercel.app',
      logo: 'https://astro-360-neon.vercel.app/favicon.svg',
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
