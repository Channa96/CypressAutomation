const neatCSV = require('neat-csv');
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
            productName = ele.text();
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
        cy.get(".order-summary button").click();

        //Reading the file and converting it to text
        cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_channa.kumara255.csv")
        .then(async (text) => {
            //converting the csv to json format
            const csv = await neatCSV(text);
            //printing the csv data
            console.log(csv);
            expect(csv[0]['Product Name']).to.equal(productName);
        })
    })
})