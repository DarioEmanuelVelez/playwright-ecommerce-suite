import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Ejecutar tests en archivos en paralelo */
  fullyParallel: true,
  /* Fallar en CI si dejaste test.only en el código */
  forbidOnly: !!process.env.CI,
  /* Reintentos en caso de fallo */
  retries: process.env.CI ? 2 : 0,
  /* Número de workers */
  workers: process.env.CI ? 1 : undefined,
  /* Reporte de resultados */
  reporter: 'html',

  /* Opciones compartidas para todos los proyectos */
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
  },

  projects: [
    // 1. Proyecto de Setup: Corre primero y guarda la sesión en user.json
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // 2. Proyecto de ejecución E2E: Usa la sesión guardada y depende de 'setup'
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});