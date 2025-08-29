class ConfirmationPage
{
    verifySuccessMessage()
    {
        cy.get(".alert-success").should('contain', 'Success');
    }
}
export default ConfirmationPage;