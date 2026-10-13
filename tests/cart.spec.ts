import { test, expect } from '../fixtures/page.fixtures';

test.describe('Flujo de Carrito y Checkout con POM', () => {

  test('debe agregar 2 productos y completar el checkout exitosamente', async ({ page, checkoutPage }) => {
    // 1. Navegar con sesión inyectada
    await page.goto('/inventory.html');

    // 2. Precondición: carrito vacío
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();

    // 3. Agregar productos específicos
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();

    // 4. Validar badge reactivo
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('2');

    // 5. Navegar al carrito y validar items
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();

    // 6. Iniciar checkout e interactuar con el Page Object
    await page.locator('#checkout').click();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await checkoutPage.fillCustomerInformation('Dario', 'Velez', '5000');
    await checkoutPage.clickContinue();

    // 7. Resumen y confirmación final
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await checkoutPage.clickFinish();

    // 8. Validación de orden completada
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText(/thank you for your order/i);
  });

  test('debe mostrar un error al intentar avanzar el checkout sin completar los campos obligatorios', async ({ page, checkoutPage }) => {
    await page.goto('/checkout-step-one.html');

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toHaveText(/Error: First Name is required/i);
  });

});