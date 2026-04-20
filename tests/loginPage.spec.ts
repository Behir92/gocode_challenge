import { test, expect } from './fixtures';

const username = "demouser";
const wrongUsername = "demouser123"
const password="fashion123";
const wrongPassword="passwrd123";
const loginErrorText = "Invalid username or password.";
const VALIDATION_MESSAGES = {
  chromium: 'Please fill out this field.',
  firefox: 'Please fill out this field.',
  webkit: 'Fill out this field'
};

test.describe('Login page tests', () => {
  test('The user can log into the application with correct data', async ({ loginPage, accountPage, page }) => {
    await loginPage.fillLoginForm(username, password);

    expect(page.url()).toEqual(accountPage.getPageAddress());
    expect(await accountPage.verifyLogoutButtonPresent()).toEqual(true);

  });

  test('The user cannot log into the application with wrong username', async ({ loginPage, page }) => {
    await loginPage.fillLoginForm(wrongUsername, password);

    expect(page.url()).toEqual(loginPage.getPageAddress());
    await loginPage.verifyErrorMessage(loginErrorText);

  });

  test('The user cannot log into the application with wrong password', async ({ loginPage, page }) => {
    await loginPage.fillLoginForm(username, wrongPassword);

    expect(page.url()).toEqual(loginPage.getPageAddress());
    await loginPage.verifyErrorMessage(loginErrorText);

  });

  test('The user cannot log into the application without providing a username', async ({ loginPage, browserName, page }) => {
    await loginPage.fillLoginFormWithoutUsername(password);

    expect(page.url()).toEqual(loginPage.getPageAddress());

    const expectedMessage = VALIDATION_MESSAGES[browserName as keyof typeof VALIDATION_MESSAGES];
    const actualMessage = await loginPage.getValidationMessage('username');

    expect(actualMessage).toBe(expectedMessage);
    });


  
  test('The user cannot log into the application without providing a password', async ({ loginPage, browserName, page }) => {
    await loginPage.fillLoginFormWithoutPassword(username);

    expect(page.url()).toEqual(loginPage.getPageAddress());
  
    const expectedMessage = VALIDATION_MESSAGES[browserName as keyof typeof VALIDATION_MESSAGES];
    const actualMessage = await loginPage.getValidationMessage('password');

    expect(actualMessage).toBe(expectedMessage);
  });
});
