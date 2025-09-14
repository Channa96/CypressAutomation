//Read & write excel document using only javascript - not using any cypress plugin
const ExcelJs = require("exceljs");

//async function must use whenever we use await keyword
//Write into excel file
async function writeExcelFile(searchText,replaceText,change,filePath) {
    //load workbook
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath); 
    const workSheet = workBook.getWorksheet("Sheet1")
    const outPut = await readExcelFile(workSheet,searchText);
    //Write into excel
    const cell = workSheet.getCell(outPut.row, outPut.col+change.colChange);
    cell.value = replaceText
    workBook.xlsx.writeFile(filePath);

}
//Read excel file
async function readExcelFile(workSheet,searchText) {
    let outPut = {row:0, col:0};
    //Read from excel
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
            if(cell.value === searchText){
                console.log(rowNumber)
                console.log(colNumber)
                //store row & col number into the outPut object
                outPut.row = rowNumber;
                outPut.col = colNumber;
            }
        })
    })
    return outPut;
}
//Provide search text, replace text, row change, col change & file path
writeExcelFile("Janitha","QA",{rowChange:0, colChange:2},"C:/Users/Channa.J/Downloads/sample_test_data.xlsx");
