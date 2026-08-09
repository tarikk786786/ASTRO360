/**
 * ASTRO360 Varshaphal (Annual Solar Return) Engine
 * Annual Ascendant, Muntha Position, and Year Lord Determination
 */

export interface VarshaphalResult {
  targetYear: number;
  ageAtReturn: number;
  munthaSignIndex: number;
  munthaSignName: string;
  munthaHouseNumber: number;
  annualAscendantSignIndex: number;
  annualAscendantSignName: string;
  yearLord: string;
  annualThemes: string[];
}

export class VarshaphalEngine {
  /**
   * Calculates Annual Solar Return Varshaphal chart parameters
   */
  public static calculateVarshaphal(birthDate: Date, natalAscendantSignIndex: number, targetYear: number): VarshaphalResult {
    const birthYear = birthDate.getUTCFullYear();
    const ageAtReturn = targetYear - birthYear;

    // Muntha moves 1 sign per year from natal Lagna
    const munthaSignIndex = (natalAscendantSignIndex + ageAtReturn) % 12;
    const signNames = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const munthaSignName = signNames[munthaSignIndex];

    // Annual Ascendant calculation
    const annualAscendantSignIndex = (natalAscendantSignIndex + (ageAtReturn * 3)) % 12;
    const annualAscendantSignName = signNames[annualAscendantSignIndex];

    const munthaHouseNumber = ((munthaSignIndex - annualAscendantSignIndex + 12) % 12) + 1;

    // Year Lord (Varsheshwara) ruler mapping
    const signLords = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    const yearLord = signLords[annualAscendantSignIndex];

    const annualThemes = [
      `Muntha in House ${munthaHouseNumber}: Key focus on ${munthaHouseNumber === 1 ? 'health & identity' : munthaHouseNumber === 10 ? 'career advancement' : 'growth and transitions'}.`,
      `Annual Ascendant in ${annualAscendantSignName} governed by ${yearLord}.`,
      `Solar return cycle for age ${ageAtReturn} active for Year ${targetYear}.`,
    ];

    return {
      targetYear,
      ageAtReturn,
      munthaSignIndex,
      munthaSignName,
      munthaHouseNumber,
      annualAscendantSignIndex,
      annualAscendantSignName,
      yearLord,
      annualThemes,
    };
  }
}
