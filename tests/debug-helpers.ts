import type { Page } from '@playwright/test';

export const isDebug = !!process.env.PWDEBUG;

export async function debugSleep(ms: number = 800): Promise<void> {
  if (!isDebug) return;
  await new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForEnter(): Promise<void> {
  if (!isDebug) return;
  await new Promise(resolve => setTimeout(resolve, 1500));
}

export async function acceptTermsIfVisible(page: Page): Promise<void> {
  const btn = page.getByRole('button', { name: /Li e Aceito os Termos de Uso/ });
  if (await btn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await btn.click();
  }
}
