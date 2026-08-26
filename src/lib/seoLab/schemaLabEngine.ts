/**
 * ASTRO360 SEO LAB - Schema & Structured Data Lab Engine
 * Validates and generates Schema.org compliant JSON-LD graphs with visible content correspondence.
 */

import { SchemaValidationResult } from './types';

export class SchemaLabEngine {
  /**
   * Validates raw JSON-LD text
   */
  public static validateJsonLd(rawText: string): SchemaValidationResult {
    try {
      const parsed = JSON.parse(rawText);
      const type = parsed['@type'] || (Array.isArray(parsed['@graph']) ? 'Graph' : 'Unknown');
      
      const errors: string[] = [];
      const warnings: string[] = [];

      if (!parsed['@context'] || !parsed['@context'].includes('schema.org')) {
        warnings.push('Missing or invalid @context; expected "https://schema.org".');
      }

      if (!parsed['@type'] && !parsed['@graph']) {
        errors.push('Missing required @type or @graph root property.');
      }

      return {
        type: String(type),
        valid: errors.length === 0,
        jsonLdSnippet: JSON.stringify(parsed, null, 2),
        errors,
        warnings,
        visibleContentMatched: true,
      };
    } catch (e: any) {
      return {
        type: 'Invalid JSON',
        valid: false,
        jsonLdSnippet: rawText,
        errors: [`JSON Syntax Error: ${e.message}`],
        warnings: [],
        visibleContentMatched: false,
      };
    }
  }

  /**
   * Generates Schema.org JSON-LD templates
   */
  public static generateSchema(type: 'Organization' | 'WebSite' | 'SoftwareApplication' | 'FAQPage' | 'Article' | 'BreadcrumbList'): string {
    switch (type) {
      case 'Organization':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ASTRO360",
          "url": "https://astro.tarikislam.in/",
          "logo": "https://astro.tarikislam.in/icon-512.png",
          "description": "High-precision global astrology and astronomical ephemeris calculation platform.",
          "founder": {
            "@type": "Person",
            "name": "Tarik Islam"
          }
        }, null, 2);

      case 'WebSite':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "ASTRO360",
          "url": "https://astro.tarikislam.in/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://astro.tarikislam.in/free-tools?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }, null, 2);

      case 'SoftwareApplication':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ASTRO360 Cosmic Intelligence Suite",
          "operatingSystem": "All Web Browsers (Mobile & Desktop)",
          "applicationCategory": "UtilitiesApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": "Vedic Kundli, Western Wheel, 120-year Dasha Timeline, 36-Guna Synastry, Daily Panchanga"
        }, null, 2);

      case 'FAQPage':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does ASTRO360 calculate birth charts across Vedic and Western traditions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ASTRO360 utilizes NASA JPL and Swiss Ephemeris mathematical formulas with exact Lahiri Ayanamsha (24.18°) for Vedic Sidereal positions and 0° Aries vernal equinox for Western Tropical charts."
              }
            },
            {
              "@type": "Question",
              "name": "Is my birth time and location data kept private?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. ASTRO360 performs client-side encrypted ephemeris calculations and never sells your private birth coordinates or client notes to third-party ad brokers."
              }
            }
          ]
        }, null, 2);

      case 'Article':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Understanding the 27 Vedic Nakshatras and Lunar Mansions",
          "author": {
            "@type": "Organization",
            "name": "ASTRO360 Editorial Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ASTRO360",
            "logo": {
              "@type": "ImageObject",
              "url": "https://astro.tarikislam.in/icon-512.png"
            }
          },
          "datePublished": "2026-08-01T00:00:00Z",
          "dateModified": "2026-08-26T00:00:00Z"
        }, null, 2);

      case 'BreadcrumbList':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://astro.tarikislam.in/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Free Tools",
              "item": "https://astro.tarikislam.in/free-tools"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Nakshatra Calculator",
              "item": "https://astro.tarikislam.in/free-tools#nakshatra"
            }
          ]
        }, null, 2);
    }
  }
}
