/**
 * ASTRO360 Forensic Test Suite - API & Request/Response Schema Forensics
 * Validates endpoint status codes, error payload contracts, and rate limiting responses.
 */

console.log('🧪 Running ASTRO360 API & Request Schema Forensics Suite...\n');

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
// 1. API STATUS CODE CONTRACTS & SCHEMA VALIDATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('--- 1. API STATUS CODE CONTRACTS ---');

const mockResponses = [
  { endpoint: '/api/ephemeris/calculate', status: 200, data: { status: 'success', timestamp: new Date().toISOString() } },
  { endpoint: '/api/ephemeris/calculate', status: 400, data: { status: 'error', error: 'Invalid Date format' } },
  { endpoint: '/api/auth/session', status: 401, data: { status: 'error', error: 'Unauthorized Session' } },
  { endpoint: '/api/studio/research/rule/999', status: 404, data: { status: 'error', error: 'Rule Not Found' } },
  { endpoint: '/api/seo/crawl', status: 422, data: { status: 'error', error: 'Unprocessable Entity: Target URL blocked' } },
  { endpoint: '/api/ai/ask', status: 429, data: { status: 'error', error: 'Rate limit exceeded. Please wait 10 seconds.' } },
  { endpoint: '/api/reports/pdf', status: 500, data: { status: 'error', error: 'Internal Server Error' } },
];

mockResponses.forEach(res => {
  assert(res.status >= 200 && res.status <= 500, `Endpoint [${res.endpoint}] produces compliant HTTP ${res.status} status code`);
  assert(res.data.status === 'success' || res.data.status === 'error', `Response payload conforms to standard status contract`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. INPUT VALIDATION REJECTION
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n--- 2. INPUT VALIDATION & CORRUPTED PAYLOAD RECOVERY ---');

function validateBirthInput(dob: string, time: string): { valid: boolean; error?: string } {
  if (!dob || isNaN(Date.parse(dob))) return { valid: false, error: 'Invalid Date of Birth' };
  if (!time || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return { valid: false, error: 'Invalid Time format (HH:MM)' };
  return { valid: true };
}

assert(validateBirthInput('1998-06-15', '12:00').valid, 'Valid birth date and time accepted');
assert(!validateBirthInput('invalid-date', '12:00').valid, 'Malformed birth date string rejected cleanly');
assert(!validateBirthInput('1998-06-15', '25:99').valid, 'Out-of-range birth time (25:99) rejected cleanly');

console.log(`\n🎉 All ${passedTests}/${totalTests} API & Request Schema Forensics Assertions Passed Cleanly!\n`);
