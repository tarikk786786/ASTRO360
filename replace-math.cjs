const fs = require('fs');

const file = 'src/lib/astroCalculations.ts';
let content = fs.readFileSync(file, 'utf8');

const importStr = "import { Ecliptic } from 'astronomy-engine';\n\n";

if (!content.includes("import { Ecliptic")) {
  // Add import to top
  content = importStr + content;
}

// Replace calculatePlanetaryPositions
const newFunc = `export function calculatePlanetaryPositions(birthDateStr?: string, birthTimeStr?: string, ayanamshaOffset = 23.85): PlanetPosition[] {
  const date = birthDateStr ? new Date(\`\${birthDateStr}T\${birthTimeStr || '12:00'}:00Z\`) : new Date();
  
  // Real Ecliptic Longitudes (Tropical)
  const sunL = (Ecliptic('Sun', date).elon - ayanamshaOffset + 360) % 360;
  const moonL = (Ecliptic('Moon', date).elon - ayanamshaOffset + 360) % 360;
  const marsL = (Ecliptic('Mars', date).elon - ayanamshaOffset + 360) % 360;
  const mercL = (Ecliptic('Mercury', date).elon - ayanamshaOffset + 360) % 360;
  const jupL = (Ecliptic('Jupiter', date).elon - ayanamshaOffset + 360) % 360;
  const venL = (Ecliptic('Venus', date).elon - ayanamshaOffset + 360) % 360;
  const satL = (Ecliptic('Saturn', date).elon - ayanamshaOffset + 360) % 360;
  
  // Rahu/Ketu (Node) approximation as exact True Node is complex, we use mean node approximation based on date
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60;
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const d = jd - 2451545.0;
  const rahuL = (125.044 - 0.05295 * d - ayanamshaOffset + 360000) % 360;
  const ketuL = (rahuL + 180) % 360;

  const rawPositions = [
    { name: 'Sun', symbol: '☉', long: sunL, speed: '+0.98°/d', retro: false, color: 'text-[#F59E0B]', border: 'border-[#F59E0B]/30', remedy: 'Offer morning water to Sun & recite Aditya Hrudayam.' },
    { name: 'Moon', symbol: '☽', long: moonL, speed: '+13.2°/d', retro: false, color: 'text-[#06B6D4]', border: 'border-[#06B6D4]/30', remedy: 'Wear white/silver and practice calming meditation.' },
    { name: 'Mars', symbol: '♂', long: marsL, speed: '+0.52°/d', retro: false, color: 'text-[#EF4444]', border: 'border-[#EF4444]/30', remedy: 'Engage in physical exercise & chant Hanuman Chalisa.' },
    { name: 'Mercury', symbol: '☿', long: mercL, speed: '+1.40°/d', retro: false, color: 'text-[#22C55E]', border: 'border-[#22C55E]/30', remedy: 'Verify written contracts & back up digital work.' },
    { name: 'Jupiter', symbol: '♃', long: jupL, speed: '+0.12°/d', retro: false, color: 'text-[#7C3AED]', border: 'border-[#7C3AED]/30', remedy: 'Support educational causes & respect teachers.' },
    { name: 'Venus', symbol: '♀', long: venL, speed: '+1.15°/d', retro: false, color: 'text-[#EC4899]', border: 'border-pink-500/30', remedy: 'Cultivate creative arts & honor female mentors.' },
    { name: 'Saturn', symbol: '♄', long: satL, speed: '+0.08°/d', retro: false, color: 'text-[#2563EB]', border: 'border-[#2563EB]/30', remedy: 'Maintain strict discipline & serve community elders.' },
    { name: 'Rahu', symbol: '☊', long: rahuL, speed: '-0.05°/d', retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Practice Pranayama breathwork & avoid impulse decisions.' },
    { name: 'Ketu', symbol: '☋', long: ketuL, speed: '-0.05°/d', retro: true, color: 'text-[#CBD5E1]', border: 'border-white/10', remedy: 'Engage in introspection & study ancient philosophy.' },
  ];

  const ascendantLong = (sunL + (hour * 15)) % 360;

  return rawPositions.map((p) => {
    const signIndex = Math.floor(p.long / 30);
    const degreeDecimal = p.long % 30;
    const degInt = Math.floor(degreeDecimal);
    const minInt = Math.floor((degreeDecimal - degInt) * 60);

    const signObj = ZODIAC_SIGNS[signIndex] || ZODIAC_SIGNS[0];
    const houseNum = ((signIndex - Math.floor(ascendantLong / 30) + 12) % 12) + 1;

    const nakshatraIndex = Math.floor(p.long / (360 / 27));
    const nakshatraName = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
    const pada = Math.floor(((p.long % (360 / 27)) / (360 / 108))) + 1;

    let strength = 'Neutral';
    if (p.name === 'Sun' && signIndex === 0) strength = 'Exalted (High Vitality)';
    else if (p.name === 'Moon' && signIndex === 1) strength = 'Exalted (Mind Harmony)';
    else if (p.name === 'Saturn' && (signIndex === 9 || signIndex === 10)) strength = 'Own House (Strong)';
    else if (p.name === 'Jupiter' && signIndex === 11) strength = 'Own House (Wisdom)';
    else if (p.retro) strength = 'Retrograde (Karmic Focus)';

    return {
      name: p.name,
      symbol: p.symbol,
      sign: \`\${signObj.name} \${signObj.symbol}\`,
      degree: \`\${degInt}° \${minInt < 10 ? '0' : ''}\${minInt}'\`,
      degreeDecimal: p.long,
      house: \`\${houseNum}\${houseNum === 1 ? 'st' : houseNum === 2 ? 'nd' : houseNum === 3 ? 'rd' : 'th'} House\`,
      houseNumber: houseNum,
      speed: p.speed,
      retrograde: p.retro,
      element: signObj.element,
      nakshatra: nakshatraName,
      pada,
      strength,
      remedies: p.remedy,
      color: p.color,
      border: p.border,
    };
  });
}`;

// regex to replace existing calculatePlanetaryPositions
const startIdx = content.indexOf('export function calculatePlanetaryPositions');
const endIdx = content.indexOf('export function calculatePanchang');

if (startIdx > -1 && endIdx > -1) {
  content = content.substring(0, startIdx) + newFunc + '\n\n/**\n * Computes Panchang data (Tithi, Nakshatra, Yoga, Karana, Rahu Kalam)\n */\n' + content.substring(endIdx);
  fs.writeFileSync(file, content);
  console.log('Successfully injected astronomy-engine math!');
} else {
  console.log('Could not find function bounds.', startIdx, endIdx);
}
