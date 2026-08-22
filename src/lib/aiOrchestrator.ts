import type { UserProfile } from '../types';
import type { PlanetPosition } from './astroCalculations';

export async function generateCosmicReading(
  promptContext: string,
  userProfile: UserProfile,
  planetaryPositions: PlanetPosition[],
  apiKey: string,
  provider: 'gemini' | 'openai' = 'gemini'
): Promise<string> {
  if (!apiKey) {
    throw new Error('API Key is missing. Please configure it in Settings.');
  }

  const systemPrompt = `You are a Master Vedic Astrologer, Jyotish expert, and cosmic architect. 
You are providing a reading for ${userProfile.name || 'User'}, born on ${userProfile.dob || 'Unknown'} at ${userProfile.time || 'unknown time'} in ${userProfile.location || 'Unknown'}.

Here are their exact calculated planetary positions and mathematical data:
${planetaryPositions.map(p => `- ${p.name}: ${p.sign}, ${p.degree} degrees, House ${p.houseNumber}, Nakshatra: ${p.nakshatra} Pada ${p.pada}`).join('\n')}

Based on this mathematical truth, answer the following prompt with profound, highly specific astrological insight. Do not use generic horoscopes. Use the precise placements.
Format your response in beautiful Markdown with headings and bullet points.`;

  if (provider === 'gemini') {
    return callGemini(systemPrompt, promptContext, apiKey);
  } else {
    return callOpenAI(systemPrompt, promptContext, apiKey);
  }
}

async function callGemini(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt + '\n\nUSER PROMPT: ' + userPrompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

async function callOpenAI(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const url = `https://api.openai.com/v1/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response generated.';
}
