import { $, browser, expect } from '@wdio/globals';
import InventoryPage from '../pageobjects/inventory-page.js';
import LoginPage from '../pageobjects/login.page.js';
import MenuPage from '../pageobjects/menu.js';
import CartPage from '../pageobjects/Cart.js';






describe('Full coverage Testing of hamburger menu', async () => {
    beforeEach(async () => {
        await LoginPage.open(); 
        await LoginPage.loginAsStandardUser();
        await InventoryPage.waitLoaded();
        
    })
   
    it('Open and close Menu', async () => {
        await MenuPage.menuOpen();
        await MenuPage.menuClose();
        await InventoryPage.waitLoaded();
    })
  
    it('the cart can be opened', async () => {
       await CartPage.openCart();
       await expect(CartPage.container).toBeDisplayed();
   })
   
    it('Users can logout using link on menu', async () => {
        await MenuPage.userLogout();
        
   })
   //this for 3rd changes/
         it('About Page is usable', async () => {
           await MenuPage.getAbout();
           await browser.back();
           await expect(InventoryPage.container).toBeDisplayed();
       })
   
     it('Reset App will reset page', async() => {
         await InventoryPage.addAllToCart();
         await expect(InventoryPage.cartBadge).toBeDisplayed();
         const badgeTextBefore = await InventoryPage.cartBadge.getText();
         await expect(badgeTextBefore).toBe('6');
        
         await MenuPage.getReset();
        
         await InventoryPage.waitLoaded();
         await expect(InventoryPage.cartBadge).not.toBeExisting();
     })
     
     it('Esc closes the menu', async () => {
         await MenuPage.menuOpen(); 
         await browser.keys('Escape');
         await InventoryPage.waitLoaded();
     })

     it('All Items returns to inventory from product detail', async () => {
         await InventoryPage.backpacktitle();  
         await MenuPage.getAllItems();            
         await InventoryPage.waitLoaded();
     }) 

    it('Menu works from cart page', async () => {
        await CartPage.openCart();
        await MenuPage.menuOpen();
    })

    it('Menu works from product detail page', async () => {
        await InventoryPage.backpacktitle();
        await MenuPage.menuOpen();
        await MenuPage.menuClose();
    })

     it('Menu Reset closes menu and resets state', async () => {
         await InventoryPage.addAllToCart();
         await MenuPage.getReset();
         await browser.refresh();
         await InventoryPage.waitLoaded();
         await InventoryPage.assertBadgeCount(0);
     })
        
    it('All menu items menu item work from cart page', async () => {
        await CartPage.openCart();
        await CartPage.waitLoaded();
        await MenuPage.getAllItems();
        await InventoryPage.waitLoaded();
    })

    it('Menu items accessible only when menu is open', async () => {
        await MenuPage.menuOpen();
        await expect(MenuPage.itemsBtn).toBeDisplayed();
        await expect(MenuPage.aboutBtn).toBeDisplayed();
        await expect(MenuPage.logoutBtn).toBeDisplayed();
        await expect(MenuPage.resetBtn).toBeDisplayed();
        await MenuPage.menuClose();
    })
})
 

    
 
 describe('Negative testing for Sauce Demo Menu', async () => {
     beforeEach(async() => {
         await LoginPage.open(); 
         await LoginPage.loginAsStandardUser();
         await InventoryPage.waitLoaded();
     })

 

     it('Menu items should not be clickable when menu is closed', async () => {
        await expect(MenuPage.itemsBtn).not.toBeDisplayed();
        await expect(MenuPage.aboutBtn).not.toBeDisplayed();
        await expect(MenuPage.logoutBtn).not.toBeDisplayed();
        await expect(MenuPage.resetBtn).not.toBeDisplayed();
    });

   
     it('Close button should not be visible when menu is closed', async () => {
        await browser.pause(300);
       if (await MenuPage.menuOpen()) {
             await MenuPage.menuClose();
         }
        await browser.pause(500);
        await MenuPage.menuClose();
        await expect(MenuPage.closeBtn).not.toBeDisplayed();
     })


    it('Menu All Items works from cart page', async () => {
        await CartPage.openCart();
        await MenuPage.getAllItems();
        await InventoryPage.waitLoaded();
    });

    it('Menu About works from cart page and can navigate back', async () => {
        await CartPage.openCart();
        await MenuPage.getAbout();
        await browser.back();
        await CartPage.waitLoaded();
    });

});



 describe('Login +  menu', async () => {
    it('Menu is not usable before login', async () => {
        await LoginPage.open();
      await expect($('#react-burger-menu-btn')).not.toBeExisting();
     });
    
 });