

describe('TS 001', () => 
{
  it('TC 001', () => 
  {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.title().should('eq','OrangeHRM')
  })

  it('TC 002', () => 
  {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get("button[type='submit']").click()
    cy.xpath("//h6[text()='Dashboard']").contains("Dashboard")
  })
})