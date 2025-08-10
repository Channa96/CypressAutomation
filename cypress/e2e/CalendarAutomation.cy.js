describe('AutomateCalenders',()=>{
    it('TC_HandleCalenders',()=>{

        const date = "15";
        const year = "2026";
        const monthNumber = "11"; // November is the 11th month
        const expectedList = [monthNumber, date, year];

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        cy.get('.react-date-picker__inputGroup').click() ;
        cy.get('.react-calendar__navigation__label').click();
        cy.get('.react-calendar__navigation__label').click();

        cy.contains("button", year).click();// Wait for the year options to load
        // November is the 11th month, index starts from 0
        // Select the month by its number
        // Number(monthNumber) is used to convert monthNumber into integer
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber)-1).click();
        //cy.contains("button", month).click();// Select the month when user give month text
        cy.contains("abbr",date).click();
        cy.wait(1000);

        //Assertion
        cy.get(".react-date-picker__inputGroup__input").each(($el,index) => 
        {
            cy.wrap($el).invoke('val').should('eq',expectedList[index]);
        })
    })
})