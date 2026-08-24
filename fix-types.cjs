const fs = require('fs');
const file = 'src/lib/astroCalculations.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/import \{ Ecliptic, GeoVector \} from 'astronomy-engine';/, "import { Ecliptic, GeoVector, Body } from 'astronomy-engine';");

content = content.replace(/GeoVector\('([^']+)', date, true\)/g, "GeoVector(Body.$1, date, true)");

fs.writeFileSync(file, content);
console.log('Fixed types!');
