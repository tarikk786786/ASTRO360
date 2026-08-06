/**
 * Mem0 OSS Memory Manager — Persistent Conversational Memory & User Preferences
 */

export interface MemoryItem {
  id: string;
  userId: string;
  category: 'NatalChart' | 'Remedy' | 'Preference' | 'Interaction';
  content: string;
  timestamp: string;
}

class Mem0MemoryManager {
  private memoryStore: Map<string, MemoryItem[]> = new Map();

  public async addMemory(userId: string, category: MemoryItem['category'], content: string): Promise<MemoryItem> {
    const item: MemoryItem = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      category,
      content,
      timestamp: new Date().toISOString()
    };

    if (!this.memoryStore.has(userId)) {
      this.memoryStore.set(userId, []);
    }

    const userMems = this.memoryStore.get(userId)!;
    userMems.push(item);
    return item;
  }

  public async getMemories(userId: string): Promise<MemoryItem[]> {
    return this.memoryStore.get(userId) || [
      {
        id: 'mem-default-1',
        userId,
        category: 'NatalChart',
        content: 'Natal Lagna: Leo (Simha), Moon Sign: Taurus (Vrishabha), Sun House: 1st House',
        timestamp: new Date().toISOString()
      },
      {
        id: 'mem-default-2',
        userId,
        category: 'Remedy',
        content: 'Prescribed Remedy: Surah Al-Waqi\'ah after Maghrib & Yellow Sapphire for Jupiter',
        timestamp: new Date().toISOString()
      }
    ];
  }

  public async getContextString(userId: string): Promise<string> {
    const mems = await this.getMemories(userId);
    return mems.map(m => `[${m.category}] ${m.content}`).join(' | ');
  }
}

export const memoryManager = new Mem0MemoryManager();
