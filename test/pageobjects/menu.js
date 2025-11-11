// ./test/pageobjects/menu.js
// ./test/pageobjects/menu.js
import { $, browser, expect } from '@wdio/globals';
import Page from './page.js';



class MenuPage extends Page {
  get menuBtn()   { return $('#react-burger-menu-btn'); }
  get closeBtn()  { return $('#react-burger-cross-btn'); }
  get itemsBtn()  { return $('#inventory_sidebar_link'); }
  get aboutBtn()  { return $('#about_sidebar_link'); }
  get logoutBtn() { return $('#logout_sidebar_link'); }
  get resetBtn()  { return $('#reset_sidebar_link'); }
 


 

  async menuOpen() {
    await this.menuBtn.waitForClickable({ timeout: 5000 });
    await this.menuBtn.click();
    await this.closeBtn.waitForDisplayed({ timeout: 5000 });
  }

  async menuClose() {
    await this.closeBtn.waitForClickable({timeout: 5000 });
    await this.closeBtn.click();
    await this.closeBtn.waitForDisplayed({ reverse: true, timeout: 5000 })
  }
 
  async userLogout() {
    await this.menuOpen();
    await this.logoutBtn.click();
  }

  async getAbout() {
    await this.menuOpen();
    await this.aboutBtn.click();
  }

  async getReset() {
    await this.menuOpen();
    await this.resetBtn.click();
  }

  async getAllItems() {
    await this.menuOpen();
    await this.itemsBtn.click();
  }
}



export default new MenuPage();