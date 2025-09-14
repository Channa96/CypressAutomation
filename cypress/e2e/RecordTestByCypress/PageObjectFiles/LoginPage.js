class LoginPage {
    navigateToURL(url) {
        cy.visit(url);
    }
    login(email, password) {
        cy.get('#userEmail').clear().type(email);
        cy.get('#userPassword').clear().type(password);
        cy.get('#login').click();
    }
}
export default LoginPage;