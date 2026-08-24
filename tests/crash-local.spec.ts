import { test, expect } from '@playwright/test';

test('reproduce error', async ({ page }) => {
  await page.goto('http://localhost:5173');
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message, err.stack));
  
  await page.click('text=Explore Studio');
  await page.waitForTimeout(2000);
  
  await page.click('text=Birth Chart');
  await page.waitForTimeout(2000);
});
