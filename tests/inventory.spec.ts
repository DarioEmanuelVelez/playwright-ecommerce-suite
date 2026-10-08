import { test, expect } from '@playwright/test';

test('Debe ingresar directamente al inventario usando la sesión guardada', async ({ page }) => {
  await page.goto('/inventory.html');

  // Verificamos que el título de la página de productos esté visible
  const title = page.locator('.title');
  await expect(title).toHaveText('Products');
});