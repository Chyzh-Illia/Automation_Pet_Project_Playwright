// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
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
      testMatch: /tests\/setup\/auth\.setup\.js/,
    },
    {
      name: 'e2e',
      testMatch: /tests\/.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.join(__dirname, '.auth/user.json'),
      },
    },
  ],
});