import { BasePage } from "./BasePage";
import {expect, test} from '@playwright/test';

export class AddressCheckoutPage extends BasePage {
        /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        super(page, url);
        this.addressDetailsHeader = page.getByText('Address Details');
        this.locationCheckoutText = page.locator('li.active')
        this.deliveryAddressColumn = page.locator('ul.address.item.box')
        this.billingAddressColumn = page.locator('ul.address.alternate_item.box');
        this.reviewYourOrderText = page.getByText('Review Your Order');
        this.productTable = page.locator('div.table-responsive.cart_info tr#product-1');
        this.textDescription = page.getByText('If you would like to add a comment about your order, please write it in the field below.');
        this.textAreaInputField = page.locator('textarea[name="message"]');
    }

    async checkingPage(textarea) {
        await expect(this.locationCheckoutText).toHaveText('Checkout');
        await expect(this.addressDetailsHeader).toBeVisible();
        await expect(this.addressDetailsHeader).toHaveText('Address Details');
        await expect(this.deliveryAddressColumn).toBeVisible();
        await expect(this.billingAddressColumn).toBeVisible();
        await expect(this.reviewYourOrderText).toBeVisible();
        await expect(this.productTable).toBeVisible();
        await expect(this.textDescription).toBeVisible();
        await this.textAreaInputField.fill(textarea);
        await expect(this.textAreaInputField).toHaveValue(textarea);
    }
}