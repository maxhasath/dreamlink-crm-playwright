const { defineConfig, devices } = require('@playwright/test');
const { loadEnvFile } = require('./util/helpers');

const envName = process.env.TEST_ENV || 'qa';
loadEnvFile(envName);

const baseURL = process.env.BASE_URL || 'https://lk-qa.dreamstartlabs.com';

const sharedUse = {
  baseURL,
  locale: 'en-US',
  timezoneId: 'Asia/Colombo',
  viewport: null,
  launchOptions: {
    args: ['--start-maximized'],
  },
  trace: 'retain-on-failure',
  screenshot: 'on',
  video: 'retain-on-failure',
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60000,
  reporter: [['allure-playwright'], ['list']],
  use: sharedUse,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: null, deviceScaleFactor: undefined },
    },
  ],
});