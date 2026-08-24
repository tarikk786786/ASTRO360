import { EclipticLongitude, Body, MakeTime } from 'astronomy-engine';
const date = new Date();
try {
  console.log("Sun:", EclipticLongitude('Sun', date));
} catch(e) {
  console.log(e);
}
