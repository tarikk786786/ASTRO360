/**
 * Cashfree Payments Serverless Gateway Endpoint
 * Supports:
 * - Direct Orders (`/pg/orders`)
 * - Shareable Payment Links (`/pg/links`)
 * - Payment Verification (`/pg/orders/:id`)
 * - Earnings & Settlement Telemetry
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
    // 1. POST Actions
    if (req.method === 'POST') {
      const { 
        action = 'create_order',
        planId = 'cosmic-pro-monthly',
        amount = 299,
        customerName = 'Seeker',
        customerEmail = 'seeker@astro.tarikislam.in',
        customerPhone = '9876543210',
        orderNote = 'ASTRO360 Cosmic Pro Upgrade',
        linkPurpose = 'Astrological Consultation & Kundli Report',
        returnUrl
      } = req.body || {};

      // Action A: Create Shareable Payment Link (/pg/links)
      if (action === 'create_payment_link') {
        const linkId = `link_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const linkPayload = {
          link_id: linkId,
          link_amount: Number(amount),
          link_currency: 'INR',
          link_purpose: linkPurpose || orderNote,
          customer_details: {
            customer_name: customerName || 'Cosmic Seeker',
            customer_email: customerEmail || 'seeker@astro.tarikislam.in',
            customer_phone: customerPhone && customerPhone.length >= 10 ? customerPhone : '9876543210',
          },
          link_meta: {
            return_url: returnUrl || 'https://astro.tarikislam.in/?link_payment_success=true',
            notify_url: 'https://astro.tarikislam.in/api/payment?action=webhook',
          },
          link_notify: {
            send_sms: true,
            send_email: true,
          },
        };

        const linkRes = await fetch(`${baseUrl}/links`, {
          method: 'POST',
          headers: {
            'x-client-id': appId,
            'x-client-secret': secretKey,
            'x-api-version': '2023-08-01',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(linkPayload),
        });

        const linkData = await linkRes.json();
        if (!linkRes.ok) {
          return res.status(linkRes.status).json({
            success: false,
            error: linkData?.message || 'Failed to create Cashfree payment link',
            details: linkData,
          });
        }

        return res.status(200).json({
          success: true,
          linkId: linkData.link_id,
          linkUrl: linkData.link_url,
          linkQrCode: linkData.link_qrcode,
          linkAmount: linkData.link_amount,
          linkStatus: linkData.link_status,
        });
      }

      // Action B: Create Direct Checkout Order (/pg/orders)
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

    // 2. GET Actions (Verification or Status)
    if (req.method === 'GET') {
      const { order_id, link_id } = req.query || {};

      if (link_id) {
        const linkRes = await fetch(`${baseUrl}/links/${link_id}`, {
          method: 'GET',
          headers: {
            'x-client-id': appId,
            'x-client-secret': secretKey,
            'x-api-version': '2023-08-01',
          },
        });
        const linkData = await linkRes.json();
        return res.status(linkRes.status).json({ success: linkRes.ok, link: linkData });
      }

      if (order_id) {
        const response = await fetch(`${baseUrl}/orders/${order_id}`, {
          method: 'GET',
          headers: {
            'x-client-id': appId,
            'x-client-secret': secretKey,
            'x-api-version': '2023-08-01',
          },
        });
        const data = await response.json();
        return res.status(response.status).json({ success: response.ok, order: data });
      }

      return res.status(200).json({
        status: 'active',
        gateway: 'Cashfree Payments Production PG',
        apiVersion: '2023-08-01',
        environment: cashfreeEnv,
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
