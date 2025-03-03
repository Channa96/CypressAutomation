describe('TS 001', () => 
    {
      it('implicit assertions', () => 
      {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.title().should('eq','OrangeHRM')
      })
    
    })