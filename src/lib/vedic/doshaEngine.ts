/**
 * ASTRO360 Vedic Dosha Evaluation Engine
 * Evaluates Kuja/Manglik Dosha, Kaal Sarp Yoga/Dosha, and Nadi Friction with Methodology Disclosure
 */

export interface DoshaEvaluation {
  id: string;
  name: string;
  isDetected: boolean;
  severity: 'None' | 'Mild' | 'Moderate' | 'High' | 'Severe';
  traditionMethodology: string;
  ruleExplanation: string;
  remedialOverview: string;
  factors: string[];
}

export class DoshaEngine {
  /**
   * Evaluates Kuja (Manglik) Dosha based on Mars Placement
   */
  public static evaluateManglikDosha(planetPositions: Array<{ name: string; houseNumber: number }>): DoshaEvaluation {
    const mars = planetPositions.find(p => p.name === 'Mars');
    const marsHouse = mars ? mars.houseNumber : 1;

    // Traditional Manglik houses from Lagna: 1, 2, 4, 7, 8, 12
    const manglikHouses = [1, 2, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(marsHouse);

    let severity: 'None' | 'Mild' | 'Moderate' | 'High' | 'Severe' = 'None';
    if (isManglik) {
      if ([7, 8].includes(marsHouse)) severity = 'High';
      else if ([4, 12].includes(marsHouse)) severity = 'Moderate';
      else severity = 'Mild';
    }

    return {
      id: 'manglik_dosha',
      name: 'Manglik (Kuja) Dosha',
      isDetected: isManglik,
      severity,
      traditionMethodology: 'Evaluated relative to Lagna (Ascendant) using South & North Indian Parasari rules.',
      ruleExplanation: isManglik
        ? `Mars is placed in House ${marsHouse}, which is classified as a Kuja placement.`
        : 'Mars is placed in a non-Kuja house, resulting in no Manglik friction.',
      remedialOverview: isManglik
        ? 'Remedial measures include Hanuman Chalisa recitation, red coral consultation, and alignment with a compatible partner.'
        : 'No Kuja remedies required.',
      factors: [
        `Mars House Position: ${marsHouse}`,
        `Kuja Houses Checked: 1, 2, 4, 7, 8, 12`,
      ],
    };
  }

  /**
   * Evaluates Kaal Sarp Yoga/Dosha based on Rahu-Ketu Axis
   */
  public static evaluateKaalSarpDosha(planetPositions: Array<{ name: string; longitude: number }>): DoshaEvaluation {
    const rahu = planetPositions.find(p => p.name === 'Rahu' || p.name === 'North Node');
    const ketu = planetPositions.find(p => p.name === 'Ketu' || p.name === 'South Node');

    if (!rahu || !ketu) {
      return {
        id: 'kaal_sarp_dosha',
        name: 'Kaal Sarp Yoga',
        isDetected: false,
        severity: 'None',
        traditionMethodology: 'Hemisphere alignment of all 7 classical planets between Rahu and Ketu.',
        ruleExplanation: 'Node positions not fully specified.',
        remedialOverview: 'None required.',
        factors: [],
      };
    }

    const rahuLong = rahu.longitude;
    const ketuLong = ketu.longitude;

    // Check if all 7 planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) fall on one side of the Rahu-Ketu axis
    const otherPlanets = planetPositions.filter(p => !['Rahu', 'Ketu', 'North Node', 'South Node'].includes(p.name));
    
    let allOnOneSide = true;
    for (const p of otherPlanets) {
      // Angular difference from Rahu relative to Ketu
      const diffRahu = ((p.longitude - rahuLong + 360) % 360);
      if (diffRahu > 180) {
        allOnOneSide = false;
        break;
      }
    }

    return {
      id: 'kaal_sarp_dosha',
      name: 'Kaal Sarp Yoga',
      isDetected: allOnOneSide,
      severity: allOnOneSide ? 'Moderate' : 'None',
      traditionMethodology: 'Classical Jyotish alignment evaluating if 7 Grahas are enclosed between Rahu and Ketu.',
      ruleExplanation: allOnOneSide
        ? 'All 7 classical planets are enclosed within the Rahu-Ketu lunar node axis.'
        : 'Planets are distributed on both sides of the Rahu-Ketu axis, nullifying Kaal Sarp enclosure.',
      remedialOverview: allOnOneSide
        ? 'Perform Mahamrityunjaya Mantra chanting and Rahu-Ketu pacification rituals.'
        : 'No Kaal Sarp remedies required.',
      factors: [
        `Rahu Longitude: ${rahuLong.toFixed(2)}°`,
        `Ketu Longitude: ${ketuLong.toFixed(2)}°`,
        `Enclosure Verified: ${allOnOneSide}`,
      ],
    };
  }
}
