import { Locator, Page } from "@playwright/test";

export class AccountPage {
    private readonly logoutButton: Locator;
    private readonly pageAddress: string;

    constructor(public readonly page: Page) {
        this.logoutButton = this.page.getByText('Logout')
        this.pageAddress = `${process.env.BASE_URL}account.html`;
    }

    public getPageAddress(): string {
        return this.pageAddress;
    }

    public async verifyLogoutButtonPresent(): Promise<boolean>{
        return this.logoutButton.isVisible({timeout: 30000})
    }
}