import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
        /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        super(page, url)
        this.signUpLoginButton = page.locator('i.fa fa-lock');
        this.emailLoginField = page.getByTestId('login-email');
        this.passwordLoginField = page.getByTestId('login-password');
        this.loginBtn = page.getByTestId('login-button');

    }
    
    async userLogin(email, password) {
        await this.signUpLoginButton.click();
        await this.emailLoginField.fill(email);
        await this.passwordLoginField.fill(password);
        await this.loginBtn.click( { timeout: 5_000 } );
    }
}