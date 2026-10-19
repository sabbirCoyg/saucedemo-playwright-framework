import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Shopping Cart', () => {


test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');

    await loginPage.submitLogin();

});




    test('TC_CART_001 - Add backpack to cart', async ({ page }) => {

       // const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        // await test.step('Login to Sauce Demo', async () => {

        //     await loginPage.navigate();

        //     await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');

        //     await loginPage.submitLogin();

        // });

        await test.step('Add backpack to cart', async () => {

            await inventoryPage.backpackAddButton.click();
            //await expect(inventoryPage.backpackAddButton).toHaveText('Remove');
            
        });

await test.step('Open shopping cart', async () => {

    await inventoryPage.cartLink.click();

});

await test.step('Verify backpack is in cart', async () => {

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    await expect(cartPage.cartItems).toHaveCount(1);

});


    });


    test('TC_CART_002 - Verify cart badge updates', async ({ page }) => {

    //const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // await test.step('Login to Sauce Demo', async () => {
    //     await loginPage.navigate();
    //     await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
    //     await loginPage.submitLogin();
    // });

    await test.step('Add backpack to cart', async () => {
        await inventoryPage.backpackAddButton.click();
    });

    await test.step('Verify cart badge', async () => {
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

});

test('TC_CART_003 - Add multiple products to cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('Add two products to cart', async () => {

        await inventoryPage.backpackAddButton.click();

        await inventoryPage.bikeLightAddButton.click();

    });

    await test.step('Verify cart badge displays 2', async () => {

        await expect(inventoryPage.cartBadge).toHaveText('2');

    });

    await test.step('Open shopping cart', async () => {

        await inventoryPage.cartLink.click();

    });

    await test.step('Verify two products are in cart', async () => {

        await expect(cartPage.cartItems).toHaveCount(2);

    });

});
test('TC_CART_004 - Remove product from cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('Add two products to cart', async () => {
        await inventoryPage.backpackAddButton.click();
        await inventoryPage.bikeLightAddButton.click();
    });

    await test.step('Open shopping cart', async () => {
        await inventoryPage.cartLink.click();
    });

    await test.step('Remove the backpack', async () => {
        await cartPage.backpackRemoveButton.click();
    });

    await test.step('Verify one product remains', async () => {
        await expect(cartPage.cartItems).toHaveCount(1);
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

});


test('TC_CART_005 - Verify cart product names and prices', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.backpackAddButton.click();
    await inventoryPage.bikeLightAddButton.click();

    await inventoryPage.cartLink.click();

    await expect(cartPage.cartItems).toHaveCount(2);

    const names = await cartPage.productNames.allInnerTexts();

    expect(names).toEqual([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light'
    ]);

const prices = await cartPage.productPrices.allInnerTexts();

expect(prices).toEqual([
    '$29.99',
    '$9.99'
]);


});

test('TC_CART_006 - Verify empty shopping cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('Open cart without adding products', async () => {
        await inventoryPage.cartLink.click();
    });

    await test.step('Verify cart is empty', async () => {
        await expect(cartPage.cartItems).toHaveCount(0);
    });

    await test.step('Verify cart badge is absent', async () => {
        await expect(inventoryPage.cartBadge).toHaveCount(0);
    });

});

});