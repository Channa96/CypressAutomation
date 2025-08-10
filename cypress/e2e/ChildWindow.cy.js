describe('HandleChildWindow', ()=>
{
    it('TC_ChildWindows', ()=>
    {
        //Cypress does not support automation for separate windows.So, 
        //We need to find a workaround to open the child window in currunt window in order to automate.
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        //Using jquary we can invoke the child window in current window('.invoke('removeAttr')')
        cy.get('#opentab').invoke('removeAttr','target').click();

        //cypress will not support when we navigate totally different domain and do somthin on that domain.
        //So, we need to some workaround as follows
        cy.origin("https://www.qaclickacademy.com",()=>
        {
            cy.get("#navbarSupportedContent a[href*='about']").click();//#navbarSupportedContent > ul > li:nth-child(4) > a
            cy.get('.mt-50 h2').should('contain','QAClick Academy');
        })

    })

    it('TC_HandleSibling',()=>
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        //Loop for find the desired value from web table
        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => 
        {
            //declairing a veriable
            const name=$e1.text()
            if(name.includes("Python"))
            {
                //.next() function use for navigate to the immidiate sibling element from the desired element
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
                {
                    //priceText is a variable
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
 
        })
    })

    it('TC_MouseHover',()=>
    {
        //cypress also not support for MouseHover but using jquery we can find a way
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')

        //cypress can click hidden elements. use {force:true} method
        cy.contains('Top').click({force:true})
        cy.url().should('include','top')
    })
})