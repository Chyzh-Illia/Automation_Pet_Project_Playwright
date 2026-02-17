import { BasePage } from "./BasePage";
import {expect, test} from '@playwright/test';

export class AddressCheckoutPage extends BasePage {
        /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        super(page, url);
        this.addressDetailsHeader = page.locator('h2.heading');
        this.locationCheckoutText = page.locator('li.active')
    }

    async checkingPage() {
        await expect(this.locationCheckoutText).toHaveText('Checkout');
        await expect(this.addressDetailsHeader).toBeVisible();
        await expect(this.addressDetailsHeader).toHaveText('Address Details');
    }
}