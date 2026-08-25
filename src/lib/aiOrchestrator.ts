import type { UserProfile } from '../types';
import type { PlanetPosition } from './astroCalculations';

export async function generateCosmicReading(
  promptContext: string,
  userProfile: UserProfile,
  planetaryPositions: PlanetPosition[],
  apiKey: string,
  provider: 'gemini' | 'openai' = 'gemini',
  options?: {
    language?: string;
    tradition?: string;
  }
): Promise<string> {
  if (!apiKey) {
    throw new Error('API Key is missing. Please configure it in Settings.');
  }

  const preferredSystem = options?.tradition || userProfile.preferredSystem || 'Universal Holistic Astrological System';
  const targetLanguage = options?.language || 'English';

  const systemPrompt = `You are a Master Universal Astrologer, Celestial Scholar, and Cosmic Intelligence AI specializing in worldwide astrological systems (Western Tropical, Vedic Jyotish, Hellenistic, Chinese BaZi, Islamic Ilm al-Falak, Celtic & Indigenous Traditions).

SEEKER PROFILE DETAILS (Mandatory Grounding):
- Name: ${userProfile.name || 'Seeker'}
- Date of Birth: ${userProfile.dob || 'Provided in natal data'}
- Time of Birth: ${userProfile.time || 'Provided in natal data'}
- Place of Birth / Location: ${userProfile.location || 'Universal Coordinates'}
- Preferred Astrological Tradition: ${preferredSystem}
- Primary Life Focus / Goal: ${userProfile.careerGoal || 'Holistic Life Path & Destiny'}

EXACT ASTRONOMICAL EPHEMERIS PLANETARY POSITIONS (True Keplerian Math):
${planetaryPositions.map(p => `- ${p.name}: ${p.sign}, ${p.degree} degrees (Longitude: ${Math.round(p.degreeDecimal)}°), House ${p.houseNumber}, Nakshatra: ${p.nakshatra} Pada ${p.pada} - Dignity/Strength: ${p.strength}`).join('\n')}

INSTRUCTIONS FOR ACCURACY & WORLDWIDE EXCELLENCE:
1. You must provide a personalized reading tailored specifically to ${userProfile.name || 'this Seeker'} using their exact birth data and planetary positions.
2. Ground all insights directly in the calculated positions above. Do NOT hallucinate different signs or houses.
3. Integrate insights harmoniously according to the seeker's preferred system (${preferredSystem}) while maintaining worldwide universal relevance.
4. Output your entire analysis in ${targetLanguage}.
5. Format your response cleanly in structured Markdown with clear thematic headings, bulleted takeaways, empowering life guidance, and practical remedies.`;

  if (provider === 'gemini') {
    return callGemini(systemPrompt, promptContext, apiKey);
  } else {
    return callOpenAI(systemPrompt, promptContext, apiKey);
  }
}

async function callGemini(systemPrompt: string, userPrompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
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
        maxOutputTokens: 2048,
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
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `OpenAI API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response generated.';
}
