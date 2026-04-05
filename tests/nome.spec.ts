import { test, expect } from '@playwright/test';
import { acceptTermsIfVisible } from './debug-helpers';

test('validar consulta de nome', async ({ page }) => {
  await page.goto('https://kaponline.com.br/login.php?redirect=%2F');
  await page.getByRole('textbox', { name: 'Seu email' }).fill(process.env.TEST_EMAIL!);
  await page.getByRole('textbox', { name: 'Sua senha' }).fill(process.env.TEST_PASSWORD!);
  await page.getByRole('checkbox', { name: 'Lembrar meus dados' }).check();
  await page.getByRole('button', { name: ' Entrar' }).click();

  await acceptTermsIfVisible(page);

  await page.getByRole('link', { name: 'Busca por Nome' }).click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/debug-nome-1-apos-link.png', fullPage: true });

  const campo = page.getByRole('textbox', { name: 'Nome completo a ser consultado' });
  await campo.fill('osvaldo janeri filho');
  await page.screenshot({ path: 'test-results/debug-nome-2-apos-fill.png', fullPage: true });

  await page.getByRole('button', { name: 'Consultar' }).click();
  // Aguarda o botão sair do estado "Processando..."
  await page.getByRole('button', { name: 'Consultar' }).waitFor({ state: 'visible', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'test-results/debug-nome-3-apos-consultar.png', fullPage: true });

  // CPF pode aparecer formatado (651.205.153-04) ou sem formatação
  const resultado = page.getByText(/651\.?205\.?153-?04/);
  await expect(resultado).toBeVisible({ timeout: 60000 });

  console.log("✅ CPF encontrado com sucesso nos resultados!");
});
