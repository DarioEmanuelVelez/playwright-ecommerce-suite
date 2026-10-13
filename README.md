# 🛒 SauceDemo E-Commerce Automation Suite

[![Playwright Tests](https://github.com/DarioEmanuelVelez/playwright-ecommerce-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/DarioEmanuelVelez/playwright-ecommerce-suite/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-v1.x-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)

E2E test automation framework designed for the [SauceDemo](https://www.saucedemo.com/) e-commerce platform. Built with **Playwright** and **TypeScript**, applying enterprise design patterns, dependency injection via custom fixtures, authentication state reuse, and automated CI/CD pipeline execution on Linux runners.

---

## 🎯 Architecture & Design Highlights

* **Page Object Model (POM):** Strict separation of UI element locators, user actions, and test assertions into dedicated, maintainable page classes (`pages/`).
* **Dependency Injection & Custom Fixtures:** Leverages Playwright's `test.extend` (`fixtures/page.fixtures.ts`) to inject page objects directly into test specs, eliminating manual instantiation boilerplate.
* **Global Authentication Storage (`storageState`):** Persists pre-authenticated browser session state (`playwright/.auth/user.json`) across regression suites, avoiding redundant login calls and reducing execution time.
* **Web-First Assertions:** Enforces resilient DOM polling (`expect().toBeVisible()`, `expect().toHaveText()`) with automatic retries to prevent flaky test runs.
* **Continuous Integration (CI/CD):** Automated workflow using **GitHub Actions** (`ubuntu-latest`) triggered on every `push` and `pull_request`, running tests headlessly and archiving HTML reports as build artifacts.

---

## 📁 Project Structure

```text
playwright-ecommerce-suite/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow
├── fixtures/
│   └── page.fixtures.ts          # Custom fixtures & dependency injection
├── pages/
│   ├── base.page.ts              # Common base wrapper methods
│   ├── checkout.page.ts          # Checkout forms and validations POM
│   ├── inventory.page.ts         # Product catalog and cart interaction POM
│   └── login.page.ts             # Authentication interface POM
├── tests/
│   ├── auth.setup.ts             # Global authentication setup
│   └── cart.spec.ts              # E2E shopping cart and checkout scenarios
├── playwright.config.ts          # Framework configuration and project profiles
├── package.json
└── README.md