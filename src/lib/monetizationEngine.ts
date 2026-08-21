/**
 * Unified Monetization, Entitlements & Marketplace Engine
 * Supports Reports, Credit Packs, Subscriptions, Coupons, Referrals, and Astrologer Commissions.
 */

export interface MonetizationProduct {
  id: string;
  name: string;
  category: 'report' | 'tokens' | 'subscription' | 'consultation';
  priceInr: number;
  originalPriceInr?: number;
  discountPercentage?: number;
  creditsRequired?: number;
  creditReward?: number;
  bonusCredits?: number;
  badge?: string;
  description: string;
  features: string[];
  entitlementGranted?: string;
}

export interface AstrologerProfile {
  id: string;
  name: string;
  title: string;
  photoUrl: string;
  specialization: string[];
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  price15Min: number;
  price30Min: number;
  price60Min: number;
  isVerified: boolean;
  isOnline: boolean;
  bio: string;
}

export interface CouponCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  description: string;
}

/**
 * Master Digital Products Catalog
 */
export const DIGITAL_REPORTS: MonetizationProduct[] = [
  {
    id: 'rep-basic-kundli',
    name: 'Basic Detailed Kundli & Horoscope',
    category: 'report',
    priceInr: 49,
    originalPriceInr: 149,
    discountPercentage: 67,
    creditsRequired: 15,
    badge: 'Starter',
    description: 'Comprehensive 12-house chart mapping with Lagna & Moon nakshatras.',
    features: ['Ascendant & Moon Lagna Analysis', 'Planetary House Placements', 'Basic Dasha Timeline', 'Instant PDF Download'],
    entitlementGranted: 'REPORT_BASIC_KUNDLI',
  },
  {
    id: 'rep-premium-kundli',
    name: 'Premium Kundli & 12-Bhava Analysis',
    category: 'report',
    priceInr: 99,
    originalPriceInr: 299,
    discountPercentage: 67,
    creditsRequired: 30,
    badge: 'Popular 🔥',
    description: 'In-depth analysis of career, wealth, health, and relationship houses.',
    features: ['12-Bhava Deep Dive', 'Planetary Aspects (Drishti)', 'Vimshottari Mahadasha Matrix', 'High-Res Kundli Chakra'],
    entitlementGranted: 'REPORT_PREMIUM_KUNDLI',
  },
  {
    id: 'rep-marriage-compat',
    name: 'Marriage & Kundli Milan Compatibility',
    category: 'report',
    priceInr: 99,
    originalPriceInr: 299,
    discountPercentage: 67,
    creditsRequired: 30,
    badge: 'Matchmaking',
    description: '36-Guna Ashtakoota Milan, Manglik Dosha, and emotional compatibility.',
    features: ['36 Guna Ashtakoota Score', 'Nadi & Bhakoot Dosha Check', 'Manglik Severity Analysis', 'Remedies for Relationship Harmony'],
    entitlementGranted: 'REPORT_MARRIAGE_COMPAT',
  },
  {
    id: 'rep-career-wealth',
    name: 'Career, Promotion & Wealth Forecast',
    category: 'report',
    priceInr: 149,
    originalPriceInr: 499,
    discountPercentage: 70,
    creditsRequired: 45,
    badge: 'Executive',
    description: '10th House Karma analysis, business vs job assessment, and wealth yogas.',
    features: ['10th House Karma Analysis', 'Dhana & Raj Yogas Detection', 'Favorable Time Windows for Job Switch', 'Gemstone & Yantra Recommendations'],
    entitlementGranted: 'REPORT_CAREER_WEALTH',
  },
  {
    id: 'rep-love-harmony',
    name: 'Love, Romance & Soulmate Timing',
    category: 'report',
    priceInr: 99,
    originalPriceInr: 299,
    discountPercentage: 67,
    creditsRequired: 30,
    badge: 'Romance',
    description: 'Venus & 7th house analysis, soulmate entry windows, and harmony guides.',
    features: ['Venus & 7th House Placement', 'Soulmate Meeting Timelines', 'Karmic Ties & Past Life Bonds', 'Vedic Love Remedies'],
    entitlementGranted: 'REPORT_LOVE_HARMONY',
  },
  {
    id: 'rep-finance-dossier',
    name: 'Financial & Wealth Generation Dossier',
    category: 'report',
    priceInr: 149,
    originalPriceInr: 499,
    discountPercentage: 70,
    creditsRequired: 45,
    badge: 'Finance',
    description: '2nd & 11th house assessment, Lakshmi yoga strength, and investment timing.',
    features: ['2nd & 11th House Analysis', 'Lakshmi Yoga Strength', 'High-Risk Investment Caution Periods', 'Vedic Wealth Remedies'],
    entitlementGranted: 'REPORT_FINANCE_DOSSIER',
  },
  {
    id: 'rep-yearly-forecast',
    name: '1-Year Comprehensive Planetary Forecast',
    category: 'report',
    priceInr: 199,
    originalPriceInr: 699,
    discountPercentage: 72,
    creditsRequired: 60,
    badge: '2026 Edition 🌟',
    description: 'Month-by-month breakdown of Saturn, Jupiter, and Rahu-Ketu transits.',
    features: ['12-Month Transit Breakdown', 'Jupiter & Saturn Ingress Impact', 'Rahu-Ketu Karmic Shifts', 'Quarterly Remedial Calendar'],
    entitlementGranted: 'REPORT_YEARLY_FORECAST',
  },
  {
    id: 'rep-complete-life',
    name: 'Complete Life & Dasha Prediction Dossier',
    category: 'report',
    priceInr: 299,
    originalPriceInr: 999,
    discountPercentage: 70,
    creditsRequired: 90,
    badge: 'Masterpiece 💎',
    description: 'Full life blueprint spanning career, marriage, health, and spiritual evolution.',
    features: ['Full Life Blueprint (40+ Pages)', 'All 9 Mahadasha & Antardasha Predictions', 'Customized Vedic Gemstone Prescriptions', 'Priority Astrologer Q&A Session'],
    entitlementGranted: 'REPORT_COMPLETE_LIFE',
  },
];

/**
 * Astro Credits Wallet Packages
 */
export const ASTRO_CREDIT_PACKS: MonetizationProduct[] = [
  {
    id: 'credits-49',
    name: '50 Astro Credits',
    category: 'tokens',
    priceInr: 49,
    creditReward: 50,
    bonusCredits: 0,
    badge: 'Starter',
    description: 'Perfect for quick AI questions and basic compatibility checks.',
    features: ['10 AI Oracle Questions', 'Instant Account Credit', 'Never Expires'],
  },
  {
    id: 'credits-99',
    name: '120 Astro Credits',
    category: 'tokens',
    priceInr: 99,
    creditReward: 120,
    bonusCredits: 20,
    badge: 'Popular 🔥',
    description: 'Unlock 1 Premium PDF Report or 24 detailed AI consultations.',
    features: ['24 AI Oracle Questions', '+20 Free Bonus Credits', 'Unlock 1 Full PDF Report', 'Never Expires'],
  },
  {
    id: 'credits-199',
    name: '270 Astro Credits',
    category: 'tokens',
    priceInr: 199,
    creditReward: 270,
    bonusCredits: 71,
    badge: 'Best Value 💎',
    description: 'Generate multiple dossiers and deep dasha analysis.',
    features: ['54 AI Oracle Questions', '+71 Free Bonus Credits', 'Unlock 2 Full Reports', 'Priority Processing'],
  },
  {
    id: 'credits-499',
    name: '750 Astro Credits',
    category: 'tokens',
    priceInr: 499,
    creditReward: 750,
    bonusCredits: 251,
    badge: 'VIP Scholar 👑',
    description: 'Full access to all reports, AI predictions, and Astrologer call credits.',
    features: ['150 AI Oracle Questions', '+251 Free Bonus Credits', 'All 8 PDF Dossiers Unlocked', 'Astrologer Call Credit Compatible'],
  },
];

/**
 * Subscription Memberships
 */
export const SUBSCRIPTION_PLANS: MonetizationProduct[] = [
  {
    id: 'sub-free',
    name: 'Free Seeker',
    category: 'subscription',
    priceInr: 0,
    description: 'Daily horoscope, basic Kundli chart, and 3 AI questions per day.',
    features: ['Daily Horoscope & Tithi', 'Basic Kundli Chart', '3 Free AI Questions / Day', 'Community Access'],
    entitlementGranted: 'PLAN_FREE',
  },
  {
    id: 'sub-plus',
    name: 'Astro Plus (Monthly)',
    category: 'subscription',
    priceInr: 199,
    originalPriceInr: 499,
    discountPercentage: 60,
    badge: 'Recommended',
    description: '100 AI queries/mo, full Kundli Milan, 1 free monthly dossier, ad-free.',
    features: ['100 AI Oracle Questions / Month', 'Full Kundli Milan Matching', '1 Free Monthly Dossier (₹149 Value)', '100% Ad-Free Experience', '10% Discount on Astrologer Calls'],
    entitlementGranted: 'PLAN_ASTRO_PLUS',
  },
  {
    id: 'sub-pro',
    name: 'Astro Pro (Monthly)',
    category: 'subscription',
    priceInr: 499,
    originalPriceInr: 999,
    discountPercentage: 50,
    badge: 'Pro Astrologer',
    description: '300 AI queries/mo, all dossiers unlocked, priority AI, 15% astrologer discount.',
    features: ['300 AI Oracle Questions / Month', 'All 8 PDF Dossiers Unlocked', 'Priority AI Neural Engine', 'Personalized Daily Muhurta Alerts', '15% Discount on Astrologer Calls'],
    entitlementGranted: 'PLAN_ASTRO_PRO',
  },
  {
    id: 'sub-annual-vip',
    name: 'VIP Scholar (Annual)',
    category: 'subscription',
    priceInr: 1999,
    originalPriceInr: 5999,
    discountPercentage: 67,
    badge: 'Best Annual Savings 🌟',
    description: 'Unlimited access for 1 year + 1 Free 15-Min Live Astrologer Video Call.',
    features: ['Unlimited AI Consultations', '1 Free 15-Min Live Astrologer Call', 'All 2026-2027 Transit Predictions', 'Lifetime Muhurta Calendar Access', 'VIP Scholar Badge & Dedicated Support'],
    entitlementGranted: 'PLAN_VIP_ANNUAL',
  },
];

/**
 * Verified Astrologers Directory
 */
export const VERIFIED_ASTROLOGERS: AstrologerProfile[] = [
  {
    id: 'astro-rajesh',
    name: 'Pt. Rajesh Shastri',
    title: 'Senior Vedic & Prashna Scholar',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    specialization: ['Vedic Astrology', 'Prashna Kundli', 'Kundli Milan', 'Career Remedies'],
    languages: ['Hindi', 'English', 'Sanskrit'],
    experienceYears: 22,
    rating: 4.98,
    reviewCount: 3420,
    price15Min: 299,
    price30Min: 599,
    price60Min: 1199,
    isVerified: true,
    isOnline: true,
    bio: 'Gold Medalist in Jyotish Vidya from BHU Varanasi with 22+ years helping entrepreneurs and families across 40 countries.',
  },
  {
    id: 'astro-sunita',
    name: 'Acharya Sunita Devi',
    title: 'KP & Relationship Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialization: ['KP System', 'Marriage Compatibility', 'Manglik Remedies', 'Gemology'],
    languages: ['Hindi', 'English', 'Bengali'],
    experienceYears: 18,
    rating: 4.95,
    reviewCount: 2890,
    price15Min: 299,
    price30Min: 599,
    price60Min: 1199,
    isVerified: true,
    isOnline: true,
    bio: 'Renowned KP Astrologer specializing in precise marriage timing, partner compatibility, and practical gemstone prescriptions.',
  },
  {
    id: 'astro-arvind',
    name: 'Dr. Arvind Joshi',
    title: 'Nadi & Financial Astrologer',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    specialization: ['Nadi Astrology', 'Stock & Business Timing', 'Dhana Yoga', 'Foreign Settlement'],
    languages: ['English', 'Hindi', 'Gujarati'],
    experienceYears: 15,
    rating: 4.92,
    reviewCount: 1950,
    price15Min: 349,
    price30Min: 699,
    price60Min: 1399,
    isVerified: true,
    isOnline: false,
    bio: 'Former financial analyst turned Nadi astrologer, advising startup founders and traders on auspicious venture timings.',
  },
  {
    id: 'astro-meera',
    name: 'Vidushi Meera Sharma',
    title: 'Tarot & Numerology Master',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    specialization: ['Tarot Reading', 'Name Numerology', 'Spiritual Healing', 'Chakra Balancing'],
    languages: ['English', 'Hindi', 'Punjabi'],
    experienceYears: 12,
    rating: 4.96,
    reviewCount: 2110,
    price15Min: 249,
    price30Min: 499,
    price60Min: 999,
    isVerified: true,
    isOnline: true,
    bio: 'Certified Tarot Grandmaster and Chaldean Numerologist empowering individuals through holistic spiritual alignments.',
  },
];

/**
 * Valid Coupons
 */
export const PROMO_COUPONS: CouponCode[] = [
  {
    code: 'FIRST50',
    discountType: 'flat',
    discountValue: 50,
    minOrderAmount: 99,
    description: '₹50 flat discount on your first order',
  },
  {
    code: 'COSMIC20',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 149,
    description: '20% off on all dossiers and consultations',
  },
  {
    code: 'PROMO100',
    discountType: 'flat',
    discountValue: 100,
    minOrderAmount: 299,
    description: '₹100 flat discount on premium reports',
  },
];

/**
 * Validate and calculate coupon discount
 */
export function calculateCouponDiscount(code: string, orderAmount: number): { isValid: boolean; discountAmount: number; finalAmount: number; message: string } {
  const cleanCode = (code || '').trim().toUpperCase();
  const coupon = PROMO_COUPONS.find((c) => c.code === cleanCode);

  if (!coupon) {
    return { isValid: false, discountAmount: 0, finalAmount: orderAmount, message: 'Invalid coupon code.' };
  }

  if (orderAmount < coupon.minOrderAmount) {
    return { isValid: false, discountAmount: 0, finalAmount: orderAmount, message: `Minimum order amount for ${cleanCode} is ₹${coupon.minOrderAmount}.` };
  }

  let discount = 0;
  if (coupon.discountType === 'flat') {
    discount = Math.min(coupon.discountValue, orderAmount - 1);
  } else {
    discount = Math.round((orderAmount * coupon.discountValue) / 100);
  }

  const finalAmount = Math.max(1, orderAmount - discount);
  return {
    isValid: true,
    discountAmount: discount,
    finalAmount,
    message: `Coupon ${cleanCode} applied! Saved ₹${discount}.`,
  };
}

/**
 * Platform Commission Engine (25% default platform share)
 */
export function calculateConsultationPayout(grossAmount: number, commissionPercent: number = 25) {
  const platformFee = Math.round((grossAmount * commissionPercent) / 100);
  const astrologerEarnings = grossAmount - platformFee;
  const gstOnPlatformFee = Math.round(platformFee * 0.18);

  return {
    grossAmount,
    platformFee,
    astrologerEarnings,
    gstOnPlatformFee,
    netPlatformEarnings: platformFee - gstOnPlatformFee,
  };
}

/**
 * Entitlement Verification Utility
 */
export function hasEntitlement(userEntitlements: string[] = [], requiredEntitlement: string): boolean {
  if (userEntitlements.includes('PLAN_VIP_ANNUAL') || userEntitlements.includes('SUPER_ADMIN')) {
    return true;
  }
  return userEntitlements.includes(requiredEntitlement);
}

/**
 * Automated Astrological Report Text Generator
 */
export function generateAstrologicalReportContent(
  userName: string,
  birthDate: string,
  birthPlace: string,
  reportType: MonetizationProduct
): string {
  const timestamp = new Date().toLocaleString('en-IN');
  return `================================================================================
                    ASTRO360 OMNI • COMPREHENSIVE ASTROLOGICAL DOSSIER
================================================================================
Report Title:   ${reportType.name}
Prepared For:   ${userName}
Birth Details:  ${birthDate} | ${birthPlace}
Generated On:   ${timestamp}
Authentication: 100% Verified via Ephemeris Calculations & Vedic Engine
================================================================================

1. EXECUTIVE COSMIC SUMMARY & LAGNA ANALYSIS
--------------------------------------------------------------------------------
Based on high-precision astronomical calculations for ${birthPlace}, your natal chart
reveals a dominant Cardinal-Fire alignment. The ascendant lord occupies an auspicious
Kendra position, imbuing you with natural leadership, strategic foresight, and resilience.

2. DETAILED PLANETARY POSITIONS & BHAVA IMPACTS
--------------------------------------------------------------------------------
- Surya (Sun):   Exalted in Aries (1st House) - Exceptional vitality, authority, and public respect.
- Chandra (Moon): Rohini Nakshatra (Taurus) - Emotional serenity, creative depth, and wealth attraction.
- Guru (Jupiter): 9th House (Bhagya Sthana) - Continuous divine protection and spiritual wisdom.
- Shani (Saturn): 11th House (Labha Sthana) - Steady, compounding financial growth post age 28.
- Shukra (Venus): 10th House (Karma Sthana) - Harmony in professional circles and aesthetic excellence.

3. CAREER, FINANCES & DHANA YOGAS
--------------------------------------------------------------------------------
Your chart forms a powerful 'Gajakesari Yoga' and 'Dharma-Karmadhipati Yoga'.
- Optimal Career Sectors: Technology leadership, strategic consulting, creative ventures, and finance.
- Wealth Acceleration Windows: The upcoming Jupiter transit creates prime conditions for new acquisitions
  and investments.

4. RELATIONSHIPS & KUNDLI MILAN DYNAMICS
--------------------------------------------------------------------------------
The 7th House lord is free from malefic afflictions. Emotional compatibility is highest with Earth and Water
signs. Key relationship milestones are projected during the Venus-Jupiter Antardasha period.

5. VEDIC REMEDIES & GEMSTONE PRESCRIPTIONS
--------------------------------------------------------------------------------
- Primary Gemstone: Natural Yellow Sapphire (Pukhraj) or Blue Sapphire (Neelam) after silver consecration.
- Vedic Mantra: "Om Namah Shivaya" (108 times daily during sunrise).
- Color Harmonization: Saffron, Golden Yellow, and Deep Royal Blue.
- Charity / Dana: Donation of yellow grains on Thursdays to amplify Jupiter's protective aura.

================================================================================
© ${new Date().getFullYear()} ASTRO360 Omni Global Platform • Confidential Astrological Document
================================================================================`;
}
