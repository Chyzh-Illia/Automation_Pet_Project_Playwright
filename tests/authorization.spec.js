import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { BasePage } from '../Pages/BasePage';

test.describe('Login on the web', () => {
    test.beforeEach( async ({page}) => {
        await page.goto(process.env.BASE_FRONT_URL);
    })

    test('Open Login Page', async ({page}) => {
        const loginPage = new LoginPage(page);
        
    } )
})