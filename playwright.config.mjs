import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.e2e.mjs',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
  },
});
