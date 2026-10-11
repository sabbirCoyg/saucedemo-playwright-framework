import { Page, Locator } from '@playwright/test';

export class LoginPage {

    
    readonly page: Page;
    readonly errorMessage: Locator;  

    constructor(page: Page) {
        this.page = page;

          this.errorMessage = page.locator('[data-test="error"]');
    
    
    }

    async navigate() {

        await this.page.goto('https://www.saucedemo.com/');
    }


    async enterLoginCredentials(username: string, password: string) {

        await this.page.getByPlaceholder('Username').fill(username);
        await this.page.getByPlaceholder('Password').fill(password);
    }

    async submitLogin() {
        await this.page.getByRole('button', { name: 'Login' }).click();

    }

}