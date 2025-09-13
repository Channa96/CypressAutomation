const neatCSV = require('neat-csv');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

describe('JWT Authentication', () => {
    it('Authenticate user and logged using local storage', () => {
        cy.LoginAPI().then(() => {
            cy.visit("https://rahulshettyacademy.com/client", {
                //execute below function before loading the page
                onBeforeLoad: (window) => {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            })
        })
        cy.get(".card-body b").eq(1).then(function (ele) {
            const productName = ele.text();
        })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("Sri");
        //For loop to select the country from the dropdown
        cy.get(".ta-results button").each(($el, index, $list) => {
            if ($el.text() === " Sri Lanka") {
                cy.wrap($el).click();
            }
        })
        cy.get(".action__submit").click();
        cy.wait(2000);
        cy.get(".order-summary button").contains("Excel").click();

        //Reading the file and converting it to text
        const filePath = Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_channa.kumara255.xlsx";
        cy.task('excelToJsonConvertor', filePath).then((result) => {
            console.log(result);
        })
        
    })
})