# ASTRO360 — Local & Self-Hosted Deployment Guide

```bash
# 1. Detect hardware
npx tsx scripts/detect-ai-hardware.ts

# 2. Run local llama.cpp server
llama-server -m models/qwen2.5-7b-instruct.Q4_K_M.gguf -c 32768 --port 8080

# 3. Start ASTRO360 development server
npm run dev
```
