
describe('Ecommerce Test Suite', () => {

  before(function(){
    cy.fixture('example').then(function(data) 
    {
      this.data = data;
    });
  });

  it('Submit Order', function() {

    const productNameOne = this.data.firstProductName;
    const productNameTwo = this.data.secondProductName;
    let sum = 0;
    let total = 0;

    //Load URL & Login
    cy.visit('https://rahulshettyacademy.com/loginpagePractise/#');
    cy.get('#username').type(this.data.userName);
    cy.get('#password').type(this.data.passWord);
    cy.get('#terms').click();
    cy.get('#signInBtn').click();

    //Verify Login
    cy.contains("Shop Name").should('be.visible');
    //Verify Products
    cy.get("app-card").should('have.length', 4);

    //Adding first item
    cy.get("app-card").filter(`:contains("${productNameOne}")`)
      .then(($card) => {
        // Interact with the filtered card
        cy.wrap($card).should('have.length', 1)
        //Adding filtered item to cart
        cy.wrap($card).contains('button', 'Add').click();
      });

    //Adding second item
    cy.get("app-card").filter(`:contains("${productNameTwo}")`)
      .then(($card) => {
        // Interact with the filtered card
        cy.wrap($card).should('have.length', 1)
        //Adding filtered item to cart
        cy.wrap($card).contains('button', 'Add').click();
      });

    //Verify Cart
    cy.contains("a", "Checkout").click()

    cy.get("tr td h3 strong")
    .each(($elm) => {
      total = Number($elm.text().split(" ")[1].trim())
    })

    cy.get("tr td:nth-child(4) strong")
      //For each loop to go through the selected objects and get the sum
      .each(($el) => {
        const amount = Number($el.text().split(" ")[1].trim())
        sum = sum + amount //65000+100000
      }).then(() => {
        // Final assertion
        expect(sum).to.equal(total);
      })
    cy.contains("button", "Checkout").click();
    cy.get("#country").type("India");
    cy.wait(2000);
    cy.get(".suggestions ul li a").click();
    cy.get(".btn-success").click();
    cy.get(".alert-success").should('contain', 'Success')
  });
});