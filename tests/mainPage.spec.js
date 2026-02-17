import { test, expect } from '@playwright/test';
import { MainPage } from '../Pages/MainPage';
import { CartPage } from '../Pages/CartPage';

test.describe('Login on the main page', () => {
    test.beforeEach( async ({page}) => {
        await page.goto(process.env.BASE_FRONT_URL);
    });

    // test('Open Login Page, Verify UI elements', async ({ page, request, context }) => {
       
    // });
})