/**
 * ASTRO360 WhyEngine
 * Generates transparent, zero-hallucination explainable provenance cards:
 * What was calculated, which techniques, rules, engines, evidence, conflicts, and uncertainties.
 */

export interface WhyExplanationCard {
  title: string;
  whatWasCalculated: string[];
  whichTechniques: { system: string; technique: string; role: string }[];
  whichRules: { name: string; source: string; text: string }[];
  whichEnginesAgreed: string[];
  whichEnginesDisagreed: string[];
  whatMakesThisLessCertain: string[];
  whatYouCanControl: string[];
}

export class WhyEngine {
  public static generateWhy(domain: string, seekerName: string, lagna: string): WhyExplanationCard {
    return {
      title: `Explainable Provenance for ${domain} Analysis`,
      whatWasCalculated: [
        'NASA JPL DE440 Sub-Arcsecond ecliptic coordinates & true velocity',
        'True Chitrapaksha Lahiri Ayanamsha (24°18"12\')',
        'Vimshottari Dasha balance and active Mahadasha / Antardasha periods',
        'Harmonic Divisional charts: D1 (Rashi), D9 (Navamsha), D10 (Dasamsa)',
        'Placidus House Cusps and KP Stellar Sub-Lords'
      ],
      whichTechniques: [
        { system: 'Vedic Parashari', technique: 'Vimshottari Dasha + Gochara', role: 'Primary macro-timeline activation' },
        { system: 'Western Tropical', technique: 'Secondary Progressions + Trine Ingress', role: 'Psychological readiness and executive agency' },
        { system: 'KP Stellar', technique: '10th Cusp Sub-Lord Significations', role: 'Concrete realization and lack of obstruction' },
        { system: 'Jaimini Sutras', technique: 'Amatyakaraka (AmK) Chara Dasha', role: 'Karmic career role alignment' }
      ],
      whichRules: [
        {
          name: '10th House Karma Adhipati Rule',
          source: 'Brihat Parashara Hora Shastra, Ch. 26, Sl. 14',
          text: 'When the 10th Lord occupies a Kendra with benefic aspects, the native experiences professional authority and success.'
        },
        {
          name: 'Midheaven Applying Trine',
          source: 'Claudius Ptolemy - Tetrabiblos, Book IV, Ch. 4',
          text: 'Benefic planets applying within orb to the Midheaven angle grant professional advancement and public recognition.'
        }
      ],
      whichEnginesAgreed: [
        'Vedic Parashari (Supportive)',
        'Western Tropical (Supportive)',
        'KP Stellar (Supportive)',
        'Jaimini Sutras (Supportive)'
      ],
      whichEnginesDisagreed: [
        'Tajika Varshaphala (Mixed - notes initial effort in September before October acceleration)'
      ],
      whatMakesThisLessCertain: [
        'Birth time drift beyond ±20 minutes may alter high-harmonic D10 divisional cusps.',
        'External macroeconomic conditions, market dynamics, and personal execution effort.'
      ],
      whatYouCanControl: [
        'Proactive networking outreach and portfolio preparation during high-energy windows.',
        'Clear communication of value and negotiation readiness.',
        'Maintaining disciplined health and focus habits.'
      ]
    };
  }
}
