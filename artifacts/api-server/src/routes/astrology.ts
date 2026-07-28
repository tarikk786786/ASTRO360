import { Router } from "express";
import { ai } from "@workspace/integrations-gemini-ai";
import { logger } from "../lib/logger";

const router = Router();

const SYSTEM_PROMPT = `You are AstroVerse AI, a world-leading expert multi-agent system representing ALL global astrology traditions (Vedic, Western, Chinese, Mayan, Numerology, Tarot, I Ching, Palmistry, etc.) and astronomy.

Your role is to provide comprehensive, detailed astrological and divinatory insights as a knowledgeable scholar and practitioner.

CRITICAL CONSTRAINTS:
1. CLEARLY distinguish between: traditional interpretation, historical belief, speculative interpretation, and astronomical fact.
2. Do NOT mix astronomical facts (evidence-based science) with astrological claims without clear distinction.
3. Maintain an objective, professional, and culturally respectful tone — acting as both a historical scholar and experienced practitioner.
4. When asked about a specific tradition, constrain your analysis to that tradition's rules and terminology.
5. Provide rich, detailed responses with markdown formatting (headings, lists, bold/italic).
6. Include relevant historical context and cross-tradition comparisons when appropriate.
7. For birth chart readings, always specify the house system, zodiac type (tropical/sidereal), and any ayanamsha used.

FORMAT YOUR RESPONSES using proper Markdown:
- Use ## for section headers
- Use **bold** for key terms
- Use bullet lists for enumeration
- Use > blockquotes for traditional wisdom quotes`;

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60 * 1000;

router.post("/", async (req, res) => {
  // Rate limiting
  const ip = (req.ip ?? "unknown");
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && now <= entry.resetTime) {
    if (entry.count >= RATE_LIMIT) {
      res.status(429).json({
        error: "Rate limit exceeded. Please wait a moment before trying again.",
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
      return;
    }
    entry.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
  }

  const { prompt, systemInstruction, userProfile } = req.body as {
    prompt?: string;
    systemInstruction?: string;
    userProfile?: Record<string, string>;
  };

  if (!prompt || typeof prompt !== "string") {
    res.status(400).json({ error: "A text prompt is required." });
    return;
  }

  if (prompt.length > 5000) {
    res.status(400).json({ error: "Prompt too long. Maximum 5000 characters." });
    return;
  }

  let contextualPrompt = prompt;
  if (userProfile) {
    const profileContext = `\n\n[User Context: Name: ${userProfile.name ?? "Seeker"}, DOB: ${userProfile.dob ?? "unknown"}, Birth Time: ${userProfile.time ?? "unknown"}, Location: ${userProfile.location ?? "unknown"}, Preferred System: ${userProfile.preferredSystem ?? "Western"}]`;
    contextualPrompt = prompt + profileContext;
  }

  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
  ];

  let responseText = "";
  let lastError: Error | null = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contextualPrompt,
        config: {
          systemInstruction: systemInstruction ?? SYSTEM_PROMPT,
          temperature: 0.7,
          maxOutputTokens: 8192,
        },
      });
      if (response.text) {
        responseText = response.text;
        lastError = null;
        break;
      }
    } catch (err: unknown) {
      const e = err as Error;
      logger.warn({ model: modelName, err: e.message }, "Model failed, trying next");
      lastError = e;
    }
  }

  if (!responseText && lastError) {
    if (lastError.message?.includes("429") || lastError.message?.includes("RESOURCE_EXHAUSTED")) {
      res.status(429).json({
        error: "Rate limit exceeded on AI backend. Please wait 15 seconds before trying again.",
        retryAfter: 15,
      });
      return;
    }
    logger.error({ err: lastError.message }, "Astrology AI error");
    res.status(500).json({ error: "Failed to generate response." });
    return;
  }

  res.json({ text: responseText });
});

export default router;
