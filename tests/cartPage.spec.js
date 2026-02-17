import { test, expect } from '@playwright/test';
import { BasePage } from '../Pages/BasePage';
import { MainPage } from '../Pages/MainPage';
import { CartPage } from '../Pages/CartPage';
import { AddressCheckoutPage } from '../Pages/AddressCheckoutPage';

test.describe('Cart Page Tests: Adding items to cart, Verifying items in cart table', () => {
    test.beforeEach( async ({page}) => {
        await page.goto(process.env.BASE_FRONT_URL);
    });

    test('Open Login Page, buy the first item', async ({ page, request, context }) => {
        const mp = new MainPage(page);
        await mp.womenCategoryOpen('Dress', 'Tops', 'Saree');
        await mp.purchaseFirstItem();
    });

    test('Open Cart page, verify the items in the tables', async ({ page }) => {
        const cp = new CartPage(page);
        await cp.checkingCartTableNotEmpty();
    });

    test('Proceed to checkout, verify the Address Details page', async ({ page }) => { 
        const ac = new AddressCheckoutPage(page);
        const cp = new CartPage(page);
        await cp.redirectToCheckout();
        await ac.checkingPage('Some comment for the order');
    });
});