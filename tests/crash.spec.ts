import { test, expect } from '@playwright/test';

test('reproduce error', async ({ page }) => {
  await page.goto('https://astro-360-neon.vercel.app');
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));
  
  await page.click('text=Explore Studio');
  await page.waitForTimeout(2000);
  
  // Click tools to see what crashes
  await page.click('text=Birth Chart');
  await page.waitForTimeout(1000);
});
