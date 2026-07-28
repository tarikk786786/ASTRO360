import { Router } from "express";
import { db, conversations as conversationsTable, messages as messagesTable } from "@workspace/db";
import { ai } from "@workspace/integrations-gemini-ai";
import { eq } from "drizzle-orm";
import { logger } from "../../lib/logger";

const router = Router();

const ASTROLOGY_SYSTEM = `You are AstroVerse AI, a world-leading expert multi-agent system representing ALL global astrology traditions. Provide comprehensive astrological and divinatory insights with rich markdown formatting.`;

// GET /gemini/conversations
router.get("/conversations", async (_req, res) => {
  const convos = await db.select().from(conversationsTable).orderBy(conversationsTable.id);
  res.json(convos);
});

// POST /gemini/conversations
router.post("/conversations", async (req, res) => {
  const { title } = req.body as { title: string };
  if (!title) { res.status(400).json({ error: "title is required" }); return; }
  const [created] = await db.insert(conversationsTable).values({ title }).returning();
  res.status(201).json(created);
});

// GET /gemini/conversations/:id
router.get("/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [convo] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, id));
  if (!convo) { res.status(404).json({ error: "Not found" }); return; }
  const messages = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, id));
  res.json({ ...convo, messages });
});

// DELETE /gemini/conversations/:id
router.delete("/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [convo] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, id));
  if (!convo) { res.status(404).json({ error: "Not found" }); return; }
  await db.delete(messagesTable).where(eq(messagesTable.conversationId, id));
  await db.delete(conversationsTable).where(eq(conversationsTable.id, id));
  res.status(204).end();
});

// GET /gemini/conversations/:id/messages
router.get("/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const messages = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, id));
  res.json(messages);
});

// POST /gemini/conversations/:id/messages (SSE streaming)
router.post("/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const { content } = req.body as { content: string };
  if (!content) { res.status(400).json({ error: "content is required" }); return; }

  const [convo] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, id));
  if (!convo) { res.status(404).json({ error: "Not found" }); return; }

  // Save user message
  await db.insert(messagesTable).values({ conversationId: id, role: "user", content });

  // Load history
  const history = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, id));

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: { systemInstruction: ASTROLOGY_SYSTEM, maxOutputTokens: 8192 },
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    // Save assistant message
    await db.insert(messagesTable).values({ conversationId: id, role: "assistant", content: fullResponse });
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (err) {
    logger.error({ err }, "Gemini stream error");
    res.write(`data: ${JSON.stringify({ error: "AI error occurred" })}\n\n`);
  }

  res.end();
});

// POST /gemini/generate-image
router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body as { prompt: string };
  if (!prompt) { res.status(400).json({ error: "prompt is required" }); return; }
  try {
    const { generateImage } = await import("@workspace/integrations-gemini-ai/image");
    const result = await generateImage(prompt);
    res.json(result);
  } catch (err) {
    logger.error({ err }, "Image generation error");
    res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;
