import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CloudMoon, Sparkles, Brain, BookOpen, Shield, Download, Check, AlertCircle, 
  Layers, Compass, Flame, Heart, Activity, Search, RefreshCw, BarChart2, Tag, Scale, Info, Sun, Moon, Home, Skull, Coins,
  Clock, Zap, Eye, Mountain, Droplets, Smile, Frown, TrendingUp
} from 'lucide-react';
import type { UserProfile } from '../types';
import { exportUniversalPdf } from '../lib/pdfReportEngine';

interface DreamInterpretationEngineProps {
  userProfile?: UserProfile;
}

interface DreamLog {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  sleepDuration: number;
  isNightmare: boolean;
  isLucid: boolean;
  isRecurring: boolean;
  emotions: string[];
  symbols: string[];
}

interface SymbolInterpretation {
  id: string;
  symbol: string;
  keywords: string[];
  psychological: string;
  sleepScience: string;
  islamic: { text: string; source: string };
  christian: { text: string; source: string };
  hindu: { text: string; source: string };
  buddhist: { text: string; source: string };
  chinese: { text: string; source: string };
  greek: { text: string; source: string };
}

const KNOWLEDGE_BASE: Record<string, SymbolInterpretation> = {
  water: {
    id: 'water',
    symbol: 'Water (River / Ocean / Rain)',
    keywords: ['water', 'ocean', 'river', 'sea', 'rain', 'stream', 'lake', 'swimming', 'flood'],
    psychological: 'Water in psychology frequently represents emotional depth, the subconscious mind, or feelings of being cleansed vs overwhelmed depending on clarity and turbulence.',
    sleepScience: 'During REM sleep, body temperature and fluid balance sensations often trigger fluid imagery in dreams as the brain processes daytime sensory signals.',
    islamic: { text: 'Clear water traditionally signifies life, knowledge, and purity. Flowing rivers represent continuous sustenance or life path.', source: 'Ibn Sirin Classical Tafsir & Authentic Sunnah Traditions' },
    christian: { text: 'Water symbolizes spiritual rebirth, baptism, cleansing, or trials depending on whether it is still, flowing, or stormy.', source: 'Biblical References (Ezekiel, John 4:14)' },
    hindu: { text: 'Water represents life energy (Prana), purity, and the flow of Karma. Clear ocean waters indicate mental stability.', source: 'Classical Vedic & Puranic Symbolism' },
    buddhist: { text: 'Water represents fluidity, non-attachment, and the constantly changing nature of thoughts (Anicca).', source: 'Mindfulness & Buddhist Canon' },
    chinese: { text: 'Water is one of the Five Elements (Wu Xing), associated with wisdom, adaptability, and wealth energy.', source: 'I Ching & Traditional Chinese Cosmology' },
    greek: { text: 'Clear water signifies smooth affairs and emotional health; muddy water suggests temporary confusion.', source: 'Artemidorus (Oneirocritica)' },
  },
  flying: {
    id: 'flying',
    symbol: 'Flying / Soaring in Sky',
    keywords: ['flying', 'fly', 'soar', 'soaring', 'floating', 'air', 'sky', 'wings', 'bird'],
    psychological: 'Flying dreams commonly reflect feelings of liberation, overcoming obstacles, or a desire for freedom from daily constraints.',
    sleepScience: 'REM sleep motor inhibition (muscle atonia) creates a sensation of weightlessness that the dreaming mind interprets as floating or flying.',
    islamic: { text: 'Flying in dreams traditionally represents travel, elevation in status, or spiritual longing.', source: 'Classical Dream Literature' },
    christian: { text: 'Soaring above obstacles is often viewed as a symbol of spiritual renewal or rising above worldly trials.', source: 'Historical Christian Meditations' },
    hindu: { text: 'Flying signifies spiritual advancement, lightness of mind, or freeing oneself from heavy karmic burdens.', source: 'Classical Yoga & Vedic Texts' },
    buddhist: { text: 'Flying reflects the mind escaping rigid mental attachments and realizing lightness of consciousness.', source: 'Dharmic Teachings' },
    chinese: { text: 'Flying represents ambition, positive Qi flow, and aspiring toward higher personal or career goals.', source: 'Traditional Chinese Folk Lore' },
    greek: { text: 'Flying effortlessly indicates success and freedom; struggling to stay aloft suggests fear of falling behind.', source: 'Classical Greek Dream Analysis' },
  },
  snake: {
    id: 'snake',
    symbol: 'Snake / Serpent',
    keywords: ['snake', 'serpent', 'cobra', 'python', 'viper', 'reptile'],
    psychological: 'Snakes often represent transformation, hidden fears, instincts, or creative energy seeking expression.',
    sleepScience: 'Threat simulation theory suggests the brain uses primal predator imagery during REM sleep to train fight-or-flight neural pathways.',
    islamic: { text: 'A snake in traditional Islamic interpretations historically represents an opponent or hidden hostility. Precaution is advised.', source: 'Classical Scholarly Dream Lexicon' },
    christian: { text: 'Biblically, serpents represent temptation, wisdom, or spiritual warfare, requiring discernment and faith.', source: 'Biblical Symbolism (Genesis 3, Matthew 10:16)' },
    hindu: { text: 'Snakes (Nagas) carry sacred spiritual energy, Kundalini awakening, or transformation of inner power.', source: 'Vedic & Puranic Traditions' },
    buddhist: { text: 'The serpent (Naga) represents guardianship, hidden wisdom, or unexamined mental impulses.', source: 'Buddhist Iconography' },
    chinese: { text: 'The snake is the 6th zodiac sign, symbolizing intuition, cunning intellect, and secret resources.', source: 'Chinese BaZi & Zodiac Lore' },
    greek: { text: 'Snakes represent healing (Rod of Asclepius) or sudden transformations in one\'s health or life direction.', source: 'Ancient Asclepian Healing Traditions' },
  },
  tree: {
    id: 'tree',
    symbol: 'Tree / Forest / Roots',
    keywords: ['tree', 'forest', 'roots', 'branches', 'leaves', 'woods', 'jungle'],
    psychological: 'Trees symbolize personal growth, family roots, stability, and connection between conscious thoughts (branches) and subconscious (roots).',
    sleepScience: 'Memory consolidation during sleep organizes long-term memories into structural networks, often visualized as branching structures.',
    islamic: { text: 'A fruitful tree signifies a beneficial person or good deeds. The Kalimah is likened in the Qur\'an to a goodly tree.', source: 'Qur\'an (Surah Ibrahim 14:24)' },
    christian: { text: 'Trees represent faith, life (Tree of Life), and spiritual fruitfulness rooted in divine grace.', source: 'Biblical References (Psalm 1:3, Revelation 22)' },
    hindu: { text: 'The Sacred Banyan or Peepal tree represents cosmic order (Ashvattha), longevity, and deep ancestral connection.', source: 'Bhagavad Gita (Chapter 15)' },
    buddhist: { text: 'The Bodhi tree symbolizes awakening, enlightenment, and shelter under noble wisdom.', source: 'Buddhist History' },
    chinese: { text: 'Wood element represents growth, spring vitality, benevolence, and upward expansion.', source: 'Wu Xing Five Elements' },
    greek: { text: 'Sacred groves and trees represent endurance, shelter, and steady progress in human life.', source: 'Classical Mythological Symbolism' },
  },
  fire: {
    id: 'fire',
    symbol: 'Fire / Flame / Heat',
    keywords: ['fire', 'flame', 'flames', 'heat', 'burning', 'burn', 'blaze', 'bonfire'],
    psychological: 'Fire in psychology represents intense passion, anger, transformation, or sudden destruction leading to rebirth.',
    sleepScience: 'Sudden changes in body temperature or vivid emotional arousal during REM can generate fire-related sensory imagery.',
    islamic: { text: 'Controlled fire represents light, warmth, or leadership; uncontained destructive fire warns against strife (fitnah).', source: 'Classical Tafsir Literature' },
    christian: { text: 'Fire symbolizes the refining presence of the Holy Spirit, purification, or divine judgment.', source: 'Biblical Symbolism (Exodus 3:2, Acts 2:3)' },
    hindu: { text: 'Agni (Sacred Fire) is the divine messenger, purifying all actions and conveying prayers to higher realms.', source: 'Vedic Agnihotra Traditions' },
    buddhist: { text: 'Fire symbolizes passion and desire; cooling the flames of greed and aversion leads to peace.', source: 'Adittapariyaya Sutta (Fire Sermon)' },
    chinese: { text: 'Fire element (Wu Xing) is associated with summer, enthusiasm, clarity, and radiant leadership energy.', source: 'Wu Xing & Traditional Chinese Medicine' },
    greek: { text: 'Promethean fire represents creative spark, wisdom, technology, and rapid energetic change.', source: 'Classical Greek Mythology' },
  },
  moon: {
    id: 'moon',
    symbol: 'Moon / Crescent / Lunar Phases',
    keywords: ['moon', 'crescent', 'full moon', 'moonlight', 'lunar'],
    psychological: 'The moon represents intuition, cyclical emotional rhythms, maternal archetypes, and subconscious moods.',
    sleepScience: 'Melatonin secretion cycles linked to nighttime sleep naturally align mental focus with lunar and nocturnal visual themes.',
    islamic: { text: 'The crescent moon represents guidance, the Hijri calendar, and divine markers of time and worship.', source: 'Qur\'an (Surah Al-Baqarah 2:189)' },
    christian: { text: 'The moon reflects light from the sun, symbolizing church reflecting divine grace or subtle spiritual guidance.', source: 'Christian Typology' },
    hindu: { text: 'Chandra (The Moon) rules the mind (Manas), emotional peace, and somatic nourishment (Soma).', source: 'Suryasiddhanta & Vedic Astrology' },
    buddhist: { text: 'The full moon symbolizes full realization of mindfulness, clarity, and peace of mind.', source: 'Buddhist Ceremonial Lore' },
    chinese: { text: 'Yin energy, quiet reflection, beauty, and peaceful domestic harmony.', source: 'Yin-Yang Philosophy' },
    greek: { text: 'Associated with Artemis & Selene, representing nighttime intuition and biological cycles.', source: 'Classical Hellenistic Traditions' },
  },
  house: {
    id: 'house',
    symbol: 'House / Home / Rooms',
    keywords: ['house', 'home', 'building', 'room', 'rooms', 'door', 'hallway'],
    psychological: 'A house represents the self or psyche. Different rooms symbolize various aspects of memories or personality traits.',
    sleepScience: 'Spatial memory networks (hippocampal place cells) consolidate spatial maps during NREM/REM sleep transitions.',
    islamic: { text: 'A spacious clean house symbolizes stability, peace of mind, and good domestic fortune.', source: 'Classical Dream Symbolism' },
    christian: { text: 'Houses represent the temple of the spirit, family foundation, or spiritual shelter.', source: 'Biblical Parables (Matthew 7:24)' },
    hindu: { text: 'Reflects Vastu Purusha, family karma, and physical body container of the soul (Jiva).', source: 'Vastu & Vedic Traditions' },
    buddhist: { text: 'A shelter representing temporary worldly residence requiring mindful maintenance.', source: 'Dharmic Teachings' },
    chinese: { text: 'Family lineage, prosperity, security, and harmonious ancestral Qi.', source: 'Feng Shui Principles' },
    greek: { text: 'Indicates status, social foundation, and inner peace in personal life affairs.', source: 'Artemidorus (Oneirocritica)' },
  },
  falling: {
    id: 'falling',
    symbol: 'Falling / Dropping from Height',
    keywords: ['falling', 'fall', 'drop', 'cliff', 'slipping', 'heights'],
    psychological: 'Falling dreams often reflect feelings of losing control, insecurity in career or relationships, or anxiety over an impending change.',
    sleepScience: 'Myoclonic jerks (hypnic jerks) during initial sleep onset trigger sudden motor reflex discharges that the brain visualizes as falling.',
    islamic: { text: 'Falling from a high place can symbolize shifting states; landing safely indicates overcoming a challenge.', source: 'Classical Tafsir Literature' },
    christian: { text: 'Reminds one to ground faith in humility and seek divine guidance during times of trial.', source: 'Historical Christian Writings' },
    hindu: { text: 'Reflects a temporary dip in ego or worldly status before regaining balance.', source: 'Vedic Symbolism' },
    buddhist: { text: 'A lesson in impermanence (Anicca) and letting go of rigid control over outcomes.', source: 'Mindfulness Canon' },
    chinese: { text: 'A call to ground one\'s energy (Qi) and avoid overextending in business or personal ventures.', source: 'Traditional Chinese Lore' },
    greek: { text: 'Falling indicates unexpected shifts requiring careful foresight and steady steps.', source: 'Artemidorus (Oneirocritica)' },
  },
  money: {
    id: 'money',
    symbol: 'Money / Gold / Prosperity',
    keywords: ['money', 'gold', 'coins', 'wealth', 'cash', 'treasure', 'jewels'],
    psychological: 'Money in dreams symbolizes self-worth, energy, personal power, or anxiety regarding financial security.',
    sleepScience: 'Daytime resource management and economic stress activate brain reward pathways (dopaminergic circuits) during REM sleep.',
    islamic: { text: 'Receiving clean gold or coins signifies beneficial knowledge, halaal earnings, or trusted responsibility.', source: 'Classical Dream Scholars' },
    christian: { text: 'Prompts reflection on stewardship, generous sharing, and prioritizing spiritual wealth.', source: 'Biblical Wisdom Literature' },
    hindu: { text: 'Associated with Lakshmi (abundance energy) and rewarding outcomes from righteous actions (Dharma).', source: 'Classical Puranas' },
    buddhist: { text: 'Reminds the dreamer that true wealth lies in contentment (Santutthi) and generosity (Dana).', source: 'Dharmic Wisdom' },
    chinese: { text: 'A strong positive omen for upcoming business growth, abundance, and favorable Qi in trade.', source: 'I Ching & Feng Shui' },
    greek: { text: 'Gold represents lasting reputation and successful contracts in civic affairs.', source: 'Classical Greek Dream Analysis' },
  },
  baby: {
    id: 'baby',
    symbol: 'Baby / Newborn Child',
    keywords: ['baby', 'newborn', 'infant', 'child', 'birth', 'cradle'],
    psychological: 'A baby symbolizes new beginnings, fresh creative projects, innocence, or vulnerability needing nurturing.',
    sleepScience: 'Nurturing impulses and biological protective circuitry generate tender dream scenarios during deep REM phases.',
    islamic: { text: 'A healthy baby in dreams traditionally symbolizes news of joy, new beginnings, or a blessed project.', source: 'Classical Tafsir' },
    christian: { text: 'Symbolizes hope, innocence, divine gift, and new life sprouting forth.', source: 'Biblical Verses (Isaiah, Psalms)' },
    hindu: { text: 'Represents fresh life cycles, renewal, and pure potential energy.', source: 'Vedic Lore' },
    buddhist: { text: 'Symbolizes the beginner\'s mind (Shoshin) free from accumulated prejudice.', source: 'Zen Traditions' },
    chinese: { text: 'Favorable sign for family vitality, upcoming growth, and flourishing household Qi.', source: 'Chinese Culture' },
    greek: { text: 'Newborns represent early stages of successful undertakings.', source: 'Artemidorus' },
  },
  death: {
    id: 'death',
    symbol: 'Death / Dying / Afterlife',
    keywords: ['death', 'dying', 'afterlife', 'dead', 'passing', 'funeral', 'grave', 'coffin'],
    psychological: 'Death in dreams rarely predicts actual death; rather, it symbolizes the end of an era, profound transformation, or clearing space for new psychological beginnings.',
    sleepScience: 'Intense emotional shifts and fear-processing in the amygdala during REM sleep can manifest as existential scenarios like death.',
    islamic: { text: 'Death can signify religious deficiency, but also longevity, paying off debts, or moving to a better state depending on the context.', source: 'Ibn Sirin Classical Tafsir' },
    christian: { text: 'Symbolizes spiritual rebirth, dying to sin, or the end of a worldly trial.', source: 'Biblical Symbolism (Romans 6:4)' },
    hindu: { text: 'Represents the shedding of old karmic attachments and the eternal nature of the Atman (soul).', source: 'Bhagavad Gita' },
    buddhist: { text: 'A powerful reminder of impermanence (Anicca) and the transient nature of all worldly phenomena.', source: 'Mindfulness of Death' },
    chinese: { text: 'Often considered a paradox where dreaming of death can bring long life and renewal of life force (Qi).', source: 'Traditional Dream Folklore' },
    greek: { text: 'Symbolizes the resolution of long-standing problems or the conclusion of a difficult chapter.', source: 'Artemidorus (Oneirocritica)' },
  },
  animals: {
    id: 'animals',
    symbol: 'Animals / Wild Beasts',
    keywords: ['dog', 'cat', 'horse', 'lion', 'eagle', 'animal', 'beast', 'wild', 'bird'],
    psychological: 'Animals typically represent primal instincts, untamed emotions, or specific traits (e.g., lion for courage) that the dreamer is integrating.',
    sleepScience: 'Evolutionary survival mechanisms frequently surface in dreams through animal encounters, activating primal motor pathways.',
    islamic: { text: 'Different animals hold varied meanings; a horse signifies dignity and victory, while a dog can represent a weak enemy.', source: 'Classical Dream Lexicon' },
    christian: { text: 'Animals often reflect spiritual traits—sheep for followers, lions for divine power, eagles for spiritual renewal.', source: 'Biblical Typology' },
    hindu: { text: 'Animals are associated with specific deities (Vahanas) and represent various energies, like the elephant for Ganesha.', source: 'Puranic Symbolism' },
    buddhist: { text: 'Represents the cycle of Samsara and the various states of mind driven by basic desires or aversions.', source: 'Wheel of Life' },
    chinese: { text: 'Tied to the Zodiac, animals bring specific energetic influences, such as the tiger for power and the rabbit for luck.', source: 'Chinese Zodiac Tradition' },
    greek: { text: 'Animals reflect human passions; horses indicate success in endeavors, while wolves indicate secret enemies.', source: 'Artemidorus' },
  },
  running: {
    id: 'running',
    symbol: 'Running / Chasing',
    keywords: ['running', 'chasing', 'chased', 'fleeing', 'sprint', 'escape'],
    psychological: 'Being chased represents avoidance of an issue, anxiety, or unresolved fears, while running toward something indicates ambition.',
    sleepScience: 'REM sleep atonia (muscle paralysis) can cause dreams of running in slow motion when motor intent conflicts with physical inhibition.',
    islamic: { text: 'Fleeing from danger signifies safety and escaping anxiety, provided the dreamer escapes.', source: 'Classical Interpretations' },
    christian: { text: 'Running a race symbolizes spiritual endurance, while fleeing represents escaping worldly temptations.', source: 'Biblical Metaphor (1 Corinthians 9:24)' },
    hindu: { text: 'Running away from an unknown fear indicates unresolved karmic debts or inner anxieties.', source: 'Vedic Dream Symbolism' },
    buddhist: { text: 'Reflects the restless mind (Monkey Mind) chasing after desires or running away from suffering.', source: 'Mindfulness Teachings' },
    chinese: { text: 'Running smoothly indicates unobstructed progress (good Qi flow), while struggling to run suggests energetic blockages.', source: 'Traditional Lore' },
    greek: { text: 'Participating in a race is auspicious for success; fleeing suggests avoiding necessary confrontations.', source: 'Hellenistic Traditions' },
  },
  teeth: {
    id: 'teeth',
    symbol: 'Teeth / Falling Out',
    keywords: ['teeth', 'tooth', 'falling out', 'breaking', 'dentist', 'mouth'],
    psychological: 'Teeth falling out frequently points to feelings of powerlessness, insecurity about appearance, or anxiety over communication and aging.',
    sleepScience: 'Somatosensory feedback, such as teeth grinding (bruxism) during sleep, can directly translate into dreams about dental damage.',
    islamic: { text: 'Teeth generally represent family members. Falling teeth can indicate the longevity of the dreamer or a loss in the family.', source: 'Ibn Sirin' },
    christian: { text: 'Teeth can symbolize power, digestion of wisdom, or feelings of vulnerability during spiritual trials.', source: 'Biblical Metaphors' },
    hindu: { text: 'Loss of teeth warns of potential loss of vitality or respect in the community.', source: 'Traditional Dream Lore' },
    buddhist: { text: 'A stark reminder of bodily decay and impermanence, urging detachment from physical vanity.', source: 'Contemplation of the Body' },
    chinese: { text: 'Losing teeth can signify concerns over family matters or a disruption in one\'s ability to grasp life\'s opportunities.', source: 'Chinese Folklore' },
    greek: { text: 'Teeth represent household members or property; falling teeth suggest potential loss or significant transition.', source: 'Artemidorus' },
  },
  wedding: {
    id: 'wedding',
    symbol: 'Marriage / Wedding',
    keywords: ['wedding', 'marriage', 'bride', 'groom', 'ceremony', 'marry'],
    psychological: 'Weddings symbolize the integration of different aspects of the self, commitment, or transitions into new life phases.',
    sleepScience: 'Social bonding and attachment circuits are active during REM sleep, often manifesting as themes of union or celebration.',
    islamic: { text: 'Marriage in a dream signifies divine providence, honor, and gaining high status, depending on the context.', source: 'Classical Scholars' },
    christian: { text: 'Symbolizes the union of Christ and the Church, spiritual commitment, and divine covenants.', source: 'Biblical Typology (Revelation 19)' },
    hindu: { text: 'A highly auspicious symbol representing harmony, the union of Shiva and Shakti, and social prosperity.', source: 'Vedic Symbolism' },
    buddhist: { text: 'Represents worldly attachments and the union of conditions that create current realities.', source: 'Dharmic View' },
    chinese: { text: 'A union of Yin and Yang energies, signaling upcoming celebrations, harmony, or new partnerships.', source: 'Yin-Yang Philosophy' },
    greek: { text: 'Weddings portend significant changes, often positive, but can also represent the binding nature of obligations.', source: 'Classical Interpretations' },
  },
  mountain: {
    id: 'mountain',
    symbol: 'Mountains / Cliffs',
    keywords: ['mountain', 'cliff', 'heights', 'peak', 'climbing', 'summit'],
    psychological: 'Mountains represent major life challenges, goals, spiritual ascension, or feeling overwhelmed by a massive obstacle.',
    sleepScience: 'Sensations of breathing changes during sleep may trigger dreams of high altitudes or climbing.',
    islamic: { text: 'A mountain represents a person of great importance or a massive undertaking; climbing it signifies achieving a high goal.', source: 'Classical Tafsir' },
    christian: { text: 'Mountains are places of divine revelation, prayer, and encountering God\'s presence.', source: 'Biblical Symbolism (Sinai)' },
    hindu: { text: 'Symbolizes Mount Meru, the center of the universe, representing spiritual steadfastness and the ascent to higher consciousness.', source: 'Puranic Cosmology' },
    buddhist: { text: 'Represents unshakable stability of the mind in meditation, unbothered by the winds of worldly conditions.', source: 'Zen Teachings' },
    chinese: { text: 'Mountains (Gen) symbolize stillness, keeping still, and the accumulation of wisdom and resources.', source: 'I Ching' },
    greek: { text: 'Climbing a mountain indicates ambition and dealing with powerful figures or challenging tasks.', source: 'Hellenistic Traditions' },
  },
  rain: {
    id: 'rain',
    symbol: 'Storm / Rain / Thunder',
    keywords: ['rain', 'storm', 'thunder', 'lightning', 'downpour', 'weather'],
    psychological: 'Rain can symbolize emotional release, cleansing, sadness, or a period of internal reflection and renewal.',
    sleepScience: 'Ambient noise like rain or internal emotional processing can influence weather imagery during dream generation.',
    islamic: { text: 'Rain is generally a sign of mercy, blessings, and relief, unless it causes destruction.', source: 'Ibn Sirin' },
    christian: { text: 'Symbolizes the outpouring of the Holy Spirit, divine blessings, or trials (storms) that test one\'s faith.', source: 'Biblical Metaphors' },
    hindu: { text: 'Indra\'s blessing; rain represents life-giving energy, fertility, and the washing away of past karmas.', source: 'Vedic Traditions' },
    buddhist: { text: 'The cooling rain of the Dharma puts out the fires of greed, hatred, and delusion.', source: 'Buddhist Sutras' },
    chinese: { text: 'Gentle rain means the nourishment of Yin energy, bringing growth and harmony to one\'s environment.', source: 'Traditional Elements' },
    greek: { text: 'Moderate rain is favorable for agriculture and business; storms warn of turbulent emotions or affairs.', source: 'Classical Dream Analysis' },
  },
  ocean: {
    id: 'ocean',
    symbol: 'Deep Ocean / Underwater',
    keywords: ['ocean', 'deep', 'underwater', 'sea', 'diving', 'waves'],
    psychological: 'The deep ocean represents the vast, unexplored unconscious mind, deep emotions, and the mystery of the self.',
    sleepScience: 'Deep slow-wave sleep rhythms often translate into sensations of deep, rhythmic underwater movement.',
    islamic: { text: 'The ocean represents a powerful ruler or immense knowledge; diving into it signifies seeking deep wisdom.', source: 'Classical Dream Lexicon' },
    christian: { text: 'The sea can symbolize chaos, the mystery of God\'s creation, or the depths of divine love.', source: 'Biblical References' },
    hindu: { text: 'The cosmic ocean (Kshira Sagara) represents the source of all creation and the churning of life\'s experiences.', source: 'Puranic Mythology' },
    buddhist: { text: 'The ocean of Samsara represents the endless cycle of birth and death, which one seeks to cross to reach Nirvana.', source: 'Dharmic Metaphors' },
    chinese: { text: 'The vast ocean embodies ultimate Yin energy, representing infinite potential, depth, and the accumulation of wealth.', source: 'Chinese Cosmology' },
    greek: { text: 'The sea reflects the unpredictable nature of fate and the depths of human passion and fortune.', source: 'Artemidorus' },
  },
};

const emotionScores: Record<string, number> = {
  Joy: 95, Peace: 90, Love: 95, Hope: 85, Gratitude: 90, Relief: 80, Wonder: 85,
  Fear: 15, Anxiety: 20, Stress: 25, Confusion: 40, Anger: 15, Sadness: 25
};

const getMoodScore = (emotions: string[]) => {
  if (emotions.length === 0) return 50;
  const avg = emotions.reduce((acc, emo) => acc + (emotionScores[emo] || 50), 0) / emotions.length;
  return Math.round(avg);
};

const getSpiritualLevel = (symbols: string[]) => {
  if (symbols.length >= 4) return 'Profound';
  if (symbols.length >= 2) return 'Significant';
  return 'Moderate';
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function DreamInterpretationEngine({ userProfile }: DreamInterpretationEngineProps) {
  const [activeTab, setActiveTab] = useState<'log' | 'analysis' | 'comparison' | 'science' | 'trends' | 'classification' | 'lucid'>('log');
  const [dreamTitle, setDreamTitle] = useState('');
  const [dreamDesc, setDreamDesc] = useState('');
  const [sleepHrs, setSleepHrs] = useState(7.5);
  const [isNightmare, setIsNightmare] = useState(false);
  const [isLucid, setIsLucid] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(['Peace', 'Wonder']);
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(['water', 'flying']);
  const [timerActive, setTimerActive] = useState(false);

  const [dreamHistory, setDreamHistory] = useState<DreamLog[]>(() => {
    try {
      const saved = localStorage.getItem('astroverse_dream_journal');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: '1',
        title: 'Soaring over Clear Ocean Waters',
        description: 'I was gliding smoothly above a vast crystal clear ocean under a bright moonlit sky. I felt calm and light.',
        date: '2026-07-30',
        time: '04:30',
        sleepDuration: 8.0,
        isNightmare: false,
        isLucid: true,
        isRecurring: false,
        emotions: ['Peace', 'Wonder', 'Joy'],
        symbols: ['water', 'flying', 'moon'],
      },
      {
        id: '2',
        title: 'Ancient Sacred Tree in Quiet Garden',
        description: 'Standing before a giant ancient oak tree with glowing leaves. A gentle rain was falling.',
        date: '2026-07-28',
        time: '05:15',
        sleepDuration: 7.2,
        isNightmare: false,
        isLucid: false,
        isRecurring: true,
        emotions: ['Peace', 'Gratitude'],
        symbols: ['tree', 'water'],
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('astroverse_dream_journal', JSON.stringify(dreamHistory));
    } catch (e) {}
  }, [dreamHistory]);

  const handleDescChange = (text: string) => {
    setDreamDesc(text);
    const lower = text.toLowerCase();
    const detected: string[] = [];

    Object.values(KNOWLEDGE_BASE).forEach(item => {
      if (item.keywords.some(kw => lower.includes(kw))) {
        detected.push(item.id);
      }
    });

    if (detected.length > 0) {
      setSelectedSymbols(prev => Array.from(new Set([...prev, ...detected])));
    }
  };

  const emotionList = ['Fear', 'Joy', 'Peace', 'Love', 'Hope', 'Anxiety', 'Stress', 'Confusion', 'Anger', 'Sadness', 'Gratitude', 'Relief', 'Wonder'];

  const handleToggleEmotion = (emo: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emo) ? prev.filter(e => e !== emo) : [...prev, emo]
    );
  };

  const handleToggleSymbol = (symId: string) => {
    setSelectedSymbols(prev => 
      prev.includes(symId) ? prev.filter(s => s !== symId) : [...prev, symId]
    );
  };

  const handleSaveDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamTitle.trim() || !dreamDesc.trim()) return;

    const newLog: DreamLog = {
      id: Date.now().toString(),
      title: dreamTitle,
      description: dreamDesc,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString().slice(0, 5),
      sleepDuration: sleepHrs,
      isNightmare,
      isLucid,
      isRecurring,
      emotions: selectedEmotions,
      symbols: selectedSymbols,
    };

    setDreamHistory([newLog, ...dreamHistory]);
    setActiveTab('analysis');
  };

  const currentAnalysisSymbols = selectedSymbols.map(s => KNOWLEDGE_BASE[s]).filter(Boolean);

  const moodScore = getMoodScore(selectedEmotions);
  const spiritualLevel = getSpiritualLevel(selectedSymbols);

  const symbolCounts = dreamHistory.reduce((acc, log) => {
    log.symbols.forEach(sym => { acc[sym] = (acc[sym] || 0) + 1; });
    return acc;
  }, {} as Record<string, number>);
  
  const topSymbols = Object.entries(symbolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => KNOWLEDGE_BASE[id]?.symbol || id);

  const avgSleep = dreamHistory.length 
    ? (dreamHistory.reduce((acc, log) => acc + log.sleepDuration, 0) / dreamHistory.length).toFixed(1) 
    : '0';

  const nightmareRatio = dreamHistory.length
    ? Math.round((dreamHistory.filter(l => l.isNightmare).length / dreamHistory.length) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10 relative overflow-hidden">
      {/* Disclaimer Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 backdrop-blur-md">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <p className="font-bold text-amber-300">Educational & Interpretive Purpose Only</p>
          <p>
            Dream analysis is subjective and varies across cultures, psychology, and sleep science. This platform provides comparative educational frameworks and <strong>never predicts future events, guarantees outcomes, or replaces medical/psychological advice</strong>.
          </p>
        </div>
      </motion.div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <CloudMoon className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-wider uppercase font-mono">Multi-Perspective Knowledge System</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Dream Engine</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Analyze dream symbolism through psychological frameworks, sleep science, and 6 diverse classical traditions.
          </p>
        </motion.div>

        {/* Export Report Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const htmlContent = `
              <!DOCTYPE html>
              <html>
              <head>
                <title>ASTRO360 Dream Analysis Report</title>
                <style>
                  body { font-family: system-ui, sans-serif; padding: 40px; color: #0f172a; line-height: 1.6; }
                  .card { border: 1px solid #e2e8f0; padding: 15px; border-radius: 10px; margin-bottom: 15px; background: #faf5ff; }
                  h1 { color: #6b21a8; border-bottom: 2px solid #e9d5ff; padding-bottom: 10px; }
                </style>
              </head>
              <body>
                <h1>🌙 ASTRO360 Dream Interpretation & Subconscious Analysis</h1>
                <p><strong>Dream Title:</strong> ${dreamTitle || 'Untitled Dream Record'}</p>
                <p><strong>Dominant Emotions:</strong> ${selectedEmotions.join(', ')}</p>
                ${currentAnalysisSymbols.map(sym => `
                  <div class="card">
                    <h3 style="margin-top:0; color:#581c87;">${sym.symbol}</h3>
                    <p><strong>Psychological Meaning:</strong> ${sym.psychological}</p>
                    <p><strong>Sleep & Neurological Science:</strong> ${sym.sleepScience}</p>
                  </div>
                `).join('')}
              </body>
              </html>
            `;
            exportUniversalPdf(htmlContent, `ASTRO360_Dream_Analysis_${(dreamTitle || 'Record').replace(/\s+/g, '_')}`);
          }}
          className="px-5 py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 hover:border-purple-500/60 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Full Report</span>
        </motion.button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl w-full overflow-x-auto custom-scrollbar relative z-10">
        {[
          { id: 'log', label: '1. Record', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'analysis', label: '2. Analysis', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'comparison', label: '3. Compare', icon: <Scale className="w-4 h-4" /> },
          { id: 'science', label: '4. Science', icon: <Brain className="w-4 h-4" /> },
          { id: 'trends', label: '5. History', icon: <BarChart2 className="w-4 h-4" /> },
          { id: 'classification', label: '6. Sunnah', icon: <Moon className="w-4 h-4" /> },
          { id: 'lucid', label: '7. Lucid Guide', icon: <Eye className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-medium text-xs flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {/* TAB 1: RECORD */}
        {activeTab === 'log' && (
          <motion.form key="log" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSaveDream} className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-purple-400" /> Record Dream Experience
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Dream Title</label>
                <input
                  type="text"
                  required
                  value={dreamTitle}
                  onChange={(e) => setDreamTitle(e.target.value)}
                  placeholder="e.g. Soaring over ocean waters..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Sleep Duration ({sleepHrs} hours)</label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={sleepHrs}
                  onChange={(e) => setSleepHrs(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 mt-4"
                />
              </div>
            </div>

            <div className="space-y-2 relative z-10 mb-6">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Full Dream Narrative</label>
                <span className="text-[10px] font-mono px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Auto-Extracts Symbols
                </span>
              </div>
              <textarea
                required
                rows={5}
                value={dreamDesc}
                onChange={(e) => handleDescChange(e.target.value)}
                placeholder="Describe the events, feelings, and objects..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6 relative z-10">
              <label className="flex items-center gap-2 cursor-pointer group/cb">
                <input type="checkbox" checked={isNightmare} onChange={(e) => setIsNightmare(e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500 focus:ring-offset-slate-900 cursor-pointer transition-colors" />
                <span className="text-xs text-slate-300 group-hover/cb:text-rose-400 transition-colors">Nightmare</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group/cb">
                <input type="checkbox" checked={isLucid} onChange={(e) => setIsLucid(e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900 cursor-pointer transition-colors" />
                <span className="text-xs text-slate-300 group-hover/cb:text-cyan-400 transition-colors">Lucid Dream</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group/cb">
                <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-purple-500 focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer transition-colors" />
                <span className="text-xs text-slate-300 group-hover/cb:text-purple-400 transition-colors">Recurring</span>
              </label>
            </div>

            <div className="space-y-3 mb-6 relative z-10">
              <label className="text-xs font-semibold text-slate-300">Emotions Felt</label>
              <div className="flex flex-wrap gap-2">
                {emotionList.map((emo) => (
                  <button
                    key={emo}
                    type="button"
                    onClick={() => handleToggleEmotion(emo)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      selectedEmotions.includes(emo)
                        ? 'bg-purple-500/30 text-white border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                        : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border-white/5'
                    }`}
                  >
                    {emo}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-8 relative z-10">
              <label className="text-xs font-semibold text-slate-300">Symbols (Auto-selected or click to add)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(KNOWLEDGE_BASE).map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => handleToggleSymbol(sym.id)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                      selectedSymbols.includes(sym.id)
                        ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.15)]'
                        : 'bg-slate-950/50 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {sym.symbol}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 relative z-10"
            >
              <Sparkles className="w-5 h-5" />
              <span>Analyze Dream</span>
            </motion.button>
          </motion.form>
        )}

        {/* TAB 2: ANALYSIS */}
        {activeTab === 'analysis' && (
          <motion.div key="analysis" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-purple-500/20 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Dream Mood Score</h4>
                  <p className="text-xs text-slate-400">Based on emotional resonance</p>
                </div>
                <div className={`text-3xl font-bold ${moodScore > 75 ? 'text-emerald-400' : moodScore > 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {moodScore}<span className="text-sm text-slate-500">/100</span>
                </div>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-cyan-500/20 backdrop-blur-md flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Spiritual Significance</h4>
                  <p className="text-xs text-slate-400">Archetypal density</p>
                </div>
                <div className="text-xl font-bold text-cyan-400">
                  {spiritualLevel}
                </div>
              </div>
            </motion.div>

            {currentAnalysisSymbols.map((item, idx) => (
              <motion.div key={item.id} variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 rounded-l-3xl" />
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Tag className="w-6 h-6 text-amber-400" /> {item.symbol}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3">
                      <Brain className="w-4 h-4" /> Psychology
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.psychological}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3">
                      <Activity className="w-4 h-4" /> Sleep Science
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.sleepScience}</p>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-t border-white/5 pt-6">
                  Classical Traditions
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Islamic', data: item.islamic, color: 'emerald' },
                    { title: 'Christian', data: item.christian, color: 'blue' },
                    { title: 'Hindu', data: item.hindu, color: 'amber' },
                    { title: 'Buddhist', data: item.buddhist, color: 'purple' },
                    { title: 'Chinese', data: item.chinese, color: 'rose' },
                    { title: 'Greek', data: item.greek, color: 'teal' }
                  ].map((trad) => (
                    <div key={trad.title} className={`p-4 rounded-2xl bg-${trad.color}-500/5 border border-${trad.color}-500/20 hover:bg-${trad.color}-500/10 transition-colors flex flex-col justify-between`}>
                      <div>
                        <div className={`text-xs font-bold text-${trad.color}-300 mb-2`}>{trad.title} Tradition</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{trad.data.text}</p>
                      </div>
                      <p className={`text-[10px] font-mono text-${trad.color}-400/60 mt-3 pt-2 border-t border-${trad.color}-500/10 truncate`}>
                        Ref: {trad.data.source}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {currentAnalysisSymbols.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No symbols selected. Go back to Record and select symbols to analyze.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: COMPARE */}
        {activeTab === 'comparison' && (
          <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/40 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Scale className="w-6 h-6 text-amber-400" /> Symbol Matrix
            </h3>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-800/80 text-white">
                  <tr>
                    <th className="p-4 font-bold">Symbol</th>
                    <th className="p-4 font-bold text-cyan-300">Science</th>
                    <th className="p-4 font-bold text-emerald-300">Islamic</th>
                    <th className="p-4 font-bold text-blue-300">Christian</th>
                    <th className="p-4 font-bold text-amber-300">Hindu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {currentAnalysisSymbols.map(sym => (
                    <tr key={sym.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-white whitespace-nowrap">{sym.symbol}</td>
                      <td className="p-4 text-xs text-slate-300 min-w-[200px]">{sym.sleepScience}</td>
                      <td className="p-4 text-xs text-slate-300 min-w-[200px]">{sym.islamic.text}</td>
                      <td className="p-4 text-xs text-slate-300 min-w-[200px]">{sym.christian.text}</td>
                      <td className="p-4 text-xs text-slate-300 min-w-[200px]">{sym.hindu.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 4: SCIENCE */}
        {activeTab === 'science' && (
          <motion.div key="science" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={itemVariants} className="bg-slate-900/40 p-8 rounded-3xl border border-cyan-500/20 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Brain className="w-6 h-6 text-cyan-400" /> Sleep Neuroscience
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <h4 className="font-bold text-cyan-300 mb-2 flex items-center gap-2"><Activity className="w-4 h-4"/> REM Sleep Cycle</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Dreams occur primarily in REM (Rapid Eye Movement) sleep, which cycles every 90 minutes. The amygdala (emotion) is highly active, while the prefrontal cortex (logic) is suppressed, leading to vivid, bizarre narratives.</p>
                  </div>
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <h4 className="font-bold text-indigo-300 mb-2 flex items-center gap-2"><Clock className="w-4 h-4"/> Circadian Rhythm</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Melatonin peaks during the night, regulating sleep architecture. Disrupted rhythms can lead to REM rebound—intense, extended dreaming periods when sleep is finally obtained.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <h4 className="font-bold text-purple-300 mb-2 flex items-center gap-2"><Layers className="w-4 h-4"/> Memory Consolidation</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">The hippocampus replays daily events, transferring them to long-term memory in the cortex. Dreams are the conscious byproduct of this data sorting process.</p>
                  </div>
                  <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <h4 className="font-bold text-emerald-400 mb-2">Tips for Dream Recall</h4>
                    <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                      <li>Keep a journal directly beside your bed.</li>
                      <li>Write immediately upon waking before moving.</li>
                      <li>Wake up naturally without a jarring alarm.</li>
                      <li>Set an intention to remember before sleeping.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* TAB 5: TRENDS */}
        {activeTab === 'trends' && (
          <motion.div key="trends" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/10">
                <div className="text-sm text-slate-400 mb-1">Total Logs</div>
                <div className="text-3xl font-bold text-white">{dreamHistory.length}</div>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/10">
                <div className="text-sm text-slate-400 mb-1">Avg Sleep</div>
                <div className="text-3xl font-bold text-cyan-400">{avgSleep}h</div>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/10">
                <div className="text-sm text-slate-400 mb-1">Nightmares</div>
                <div className="text-3xl font-bold text-rose-400">{nightmareRatio}%</div>
              </div>
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-white/10">
                <div className="text-sm text-slate-400 mb-1">Lucid Dreams</div>
                <div className="text-3xl font-bold text-purple-400">
                  {dreamHistory.length ? Math.round((dreamHistory.filter(l => l.isLucid).length / dreamHistory.length) * 100) : 0}%
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-900/40 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-white mb-4">Most Common Symbols</h4>
              <div className="flex flex-wrap gap-3">
                {topSymbols.length ? topSymbols.map(sym => (
                  <span key={sym} className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30 font-medium">
                    {sym}
                  </span>
                )) : <span className="text-slate-500 text-sm">No data yet</span>}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-900/40 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-white mb-6">Dream Timeline</h4>
              <div className="space-y-4">
                {dreamHistory.map(log => (
                  <div key={log.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/10 transition-colors">
                    <div>
                      <h5 className="font-bold text-white">{log.title}</h5>
                      <p className="text-xs text-slate-400">{log.date} • {log.sleepDuration}h sleep</p>
                    </div>
                    <div className="flex gap-2">
                      {log.isNightmare && <span className="px-2 py-1 bg-rose-500/20 text-rose-400 rounded text-[10px] uppercase font-bold">Nightmare</span>}
                      {log.isLucid && <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-[10px] uppercase font-bold">Lucid</span>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* TAB 6: SUNNAH */}
        {activeTab === 'classification' && (
          <motion.div key="sunnah" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-900/40 p-8 rounded-3xl border border-emerald-500/20 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <Moon className="w-6 h-6" /> Islamic Sleep & Dream Protocol
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white mb-2">1. Ruya (True Dream)</h4>
                <p className="text-sm text-slate-300">From Allah. Clear, concise, and brings good news or a specific warning.</p>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white mb-2">2. Hulum (Nightmare)</h4>
                <p className="text-sm text-slate-300">From Shaytan. Meant to cause fear or sadness. Should be ignored and not shared.</p>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="font-bold text-white mb-2">3. Nafs (Self-Talk)</h4>
                <p className="text-sm text-slate-300">From the subconscious. Processing daily events, fears, or desires.</p>
              </div>
            </div>

            <h4 className="font-bold text-white mb-4 border-t border-white/10 pt-6">Sunnah Sleep Etiquette</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-400" /> Sleep on the right side.</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-400" /> Perform Wudu (ablution) before bed.</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-400" /> Recite Ayatul Kursi and the last two verses of Surah Baqarah.</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-400" /> Dust the bed three times.</li>
            </ul>
          </motion.div>
        )}

        {/* TAB 7: LUCID GUIDE */}
        {activeTab === 'lucid' && (
          <motion.div key="lucid" variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={itemVariants} className="bg-slate-900/40 p-8 rounded-3xl border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Eye className="w-64 h-64 text-cyan-500" />
              </div>
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <Eye className="w-8 h-8 text-cyan-400" /> Lucid Dreaming Protocol
                </h3>
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${timerActive ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30'}`}
                >
                  {timerActive ? 'Stop Reality Check Timer' : 'Start Reality Check Timer (1hr)'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {[
                  { title: 'Reality Testing', desc: 'Ask "Am I dreaming?" 10x a day. Push your finger through your palm or read text twice.', step: 1 },
                  { title: 'WBTB (Wake Back To Bed)', desc: 'Wake up after 5 hours of sleep. Stay awake for 20 mins, then go back to sleep with intention.', step: 2 },
                  { title: 'MILD Technique', desc: 'Mnemonic Induction: As you fall asleep, repeat "I will remember that I am dreaming."', step: 3 },
                  { title: 'Dream Journaling', desc: 'Crucial for recall. Write down everything immediately upon waking to strengthen memory bridges.', step: 4 }
                ].map((tech) => (
                  <div key={tech.step} className="p-6 bg-slate-800/50 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                      {tech.step}
                    </div>
                    <h4 className="font-bold text-white mb-2">{tech.title}</h4>
                    <p className="text-sm text-slate-300">{tech.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-2xl relative z-10">
                <h4 className="font-bold text-purple-300 mb-2">Scientific Benefits</h4>
                <p className="text-sm text-slate-300">Lucid dreaming allows for conscious exploration of the subconscious. It is clinically used for nightmare resolution (Imagery Rehearsal Therapy), motor skill rehearsal, and enhancing creative problem-solving abilities by tapping directly into REM associative networks.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
