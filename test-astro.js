const Astronomy = require('astronomy-engine');

const date = new Date();
const eq = Astronomy.Equator('Sun', date, null, true, true);
console.log(eq);

const ecl = Astronomy.Ecliptic('Sun', date);
console.log('Sun Ecliptic:', ecl);
const moon = Astronomy.Ecliptic('Moon', date);
console.log('Moon Ecliptic:', moon);
