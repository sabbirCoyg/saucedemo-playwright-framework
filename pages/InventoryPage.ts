import{Page, Locator} from '@playwright/test';


export class InventoryPage{

readonly page: Page; 
readonly inventoryItems: Locator;
readonly productNames: Locator;
readonly productPrices: Locator;
readonly sortDropdown: Locator;
constructor(page: Page){

this.page = page;

this.inventoryItems = page.locator('[data-test="inventory-item"]');
this.productNames = page.locator('[data-test="inventory-item-name"]');
this.productPrices = page.locator('[data-test="inventory-item-price"]');
this.sortDropdown = page.locator('[data-test="product-sort-container"]');

}








}

