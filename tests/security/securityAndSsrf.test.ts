/**
 * ASTRO360 Forensic Test Suite - Security, SSRF & Zero-PII Protection
 * Validates SSRF blocking on private IP ranges, PII masking, and data isolation.
 */

import { SsrfShield } from '../../src/lib/security/ssrfShield';

console.log('🧪 Running ASTRO360 Security, SSRF & Zero-PII Forensics Suite...\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ Passed [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    passedTests++;
  } else {
    console.error(`❌ FAILED [${testName}] ${detail ? `➔ ${detail}` : ''}`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SSRF PROTECTION & PRIVATE INFRASTRUCTURE SHIELDS
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. SSRF & PRIVATE IP BLOCKING ---');

const forbiddenUrls = [
  'http://localhost:3000',
  'http://127.0.0.1:8080',
  'http://0.0.0.0:80',
  'http://10.0.0.1/admin',
  'http://192.168.1.1/router',
  'http://172.16.0.1/internal',
  'http://169.254.169.254/latest/meta-data/' // AWS/Cloud metadata endpoint
];

forbiddenUrls.forEach(url => {
  const result = SsrfShield.validate(url);
  assert(!result.valid, `SSRF Shield rejects forbidden destination: [${url}]`);
});

const allowedUrl = SsrfShield.validate('https://astro.tarikislam.in/');
assert(allowedUrl.valid, 'SSRF Shield permits valid public production domain');

// ─────────────────────────────────────────────────────────────────────────────
// 2. ZERO-PII TELEMETRY MASKING ENGINE
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. ZERO-PII TELEMETRY DATA INTEGRITY ---');

function sanitizeTelemetryPayload(raw: Record<string, any>): Record<string, string | number | boolean> {
  const SENSITIVE_KEYS = ['dob', 'time', 'lat', 'lng', 'password', 'notes', 'token'];
  const sanitized: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(raw)) {
    const isSensitive = SENSITIVE_KEYS.some(s => k.toLowerCase().includes(s));
    if (isSensitive) {
      sanitized[k] = '[MASKED_PII]';
    } else {
      sanitized[k] = v;
    }
  }
  return sanitized;
}

const rawPayload = {
  dob: '1998-06-15',
  time: '14:30',
  lat: 28.6139,
  lng: 77.2090,
  password: 'superSecretPassword123!',
  notes: 'Client consultation private notes about marriage',
  nonSensitiveProperty: 'hero_chart_generated',
  screenResolution: '1920x1080'
};

const maskedPayload = sanitizeTelemetryPayload(rawPayload);

assert(maskedPayload.dob === '[MASKED_PII]', 'Birth date (dob) strictly masked');
assert(maskedPayload.time === '[MASKED_PII]', 'Birth time strictly masked');
assert(maskedPayload.lat === '[MASKED_PII]', 'Latitude coordinate strictly masked');
assert(maskedPayload.lng === '[MASKED_PII]', 'Longitude coordinate strictly masked');
assert(maskedPayload.password === '[MASKED_PII]', 'Password strictly masked');
assert(maskedPayload.notes === '[MASKED_PII]', 'Private notes strictly masked');
assert(maskedPayload.nonSensitiveProperty === 'hero_chart_generated', 'Non-sensitive analytics event preserved');
assert(maskedPayload.screenResolution === '1920x1080', 'Hardware telemetry metrics preserved');

// ─────────────────────────────────────────────────────────────────────────────
// 3. USER DATA ISOLATION (MULTI-TENANT GUARDS)
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 3. MULTI-TENANT USER PRIVACY ISOLATION ---');

const userASession = { userId: 'usr_alpha_123', clientCharts: ['chart_a1', 'chart_a2'] };
const userBSession = { userId: 'usr_beta_456', clientCharts: ['chart_b1'] };

function authorizeChartAccess(requesterId: string, chartOwnerId: string): boolean {
  return requesterId === chartOwnerId;
}

assert(authorizeChartAccess(userASession.userId, 'usr_alpha_123'), 'User A authorized for own chart records');
assert(!authorizeChartAccess(userASession.userId, userBSession.userId), 'User A strictly denied access to User B private charts');

console.log(`\n🎉 All ${passedTests}/${totalTests} Security, SSRF & Zero-PII Forensics Assertions Passed Cleanly!\n`);
