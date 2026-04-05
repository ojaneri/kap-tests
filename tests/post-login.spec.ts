import { test, expect } from '@playwright/test';
import { debugSleep, waitForEnter, acceptTermsIfVisible } from './debug-helpers';

test.describe('Post-login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://kaponline.com.br');
    await debugSleep();
    await page.fill('input[name="email"]', process.env.TEST_EMAIL!);
    await debugSleep(500);
    await page.fill('input[name="password"]', process.env.TEST_PASSWORD!);
    await debugSleep(500);
    await page.click('.login-button');
    await debugSleep();
    await page.waitForURL((url) => url.toString() !== 'https://kaponline.com.br');
    await acceptTermsIfVisible(page);
    await debugSleep();
  });

  test.afterEach(async () => {
    await waitForEnter();
  });

  test('search name OSVALDO JANERI FILHO on nome2.php', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://kaponline.com.br/nome2.php');
    await debugSleep();
    await page.fill('input[name="nome"]', 'OSVALDO JANERI FILHO');
    await debugSleep(500);
    await page.click('button:has-text("Consultar")');
    await debugSleep(2000);
    await expect(page.locator('text=OSVALDO JANERI FILHO')).toBeVisible({ timeout: 60000 });
    await debugSleep();
  });

  test('clear history on nome2.php', async ({ page }) => {
    await page.goto('https://kaponline.com.br/nome2.php');
    await debugSleep();
    await page.click('button:has-text("Limpar todo histórico")');
    await debugSleep();
    await expect(page.locator('.history-list li')).toHaveCount(0);
    await debugSleep();
  });

  test('search CPF 651.205.153-04 on cpf2.php', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://kaponline.com.br/cpf2.php');
    await debugSleep();
    await page.fill('input[name="cpf"]', '651.205.153-04');
    await debugSleep(500);
    await page.click('button:has-text("Consultar")');
    await debugSleep(2000);
    await expect(page.locator('text=OSVALDO JANERI FILHO')).toBeVisible({ timeout: 60000 });
    await debugSleep();
  });

  test('clear history on cpf2.php', async ({ page }) => {
    await page.goto('https://kaponline.com.br/cpf2.php');
    await debugSleep();
    await page.click('button:has-text("Limpar todo histórico")');
    await debugSleep();
    await expect(page.locator('.history-list li')).toHaveCount(0);
    await debugSleep();
  });

  test('search placa QQQ9A75 on placa2.php', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://kaponline.com.br/placa2.php');
    await debugSleep();
    await page.fill('input[name="placa"]', 'QQQ9A75');
    await debugSleep(500);
    await page.click('button:has-text("Consultar")');
    await debugSleep(2000);
    await expect(page.locator('text=QQQ9A75')).toBeVisible({ timeout: 60000 });
    await debugSleep();
  });

  test('clear history on placa2.php', async ({ page }) => {
    await page.goto('https://kaponline.com.br/placa2.php');
    await debugSleep();
    await page.click('button:has-text("Limpar todo histórico")');
    await debugSleep();
    await expect(page.locator('.history-list li')).toHaveCount(0);
    await debugSleep();
  });

  test('search CNPJ 73.391.187/0001-75 on cnpj.php', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('https://kaponline.com.br/cnpj.php');
    await debugSleep();
    await page.fill('input[name="cnpj"]', '73.391.187/0001-75');
    await debugSleep(500);
    await page.click('button:has-text("Consultar")');
    await debugSleep(2000);
    await expect(page.locator('text=73.391.187/0001-75')).toBeVisible({ timeout: 60000 });
    await debugSleep();
  });

  test('clear history on cnpj.php', async ({ page }) => {
    await page.goto('https://kaponline.com.br/cnpj.php');
    await debugSleep();
    await page.click('button:has-text("Limpar todo histórico")');
    await debugSleep();
    await expect(page.locator('.history-list li')).toHaveCount(0);
    await debugSleep();
  });

  test('logout from user2.php', async ({ page }) => {
    await page.goto('https://kaponline.com.br/user2.php');
    await debugSleep();
    await page.click('a[href="logout.php"]');
    await debugSleep();
    await page.goto('https://kaponline.com.br');
    await debugSleep();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await debugSleep();
  });
});
