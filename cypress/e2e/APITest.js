describe("API Test", () => {
    it("GET Books", () => {
        cy.request('POST', 'https://216.10.245.166/Library/Addbook.php',{
           "name": "Learn Appium Automation with Java",
           "isbn": "cjk",
           "aisle": "227",
           "author": "Channa"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('Msg', 'successfully added');
        });
    });
});