import ProductPage from "./ProductPage";
class HomePage 
{
    navigateToURL(url)
    {
        cy.visit(url);
    }
    login(userName, password)
    {
        cy.get('#username').type(Cypress.env("userName"));
        cy.get('#password').type(Cypress.env("passWord"));
        cy.get('#terms').click();
        cy.pause();
        cy.get('#signInBtn').click();
        return new ProductPage();
    }
}
export default HomePage;

