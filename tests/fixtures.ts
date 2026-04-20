import { test as base } from '@playwright/test';
import { AccountPage, LoginPage } from '../page_objects';

type Fixtures = {
  loginPage: LoginPage;
  accountPage: AccountPage
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await use(loginPage);
  },

  accountPage: async ({page}, use) => {
    const accountPage = new AccountPage(page);
    await use (accountPage);
  }
});
export { expect } from '@playwright/test';