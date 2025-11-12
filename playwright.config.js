// @ts-check
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: process.env.BASE_FRONT_URL,
    trace: 'on',
    screenshot: 'on',
    testIdAttribute: 'data-qa',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.js/, // только setup-тест
    },
    {
      name: 'e2e',
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup'],        // зависят от setup
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, 'tests/.auth/user.json'),
      },
    },
  ],
});
