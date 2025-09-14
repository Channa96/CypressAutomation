class CartPage {
    addItemToCart() {
        cy.get(':nth-child(2) > .card > .card-body > .w-10').click();
    }
    goToCart() {
        cy.get(':nth-child(4) > .btn').click();
    }
    checkout() {
        cy.get('.subtotal > ul > :nth-child(3) > .btn').click();
    }
}
export default CartPage;