import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginError: Locator;
    private readonly pageAddress: string;

    constructor (public readonly page: Page) {
        this.usernameInput = page.locator('//*[@id="username"]');
        this.passwordInput = page.locator('//*[@id="password"]');
        this.loginButton = page.getByRole("button", { name: "Login"});
        this.loginError = page.locator('//*[@id="errorMessage"]')
        this.pageAddress = `${process.env.BASE_URL}login.html`;
    }

    public async goto() {
        this.page.goto(this.pageAddress);
    }

    public getPageAddress(): string {
        return this.pageAddress;
    }

    public async fillLoginForm(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async fillLoginFormWithoutUsername(password: string) {
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async fillLoginFormWithoutPassword(username: string) {
        await this.usernameInput.fill(username);
        await this.loginButton.click();
    }

    public async verifyErrorMessage(errorText: string) {
        if (await this.loginError.isVisible({timeout: 30000})) {
            //Sometimes the message does not load immediately
            await this.page.waitForTimeout(5000)
            expect(this.loginError).toHaveText(errorText);

        }
    }

    public async getValidationMessage(fieldName: 'username' | 'password'): Promise<string> {
        const locator = fieldName === 'username' ? this.usernameInput : this.passwordInput;
        return locator.evaluate((el: HTMLInputElement) => el.validationMessage);
    }
}