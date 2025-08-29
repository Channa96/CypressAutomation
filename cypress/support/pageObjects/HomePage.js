import ProductPage from "./ProductPage";
class HomePage 
{
    navigateToURL(url)
    {
        cy.visit(url);
    }
    login(userName, password)
    {
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('#terms').click();
    cy.get('#signInBtn').click();
    return new ProductPage();
    }
}
export default HomePage;

