const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message, err.stack));
  
  await page.goto('http://localhost:4173');
  await page.click('text=Explore Studio');
  await page.waitForTimeout(2000);
  await page.click('text=Birth Chart');
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
