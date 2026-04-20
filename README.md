# FashionHub Test Automation Suite

This project contains an automated E2E test suite for the **FashionHub** application, built using **Playwright** and **TypeScript**. The architecture follows industry best practices, including the Page Object Model (POM), multi-environment support, and full containerization.

---

## Quick Start (Docker - Recommended)

The most reliable way to run the entire stack (application + tests) is using Docker Compose. This ensures a consistent environment regardless of your local setup and handles the architecture mismatch (ARM64/AMD64) automatically via emulation.

1.  **Run the tests:**
    ```bash
    docker-compose up --build --exit-code-from playwright-tests
    ```
    *This command builds the test image, pulls the application image, waits for the app to be ready via healthchecks, and executes the suite.*

2.  **View Results:**
    Once the tests finish, the reports will be available in the `./playwright-report` directory on your host machine.

---

## Local Setup

If you prefer to run tests directly on your OS:

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **Install dependencies:** `npm install`
- **Install browsers:** `npx playwright install`

### Running Tests
Use the following scripts defined in `package.json` to target specific environments:

- **Local:** `npm run test:local` (targets `http://localhost:4000/fashionhub/`)
- **Staging:** `npm run test:staging`
- **Production:** `npm run test:prod`
- **Docker (manual):** `npm run test:docker`

---

## Architecture & Configuration

### Environment Management
The project uses an `ENV` environment variable to dynamically load configuration files from the `/config` directory:
- `.env.local`, `.env.staging`, `.env.prod`, `.env.docker`

**Configuration Priority:**
1.  **Command Line:** (e.g., `BASE_URL=http://custom.com npx playwright test`)
2.  **Environment Files:** Values loaded from `.env.{ENV}`
3.  **Defaults:** Fallback values defined in `playwright.config.ts`

### Production-Ready Features
- **Page Object Model (POM):** Clearly separated page logic from test scripts for better maintainability.
- **Cross-Browser Support:** Pre-configured projects for Chromium, Firefox, and WebKit.
- **Native Validation Handling:** Advanced logic to verify browser-specific HTML5 validation messages (which vary between engines like Chromium and WebKit).
- **Environment Hermeticity:** The `docker-compose.yml` uses a `healthcheck` to ensure tests only start after the application is fully responsive.
- **Consistent Localization:** Forced `en-US` locale in the config ensures that validation messages remain consistent across different developer machines.

---

## Reporting
A detailed HTML report is generated after every run. To view it locally, use:
```bash
npx playwright show-report