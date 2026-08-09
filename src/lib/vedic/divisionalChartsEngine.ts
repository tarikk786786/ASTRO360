/**
 * ASTRO360 Divisional Charts (Varga) Engine
 * Supported Vargas: D1 (Rashi), D2 (Hora), D3 (Drekkana), D4 (Chaturthamsha), D7 (Saptamsha),
 * D9 (Navamsha), D10 (Dashamsha), D12 (Dwadasamsha), D16 (Shodasamsha), D20 (Vimsamsha),
 * D24 (Chaturvimshamsha), D27 (Saptavimshamsha), D30 (Trimshamsha), D40 (Khavedamsha),
 * D45 (Akshavedamsha), and D60 (Shastiamsha)
 */

export interface VargaPosition {
  planet: string;
  d1SignIndex: number;
  vargaSignIndex: number;
  vargaSignName: string;
  formatted: string;
}

export interface DivisionalChartResult {
  vargaCode: string; // e.g. 'D1', 'D9', 'D10', 'D60'
  vargaName: string;
  domain: string;
  positions: VargaPosition[];
}

export const VARGA_METADATA: Record<string, { name: string; domain: string; divisionFactor: number }> = {
  D1: { name: 'Rashi Chart', domain: 'Overall Life & General Destiny', divisionFactor: 1 },
  D2: { name: 'Hora', domain: 'Wealth, Assets & Financial Prosperity', divisionFactor: 2 },
  D3: { name: 'Drekkana', domain: 'Siblings, Courage & Initiatives', divisionFactor: 3 },
  D4: { name: 'Chaturthamsha', domain: 'Fixed Assets, Land & Home', divisionFactor: 4 },
  D7: { name: 'Saptamsha', domain: 'Children, Progeny & Legacy', divisionFactor: 7 },
  D9: { name: 'Navamsha', domain: 'Dharma, Marriage & Inner Soul Purpose', divisionFactor: 9 },
  D10: { name: 'Dashamsha', domain: 'Career, Vocation & Public Status', divisionFactor: 10 },
  D12: { name: 'Dwadasamsha', domain: 'Parents, Ancestry & Lineage', divisionFactor: 12 },
  D16: { name: 'Shodasamsha', domain: 'Vehicles, Comforts & Luxuries', divisionFactor: 16 },
  D20: { name: 'Vimsamsha', domain: 'Spiritual Pursuits & Religious Merit', divisionFactor: 20 },
  D24: { name: 'Chaturvimshamsha', domain: 'Learning, Higher Education & Knowledge', divisionFactor: 24 },
  D27: { name: 'Saptavimshamsha', domain: 'Strengths, Weaknesses & Stamina', divisionFactor: 27 },
  D30: { name: 'Trimshamsha', domain: 'Misfortunes, Evils & Health Tribulations', divisionFactor: 30 },
  D40: { name: 'Khavedamsha', domain: 'Auspicious/Inauspicious Legacy Effects', divisionFactor: 40 },
  D45: { name: 'Akshavedamsha', domain: 'General Well-being & Character Refinement', divisionFactor: 45 },
  D60: { name: 'Shastiamsha', domain: 'Past-life Karma & Fine Destiny', divisionFactor: 60 },
};

export class DivisionalChartsEngine {
  /**
   * Calculates a specific Divisional Varga Chart for planet positions
   */
  public static calculateVarga(vargaCode: string, planetPositions: Array<{ name: string; longitude: number }>): DivisionalChartResult {
    const meta = VARGA_METADATA[vargaCode] || VARGA_METADATA.D9;
    const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

    const positions: VargaPosition[] = [];

    planetPositions.forEach(p => {
      const normalized = ((p.longitude % 360) + 360) % 360;
      const d1SignIndex = Math.floor(normalized / 30);
      const degInSign = normalized % 30;

      let vargaSignIndex = d1SignIndex;

      if (vargaCode === 'D9') {
        // Parasari D9 Navamsha calculation rule
        const navIndex = Math.floor(degInSign / 3.3333333333333335);
        let startSign = 0; // Fire signs start at Aries (0)
        if ([1, 5, 9].includes(d1SignIndex)) startSign = 9; // Earth signs start at Capricorn (9)
        else if ([2, 6, 10].includes(d1SignIndex)) startSign = 6; // Air signs start at Libra (6)
        else if ([3, 7, 11].includes(d1SignIndex)) startSign = 3; // Water signs start at Cancer (3)

        vargaSignIndex = (startSign + navIndex) % 12;
      } else if (vargaCode === 'D10') {
        // Parasari D10 Dashamsha calculation rule
        const dashIndex = Math.floor(degInSign / 3.0);
        const isOdd = d1SignIndex % 2 === 0;
        const startSign = isOdd ? d1SignIndex : (d1SignIndex + 8) % 12;
        vargaSignIndex = (startSign + dashIndex) % 12;
      } else if (meta.divisionFactor > 1) {
        // Generalized division rule
        const partSpan = 30.0 / meta.divisionFactor;
        const partIndex = Math.floor(degInSign / partSpan);
        vargaSignIndex = (d1SignIndex + partIndex) % 12;
      }

      const vargaSignName = signNames[vargaSignIndex];
      positions.push({
        planet: p.name,
        d1SignIndex,
        vargaSignIndex,
        vargaSignName,
        formatted: `${p.name} ➔ ${vargaSignName} (${vargaCode})`,
      });
    });

    return {
      vargaCode,
      vargaName: meta.name,
      domain: meta.domain,
      positions,
    };
  }
}
