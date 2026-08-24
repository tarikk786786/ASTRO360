import { Ecliptic } from 'astronomy-engine';

const date = new Date();
const sun = Ecliptic('Sun', date);
console.log('Sun', sun.elon, sun.elat);
const moon = Ecliptic('Moon', date);
console.log('Moon', moon.elon, moon.elat);
const jupiter = Ecliptic('Jupiter', date);
console.log('Jupiter', jupiter.elon, jupiter.elat);
