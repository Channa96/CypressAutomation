import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor"
import HomePage from "../../../support/pageObjects/HomePage.js";
const homePage = new HomePage();
const productNameOne = Cypress.env("firstProductName");
const productNameTwo = Cypress.env("secondProductName");

Given("I am on the ecommerce page", () => 
{
    homePage.navigateToURL(Cypress.env("url") + "/loginpagePractise/#");
})

When("I login to the ecommerce Scenario", function() {
    this.productPage = homePage.login(Cypress.env("username"), Cypress.env("password"));
    this.productPage.pageVerification().should('be.visible');
    this.productPage.verifyCardLimit().should('have.length', 4);
})

When("I login to the ecommerce Scenario using parameterization", function(dataTable) {
    this.productPage = homePage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1]);
    this.productPage.pageVerification().should('be.visible');
    this.productPage.verifyCardLimit().should('have.length', 4);
})

When("I add items to the cart & checkout", function()
{
    this.productPage.addProductToCart(productNameOne);
    this.productPage.addProductToCart(productNameTwo);
    this.cartPage = this.productPage.goToCart();
})

When("I validate the total prices", function()
{
    const total = this.cartPage.verifyCartItems();
    const sum = this.cartPage.verifySumOfItems().then((sum) => {
    expect(sum).to.be.equal(165000);
    });
})

Then("select the country submit and verify Thankyou message", function()
{
    this.confirmationPage = this.cartPage.proceedToCheckout();
    cy.submitFormDetails();
    this.confirmationPage.verifySuccessMessage();
})