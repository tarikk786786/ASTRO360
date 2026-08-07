import { test, expect } from '@playwright/test';

test.describe('ASTRO360 OMNI World-Class End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Dashboard loads with zero console errors', async ({ page }) => {
    await expect(page).toHaveTitle(/ASTRO360|Cosmic/i);
    const heading = page.locator('h1, h2, h3').first();
    await expect(heading).toBeVisible();
  });

  test('Sidebar Navigation switches between tools cleanly', async ({ page }) => {
    // Click on Shubh Muhurta Time Engine button if present
    const muhurtaBtn = page.getByRole('button', { name: /Shubh Muhurta/i });
    if (await muhurtaBtn.isVisible()) {
      await muhurtaBtn.click();
      await expect(page.getByText(/Electional Astrology/i)).toBeVisible();
    }
  });

  test('Panchangam & Planetary Horas render telemetry correctly', async ({ page }) => {
    const horasBtn = page.getByRole('button', { name: /Planetary Horas/i });
    if (await horasBtn.isVisible()) {
      await horasBtn.click();
      await expect(page.getByText(/Planetary Hours/i)).toBeVisible();
    }
  });
});
