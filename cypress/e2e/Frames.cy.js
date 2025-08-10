/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

//Before handle frames in cypress we need to install cypress-iframe plugin
//npm install -D cypress-iframe
//After installing the plugin we need to import it in the test file
//cypress-iframe plugin will help to handle frames in cypress
describe('HandleFrames', ()=>
{
    it('TC_iFrames', ()=>
    {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.frameLoaded('#courses-iframe'); // Ensure the iframe is loaded
        // Use the iframe's contents to interact with elements inside it
        cy.iframe('#courses-iframe').find('a[href*="mentorship"]').eq(0).click();
        cy.wait(5000);
        cy.iframe('#courses-iframe').find('h1[class*="pricing-title"]').should('be.visible');
        // Validating the number of packages in the navigated page
        cy.iframe('#courses-iframe').find('h1[class*="pricing-title"]').should('have.length',2);
    });
})