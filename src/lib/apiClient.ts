// ASTRO360 AI API Integration Client
// Communicates with Express server backend (/api/astrology) with structured prompts and robust fallback handling.

export interface AIResponse {
  success: boolean;
  content: string;
  timestamp: string;
  source: 'gemini' | 'fallback';
}

export async function fetchAIInterpretation(prompt: string, userContext?: Record<string, any>): Promise<AIResponse> {
  try {
    const response = await fetch('/api/astrology', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        userContext,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      content: data.text || data.content || data.response || 'Insight generated successfully.',
      timestamp: new Date().toISOString(),
      source: 'gemini',
    };
  } catch (error) {
    console.warn('AI Endpoint fallback active:', error);
    return {
      success: false,
      content: generateLocalFallbackResponse(prompt),
      timestamp: new Date().toISOString(),
      source: 'fallback',
    };
  }
}

function generateLocalFallbackResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('dream')) {
    return 'Your dream reflects deep subconscious alignment. Water symbols represent emotional intuition, while height or flying indicates an emerging desire for perspective and autonomy.';
  } else if (p.includes('career') || p.includes('work')) {
    return 'Saturn and Jupiter alignments indicate a favorable 90-day window for strategic career expansion. Focus on structured execution and single-task clarity.';
  } else if (p.includes('remedy') || p.includes('solution')) {
    return 'Align your daily morning hours with solar energy (Surya Arghya). Maintain strict weekend discipline and engage in charitable donations on Saturday mornings.';
  }
  return 'Astrological alignment indicates steady cosmic momentum. Align your primary goals during Abhijit Muhurta for optimal focus and harmony.';
}
