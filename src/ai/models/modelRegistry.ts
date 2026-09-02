/**
 * ASTRO360 Open Model Registry
 * Supports FAST_LOCAL, REASONING_LOCAL, and EMERGENCY_SMALL tiers.
 * 100% Replaceable via config with zero vendor lock-in.
 */

export type ModelTier = 'FAST_LOCAL' | 'REASONING_LOCAL' | 'EMERGENCY_SMALL' | 'OPTIONAL_EXTERNAL';

export interface ModelDefinition {
  id: string;
  name: string;
  family: 'Qwen' | 'Phi' | 'Gemma' | 'Mistral' | 'DeepSeek' | 'Llama' | 'External';
  tier: ModelTier;
  provider: 'llama.cpp' | 'vllm' | 'ollama' | 'builtin_mock' | 'optional_cloud';
  runtime: string;
  pathOrRepo: string;
  format: 'GGUF' | 'Safetensors' | 'API';
  parameters: string;
  quantization: 'Q4_K_M' | 'Q5_K_M' | 'Q8_0' | 'FP16' | 'None';
  contextLength: number;
  languages: string[];
  capabilities: string[];
  toolCalling: boolean;
  structuredOutput: boolean;
  reasoning: boolean;
  license: string;
  commercialUse: boolean;
  minRamGb: number;
  minVramGb: number;
  enabled: boolean;
  priority: number;
}

export class ModelRegistryService {
  private static models: ModelDefinition[] = [
    {
      id: 'qwen2.5-1.5b-instruct-q4',
      name: 'Qwen 2.5 1.5B Instruct (GGUF)',
      family: 'Qwen',
      tier: 'EMERGENCY_SMALL',
      provider: 'llama.cpp',
      runtime: 'llama-server',
      pathOrRepo: 'Qwen/Qwen2.5-1.5B-Instruct-GGUF',
      format: 'GGUF',
      parameters: '1.5B',
      quantization: 'Q4_K_M',
      contextLength: 32768,
      languages: ['en', 'hi', 'bn', 'ur', 'ar', 'es', 'fr', 'zh'],
      capabilities: ['fast-intent', 'greetings', 'deterministic-phrasing'],
      toolCalling: true,
      structuredOutput: true,
      reasoning: false,
      license: 'Apache-2.0',
      commercialUse: true,
      minRamGb: 4,
      minVramGb: 0, // Runs on CPU
      enabled: true,
      priority: 1
    },
    {
      id: 'qwen2.5-7b-instruct-q4',
      name: 'Qwen 2.5 7B Instruct (GGUF)',
      family: 'Qwen',
      tier: 'FAST_LOCAL',
      provider: 'llama.cpp',
      runtime: 'llama-server',
      pathOrRepo: 'Qwen/Qwen2.5-7B-Instruct-GGUF',
      format: 'GGUF',
      parameters: '7B',
      quantization: 'Q4_K_M',
      contextLength: 32768,
      languages: ['en', 'hi', 'bn', 'ur', 'ar', 'es', 'fr', 'zh'],
      capabilities: ['astrology-synthesis', 'tool-calling', 'json-schema', 'multilingual'],
      toolCalling: true,
      structuredOutput: true,
      reasoning: true,
      license: 'Apache-2.0',
      commercialUse: true,
      minRamGb: 8,
      minVramGb: 6,
      enabled: true,
      priority: 2
    },
    {
      id: 'deepseek-r1-distill-qwen-14b-q4',
      name: 'DeepSeek R1 Distill Qwen 14B (GGUF)',
      family: 'DeepSeek',
      tier: 'REASONING_LOCAL',
      provider: 'llama.cpp',
      runtime: 'llama-server',
      pathOrRepo: 'bartowski/DeepSeek-R1-Distill-Qwen-14B-GGUF',
      format: 'GGUF',
      parameters: '14B',
      quantization: 'Q4_K_M',
      contextLength: 65536,
      languages: ['en', 'hi', 'zh', 'es', 'ar'],
      capabilities: ['multi-engine-consensus', 'complex-timing', 'research-backtesting', 'deep-reasoning'],
      toolCalling: true,
      structuredOutput: true,
      reasoning: true,
      license: 'MIT',
      commercialUse: true,
      minRamGb: 16,
      minVramGb: 10,
      enabled: true,
      priority: 3
    }
  ];

  public static getModels(): ModelDefinition[] {
    return [...this.models];
  }

  public static getModelById(id: string): ModelDefinition | undefined {
    return this.models.find(m => m.id === id);
  }

  public static getActiveModelForTier(tier: ModelTier): ModelDefinition {
    const active = this.models.filter(m => m.tier === tier && m.enabled).sort((a, b) => b.priority - a.priority);
    if (active.length > 0) return active[0];
    // Fallback to highest priority enabled model
    return this.models.find(m => m.enabled) || this.models[0];
  }

  public static registerModel(model: ModelDefinition): void {
    const idx = this.models.findIndex(m => m.id === model.id);
    if (idx >= 0) {
      this.models[idx] = model;
    } else {
      this.models.push(model);
    }
  }
}
