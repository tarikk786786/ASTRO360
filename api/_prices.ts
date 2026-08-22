/**
 * SERVER-SIDE PRICE AUTHORITY
 *
 * Why this file exists
 * --------------------
 * `api/payment.ts` previously created Cashfree orders using `amount` taken straight
 * from the request body:
 *
 *     const { amount = 299 } = req.body || {};
 *     order_amount: Number(amount)
 *
 * Anyone could POST `{"planId":"lifetime-master","amount":1}` and receive a genuine,
 * payable Cashfree order for ₹1 that the client then treats as a lifetime purchase.
 * A price a client can choose is not a price. This table is now the only thing that
 * decides what an order costs.
 *
 * Vercel does not route files whose name starts with `_`, so this is a plain module,
 * not an endpoint.
 *
 * KNOWN DIVERGENCE IN THE THREE CLIENT CATALOGS — read before editing
 * -------------------------------------------------------------------
 * The app ships three separate, independently maintained catalogs, and they disagree
 * with each other for products that describe the same thing:
 *
 *   src/lib/monetizationEngine.ts   rep-career-wealth        ₹149
 *   src/lib/cashfreeEngine.ts       report-career-wealth     ₹299   ← same product, 2x
 *   src/lib/monetizationEngine.ts   sub-pro (Astro Pro/mo)   ₹499
 *   src/lib/cashfreeEngine.ts       pro-monthly (Cosmic Pro) ₹299   ← same tier, 0.6x
 *   src/lib/monetizationEngine.ts   sub-annual-vip           ₹1999
 *   src/lib/cashfreeEngine.ts       pro-annual               ₹1999  (these two agree)
 *
 * I have NOT silently picked a winner — that is a pricing decision, not an engineering
 * one. Every id from every catalog is listed below at the price its own catalog states,
 * so no existing screen changes price. The duplication itself is logged as a finding
 * (see DOM/BUS notes in docs/hardening/AUDIT.md); collapsing the catalogs into one is a
 * follow-up that needs your call on which number is correct.
 *
 * `api/payment.ts` compares the client's displayed amount against the value here and
 * reports a mismatch explicitly rather than quietly charging a different number than
 * the customer was shown.
 */

export type PriceCategory = 'report' | 'tokens' | 'subscription' | 'consultation';

export interface CatalogEntry {
  /** Rupees. Integer — Cashfree INR orders are whole rupees here, no paise anywhere in this app. */
  amount: number;
  label: string;
  category: PriceCategory;
  /** Entitlement string the client already expects; mirrors monetizationEngine.ts. */
  entitlement?: string;
  /** Wallet credits this purchase is worth, including bonus. Mirrors the client packs. */
  credits?: number;
  /** Which client catalog this row came from — so a future reader can find the source of truth. */
  source: 'monetizationEngine' | 'cashfreeEngine' | 'walletModal' | 'astrologerDirectory';
}

export const CATALOG: Record<string, CatalogEntry> = {
  /* ---- src/lib/monetizationEngine.ts · DIGITAL_REPORTS ---- */
  'rep-basic-kundli':     { amount:  49, label: 'Basic Detailed Kundli & Horoscope',        category: 'report', entitlement: 'REPORT_BASIC_KUNDLI',    source: 'monetizationEngine' },
  'rep-premium-kundli':   { amount:  99, label: 'Premium Kundli & 12-Bhava Analysis',       category: 'report', entitlement: 'REPORT_PREMIUM_KUNDLI',  source: 'monetizationEngine' },
  'rep-marriage-compat':  { amount:  99, label: 'Marriage & Kundli Milan Compatibility',    category: 'report', entitlement: 'REPORT_MARRIAGE_COMPAT', source: 'monetizationEngine' },
  'rep-career-wealth':    { amount: 149, label: 'Career, Promotion & Wealth Forecast',      category: 'report', entitlement: 'REPORT_CAREER_WEALTH',   source: 'monetizationEngine' },
  'rep-love-harmony':     { amount:  99, label: 'Love, Romance & Soulmate Timing',          category: 'report', entitlement: 'REPORT_LOVE_HARMONY',    source: 'monetizationEngine' },
  'rep-finance-dossier':  { amount: 149, label: 'Financial & Wealth Generation Dossier',    category: 'report', entitlement: 'REPORT_FINANCE_DOSSIER', source: 'monetizationEngine' },
  'rep-yearly-forecast':  { amount: 199, label: '1-Year Comprehensive Planetary Forecast',  category: 'report', entitlement: 'REPORT_YEARLY_FORECAST', source: 'monetizationEngine' },
  'rep-complete-life':    { amount: 299, label: 'Complete Life & Dasha Prediction Dossier', category: 'report', entitlement: 'REPORT_COMPLETE_LIFE',   source: 'monetizationEngine' },

  /* ---- src/lib/monetizationEngine.ts · ASTRO_CREDIT_PACKS (credits = reward + bonus) ---- */
  'credits-49':  { amount:  49, label: '50 Astro Credits',  category: 'tokens', credits:   50, source: 'monetizationEngine' },
  'credits-99':  { amount:  99, label: '120 Astro Credits', category: 'tokens', credits:  140, source: 'monetizationEngine' },
  'credits-199': { amount: 199, label: '270 Astro Credits', category: 'tokens', credits:  341, source: 'monetizationEngine' },
  'credits-499': { amount: 499, label: '750 Astro Credits', category: 'tokens', credits: 1001, source: 'monetizationEngine' },

  /* ---- src/lib/monetizationEngine.ts · SUBSCRIPTION_PLANS ---- */
  // sub-free is deliberately absent: a ₹0 order must never reach a payment gateway.
  // `resolveAmount` rejects it with an explicit reason instead of creating a zero order.
  'sub-plus':       { amount:  199, label: 'Astro Plus (Monthly)',  category: 'subscription', entitlement: 'PLAN_ASTRO_PLUS', source: 'monetizationEngine' },
  'sub-pro':        { amount:  499, label: 'Astro Pro (Monthly)',   category: 'subscription', entitlement: 'PLAN_ASTRO_PRO',  source: 'monetizationEngine' },
  'sub-annual-vip': { amount: 1999, label: 'VIP Scholar (Annual)',  category: 'subscription', entitlement: 'PLAN_VIP_ANNUAL', source: 'monetizationEngine' },

  /* ---- src/lib/cashfreeEngine.ts · MONETIZATION_CATALOG ---- */
  'pro-monthly':               { amount:  299, label: 'Cosmic Pro (Monthly)',                       category: 'subscription', entitlement: 'PLAN_ASTRO_PRO',  source: 'cashfreeEngine' },
  'pro-annual':                { amount: 1999, label: 'Cosmic Pro (Annual VIP)',                    category: 'subscription', entitlement: 'PLAN_VIP_ANNUAL', source: 'cashfreeEngine' },
  'lifetime-master':           { amount: 4999, label: 'Lifetime Cosmic Master',                     category: 'subscription', entitlement: 'PLAN_LIFETIME',   source: 'cashfreeEngine' },
  'report-career-wealth':      { amount:  299, label: '2026-2027 Career & Wealth Master Dossier',   category: 'report',       entitlement: 'REPORT_CAREER_WEALTH',   source: 'cashfreeEngine' },
  'report-synastry-marriage':  { amount:  199, label: '36-Guna Marriage & Relationship Dossier',    category: 'report',       entitlement: 'REPORT_MARRIAGE_COMPAT', source: 'cashfreeEngine' },
  'report-btr-forensic':       { amount:  349, label: 'Forensic Birth Time Rectification Report',   category: 'report',       entitlement: 'REPORT_BTR',             source: 'cashfreeEngine' },
  'report-gemstone-remedy':    { amount:  149, label: 'Gemstone & Rudraksha Prescription',          category: 'report',       entitlement: 'REPORT_GEMSTONE',        source: 'cashfreeEngine' },
  'consultation-30min':        { amount:  799, label: '30-Minute 1-on-1 Jyotish Consultation',      category: 'consultation', source: 'cashfreeEngine' },
  'consultation-45min-senior': { amount: 1299, label: '45-Minute Senior Jyotish Master Session',    category: 'consultation', source: 'cashfreeEngine' },

  /* ---- src/components/CosmicWalletModal.tsx · recharge packs ---- */
  'pack-199':  { amount:  199, label: 'Wallet Recharge ₹199',  category: 'tokens', credits:  220, source: 'walletModal' },
  'pack-499':  { amount:  499, label: 'Wallet Recharge ₹499',  category: 'tokens', credits:  600, source: 'walletModal' },
  'pack-999':  { amount:  999, label: 'Wallet Recharge ₹999',  category: 'tokens', credits: 1350, source: 'walletModal' },
  'pack-2499': { amount: 2499, label: 'Wallet Recharge ₹2499', category: 'tokens', credits: 3600, source: 'walletModal' },
};

/**
 * Astrologer consultations are priced by (astrologer, duration), so they cannot live in
 * a flat id table. Mirrors VERIFIED_ASTROLOGERS in src/lib/monetizationEngine.ts.
 * Accepted planId form: `astro-rajesh:30`.
 */
export const ASTROLOGER_RATES: Record<string, Record<15 | 30 | 60, number>> = {
  'astro-rajesh': { 15: 299, 30: 599, 60: 1199 },
  'astro-sunita': { 15: 299, 30: 599, 60: 1199 },
  'astro-arvind': { 15: 349, 30: 699, 60: 1399 },
  'astro-meera':  { 15: 249, 30: 499, 60:  999 },
};

/**
 * Promotional coupons. Deliberately a byte-for-byte behavioural mirror of
 * `calculateCouponDiscount` in src/lib/monetizationEngine.ts — including
 * `Math.min(value, orderAmount - 1)` for flat discounts and `Math.round` for
 * percentages — so the server arrives at the same rupee the customer was shown.
 *
 * The client copy stays where it is: it drives the "Coupon applied, saved ₹50"
 * label, which needs no round trip. It is now presentational only. This copy is
 * what actually reduces the charge.
 */
interface Coupon {
  code: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minOrderAmount: number;
}

export const COUPONS: Coupon[] = [
  { code: 'FIRST50',  discountType: 'flat',       discountValue:  50, minOrderAmount:  99 },
  { code: 'COSMIC20', discountType: 'percentage', discountValue:  20, minOrderAmount: 149 },
  { code: 'PROMO100', discountType: 'flat',       discountValue: 100, minOrderAmount: 299 },
];

export function couponDiscount(code: unknown, orderAmount: number): number {
  const clean = typeof code === 'string' ? code.trim().toUpperCase() : '';
  if (!clean) return 0;
  const coupon = COUPONS.find((c) => c.code === clean);
  if (!coupon) return 0;
  if (orderAmount < coupon.minOrderAmount) return 0;
  return coupon.discountType === 'flat'
    ? Math.min(coupon.discountValue, orderAmount - 1)
    : Math.round((orderAmount * coupon.discountValue) / 100);
}

export interface ResolvedPrice {
  ok: true;
  planId: string;
  label: string;
  category: PriceCategory;
  /** What the customer will actually be charged, after any valid coupon. */
  amount: number;
  basePrice: number;
  discount: number;
  entitlement?: string;
  credits?: number;
}

export interface RejectedPrice {
  ok: false;
  /** Machine-readable so the client can branch; safe to show to a user. */
  code: 'UNKNOWN_PLAN' | 'ZERO_PRICE' | 'MISSING_PLAN';
  reason: string;
}

/**
 * The only sanctioned way to learn what something costs.
 *
 * Fails closed: an id this table does not know is refused outright. The previous
 * `amount = 299` default meant an unrecognised or misspelled planId still produced a
 * chargeable order, which is how a typo becomes a wrong charge.
 */
export function resolveAmount(planIdRaw: unknown, couponCode?: unknown): ResolvedPrice | RejectedPrice {
  const planId = typeof planIdRaw === 'string' ? planIdRaw.trim() : '';
  if (!planId) {
    return { ok: false, code: 'MISSING_PLAN', reason: 'planId is required.' };
  }
  if (planId.length > 80) {
    return { ok: false, code: 'UNKNOWN_PLAN', reason: 'planId is not a recognised product.' };
  }

  // Astrologer consultation: `astro-<id>:<minutes>`
  if (planId.includes(':')) {
    const [astrologerId, minutesRaw] = planId.split(':');
    const minutes = Number(minutesRaw);
    const rates = ASTROLOGER_RATES[astrologerId];
    if (rates && (minutes === 15 || minutes === 30 || minutes === 60)) {
      const basePrice = rates[minutes];
      const discount = couponDiscount(couponCode, basePrice);
      return {
        ok: true,
        planId,
        label: `${minutes}-Minute Consultation (${astrologerId})`,
        category: 'consultation',
        basePrice,
        discount,
        amount: Math.max(1, basePrice - discount),
      };
    }
    return { ok: false, code: 'UNKNOWN_PLAN', reason: `Unknown consultation "${planId}".` };
  }

  const entry = CATALOG[planId];
  if (!entry) {
    return { ok: false, code: 'UNKNOWN_PLAN', reason: `Unknown product "${planId}".` };
  }
  if (entry.amount <= 0) {
    return { ok: false, code: 'ZERO_PRICE', reason: `"${planId}" is free and must not be sent to a payment gateway.` };
  }

  const discount = couponDiscount(couponCode, entry.amount);
  return {
    ok: true,
    planId,
    label: entry.label,
    category: entry.category,
    basePrice: entry.amount,
    discount,
    amount: Math.max(1, entry.amount - discount),
    entitlement: entry.entitlement,
    credits: entry.credits,
  };
}
