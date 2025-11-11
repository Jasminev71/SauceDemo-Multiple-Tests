import { browser, expect } from '@wdio/globals';
import InventoryPage from '../pageobjects/inventory-page.js';
import LoginPage from '../pageobjects/login.page.js';
import MenuPage from '../pageobjects/menu.js';
import CartPage from '../pageobjects/Cart.js';
import inventoryPage from '../pageobjects/inventory-page.js';

describe('Inventory to cart postive tests', async () => {
    beforeEach(async () => {
            await LoginPage.open(); 
            await LoginPage.loginAsStandardUser();
            await InventoryPage.waitLoaded();
            
        })
    it('Navigate to cart from inventory', async () => {
        await CartPage.openCart(); 
        await CartPage.waitLoaded();
    });
    it('add all items then navigate to cart, then remove all', async () => {
        await InventoryPage.addAllToCart();
        await InventoryPage.assertBadgeCount(6);    
        await CartPage.openCart();
        await CartPage.assertItemCount(6);           
        await CartPage.removeAll();
        await CartPage.assertItemCount(0);
        await InventoryPage.assertBadgeCount(0);  
    
    })
 
    it('Reset App while in cart', async () => {
        await inventoryPage.addAllToCart();
        await CartPage.openCart();
        await MenuPage.getReset();
        await browser.refresh();
    })
    it('Add all items to cart then navigate to checkout', async() => {
        await inventoryPage.addAllToCart();
        await CartPage.openCart();
        await CartPage.checkout();
    })
    it('remove a single item from cart updates count and badge', async () => {
        await InventoryPage.addAllToCart();
        await CartPage.removeOneItem(['sauce-labs-bike-light']);
        await CartPage.assertItemCount(5);
        await expect(InventoryPage.cartBadge).toHaveText('5');

    })
    it('Users full cart should be saved after logout and login', async () => {
        await inventoryPage.addAllToCart();
        await CartPage.openCart();
        await MenuPage.userLogout();
        await LoginPage.loginAsStandardUser();
        await expect(InventoryPage.cartBadge).toHaveText('6');

    })
   
    it('adding an item and then refreshing still saves the cart', async () => {
        await MenuPage.getReset();
        await browser.refresh();
        await inventoryPage.addOneItem(['sauce-labs-backpack']);
        await browser.refresh();
        await InventoryPage.waitLoaded();
        await expect(InventoryPage.cartBadge).toHaveText('1');
    })
    
    it('adding an item then continue shopping then going back to cart still saves cart', async () => {
        await MenuPage.getReset();
        await browser.refresh();
        await inventoryPage.addOneItem(['sauce-labs-backpack', 'sauce-labs-bike-light']);
        await CartPage.openCart();
        await CartPage.continueShopping();
        await expect(InventoryPage.cartBadge).toHaveText('1');
        await CartPage.openCart();
        await expect(InventoryPage.cartBadge).toHaveText('1');
    })
    it('cart is the same when switching user accounts', async () => {
    
        await InventoryPage.addAllToCart();
        await expect(InventoryPage.cartBadge).toHaveText('6');
        await MenuPage.userLogout();
        await LoginPage.login('visual_user', 'secret_sauce');
        await inventoryPage.waitLoaded();
        await expect(InventoryPage.cartBadge).toHaveText('6');
     })
     it('cart is the same when switching users in same session', async () => {
        await inventoryPage.addAllToCart();
        await expect(InventoryPage.cartBadge).toHaveText('6');

        await MenuPage.userLogout();
        await LoginPage.login('visual_user', 'secret_sauce');  
        await InventoryPage.waitLoaded();

        await CartPage.openCart();
        await CartPage.assertItemCount(6);
        await expect(InventoryPage.cartBadge).toHaveText('6');
});
    it('cart is cleared when user login is switched on new session', async () => {
        
            await InventoryPage.addAllToCart();
            await expect(InventoryPage.cartBadge).toHaveText('6');

            await browser.reloadSession(); 
            await LoginPage.open();          
            await LoginPage.loginAsStandardUser();
            await InventoryPage.waitLoaded();

            await CartPage.openCart();
            await CartPage.assertItemCount(0);
            await expect(InventoryPage.cartBadge).not.toBeExisting();
    })
    it('backout from check out saves cart', async () => {
            await inventoryPage.addAllToCart();
            await CartPage.openCart();
            await CartPage.checkout();
            await browser.back();
            await expect(InventoryPage.cartBadge).toHaveText('6');
    })

    it('remove Backpack in cart reverts button to Add on inventory', async () => {
        await MenuPage.getReset();
            await browser.refresh();
            await InventoryPage.addBackpack();
            await InventoryPage.assertBadgeCount(1);

            await CartPage.removeBackpackAndAssertEmpty();
            await InventoryPage.assertBadgeCount(0);

            await CartPage.continueShopping();
            await InventoryPage.waitLoaded();
            await InventoryPage.assertBackpackButtonIsAdd();
    });
    it('removeAll can be called twice safely with cart remaining empty', async () => {
        
            await InventoryPage.addAllToCart();
            await InventoryPage.assertBadgeCount(6);

            await CartPage.removeAllTwiceAndAssertEmpty();
            await InventoryPage.assertBadgeCount(0);
    });

    it('Empty cart displays correctly with no items', async () => {
        await MenuPage.getReset();
        await browser.refresh();
        await CartPage.openCart();
        await CartPage.assertItemCount(0);
        await expect(InventoryPage.cartBadge).not.toBeExisting();
    });

    it('Cart badge disappears when last item is removed', async () => {
        await InventoryPage.addBackpack();
        await InventoryPage.assertBadgeCount(1);
        await CartPage.openCart();
        await CartPage.removeOneItem(['sauce-labs-backpack']);
        await CartPage.assertItemCount(0);
        await CartPage.continueShopping();
        await InventoryPage.waitLoaded();
        await expect(InventoryPage.cartBadge).not.toBeExisting();
    });
    it('Cart icon clickable from product detail page', async () => {
        await InventoryPage.backpacktitle();
        await CartPage.openCart();
        await CartPage.waitLoaded();
    });

    it('Menu Reset from cart page clears cart', async () => {
        await InventoryPage.addAllToCart();
        await CartPage.openCart();
        await CartPage.assertItemCount(6);
        await MenuPage.getReset();
        await browser.refresh();
        await CartPage.openCart();
        await CartPage.assertItemCount(0);
    });

    it('Add items in specific order and verify cart order', async () => {
        await MenuPage.getReset();
        await browser.refresh();
        const items = [
            'sauce-labs-backpack',
            'sauce-labs-bike-light',
            'sauce-labs-onesie'
        ];
        
        for (const item of items) {
            await InventoryPage.addOneItem([item]);
        }
        
        await CartPage.openCart();
        await CartPage.assertItemCount(3);
    });

    it('Rapid add and remove operations', async () => {
        await MenuPage.getReset();
        await browser.refresh();
        await InventoryPage.addBackpack();
        await InventoryPage.assertBadgeCount(1);
        await CartPage.openCart();
        await CartPage.removeOneItem(['sauce-labs-backpack']);
        await InventoryPage.assertBadgeCount(0);
        await CartPage.continueShopping();
        await InventoryPage.addBackpack();
        await InventoryPage.assertBadgeCount(1);
    });

    it('Cart persists after browser back navigation', async () => {
        await InventoryPage.addAllToCart();
        await CartPage.openCart();
        await CartPage.continueShopping();
        await browser.back(); // Should go back to cart
        await CartPage.waitLoaded();
        await CartPage.assertItemCount(6);
    });

    it('Cart icon shows correct badge count after item removal', async () => {
        await InventoryPage.addAllToCart();
        await InventoryPage.assertBadgeCount(6);
        await CartPage.openCart();
        await CartPage.removeOneItem(['sauce-labs-backpack']);
        await CartPage.continueShopping();
        await InventoryPage.assertBadgeCount(5);
        await CartPage.openCart();
        await CartPage.assertItemCount(5);
});
    it('Continue shopping returns to inventory and preserves cart', async () => {
        await InventoryPage.addAllToCart();
        await InventoryPage.assertBadgeCount(6);

        await CartPage.openCart();
        await CartPage.assertItemCount(6);

        await CartPage.continueShopping();
        await InventoryPage.waitLoaded();        

        await InventoryPage.assertBadgeCount(6);  
        });

});
describe('Cart Page Postive tests', () => {
    beforeEach(async () => {
        await LoginPage.open(); 
        await LoginPage.loginAsStandardUser();
        await InventoryPage.waitLoaded();
        await CartPage.openCart();
        await CartPage.waitLoaded();
    })
    
    it('Continue shopping button from cart', async () => {
        await CartPage.continueShopping();
        await InventoryPage.waitLoaded();
    })
 
    it('Checkout btn from cart', async () => {
        await CartPage.checkout();
    })
    it('Checkout button navigates correctly from cart', async () => {
        await CartPage.openCart();
        await CartPage.checkout();
        await CartPage.cancelCheckOut();
    });
    
    });

    describe('Negative tests for Sauce Demo cart', async () => {
     beforeEach(async () => {
        await LoginPage.open(); 
        await LoginPage.loginAsStandardUser();
        await InventoryPage.waitLoaded();
        await CartPage.openCart();
        await CartPage.waitLoaded();
        })
    it('redirects to login when visiting cart page while logged out', async () => {
        await MenuPage.userLogout();
        await browser.url('https://www.saucedemo.com/cart.html');
        await LoginPage.assertLoaded();
});

it('Empty cart shows no items', async () => {
    await MenuPage.getReset();
    await browser.refresh();
    await CartPage.openCart();
    await CartPage.assertItemCount(0);
    const isEnabled = await CartPage.isCheckoutButtonEnabled();

    await expect(CartPage.container).toBeDisplayed();
});

    })