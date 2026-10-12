//1 - ingresar a la pagina de los productos con la sesion ya iniciada, storagestate.

//2 - verificar que el carrito este vacio.

//3- agregar 2 productos especificos al carrito.

//4- verificar que el carrito tenga 2 productos.





import { test, expect } from '@playwright/test';



test.describe('debe agregar productos al carrito y verificar la cantidad', () => {

    test('debe agregar 2 productos al carrito y verificar la cantidad', async ({ page }) => {



        await page.goto('/inventory.html');



        const cartBadge = page.locator('.shopping_cart_badge');

        await expect(cartBadge).not.toBeVisible();



        // 3. Agregar 2 productos específicos al carrito

        // (lo hacemos a continuación)

        await page.locator('#add-to-cart-sauce-labs-backpack').click();

        await page.locator('#add-to-cart-sauce-labs-bike-light').click();



        // 4. Verificar que el carrito tenga 2 productos

        // (lo hacemos a continuación)

        await expect(cartBadge).toBeVisible();

        await expect(cartBadge).toHaveText('2');



        // 5. Navegar al carrito

        await page.locator('.shopping_cart_link').click();



        // 6. Validar URL y contenido del carrito

        await expect(page).toHaveURL(/.*cart\.html/);

        await expect(page.locator('.cart_item')).toHaveCount(2);

        await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' })).toBeVisible();

        await expect(page.locator('.inventory_item_name', { hasText: 'Sauce Labs Bike Light' })).toBeVisible();


        await page.locator("#checkout").click();
        await expect(page).toHaveURL(/.*checkout-step-one\.html/);


        await page.locator("#first-name").fill("Dario");
        await page.locator("#last-name").fill("Velez");
        await page.locator("#postal-code").fill("5000");
        await page.locator("#continue").click();
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
        await page.locator("#finish").click();
        await expect(page).toHaveURL(/.*checkout-complete\.html/);
        await expect(page.locator(".complete-header")).toHaveText(/thank you for your order/i);
    });



})
