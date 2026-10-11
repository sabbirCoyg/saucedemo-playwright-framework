import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import * as LoginPageModule from '../../pages/LoginPage';


test.describe('Authentication', () => {

  test('TC_LOGIN_001 - Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to Sauce Demo', async () => {
      //await page.goto('https://www.saucedemo.com/');

      await loginPage.navigate();

    });

    await test.step('Enter valid credentials', async () => {

      await loginPage.enterLoginCredentials('standard_user', 'secret_sauce');


      //await page.getByPlaceholder('Username').fill('standard_user');
      //await page.getByPlaceholder('Password').fill('secret_sauce');
    });

    await test.step('Submit login', async () => {

      await loginPage.submitLogin();

      //await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory/);
      await expect(page.getByText('Products')).toBeVisible();
    });

    await test.step('Capture successful login screenshot', async () => {
      await page.screenshot({
        path: 'screenshots/login-success.png'
      });
    });

  });

  test('TC_LOGIN_002 - Unsuccessful Login with invalid credentials', async ({ page }) => {
    //console.log('Module exports:', LoginPageModule);
    //console.log('LoginPage import:', LoginPage);
    const loginPage = new LoginPage(page);

    await test.step('Navigate to Sauce Demo', async () => {

      await loginPage.navigate();

    });

    await test.step('Enter invalid credentials', async () => {

      await loginPage.enterLoginCredentials('invalid_user', 'invalid_password');

    });

    await test.step('Submit Login', async () => {

      await loginPage.submitLogin();

    });

    await test.step('Verify unseccessful Login', async () => {

      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });


  });

  //--------------------   TEST 3 STARTS -----------------------------------//
  test('TC_LOGIN_003 - Unsuccessful Login with empty credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);


    // ---- navigate to sauce Demo
    await test.step('Navigate to Sauce Demo', async () => {
      await loginPage.navigate();
    });

    // --- Enter Empty Credentials 

    await test.step('Enter Incorrect Credentials ', async () => {
      await loginPage.enterLoginCredentials('', 'secret_sauce');

    });

    //Enter  Submit Button

    await test.step('Submit Login', async () => {

      await loginPage.submitLogin();

    });

    // Verify Error Message 

    await test.step('Verify Username Error', async () => {

      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');

    });


  });
  // -----------------------------   Enter Test Case 3  -----------------------------// 



  // ----------------------- test 4 startts ----------------------------//
  test('TC_LOGIN_004 - Unsuccessful Login with Empty Password', async ({ page }) => {

    const loginPage = new LoginPage(page);
    // ------------------------------------- Navigate to Sauce Demo -------------------------------------- // 

    await test.step('Navigate to Sauce Demo', async () => {

      await loginPage.navigate();


    });


    // --------------------------- Enter Incorrect Password in Credentials ----------------------------------// 

    await test.step('Enter incorrect Password', async () => {

      await loginPage.enterLoginCredentials('standard_user', '');

    });


    // -----------------------  Enter Submit Button-------------------------------------- //

    await test.step('Submit Login', async () => {

      await loginPage.submitLogin();

    });



    // ----------------------  Verify Error Message    ------------------------- //

    await test.step('Verify Password Error', async () => {

      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');

    });




  });

  //  ------------------------------- ENd of Test Case 4 -----------------------

  // -------------------------------- Test Case 5 Starts ------------------------------------// 

  test('TC_LOGIN_005 - Locked-out user cannot login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Navigate to Sauce Demo', async () => {
      await loginPage.navigate();
    });

    await test.step('Enter locked-out user credentials', async () => {
      await loginPage.enterLoginCredentials('locked_out_user', 'secret_sauce');
    });

    await test.step('Submit login', async () => {
      await loginPage.submitLogin();
    });

    await test.step('Verify locked-out account error', async () => {
      await expect(loginPage.errorMessage).toBeVisible();

      await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
      );

      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

  });

});