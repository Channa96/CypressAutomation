describe('Web Element Test Suite', ()=>
{
    it('TC_CheckBoxes', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //checking a checkbox and validate it with multiple validation on same line
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        //uncheck the checkbox that checked earlier and validate it
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        //check multiple checkboxes - all check boxes checked.
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').uncheck()
        //check mutiple checkboxes using array
        cy.get('input[type="checkbox"]').check(['option2','option3']).should('be.checked').and('have.value','option2','option3')
    })

    it('TC_DropDowns', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Static Dropdowns
        //use tag name as a locator becase it is uniqe for this page
        cy.get('select').select('option2').should('have.value','option2')

        //Dynamic Dropdowns
        cy.get('#autocomplete').type('ind')
        //Dynamic dropdowns cannot access directly. So we need to use a logic to capture the element
        //first we capture the common locator foe the dropdown elements and create a for loop to go through the dropdown values
        cy.get('.ui-menu-item div').each(($e1, index, $list) =>
        {
            //checking the dropdown values for capture the value "India"
            if($e1.text()=="India")
            {
                //click the value when its match with the expected value
                cy.wrap($e1).click()
            }
        })
        cy.get('#autocomplete').should('have.value','India')
    })

    it('TC_Visibility&Invisibility', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //first verify the visibilty of the element
        cy.get('#displayed-text').should('be.visible')
        //hide the element
        cy.get('#hide-textbox').click()
        //noe check the invisibility of that element
        cy.get('#displayed-text').should('not.be.visible')
        //again add the visibilty for the element
        cy.get('#show-textbox').click()
        //check the visibility again
        cy.get('#displayed-text').should('be.visible')
    })

    it('TC_RadioButtons', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('input[value="radio2"]').check().should('be.checked').and('have.value','radio2')
    })
})