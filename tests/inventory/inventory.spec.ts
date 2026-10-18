import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory', () => {

    test('TC_INV_001 - Verify inventory products are displayed', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await test.step('Login to Sauce Demo', async () => {
            await loginPage.navigate();
            await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
            await loginPage.submitLogin();
        });

        await test.step('Verify inventory page', async () => {
            await expect(page).toHaveURL(/inventory/);
        });

        await test.step('Verify six products are displayed', async () => {
            await expect(inventoryPage.inventoryItems).toHaveCount(6);
        });

    });

    test('TC_INV_002 - Verify product names and prices', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);



        await test.step('Login to Sauce Demo', async () => {
            await loginPage.navigate();
            await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
            await loginPage.submitLogin();
        });

        await expect(inventoryPage.productNames).toHaveCount(6);
        await expect(inventoryPage.productPrices).toHaveCount(6);


        const expectedNames = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ];


        for (let i = 0; i < 6; i++) {

            // const productName = await inventoryPage.productNames.nth(i).textContent();

            //const productPrice = await inventoryPage.productPrices.nth(i).textContent();

            const productName = await inventoryPage.productNames.nth(i).innerText();
            const productPrice = await inventoryPage.productPrices.nth(i).innerText();
            //expect(productName?.trim()).not.toBe('');

            //expect(productPrice?.trim()).toMatch(/^\$\d+(\.\d{2})?$/);

            expect(productName.length).toBeGreaterThan(0);

            const price = Number(productPrice.replace('$', ''));

            expect(price).toBeGreaterThan(0);
            expect(productName).toBe(expectedNames[i]);


        }


    });

test('TC_INV_003 - Verify product names are unique', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await test.step('Login to Sauce Demo', async () => {
    await loginPage.navigate();
    await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
    await loginPage.submitLogin();
  });

  await test.step('Verify no duplicate product names', async () => {

    await expect(inventoryPage.productNames).toHaveCount(6);

    const productNames = await inventoryPage.productNames.allInnerTexts();

    const uniqueNames = new Set(productNames);

    expect(uniqueNames.size).toBe(productNames.length);

  });

});
//---------- End of Test Case 3 -------------// 

// ------------------------- Test Case 4 -------------------------//
test('TC_INV_004 - Verify product sorting A to Z', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await test.step('Login to Sauce Demo', async () => {
    await loginPage.navigate();
    await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
    await loginPage.submitLogin();
  });

  await test.step('Sort products by name A to Z', async () => {

    // First change to Z to A
    await inventoryPage.sortDropdown.selectOption('za');

    // Then select A to Z
    await inventoryPage.sortDropdown.selectOption('az');

    // Get the actual product names
    const actualNames = await inventoryPage.productNames.allInnerTexts();


//------------------------------ another way to sort and compare -------------------------------------//
//const expectedNames = actualNames.slice();
//expectedNames.sort();
//expect(actualNames).toEqual(expectedNames);
//-------------------------------------------------------------------------------------------------

    // Create an alphabetically sorted copy
    const expectedNames = [...actualNames].sort();

    // Compare actual against expected
    expect(actualNames).toEqual(expectedNames);

  });

});

test('TC_INV_005 - Verify price sorting low to high', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await test.step('Login to Sauce Demo', async () => {
    await loginPage.navigate();
    await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');
    await loginPage.submitLogin();
  });

  await test.step('Sort products by price low to high', async () => {
    await inventoryPage.sortDropdown.selectOption('hilo');
    await inventoryPage.sortDropdown.selectOption('lohi');
  });

  await test.step('Verify prices are in ascending order', async () => {

    await expect(inventoryPage.productPrices).toHaveCount(6);

    const actualPrices = await inventoryPage.productPrices.allInnerTexts();

    for (let i = 1; i < actualPrices.length; i++) {

      const previousPrice = Number(actualPrices[i - 1].replace('$', ''));

      const currentPrice = Number(actualPrices[i].replace('$', ''));

      expect(currentPrice).toBeGreaterThanOrEqual(previousPrice);

    }

// another way to do the same --- just a cooler way to do loop without even a loop

// const actualPrices = await inventoryPage.productPrices.allInnerTexts();

// const prices = actualPrices.map(price =>
//   Number(price.replace('$', ''))
// );

// const expectedPrices = prices.slice();

// expectedPrices.sort((a, b) => a - b);

// expect(prices).toEqual(expectedPrices);




  });

});




});