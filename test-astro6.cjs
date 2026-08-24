const { Ecliptic, GeoVector, Body } = require('astronomy-engine');

try {
  const date = new Date("invalid");
  const sun = GeoVector(Body.Sun, date, true);
  console.log(Ecliptic(sun).elon);
} catch(e) {
  console.error("ERROR:", e);
}
