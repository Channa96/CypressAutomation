class ConfirmationPage {
    enterCountry(country) {
        cy.get('.form-group > .input').clear().type(country);
        cy.get('.ta-item > .ng-star-inserted').click();
    }
    submitOrder() {
        cy.get('.btnn').click();
    }
    verifySuccessMessage() {
        cy.get('.hero-primary').should('have.text', ' Thankyou for the order. ');
    }
}
export default ConfirmationPage;