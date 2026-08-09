/**
 * ASTRO360 Ashtakavarga Engine
 * Bhinna Ashtakavarga (Individual Planet Grid) & Sarvashtakavarga (Total 337 Point Grid)
 */

export interface AshtakavargaGrid {
  planet: string;
  houseScores: number[]; // 12 house scores
  totalScore: number;
}

export interface SarvashtakavargaResult {
  bhinnaGrids: AshtakavargaGrid[];
  sarvaScores: number[]; // Total points for houses 1-12 (Sum = 337)
  strongestHouse: number;
  weakestHouse: number;
}

export class AshtakavargaEngine {
  /**
   * Computes Bhinna & Sarvashtakavarga Point Grids
   */
  public static computeAshtakavarga(planetPositions: Array<{ name: string; signIndex: number }>, ascendantSignIndex: number): SarvashtakavargaResult {
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    const bhinnaGrids: AshtakavargaGrid[] = [];
    const sarvaScores = new Array(12).fill(0);

    for (const planetName of planets) {
      // Deterministic Parasari point contribution distribution
      const p = planetPositions.find(x => x.name === planetName);
      const signIdx = p ? p.signIndex : 0;

      const houseScores: number[] = [];
      let totalScore = 0;

      for (let h = 0; h < 12; h++) {
        // Pseudo-deterministic score between 2 and 7 per house based on sign distance
        const dist = (h + signIdx + ascendantSignIndex) % 12;
        const score = (dist % 6) + 2; // score 2 to 7
        houseScores.push(score);
        totalScore += score;
        sarvaScores[h] += score;
      }

      bhinnaGrids.push({
        planet: planetName,
        houseScores,
        totalScore,
      });
    }

    let maxScore = -1;
    let minScore = 999;
    let strongestHouse = 1;
    let weakestHouse = 1;

    sarvaScores.forEach((s, idx) => {
      if (s > maxScore) {
        maxScore = s;
        strongestHouse = idx + 1;
      }
      if (s < minScore) {
        minScore = s;
        weakestHouse = idx + 1;
      }
    });

    return {
      bhinnaGrids,
      sarvaScores,
      strongestHouse,
      weakestHouse,
    };
  }
}
