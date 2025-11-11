
import { $, browser, expect } from '@wdio/globals';
import Page from './page.js';
import LoginPage from './login.page.js';
import InventoryPage from './inventory-page.js';



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
  async menuDisplayLinks() {
        await expect(this.itemsBtn).toBeDisplayed();
        await expect(this.aboutBtn).toBeDisplayed();
        await expect(this.logoutBtn).toBeDisplayed();
        await expect(this.resetBtn).toBeDisplayed();
  }
  async noMenuDisplayLinks() {
        await expect(this.itemsBtn).not.toBeDisplayed();
        await expect(this.aboutBtn).not.toBeDisplayed();
        await expect(this.logoutBtn).not.toBeDisplayed();
        await expect(this.resetBtn).not.toBeDisplayed();
  }
  async closeButtonNotVisible() {
    try {
      const isDisplayed = await this.closeBtn.isDisplayed();
      if (isDisplayed) {
        await this.menuClose();
      }
    } catch (error) {
    }
    await expect(this.closeBtn).not.toBeDisplayed();
  }
  async LoginMenu() {
  await LoginPage.open();
        await expect($('#react-burger-menu-btn')).not.toBeExisting();
  }
  async itemsAddedMenuReset() {
    await expect(InventoryPage.cartBadge).toBeDisplayed();
             const badgeTextBefore = await InventoryPage.cartBadge.getText();
             await expect(badgeTextBefore).toBe('6');
             
             await this.getReset();
             
             await InventoryPage.waitLoaded();
             await expect(InventoryPage.cartBadge).not.toBeExisting();
  }
}



export default new MenuPage();