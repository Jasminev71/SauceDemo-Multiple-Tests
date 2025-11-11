import { browser } from '@wdio/globals';
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
  
    it('the cart can be opened when menu is open', async () => {
        await MenuPage.menuOpen();
        await CartPage.openCart();
        await CartPage.cartIsOpen();
   })
   
    it('Users can logout using link on menu', async () => {
        await MenuPage.userLogout();
        
   })
   //this for 3rd changes/
         it('About Page is usable', async () => {
           await MenuPage.getAbout();
           await browser.back();
           await InventoryPage.assertLoaded();
       })
   
     it('Reset App will reset page', async() => {
         await InventoryPage.addAllToCart();
         await MenuPage.itemsAddedMenuReset();
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
        await MenuPage.menuDisplayLinks();
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
        await MenuPage.noMenuDisplayLinks();
    });

   
     it('Close button should not be visible when menu is closed', async () => {
        await MenuPage.closeButtonNotVisible();
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
        await MenuPage.LoginMenu();
     });
    
 });