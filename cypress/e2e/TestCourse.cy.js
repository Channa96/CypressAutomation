
describe('My First Test Suite', () =>
{
    it('My First Test Case', () => 
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        //cy.get('#gh-search-btn').click()
        cy.wait(2000)
        //Locating using common class name.This will show visible and invisible locators
        cy.get('.product').should('have.length',5)
        //This visible key word will filter all the visible items
        cy.get('.product:visible').should('have.length',4)
        //Parent child chaining
        //This will start from parent tag the navigate to the child tag.So, this will return only 4 items
        cy.get('.products').find('.product').should('have.length',4)
        //Clicking on Add to cart button
        cy.get(':nth-child(3) > .product-action > button').click()
        //Navigate the element using text
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        //Use of loop
        cy.get('.products').find('.product').each(($e1, index, $list) => 

        {
            const textVeg=$e1.find('h4.product-name').text()
            if(textVeg.includes('Cashews'))
            {
                cy.wrap($e1).find('button').click()
            }
        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')
 
        //this is to print in logs
        cy.get('.brand').then(function(logoelement)
        {
            cy.log(logoelement.text())
 
        })
        //const logo=cy.get('.brand')
        //cy.log(cy.get('.brand').text())
        //cy.log(logo.text())

        
    })
})