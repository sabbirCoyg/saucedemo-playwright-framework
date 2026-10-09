import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {

  test('TC_LOGIN_001 - Successful login with valid credentials', async ({ page }) => {

    await test.step('Navigate to Sauce Demo', async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    await test.step('Enter valid credentials', async () => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
    });

    await test.step('Submit login', async () => {
      await page.getByRole('button', { name: 'Login' }).click();
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

});