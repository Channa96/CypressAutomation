 describe('Dealing excel with cypress',()=>
{
    it('Download, Read & write excel file',()=>
    {
        const replaceValue = 350;
        const searchTextValue = Apple;
        const DownloadFilePath = Cypress.config("fileServerFolder") + "/cypress/downloads/download.xlsx";
        //Visit the url
        cy.visit("https://rahulshettyacademy.com/upload-download-test/index.html");
        //Download the excel file
        cy.get("#downloadButton").click();
        //call the task to write into excel file
        cy.task('writeExcelFile', {searchText:searchTextValue, replaceText:replaceValue, change:{rowChange:0, colChange:2}, filePath:DownloadFilePath});

        //Upload the modified excel file
        cy.get("#fileinput").selectFile(DownloadFilePath);

        //verify the uploaded file
        cy.contains(searchTextValue).parent().parent().find("#cell-4-undefined").should("have.text",replaceValue);
    });
})