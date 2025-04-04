describe('Test Suite one', () =>
{
    it('Test Case 001',() =>
    {
        cy.visit('https://www.saucedemo.com/')
        //Log in to the page
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        //verify the title
        cy.title().should('eq','Swag Labs')
        //choose item for cart
        cy.get('#item_0_title_link').contains('Sauce Labs Bike Light')
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        //navigate to the cart
        cy.wait(3000)
        cy.get('.shopping_cart_link').click()
        cy.get('.title').contains('Your Cart')
        //verify item in the cart
        cy.get('.inventory_item_name').contains('Sauce Labs Bike Light')
    })

    

})