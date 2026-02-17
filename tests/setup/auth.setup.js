// setup/auth.setup.js
import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const authFile = path.join(process.cwd(), '.auth', 'user.json');

setup('authentication user', async ({ page }) => {
  console.log('🚀 Running setup for authentication...');

  // Создаём папку, если нет
  const dir = path.dirname(authFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Открываем страницу логина
  await page.goto('https://automationexercise.com/login');
  await page.locator('button.fc-button.fc-cta-consent.fc-primary-button').click( { force: true } );
  await page.getByTestId('login-email').fill(process.env.USER_LOGIN);
  await page.getByTestId('login-password').fill(process.env.USER_PASSWORD);
  await page.getByTestId('login-button').click();
  await page.get

  // Проверяем, что вошли
  await expect(page.getByText('Autotest')).toBeVisible({ timeout: 10000 });

  // Сохраняем storageState
  await page.context().storageState({ path: authFile });

  console.log('✅ Auth file created:', authFile);
});
