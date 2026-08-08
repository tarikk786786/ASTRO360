import { EmailService } from './emailService';
import { MockEmailProvider } from './emailProvider';
import { calculateNextBedtimeWarning, generateBedtimeIdempotencyKey } from './bedtimeReminder';

async function runEmailServiceUnitTests() {
  console.log('🧪 Running Self-Hosted Email Service & Bedtime Scheduler Unit Verification...');

  // TEST 1: Mock Provider Dispatch
  const mockProvider = new MockEmailProvider();
  const service = new EmailService(mockProvider);

  const conn = await mockProvider.verifyConnection();
  if (!conn.connected) throw new Error('Test 1 Failed: Mock Provider connection verification failed.');
  console.log(`✅ Test 1 Passed: Mock Email Provider Connected (${conn.email})`);

  // TEST 2: Email Queue & Processing
  const job = service.queueEmail({
    recipient: 'test@astro360.local',
    template: 'WELCOME',
    payload: { name: 'Tarik Islam' },
  });

  if (job.status !== 'PENDING') throw new Error(`Test 2 Failed: Expected job status PENDING, got ${job.status}`);

  const processRes = await service.processQueue();
  if (processRes.sent !== 1) throw new Error(`Test 2 Failed: Expected 1 sent job, got ${processRes.sent}`);

  const updatedJob = service.getJobs().find(j => j.id === job.id);
  if (updatedJob?.status !== 'SENT') throw new Error(`Test 2 Failed: Expected updated job status SENT, got ${updatedJob?.status}`);
  console.log(`✅ Test 2 Passed: Email Queue processed 1 job successfully.`);

  // TEST 3: Idempotency Key Duplicate Prevention
  const key = 'bedtime_user123_2026-08-08';
  const job1 = service.queueEmail({
    recipient: 'user@astro360.local',
    template: 'BEDTIME_WARNING',
    payload: { name: 'Tarik', bedtime: '23:00' },
    idempotencyKey: key,
  });

  const job2 = service.queueEmail({
    recipient: 'user@astro360.local',
    template: 'BEDTIME_WARNING',
    payload: { name: 'Tarik', bedtime: '23:00' },
    idempotencyKey: key,
  });

  if (job1.id !== job2.id) {
    throw new Error('Test 3 Failed: Idempotency key failed to prevent duplicate job creation.');
  }
  console.log(`✅ Test 3 Passed: Idempotency Key prevented duplicate job execution (Key: ${key}).`);

  // TEST 4: Bedtime Warning Schedule Calculation
  const now = new Date('2026-08-08T20:00:00Z');
  const target = calculateNextBedtimeWarning(
    {
      userId: 'tarik',
      bedtime: '23:00',
      timezone: 'Asia/Kolkata',
      warningMinutes: 30,
      emailEnabled: true,
      daysEnabled: [0, 1, 2, 3, 4, 5, 6],
    },
    now
  );

  if (!target || isNaN(target.getTime())) {
    throw new Error('Test 4 Failed: Invalid bedtime warning schedule target date.');
  }
  console.log(`✅ Test 4 Passed: Bedtime Warning scheduled for ${target.toLocaleTimeString()}`);

  console.log('🎉 All Self-Hosted Email & Bedtime Automation Unit Tests Passed Cleanly!');
}

runEmailServiceUnitTests();
