import { $, expect } from '@wdio/globals';
import Page from './page.js';

class LoginPage extends Page {
    get username() { return $('#user-name'); }
    get password() { return $('#password'); }
    get loginBtn() { return $('#login-button'); }

  async assertLoaded() {
  await expect(this.username).toBeDisplayed();
  await expect(this.password).toBeDisplayed();
  await expect(this.loginBtn).toBeDisplayed();
}

    async login(username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.loginBtn.click();
    }

    async loginAsStandardUser() {
        await this.login('standard_user', 'secret_sauce');
    }
   
}

export default new LoginPage();
