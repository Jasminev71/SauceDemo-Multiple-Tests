import { $, $$, expect } from '@wdio/globals';
import Page from './page.js';

class InventoryPage extends Page {
   get container() { return $('#inventory_container'); }
   get cartBadge() { return $('.shopping_cart_badge'); }
   get backPackDetails() { return $('[data-test = "item-4-title-link"]'); }

  get addBackPack() { return $('#add-to-cart-sauce-labs-backpack'); }
  get addBikeLight() { return $('[id="add-to-cart-sauce-labs-bike-light"]'); }
  get addBoltShirt() { return $('[id="add-to-cart-sauce-labs-bolt-t-shirt"]'); }
  get addFleeceJacket() { return $('[id="add-to-cart-sauce-labs-fleece-jacket"]'); }
  get addOnesie() { return $('[id="add-to-cart-sauce-labs-onesie"]'); }
  get addRedTee() { return $('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]'); }
  get wrap()      { return $('.bm-menu-wrap'); }

  
  get detailsContainer() { return $('#inventory_item_container'); }
  get detailsName()      { return $('#inventory-item-name'); }
  


  async waitLoaded() {
    await this.container.waitForDisplayed();
  }

  async assertLoaded() {
    await expect(this.container).toBeDisplayed();
  }

  async assertUrl() {
    await expect(browser).toHaveUrlContaining('inventory.html');
  }

   async addAllToCart() {
    await this.waitLoaded();
    const addButtons = await $$('[data-test^="add-to-cart"]');
    for (const btn of addButtons) {
      await btn.waitForClickable();
      await btn.click();
    }
  }
 
  
async backpacktitle() {
  await this.waitLoaded();                   
  await this.backPackDetails.waitForClickable();
  await this.backPackDetails.click();        
  await this.detailsContainer.waitForDisplayed();
}

  
  async assertBadgeCount(expected) {
  const badge = await this.cartBadge;
  if (expected === 0) {
    await expect(badge).not.toBeExisting();
  } else {
    await expect(badge).toHaveText(String(expected));
  }
}

async addBackpack() {
  await this.waitLoaded();
  const btn = await this.addBackPack;   
  await btn.click();
}

async assertBackpackButtonIsAdd() {
  await expect(this.addBackPack).toBeDisplayed();
}

 
async addOneItem(id) {
  const addBtn = $(`#add-to-cart-${id}`);
  const removeBtn = $(`#remove-${id}`);


  if (await removeBtn.isExisting()) return;

  await addBtn.scrollIntoView();
  await addBtn.waitForClickable({ timeout: 5000 });
  await addBtn.click();
}




}

export default new InventoryPage();