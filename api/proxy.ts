/**
 * Secure Serverless Proxy for External APIs (NASA, UmmahAPI, MuslimSalat, Kalimat)
 * Protects external API credentials from client-side exposure.
 */

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { service, ...params } = req.query || {};

  try {
    const env = (globalThis as any).process?.env || {};

    if (service === 'nasa') {
      const apiKey = env.NASA_API_KEY || env.VITE_NASA_API_KEY || 'DEMO_KEY';
      const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${params.count || 1}`;
      const response = await fetch(nasaUrl);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (service === 'prayer_times') {
      const apiKey = env.UMMAH_API_KEY || env.VITE_UMMAH_API_KEY;
      const { lat = '21.4225', lng = '39.8262', method = '4' } = params;
      
      let url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`;
      if (apiKey) {
        url = `https://ummahapi.com/api/prayer-times?lat=${lat}&lng=${lng}&key=${apiKey}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (service === 'kalimat') {
      const apiKey = env.KALIMAT_API_KEY || env.VITE_KALIMAT_API_KEY;
      const { query = '' } = params;
      const kalimatUrl = `https://api.kalimat.im/search?q=${encodeURIComponent(query)}&apiKey=${apiKey || ''}`;
      const response = await fetch(kalimatUrl);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(400).json({ error: 'Unknown service requested' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Proxy execution failure' });
  }
}
