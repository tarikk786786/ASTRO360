/**
 * ASTRO360 Cashfree Monetization & Payment Engine
 * Powers subscriptions, impulse report purchases, astrologer bookings, and instant UPI checkout.
 */

export interface MonetizationItem {
  id: string;
  name: string;
  category: 'subscription' | 'report' | 'consultation' | 'tokens';
  priceInr: number;
  originalPriceInr?: number;
  discountPercentage?: number;
  badge?: string;
  description: string;
  features: string[];
}

export const MONETIZATION_CATALOG: MonetizationItem[] = [
  // 1. SUBSCRIPTIONS
  {
    id: 'pro-monthly',
    name: 'Cosmic Pro (Monthly)',
    category: 'subscription',
    priceInr: 299,
    originalPriceInr: 599,
    discountPercentage: 50,
    badge: 'Popular',
    description: 'Full access to all 16 Divisional Vargas, Dasha timelines, and 24/7 AI Astrological Oracle.',
    features: [
      'All 16 Divisional Kundlis (D1 to D60)',
      '120-Year Vimshottari Mahadasha Timeline',
      'Unlimited 24/7 AI Oracle Consultations',
      'Daily transit ingress & personalized Muhurta',
      'Executive PDF Dossier generation',
    ],
  },
  {
    id: 'pro-annual',
    name: 'Cosmic Pro (Annual VIP)',
    category: 'subscription',
    priceInr: 1999,
    originalPriceInr: 3588,
    discountPercentage: 45,
    badge: 'Best Value',
    description: '1 full year of unlimited deep charts, predictive timelines, priority AI, and 1 free Astrologer session.',
    features: [
      'Everything in Pro Monthly for 12 Months',
      '1 Free 30-Min Senior Astrologer Consultation',
      'Birth Time Rectification (BTR) Suite',
      'Astro-Cartography Relocation Matrix',
      'Priority VIP Processing Speed',
    ],
  },
  {
    id: 'lifetime-master',
    name: 'Lifetime Cosmic Master',
    category: 'subscription',
    priceInr: 4999,
    originalPriceInr: 9999,
    discountPercentage: 50,
    badge: 'Lifetime',
    description: 'One-time payment for lifetime access to all current and future 150+ astrological tools.',
    features: [
      'Lifetime Access to 150+ Astrological Engines',
      'All Future AI Model Updates & Neural Features',
      'Unlimited Executive PDF Dossiers',
      'VIP Direct Support Line',
    ],
  },

  // 2. HIGH-CONVERTING INSTANT REPORTS (Impulse Micro-buys)
  {
    id: 'report-career-wealth',
    name: '2026-2027 Career & Wealth Master Dossier',
    category: 'report',
    priceInr: 299,
    originalPriceInr: 699,
    discountPercentage: 57,
    badge: 'Top Seller',
    description: '35+ page personalized executive forecast detailing 10th house karmic yogas and wealth windows.',
    features: [
      '35+ Page Comprehensive PDF Analysis',
      'Quarterly Financial & Promotion Timing',
      'Amatyakaraka & 10th Lord Analysis',
      'Custom Wealth & Lakshmi Yantra Remedies',
    ],
  },
  {
    id: 'report-synastry-marriage',
    name: '36-Guna Marriage & Relationship Match Dossier',
    category: 'report',
    priceInr: 199,
    originalPriceInr: 499,
    discountPercentage: 60,
    badge: 'Instant Download',
    description: 'Detailed Ashta Koota analysis, Nadi Dosha check, Manglik Dosha evaluation, and mutual growth areas.',
    features: [
      '36-Point Vedic Ashta Koota Score',
      'Mangal & Nadi Dosha Deep Analysis',
      'Emotional & Psychological Synastry',
      'Relationship Longevity Remedies',
    ],
  },
  {
    id: 'report-btr-forensic',
    name: 'Forensic Birth Time Rectification (BTR) Report',
    category: 'report',
    priceInr: 349,
    originalPriceInr: 799,
    discountPercentage: 56,
    badge: 'Precision',
    description: 'Algorithmically verifies exact minute and second of birth by cross-referencing past life events with D9/D60.',
    features: [
      'Micro-level Sub-minute Rectification',
      'Cross-checks Marriage, Career & Relocation dates',
      'Updated D60 Shashtiamsa Chart',
    ],
  },
  {
    id: 'report-gemstone-remedy',
    name: 'Personalized Gemstone & Rudraksha Prescription',
    category: 'report',
    priceInr: 149,
    originalPriceInr: 399,
    discountPercentage: 62,
    description: 'Exact carat weight, auspicious finger, energization mantras, and metal settings for your birth chart.',
    features: [
      'Primary Life Stone (Bhagyaratna)',
      'Auxiliary & Health Healing Gemstones',
      'Vedic Vedic Shuddhi & Mantra Activation ritual',
    ],
  },

  // 3. 1-ON-1 ASTROLOGER CONSULTATIONS
  {
    id: 'consultation-30min',
    name: '30-Minute 1-on-1 Jyotish Consultation',
    category: 'consultation',
    priceInr: 799,
    originalPriceInr: 1499,
    discountPercentage: 46,
    description: 'Private 1-on-1 live session with a verified Vedic astrologer with 15+ years experience.',
    features: [
      '30-Min Audio / Video Live Consultation',
      'Deep Dive into 3 specific life inquiries',
      'Customized Remedial Action Plan',
      'Private recording and written recap',
    ],
  },
  {
    id: 'consultation-45min-senior',
    name: '45-Minute Senior Jyotish Master Session',
    category: 'consultation',
    priceInr: 1299,
    originalPriceInr: 2499,
    discountPercentage: 48,
    badge: 'Master Scholar',
    description: 'In-depth consultation with a 20+ year veteran scholar including Prashna Kundli and family karma.',
    features: [
      '45-Min Comprehensive Consultation',
      'Unlimited Questions across Career, Health & Family',
      'Prashna (Horary) immediate clarity check',
      'Tailored Vedic Yantras & Gemstone guidance',
    ],
  },
];

// Helper: Dynamically load Cashfree JS SDK
let cashfreeSdkPromise: Promise<any> | null = null;

export function loadCashfreeSDK(): Promise<any> {
  if (cashfreeSdkPromise) return cashfreeSdkPromise;

  cashfreeSdkPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Window undefined');
    if ((window as any).Cashfree) return resolve((window as any).Cashfree);

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).Cashfree) {
        resolve((window as any).Cashfree);
      } else {
        reject('Cashfree SDK failed to initialize');
      }
    };
    script.onerror = () => reject('Failed to load Cashfree script');
    document.body.appendChild(script);
  });

  return cashfreeSdkPromise;
}

export interface InitiateCheckoutParams {
  item: MonetizationItem;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: (orderData: any) => void;
  onFailure?: (error: any) => void;
}

export async function initiateCashfreeCheckout({
  item,
  customerName = 'Cosmic Seeker',
  customerEmail = 'seeker@astro.tarikislam.in',
  customerPhone = '9876543210',
  onSuccess,
  onFailure,
}: InitiateCheckoutParams) {
  try {
    // 1. Create Order via Serverless API
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: item.id,
        amount: item.priceInr,
        customerName,
        customerEmail,
        customerPhone,
        orderNote: `ASTRO360: ${item.name}`,
        returnUrl: `${window.location.origin}/?payment_success=true&plan_id=${item.id}&order_id={order_id}`,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success || !data.paymentSessionId) {
      throw new Error(data.error || 'Failed to initialize Cashfree payment session');
    }

    // 2. Load SDK & Launch Checkout with seamless fallback
    try {
      const Cashfree = await loadCashfreeSDK();
      const cashfree = Cashfree({
        mode: data.environment === 'sandbox' ? 'sandbox' : 'production',
      });

      const checkoutOptions = {
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_modal', // Seamless embedded checkout modal
      };

      cashfree.checkout(checkoutOptions).then((result: any) => {
        if (result.error) {
          console.warn('Cashfree modal error, fallback to paymentDetails:', result.error);
          if (onFailure) onFailure(result.error);
        }
        if (result.paymentDetails || result.redirect) {
          if (onSuccess) onSuccess(result.paymentDetails || { order_id: data.orderId });
        }
      }).catch((sdkErr: any) => {
        console.warn('SDK checkout promise caught:', sdkErr);
        // Fallback: direct window redirect to Cashfree payment session if modal fails
        if (data.paymentSessionId) {
          window.location.href = `https://payments.cashfree.com/order/#${data.paymentSessionId}`;
        }
      });
    } catch (sdkLoadErr) {
      console.warn('Cashfree SDK load fallback:', sdkLoadErr);
      if (data.paymentSessionId) {
        window.location.href = `https://payments.cashfree.com/order/#${data.paymentSessionId}`;
      }
    }

    return data;
  } catch (err: any) {
    console.error('Checkout initiation failed:', err);
    if (onFailure) onFailure(err);
    throw err;
  }
}
