import LoginPage from '../../e2e/RecordTestByCypress/PageObjectFiles/LoginPage';
import CartPage from '../../e2e/RecordTestByCypress/PageObjectFiles/CartPage';
import ConfirmationPage from '../../e2e/RecordTestByCypress/PageObjectFiles/ConfirmationPage';

describe('Cypress Studio Test', () => {
    it('Create new record a test', () => {
        const loginPage = new LoginPage();
        const cartPage = new CartPage();
        const confirmationPage = new ConfirmationPage();

        // Login to the application
        loginPage.navigateToURL('https://rahulshettyacademy.com/client');
        loginPage.login('channa.kumara255@gmail.com', 'Channa22@@');

        // Adding items to the cart & Navigate to the cart
        cartPage.addItemToCart();
        cartPage.goToCart();

        // Checkout the item & Validate the order
        cartPage.checkout();
        confirmationPage.enterCountry('Sri');
        confirmationPage.submitOrder();
        confirmationPage.verifySuccessMessage();
    });
});