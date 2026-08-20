/**
 * Cashfree Payments Serverless Gateway Endpoint
 * Securely creates Cashfree orders, returns payment_session_id for UPI/Cards/NetBanking, and verifies transactions.
 */

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const env = (globalThis as any).process?.env || {};
  const appId = env.CASHFREE_APP_ID || '';
  const secretKey = env.CASHFREE_SECRET_KEY || '';
  const cashfreeEnv = env.CASHFREE_ENV || 'production';

  const baseUrl = cashfreeEnv === 'sandbox'
    ? 'https://sandbox.cashfree.com/pg'
    : 'https://api.cashfree.com/pg';

  try {
    // 1. Order Creation
    if (req.method === 'POST') {
      const { 
        planId = 'cosmic-pro-monthly',
        amount = 299,
        customerName = 'Seeker',
        customerEmail = 'seeker@astroverse.in',
        customerPhone = '9876543210',
        orderNote = 'ASTRO360 Cosmic Pro Upgrade',
        returnUrl
      } = req.body || {};

      const cleanOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const cleanCustomerId = `cust_${Date.now()}`;

      const payload = {
        order_id: cleanOrderId,
        order_amount: Number(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: cleanCustomerId,
          customer_name: customerName || 'Cosmic Seeker',
          customer_email: customerEmail || 'seeker@astro.tarikislam.in',
          customer_phone: customerPhone && customerPhone.length >= 10 ? customerPhone : '9876543210',
        },
        order_meta: {
          return_url: returnUrl || 'https://astro.tarikislam.in/?payment_status={order_status}&order_id={order_id}',
          notify_url: 'https://astro.tarikislam.in/api/payment?action=webhook',
        },
        order_note: orderNote,
        order_tags: {
          plan_id: planId,
          platform: 'ASTRO360_OMNI'
        }
      };

      const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'x-client-id': appId,
          'x-client-secret': secretKey,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Cashfree Order Creation Error:', data);
        return res.status(response.status).json({
          success: false,
          error: data?.message || 'Failed to initialize Cashfree payment order',
          details: data,
        });
      }

      return res.status(200).json({
        success: true,
        orderId: data.order_id,
        paymentSessionId: data.payment_session_id,
        orderStatus: data.order_status,
        orderAmount: data.order_amount,
        orderCurrency: data.order_currency,
        environment: cashfreeEnv,
      });
    }

    // 2. Order Verification (GET /api/payment?order_id=...)
    if (req.method === 'GET') {
      const { order_id } = req.query || {};
      if (!order_id) {
        return res.status(400).json({ error: 'order_id parameter is required' });
      }

      const response = await fetch(`${baseUrl}/orders/${order_id}`, {
        method: 'GET',
        headers: {
          'x-client-id': appId,
          'x-client-secret': secretKey,
          'x-api-version': '2023-08-01',
        },
      });

      const data = await response.json();
      return res.status(response.status).json({
        success: response.ok,
        order: data,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Payment API Exception:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal Payment Gateway Error',
    });
  }
}
