import{Page, Locator} from '@playwright/test';


export class InventoryPage{

readonly page: Page; 
readonly inventoryItems: Locator;
readonly productNames: Locator;
readonly productPrices: Locator;
readonly sortDropdown: Locator;
readonly backpackAddButton: Locator;
readonly cartLink: Locator;
readonly cartBadge: Locator;
readonly bikeLightAddButton: Locator;




constructor(page: Page){

this.page = page;

this.inventoryItems = page.locator('[data-test="inventory-item"]');
this.productNames = page.locator('[data-test="inventory-item-name"]');
this.productPrices = page.locator('[data-test="inventory-item-price"]');
this.sortDropdown = page.locator('[data-test="product-sort-container"]');
this.backpackAddButton = page.locator(
  '[data-test="add-to-cart-sauce-labs-backpack"]'
);
this.cartLink = page.locator('[data-test="shopping-cart-link"]');
this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

this.bikeLightAddButton = page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]'
);

}








}

