const fs = require('fs');
const file = 'src/lib/astroCalculations.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/import \{ Ecliptic \} from 'astronomy-engine';/, "import { Ecliptic, GeoVector } from 'astronomy-engine';");

// Replace all Ecliptic('Planet', date).elon with Ecliptic(GeoVector('Planet', date, true)).elon
content = content.replace(/Ecliptic\('([^']+)', date\)\.elon/g, "Ecliptic(GeoVector('$1', date, true)).elon");

fs.writeFileSync(file, content);
console.log('Fixed calculatePlanetaryPositions!');
