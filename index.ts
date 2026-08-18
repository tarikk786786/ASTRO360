import dotenv from 'dotenv';
import { streamText } from 'ai';

// Load environment variables from .env.local and .env
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function main() {
  console.log('🌌 Initializing Vercel AI Gateway Stream...\n');

  try {
    const result = streamText({
      model: 'openai/gpt-5.4',
      prompt: 'Explain the celestial significance of Jupiter transiting the 10th house in Vedic astrology in 2 concise sentences.',
    });

    console.log('✨ Streaming Response:');
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
    console.log('\n');

    const usage = await result.usage;
    console.log('📊 Token Usage:');
    console.log(`- Prompt Tokens:     ${usage.promptTokens ?? 0}`);
    console.log(`- Completion Tokens: ${usage.completionTokens ?? 0}`);
    console.log(`- Total Tokens:      ${usage.totalTokens ?? 0}`);
    console.log('\n✅ AI Gateway text generation stream completed successfully.');
  } catch (error: any) {
    console.error('\n⚠️ AI Gateway execution note:', error.message || error);
    if (!process.env.AI_GATEWAY_API_KEY || process.env.AI_GATEWAY_API_KEY === 'your_ai_gateway_api_key_here') {
      console.log('\n💡 Tip: Please provide your active AI_GATEWAY_API_KEY in .env.local to execute live requests through the Vercel AI Gateway.');
    }
  }
}

main();
