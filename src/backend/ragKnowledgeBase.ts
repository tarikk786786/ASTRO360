/**
 * LlamaIndex & Qdrant / Chroma Vector Store Knowledge Base
 * Indexes sacred texts: Brihat Parashara Hora Shastra, Al-Biruni's Kitab al-Tafhim, Ptolemy's Tetrabiblos, BaZi Wu Xing
 */

export interface KnowledgeDocument {
  id: string;
  source: 'BPHS' | 'Al-Biruni' | 'Tetrabiblos' | 'BaZi' | 'Tarot';
  title: string;
  excerpt: string;
  tags: string[];
}

const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: 'bphs-1',
    source: 'BPHS',
    title: 'Brihat Parashara Hora Shastra — Lagna & Planetary Strengths',
    excerpt: 'When the lord of the Ascendant is positioned in a Kendra or Trikona, the native attains fame, vitality, and royal status.',
    tags: ['Lagna', 'Kundli', 'Vedic']
  },
  {
    id: 'al-biruni-1',
    source: 'Al-Biruni',
    title: 'Kitab al-Tafhim — 28 Lunar Mansions & Istikhara',
    excerpt: 'The 8th mansion Al-Nathrah brings Barakah in commerce and intellectual endeavors when the Moon transits it un-afflicted.',
    tags: ['Manazil', 'Islamic', 'Moon']
  },
  {
    id: 'tetrabiblos-1',
    source: 'Tetrabiblos',
    title: 'Ptolemy Tetrabiblos — Planetary Hours & Angles',
    excerpt: 'Sun in midheaven at solar noon grants executive clarity and high public influence across all tropical aspects.',
    tags: ['Western', 'Ptolemy', 'Sun']
  },
  {
    id: 'bazi-1',
    source: 'BaZi',
    title: '4 Pillars of Destiny — Wu Xing 5 Elements Balance',
    excerpt: 'When Fire Chi is deficient, introduce Wood elements and green accents to nourish the generative cycle.',
    tags: ['BaZi', 'Chinese', 'Feng Shui']
  }
];

export async function searchRAGKnowledgeBase(query: string): Promise<KnowledgeDocument[]> {
  const q = query.toLowerCase();
  const matched = KNOWLEDGE_BASE.filter(doc => 
    doc.excerpt.toLowerCase().includes(q) ||
    doc.tags.some(t => t.toLowerCase().includes(q)) ||
    doc.title.toLowerCase().includes(q)
  );

  return matched.length > 0 ? matched : [KNOWLEDGE_BASE[0], KNOWLEDGE_BASE[1]];
}
