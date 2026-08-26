# ASTRO360 Technical SEO & GEO/AEO Audit Workflow

## Objective
Audit the platform for complete search engine indexing, valid Schema.org graphs, mobile performance, and AI answer engine citability.

## Audit Checklist
1. **Technical Crawl & Status**: Verify that all canonical routes in `src/lib/seoGrowthEngine.ts` return status 200 with zero orphan pages.
2. **Schema.org Verification**: Validate that `SoftwareApplication`, `Organization`, `FAQPage`, and `BreadcrumbList` JSON-LD graphs match visible page content.
3. **OpenGraph & Social Meta**: Confirm 1200x630px social card dimensions, Twitter Summary Large Image, and canonical URLs.
4. **GEO / Direct-Answer Content**: Check that each major topic cluster contains a concise, citation-ready definition and classical text references (*BPHS*, *Ptolemy*).
5. **Mobile Core Web Vitals**: Verify LCP < 2.5s, INP < 200ms, and CLS < 0.1 on mobile viewport widths (320px–430px).
