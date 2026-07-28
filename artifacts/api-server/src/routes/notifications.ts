import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router = Router();
const connectors = new ReplitConnectors();

function buildEmailHtml(name: string, email: string, topics: Record<string, boolean>): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const topicLabels: Record<string, { emoji: string; label: string; desc: string }> = {
    difficultWarningAlerts: { emoji: "🚨", label: "Emergency Warning Alerts", desc: "Planetary friction & difficult transits" },
    dailyHoroscope: { emoji: "🌟", label: "Daily Horoscope Briefing", desc: "Sun/Moon sign daily forecast" },
    decisionHelper: { emoji: "🎯", label: "Cosmic Decision Helper", desc: "Favorable timing for your decisions" },
    powerHours: { emoji: "⚡", label: "Power Hour Alerts", desc: "Hourly planetary windows" },
    transitAlerts: { emoji: "🪐", label: "Major Planetary Transits", desc: "Ingresses & retrogrades" },
    lunarPhases: { emoji: "🌙", label: "Lunar Phase Changes", desc: "New & Full moon intentions" },
    numerologyDay: { emoji: "🔢", label: "Daily Universal Number", desc: "Pythagorean daily vibration" },
  };

  const activeTopics = Object.entries(topics)
    .filter(([, v]) => v)
    .map(([k]) => topicLabels[k])
    .filter(Boolean);

  const topicRows = activeTopics
    .map(
      (t) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:18px;margin-right:10px;">${t.emoji}</span>
          <strong style="color:#e2e8f0;font-size:13px;">${t.label}</strong>
          <div style="color:#94a3b8;font-size:11px;margin-top:2px;padding-left:28px;">${t.desc}</div>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;vertical-align:top;">
          <span style="background:#10b981;color:#fff;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;">ACTIVE</span>
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ASTRO360 — Cosmic Email Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER GLOW BAR -->
          <tr>
            <td style="background:linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#6366f1);height:4px;border-radius:4px 4px 0 0;"></td>
          </tr>

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0f2a 0%,#1a1a3e 50%,#0f172a 100%);padding:40px 40px 30px;border-left:1px solid rgba(99,102,241,0.3);border-right:1px solid rgba(99,102,241,0.3);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:28px;margin-bottom:4px;">✨</div>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;letter-spacing:-0.5px;">ASTRO<span style="background:linear-gradient(90deg,#818cf8,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">360</span></h1>
                    <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Global Wisdom Platform</p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);border-radius:20px;padding:6px 14px;display:inline-block;">
                      <span style="color:#34d399;font-size:11px;font-weight:600;">● EMAIL ACTIVE</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO SECTION -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);padding:40px;border-left:1px solid rgba(99,102,241,0.3);border-right:1px solid rgba(99,102,241,0.3);">
              <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#fff;">Cosmic Notifications Confirmed 🌌</h2>
              <p style="margin:0 0 20px;color:#c7d2fe;font-size:15px;line-height:1.6;">
                Hello <strong style="color:#fff;">${name}</strong>, your ASTRO360 email notifications are fully active.
                You'll receive personalized cosmic insights, planetary warnings, and astrological guidance directly here.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:12px 20px;">
                    <span style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Delivery Address</span>
                    <div style="color:#e2e8f0;font-size:14px;font-weight:600;margin-top:4px;">📬 ${email}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DIVIDER STARS -->
          <tr>
            <td style="background:#0f0f2a;padding:16px 40px;text-align:center;border-left:1px solid rgba(99,102,241,0.3);border-right:1px solid rgba(99,102,241,0.3);">
              <span style="color:#4b5563;font-size:12px;letter-spacing:4px;">· · · ✦ · · ·</span>
            </td>
          </tr>

          <!-- ACTIVE TOPICS -->
          <tr>
            <td style="background:#0f0f2a;padding:0 40px 32px;border-left:1px solid rgba(99,102,241,0.3);border-right:1px solid rgba(99,102,241,0.3);">
              <h3 style="margin:0 0 16px;font-size:14px;color:#94a3b8;text-transform:uppercase;letter-spacing:1.5px;">Your Active Notification Topics</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;">
                ${topicRows || `<tr><td style="padding:16px;color:#64748b;text-align:center;font-size:13px;">No topics selected</td></tr>`}
              </table>
            </td>
          </tr>

          <!-- COSMIC TIP -->
          <tr>
            <td style="padding:0 40px 32px;background:#0f0f2a;border-left:1px solid rgba(99,102,241,0.3);border-right:1px solid rgba(99,102,241,0.3);">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(251,191,36,0.05));border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;color:#fbbf24;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">🌟 Today's Cosmic Insight</p>
                    <p style="margin:0;color:#fde68a;font-size:14px;line-height:1.6;">
                      The stars align for those who listen. Your cosmic journey with ASTRO360 spans 35+ global traditions — from Vedic to Mayan, Celtic to Islamic — all converging to illuminate your path.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#080812;padding:24px 40px;border:1px solid rgba(99,102,241,0.2);border-top:1px solid rgba(99,102,241,0.3);border-radius:0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:#4b5563;font-size:11px;">Sent on ${dateStr} at ${timeStr}</p>
                    <p style="margin:0;color:#374151;font-size:11px;">Powered by ASTRO360 · 35+ Global Traditions · Gemini AI</p>
                  </td>
                  <td align="right">
                    <span style="font-size:20px;">🔮</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// POST /api/notifications/test — send a real test email via Resend
router.post("/test", async (req, res) => {
  const { settings, userProfile } = req.body as {
    settings: { email?: string; topics?: Record<string, boolean>; frequency?: string };
    userProfile: { name?: string; dob?: string };
  };

  const toEmail = settings?.email?.trim();
  if (!toEmail) {
    return res.status(400).json({ error: "Email address is required." });
  }

  const name = userProfile?.name || "Cosmic Seeker";
  const topics = settings?.topics ?? {};

  const html = buildEmailHtml(name, toEmail, topics);

  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ASTRO360 <onboarding@resend.dev>",
        to: [toEmail],
        subject: `✨ ASTRO360 — Your Cosmic Notifications Are Live, ${name}!`,
        html,
      }),
    });

    const data = await response.json() as { id?: string; error?: string; message?: string };

    if (!response.ok) {
      const errMsg = data?.message || data?.error || "Email delivery failed.";
      return res.status(502).json({ error: errMsg });
    }

    return res.json({ success: true, id: data.id, message: `Email dispatched to ${toEmail}` });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
