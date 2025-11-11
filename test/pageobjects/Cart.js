import { $, $$, expect } from '@wdio/globals';
import Page from './page.js';



class CartPage extends  Page {
    get container() { return $('#cart_contents_container'); }
    get continueBtn() { return $('#continue-shopping'); }
    get checkoutBtn() { return $('#checkout'); }
    get cartBtn () { return $('.shopping_cart_link'); }
    get removeBackpack() { return $('#remove-sauce-labs-backpack');}
    get removeBikeLight() { return $('#remove-sauce-labs-bike-light');}
    get removeBoltShirt() { return $('#remove-sauce-labs-bolt-t-shirt');}
    get removeFleeceJacket() { return $('#remove-sauce-labs-fleece-jacket'); }
    get removeOnesie() { return $('#remove-sauce-labs-onesie');}
    get removeRedTee() { return $('#remove-test.allthethings()-t-shirt-(red)');}
     get cartItems() { return $$('#cart_contents_container .cart_item');}
    get checkoutBack() {return $('#cancel')}


 async waitLoaded() {
    await this.container.waitForDisplayed();
  }
    async openCart() {
        await this.cartBtn.click();
        await this.container.waitForDisplayed();
    }

async cancelCheckOut() {
    await this.checkoutBack.click();
} 
async continueShopping() {
    await this.continueBtn.waitForClickable({ timeout: 5000 });
    await this.continueBtn.click();
}

async checkout() {
    await this.checkoutBtn.waitForClickable({ timeout: 5000 });
    await this.checkoutBtn.click();
}

    async removeAll() {
        await this.openCart(); 
        const removeBtn = await $$('button.cart_button');
            for (const btn of removeBtn) {
                await btn.click(); }
    }
   async removeOneItem(itemsId) {
  await this.openCart();
  for (const id of itemsId) {
    const removeBtn = await $(`#remove-${id}`);
    await removeBtn.waitForClickable();
    await removeBtn.click();
  }

}

async assertItemCount(expectedCount) {
  await expect(this.cartItems).toBeElementsArrayOfSize(expectedCount);
}

  async removeBackpackAndAssertEmpty() {
  await this.openCart();
  await this.removeOneItem(['sauce-labs-backpack']);
  await this.assertItemCount(0);
}

async assertCartEmpty() {
  await this.assertItemCount(0);
}

async removeAllTwiceAndAssertEmpty() {
  await this.openCart();
  await this.removeAll();
  await this.assertCartEmpty();
  await this.removeAll();
  await this.assertCartEmpty()
}

async isCheckoutButtonEnabled() {
    try {
        await this.checkoutBtn.waitForEnabled({ timeout: 2000 });
        return true;
    } catch {
        return false;
    }
}

}
export default new CartPage();  
    