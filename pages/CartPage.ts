import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly backpackRemoveButton: Locator;

    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.backpackRemoveButton = page.locator(
            '[data-test="remove-sauce-labs-backpack"]'
        );
        this.productNames = page.locator('.cart_item .inventory_item_name');

        this.productPrices = page.locator('.cart_item .inventory_item_price');

    }
}