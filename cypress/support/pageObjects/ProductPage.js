import CartPage from "./CartPage";
class ProductPage
{
    pageVerification()
    {
        return cy.contains("Shop Name")
    }

    verifyCardLimit()
    {
       return cy.get("app-card")
    }

    addProductToCart(productName)
    {
        cy.get("app-card").filter(`:contains("${productName}")`)
            .then(($card) => {
                cy.wrap($card).should('have.length', 1)
                cy.wrap($card).contains('button', 'Add').click();
            });
    }

    goToCart()
    {
        cy.contains("a", "Checkout").click();
        return new CartPage();
    } 
}
export default ProductPage;