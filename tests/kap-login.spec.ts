import { test, expect } from '@playwright/test';
import { debugSleep, waitForEnter, acceptTermsIfVisible } from './debug-helpers';

test.afterEach(async () => {
  await waitForEnter();
});

test('login with teste@janeri.com.br', async ({ page }) => {
  await page.goto('https://kaponline.com.br');
  await debugSleep();
  await page.fill('input[name="email"]', process.env.TEST_EMAIL!);
  await debugSleep(500);
  await page.fill('input[name="password"]', process.env.TEST_PASSWORD!);
  await debugSleep(500);
  await page.click('.login-button');
  await debugSleep();
  // Assert success by checking for URL change
  await page.waitForURL((url) => url.toString() !== 'https://kaponline.com.br');
  await debugSleep();
});

test('login with testeexpirado@janeri.com.br', async ({ page }) => {
  await page.goto('https://kaponline.com.br');
  await debugSleep();
  await page.fill('input[name="email"]', process.env.TEST_EMAIL_EXPIRADO!);
  await debugSleep(500);
  await page.fill('input[name="password"]', process.env.TEST_PASSWORD!);
  await debugSleep(500);
  await page.click('.login-button');
  await debugSleep();
  await acceptTermsIfVisible(page);
  await debugSleep();
  await expect(page.getByRole('heading', { name: 'Assinatura Expirada' })).toBeVisible({ timeout: 10000 });
  await debugSleep();
});

test('access forgot password page', async ({ page }) => {
  await page.goto('https://kaponline.com.br');
  await debugSleep();
  await page.locator('a[href="esqueciminhasenha.php"]').click();
  await debugSleep();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await debugSleep();
});

test('access support page', async ({ page }) => {
  await page.goto('https://kaponline.com.br');
  await debugSleep();
  await page.locator('a[href="docs/suporte.php"]').click();
  await debugSleep();
  await expect(page.locator('form')).toBeVisible();
  await debugSleep();
});
