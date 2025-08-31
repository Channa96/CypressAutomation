import HomePage from "../support/pageObjects/HomePage";
describe('Ecommerce Test Suite', () => {

  before(function(){
    cy.fixture('example').then(function(data) 
    {
      this.data = data;
      this.homePage = new HomePage();
    });
  });

  it('Submit Order', function() {

    const productNameOne = Cypress.env("firstProductName");
    const productNameTwo = Cypress.env("secondProductName");

    //Load URL & Login
    this.homePage.navigateToURL(Cypress.env("url") + "/loginpagePractise/#");
    const productPage = this.homePage.login(this.data.userName, this.data.passWord);

    //Verify Login
    productPage.pageVerification().should('be.visible');
    productPage.verifyCardLimit().should('have.length', 4);

    //Adding first item
    productPage.addProductToCart(productNameOne);
    //Adding second item
    productPage.addProductToCart(productNameTwo);
    //Adding filtered item to cart
    //productPage.addProductToCart(this.data.filteredProductName);

    //debugging the test
    //cy.pause();

    //Verify Cart
    const cartPage = productPage.goToCart();
    const total = cartPage.verifyCartItems();
    const sum = cartPage.verifySumOfItems().then((sum) => {
    expect(sum).to.be.equal(165000);
    });

    cy.log(sum);
    cy.log(total);

    //Proceed to checkout
    const confirmationPage = cartPage.proceedToCheckout();
    cy.submitFormDetails();
    confirmationPage.verifySuccessMessage();
  });
});