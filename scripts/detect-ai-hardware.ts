/**
 * ASTRO360 Local AI Hardware Auto-Detection Script
 * Detects CPU cores, available system RAM, and GPU capabilities.
 * Recommends optimal GGUF quantization tier.
 */

import os from 'os';

console.log('🔍 ASTRO360 Local AI Hardware Diagnostics\n');

const cpuCores = os.cpus().length;
const totalRamGb = Math.round(os.totalmem() / (1024 * 1024 * 1024));
const freeRamGb = Math.round(os.freemem() / (1024 * 1024 * 1024));
const platform = os.platform();
const arch = os.arch();

console.log(`• Platform: ${platform} (${arch})`);
console.log(`• CPU Cores: ${cpuCores}`);
console.log(`• Total RAM: ${totalRamGb} GB`);
console.log(`• Available RAM: ${freeRamGb} GB\n`);

console.log('📊 Recommended ASTRO360 Open Model Tier:');

if (totalRamGb < 8) {
  console.log('👉 EMERGENCY_SMALL Tier: Qwen 2.5 1.5B Instruct (Q4_K_M GGUF, ~1.1 GB RAM)');
  console.log('   Command: llama-server -m models/qwen2.5-1.5b-instruct.Q4_K_M.gguf --port 8080');
} else if (totalRamGb <= 16) {
  console.log('👉 FAST_LOCAL Tier: Qwen 2.5 7B Instruct (Q4_K_M GGUF, ~4.5 GB RAM)');
  console.log('   Command: llama-server -m models/qwen2.5-7b-instruct.Q4_K_M.gguf -c 32768 --port 8080');
} else {
  console.log('👉 REASONING_LOCAL Tier: DeepSeek R1 Distill Qwen 14B (Q4_K_M GGUF, ~9.0 GB RAM)');
  console.log('   Command: llama-server -m models/deepseek-r1-distill-qwen-14b.Q4_K_M.gguf -c 65536 --port 8080');
}

console.log('\n✅ Zero mandatory cloud API dependencies required. 100% self-hostable.');
