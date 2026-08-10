// src/lib/vedic/hinduCalendarEngine.ts
export interface HinduCalendarDate {
  vikramSamvat: number;
  sakaSamvat: number;
  month: string;
  paksha: 'Shukla' | 'Krishna';
  tithi: number;
  isAdhikMaas: boolean;
}

export function getHinduCalendarDate(gregorianDate: Date): HinduCalendarDate {
  const year = gregorianDate.getFullYear();
  return {
    vikramSamvat: year + 57, // Approximate Vikram Samvat conversion
    sakaSamvat: year - 78,   // Approximate Saka Samvat conversion
    month: "Chaitra",
    paksha: "Shukla",
    tithi: 1,
    isAdhikMaas: false
  };
}
