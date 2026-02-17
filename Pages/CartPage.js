import { BasePage } from "./BasePage";
import { expect, test } from '@playwright/test';   

export class CartPage extends BasePage {
            /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        super(page, url);
        this.shoppingCartText = page.getByText('Shopping Cart');
        this.cartItems = page.locator('tr.cart_item');
        this.proceedToCheckoutBtn = page.locator('a.btn.btn-default.check_out');
        this.cartTable = page.locator('div#cart_info.table-responsive');
        this.product1 = page.locator('tr#product-1');
        this.priceProduct1 = page.locator('tr#product-1 td.cart_price');
    }

    async checkingCartTableNotEmpty() {
        await this.page.goto('https://automationexercise.com/view_cart');
        await expect(this.proceedToCheckoutBtn).toBeVisible();
        await expect(this.shoppingCartText).toBeVisible();
        await expect(this.cartTable).toBeVisible();
        await expect(this.product1).toBeVisible();
        await expect(this.priceProduct1).toHaveText('Rs. 500');
        const quantityLocator = this.page.locator('tr#product-1 td.cart_quantity button.disabled');
        const before = Number(await quantityLocator.innerText());
        await expect(quantityLocator).toHaveText(String(before));
    
    }

    async redirectToCheckout() {
        await this.page.goto('https://automationexercise.com/view_cart');
        await expect(this.proceedToCheckoutBtn).toBeVisible();
        await this.proceedToCheckoutBtn.click();
    }

    async AddressingCheckout() {
        await expect(this.proceedToCheckoutBtn).toBeVisible();
        await this.proceedToCheckoutBtn.click();

    }

}