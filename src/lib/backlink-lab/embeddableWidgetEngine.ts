/**
 * ASTRO360 Transparent Embeddable Widget Generator
 * 
 * Strict Principle:
 * NO hidden links, NO CSS tricks. Clear, transparent, visible attribution only.
 */

export interface WidgetConfig {
  theme: 'dark' | 'light' | 'midnight';
  width: string;
  height: string;
  defaultZodiac: 'sidereal' | 'tropical';
  showAttribution: boolean;
}

export function generateBirthChartWidgetSnippet(config: WidgetConfig = {
  theme: 'dark',
  width: '100%',
  height: '520px',
  defaultZodiac: 'sidereal',
  showAttribution: true
}): {
  htmlSnippet: string;
  reactSnippet: string;
  previewUrl: string;
} {
  const baseUrl = 'https://astro360.app/embed/birth-chart';
  const queryParams = new URLSearchParams({
    theme: config.theme,
    zodiac: config.defaultZodiac
  });

  const embedUrl = `${baseUrl}?${queryParams.toString()}`;

  const htmlSnippet = `<!-- ASTRO360 Free Birth Chart Calculator Widget -->
<div style="width: ${config.width}; max-width: 640px; margin: 0 auto; font-family: system-ui, sans-serif;">
  <iframe
    src="${embedUrl}"
    width="100%"
    height="${config.height}"
    style="border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; overflow: hidden; background: #0B1220;"
    title="ASTRO360 Free Birth Chart Calculator"
    loading="lazy"
  ></iframe>
  ${
    config.showAttribution
      ? `<div style="text-align: right; font-size: 11px; color: #94A3B8; margin-top: 6px; padding-right: 4px;">
    Calculated via <a href="https://astro360.app/free-tools/birth-chart" target="_blank" rel="noopener" style="color: #06B6D4; text-decoration: none; font-weight: bold;">ASTRO360 Swiss Ephemeris</a>
  </div>`
      : ''
  }
</div>`;

  const reactSnippet = `import React from 'react';

export function AstroBirthChartWidget() {
  return (
    <div style={{ width: '${config.width}', maxWidth: '640px', margin: '0 auto' }}>
      <iframe
        src="${embedUrl}"
        width="100%"
        height="${config.height}"
        style={{ border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '16px', background: '#0B1220' }}
        title="ASTRO360 Free Birth Chart Calculator"
        loading="lazy"
      />
      ${
        config.showAttribution
          ? `<div style={{ textAlign: 'right', fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
        Calculated via <a href="https://astro360.app/free-tools/birth-chart" target="_blank" rel="noopener noreferrer" style={{ color: '#06B6D4', fontWeight: 'bold' }}>ASTRO360</a>
      </div>`
          : ''
      }
    </div>
  );
}`;

  return {
    htmlSnippet,
    reactSnippet,
    previewUrl: embedUrl
  };
}
