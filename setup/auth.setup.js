// auth.setup.js
import { test as setup } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../Pages/LoginPage.js';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('Authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_FRONT_URL);
  await loginPage.userLogin(
    process.env.PLAYWRIGHT_USER_EMAIL,
    process.env.PLAYWRIGHT_USER_PASSWORD
  );

  await page.context().storageState({ path: authFile });
});