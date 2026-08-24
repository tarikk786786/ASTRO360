const { Ecliptic, GeoVector, Body } = require('astronomy-engine');

try {
  const date = new Date();
  const sun = GeoVector(Body.Sun, date, true);
  console.log('Sun vector:', sun);
  console.log('Sun ecliptic:', Ecliptic(sun).elon);
} catch(e) {
  console.error("ERROR:", e);
}
