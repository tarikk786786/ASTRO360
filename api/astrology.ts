import { orchestrateAstrologyRequest } from '../src/backend/agentOrchestrator';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { prompt, userContext } = req.body || {};
    
    // Execute LangGraph Master Supervisor Multi-Agent Engine
    const result = await orchestrateAstrologyRequest({
      prompt: prompt || 'Provide my general astrological forecast',
      userContext
    });

    const apiKey = (globalThis as any).process?.env?.GEMINI_API_KEY || (globalThis as any).process?.env?.GOOGLE_API_KEY;

    if (apiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const systemInstruction = `You are ASTRO360 Master AI, powered by LangGraph Master Supervisor orchestrating 16 specialized agents (Birth Chart, Transit, Dasha, Compatibility, Panchang, Muhurta, Numerology, Palmistry, Face Reading, Tarot, etc.).\n\nMem0 Context: ${result.memoryContext}\nLlamaIndex RAG Citations: ${result.ragSources.join(', ')}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemInstruction}\n\nUser Profile Context: ${JSON.stringify(userContext || {})}\n\nQuestion: ${prompt}` }
            ]
          }
        ]
      };

      const fetchFn = (globalThis as any).fetch;
      const geminiRes = await fetchFn(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          return res.status(200).json({
            success: true,
            content: `⚡ **[LangGraph Multi-Agent Stack Executed]**\n• Primary Agent: ${result.primaryAgent.agentName}\n• Mem0 Context: Synced\n• RAG Citations: ${result.ragSources.slice(0, 2).join(' | ')}\n\n---\n\n${textOutput}`,
            source: 'langgraph-multi-agent-gemini',
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      content: result.synthesizedResponse,
      source: 'langgraph-multi-agent-local',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    (globalThis as any).console?.error('Serverless Astrology Handler Error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal Astrological Engine Error',
      timestamp: new Date().toISOString()
    });
  }
}

function generateStructuredAstrologyResponse(prompt: string, context: Record<string, any>): string {
  const p = prompt.toLowerCase();
  const name = context.name || 'Seeker';

  if (p.includes('dream')) {
    return `🌌 **ASTRO360 Dream Interpretation for ${name}**:\n\n` +
      `Your subconscious dream imagery represents emotional processing and spiritual alignment.\n` +
      `• **Water & Oceans**: Represents intuitive emotional depth and spiritual cleansing.\n` +
      `• **Flying / Heights**: Signifies an emerging desire for mental clarity, perspective, and career elevation.\n` +
      `• **Prescribed Guidance**: Recite Ayatul Kursi before sleeping, maintain 4-7-8 breathwork, and keep a dream journal during the Waxing Gibbous Moon.`;
  }

  if (p.includes('career') || p.includes('business') || p.includes('wealth') || p.includes('money')) {
    return `💼 **ASTRO360 Wealth & Career Alignment for ${name}**:\n\n` +
      `• **Astrological Transit**: Sun transiting your 10th House of Executive Leadership combined with Jupiter's expansion aspect.\n` +
      `• **Optimal Timing Window**: Execute high-stakes deals during **Abhijit Muhurta (11:48 AM - 12:36 PM)**.\n` +
      `• **Multi-Faith Remedies**:\n` +
      `  - 🕌 *Islamic*: Perform Morning Adhkar and give Friday Sadaqah for Barakah in earnings.\n` +
      `  - 🕉️ *Vedic*: Offer Surya Arghya at sunrise and wear Yellow Sapphire (Pukhraj).\n` +
      `  - 🧠 *CBT & Mind Science*: Conduct a 90-day task audit and eliminate top 2 friction bottlenecks.`;
  }

  if (p.includes('remedy') || p.includes('solution') || p.includes('evil eye') || p.includes('nazar')) {
    return `🛡️ **ASTRO360 Spiritual Protection & Remedy Blueprint for ${name}**:\n\n` +
      `• **Root Cause Analysis**: Temporary Saturn/Rahu transit friction causing energetic fatigue.\n` +
      `• **Prescribed Remedies**:\n` +
      `  - 🕌 *Ruqyah & Protection*: Recite Al-Mu'awwidhatayn (Surah Al-Falaq & Surah An-Nas) 3x morning and evening.\n` +
      `  - 🕉️ *Vedic Gem & Mantra*: Wear Blue Sapphire / Amethyst and chant Om Sham Shanaye Namaha (108x).\n` +
      `  - ⭐ *Western Crystal*: Keep Black Tourmaline / Golden Citrine at your primary workspace.\n` +
      `  - ☯️ *Feng Shui*: Balance South-East sector with Fire/Wood elements and Wu Lou gourds.`;
  }

  return `✨ **ASTRO360 Universal Astrological Guidance for ${name}**:\n\n` +
    `Your natal Kundli and ephemeris transits show strong momentum. Sun position illuminates executive focus, while Moon alignment grants mental clarity.\n\n` +
    `• **Action Step**: Align your primary daily tasks during golden planetary windows and maintain daily spiritual discipline.`;
}
