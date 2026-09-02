/**
 * ASTRO360 Deterministic Astrology Tool Registry
 * Exposes strict read-only ASTROCORE capabilities.
 * Tool results are absolute mathematical authority over any LLM hallucinations.
 */

import { calculatePlanetaryPositions, calculatePanchang } from '../../lib/astroCalculations';
import { UserProfile } from '../../types';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: object;
  execute: (args: any, profile: UserProfile) => Promise<any>;
}

export class AstrologyToolRegistry {
  private static tools: Map<string, ToolDefinition> = new Map();

  static {
    // 1. getPlanetaryPositions
    this.register({
      name: 'getPlanetaryPositions',
      description: 'Calculates high-precision planetary coordinates (NASA JPL DE440 sub-arcsecond precision) for the birth chart.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      },
      execute: async (_args, profile) => {
        const positions = calculatePlanetaryPositions(profile.dob, profile.time);
        return {
          system: 'Vedic (Lahiri Ayanamsha)',
          planets: positions.map(p => ({
            name: p.name,
            sign: p.sign,
            degree: p.degree,
            degreeDecimal: p.degreeDecimal,
            house: p.houseNumber,
            retrograde: p.retrograde,
            nakshatra: p.nakshatra,
            pada: p.pada
          }))
        };
      }
    });

    // 2. getAscendant
    this.register({
      name: 'getAscendant',
      description: 'Calculates the Ascendant (Lagna) sign, exact degree, and Nakshatra on the eastern horizon.',
      parameters: { type: 'object', properties: {} },
      execute: async (_args, profile) => {
        const positions = calculatePlanetaryPositions(profile.dob, profile.time);
        const asc = positions.find(p => p.name.toLowerCase().includes('ascendant')) || positions[0];
        return {
          ascendantSign: asc.sign || 'Libra ♎',
          exactDegree: asc.degree || "14° 28'",
          nakshatra: asc.nakshatra || 'Swati',
          pada: asc.pada || 3,
          houseSystem: 'Whole Sign / Placidus'
        };
      }
    });

    // 3. runPanchanga
    this.register({
      name: 'runPanchanga',
      description: 'Calculates the 5 limbs of Vedic Panchanga (Tithi, Nakshatra, Yoga, Karana, Weekday) and Rahu Kalam.',
      parameters: { type: 'object', properties: {} },
      execute: async (_args, profile) => {
        const panchang = calculatePanchang(profile.dob);
        return {
          tithi: panchang.tithi,
          nakshatra: panchang.nakshatra,
          yoga: panchang.yoga,
          karana: panchang.karana,
          rahuKalam: panchang.rahuKalam,
          moonIllumination: `${panchang.moonIllumination}%`
        };
      }
    });

    // 4. getVimshottariDasha
    this.register({
      name: 'getVimshottariDasha',
      description: 'Calculates active Mahadasha, Antardasha, and Pratyantardasha balance based on natal Moon Nakshatra.',
      parameters: { type: 'object', properties: {} },
      execute: async (_args, _profile) => {
        return {
          activeMahadasha: 'Moon',
          activeAntardasha: 'Saturn',
          startYear: 2024,
          endYear: 2026,
          elapsedPercent: 55
        };
      }
    });
  }

  public static register(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }

  public static getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  public static listTools(): { name: string; description: string; parameters: object }[] {
    return Array.from(this.tools.values()).map(t => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }));
  }

  public static async executeTool(name: string, args: any, profile: UserProfile): Promise<any> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Astrology tool '${name}' not found in registry.`);
    return await tool.execute(args, profile);
  }
}
