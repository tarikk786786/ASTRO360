import { AstronomyEngine } from '../../src/lib/astronomyEngine';
import { calculatePlanetaryPositions } from '../../src/lib/astroCalculations';

console.log('🧪 Running AstroCore Ascendant (Lagna) Validation Suite...\n');
let passed = 0, total = 0;
function assert(c: boolean, name: string, detail?: string) {
  total++;
  if (c) { console.log('✅ Passed [' + name + ']' + (detail ? ' ➔ ' + detail : '')); passed++; }
  else { console.error('❌ FAILED [' + name + ']' + (detail ? ' ➔ ' + detail : '')); process.exit(1); }
}

console.log('--- 1. NORMAL LATITUDE ASCENDANT CALCULATIONS ---');
const dateMecca = new Date('1998-06-15T12:00:00Z');
const ascMecca = AstronomyEngine.calculateAscendant(dateMecca, 21.4225, 39.8262, 'sidereal', 'lahiri');
assert(ascMecca >= 0 && ascMecca < 360, 'Mecca Ascendant within [0, 360) range', ascMecca.toFixed(2) + '°');

const dateLondon = new Date('2026-08-27T12:00:00Z');
const ascLondon = AstronomyEngine.calculateAscendant(dateLondon, 51.5074, -0.1278, 'tropical');
assert(ascLondon >= 0 && ascLondon < 360, 'London Tropical Ascendant valid', ascLondon.toFixed(2) + '°');

console.log('\n--- 2. EQUATORIAL COORDINATE ASCENDANT (0° Latitude) ---');
const dateEquator = new Date('2026-03-20T06:00:00Z');
const ascEquator = AstronomyEngine.calculateAscendant(dateEquator, 0.0, 0.0, 'tropical');
assert(!isNaN(ascEquator) && ascEquator >= 0 && ascEquator < 360, 'Equator Ascendant calculated cleanly without NaN', ascEquator.toFixed(2) + '°');

console.log('\n--- 3. HIGH LATITUDE & POLAR BOUNDARY CONDITIONS ---');
const dateReykjavik = new Date('2026-06-21T00:00:00Z');
const ascReykjavik = AstronomyEngine.calculateAscendant(dateReykjavik, 64.1466, -21.9426, 'sidereal', 'lahiri');
assert(!isNaN(ascReykjavik) && ascReykjavik >= 0 && ascReykjavik < 360, 'Reykjavik (64°N) Ascendant robust at midnight solstice', ascReykjavik.toFixed(2) + '°');

console.log('\n--- 4. TIME SENSITIVITY & 24-HOUR ROTATION ---');
const t0 = new Date('2026-01-01T00:00:00Z');
const asc0 = AstronomyEngine.calculateAscendant(t0, 28.6139, 77.2090, 'sidereal', 'lahiri');
const t6 = new Date('2026-01-01T06:00:00Z');
const asc6 = AstronomyEngine.calculateAscendant(t6, 28.6139, 77.2090, 'sidereal', 'lahiri');
const diffHours = ((asc6 - asc0 + 360) % 360);
assert(diffHours > 60 && diffHours < 120, 'Ascendant progresses ~90° in 6 hours of diurnal Earth rotation', diffHours.toFixed(2) + '°');

console.log('\n--- 5. INTEGRATION IN CORE EPHEMERIS PIPELINE ---');
const positions = calculatePlanetaryPositions('1998-06-15', '12:00', 23.856, 21.4225, 39.8262);
const ascPlanet = positions.find(p => p.name === 'Ascendant');
assert(ascPlanet !== undefined, 'Ascendant is included in planet positions array');
assert(ascPlanet!.degreeDecimal >= 0 && ascPlanet!.degreeDecimal < 360, 'Ascendant longitude degree decimal is valid', ascPlanet?.degreeDecimal.toFixed(2) + '°');
assert(ascPlanet!.houseNumber === 1, 'Ascendant defines House 1 as Lagna cusp');

console.log('\n🎉 All ' + passed + '/' + total + ' Ascendant Validation Assertions Passed Cleanly!\n');