const { EclipticLongitude, Body } = require('astronomy-engine');

const date = new Date();
const sun = EclipticLongitude('Sun', date);
console.log('Sun', sun);
