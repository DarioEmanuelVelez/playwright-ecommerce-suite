import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('autenticar usuario en saucedemo', async ({ page }) => {
  // 1. Navegamos a la página con www para evitar rebotes de dominio
  await page.goto('https://www.saucedemo.com/');

  // 2. Ingresamos credenciales
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Validamos que llegamos con éxito al inventario
  await expect(page).toHaveURL(/.*inventory.html/);

  // 4. Guardamos las cookies y el almacenamiento en el archivo user.json
  await page.context().storageState({ path: authFile });
});