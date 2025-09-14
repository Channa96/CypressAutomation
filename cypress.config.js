import { defineConfig } from "cypress";
import browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';
import sqlServer from 'cypress-sql-server';
import excelToJson from "convert-excel-to-json";
import fs from "fs";
import ExcelJs from "exceljs";

async function setupNodeEvents(on, config) 
{
  //Database config
  config.db = {
    userName: "YourDataBaseName",
    password: "YourPassword",
    server: "YourServerName",
    options: {
        database: "YourDatabaseName",
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
}
  await addCucumberPreprocessorPlugin(on, config);
  // sql server plugin
  const tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  on('task',{
    excelToJsonConvertor(filePath)
    {
      const result = excelToJson({
            source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer
        });
        return result;
    }
  })
  on('task',{
      async writeExcelFile({searchText, replaceText, change, filePath}) 
      {
        const workBook = new ExcelJs.Workbook();
        await workBook.xlsx.readFile(filePath);
        const workSheet = workBook.getWorksheet("Sheet1")
        const outPut = await readExcelFile(workSheet, searchText);
        const cell = workSheet.getCell(outPut.row, outPut.col + change.colChange);
        cell.value = replaceText
        return workBook.xlsx.writeFile(filePath).then(() => {
            return true;
        })
        .catch((err) => {
            throw false;
        });
      }
    })

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  mochawesome(on);
  return config;
}

async function readExcelFile(workSheet,searchText) {
    let outPut = {row:0, col:0};
    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === searchText){
                outPut.row = rowNumber;
                outPut.col = colNumber;
            }
        })
    })
    return outPut;
}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  env:{
    url : "https://rahulshettyacademy.com",
    userName: "rahulshettyacademy",
    passWord: "learning",
    firstProductName: "Nokia Edge",
    secondProductName: "iphone X"
  },
  projectId: "c5psr2",
  e2e: {
    setupNodeEvents,
    experimentalStudio: true,
    //specPattern:"cypress/e2e/BDD/*.feature",
    //specPattern:"cypress/e2e/*"
    //specPattern:"cypress/e2e/Excel/*"
    specPattern:"cypress/e2e/RecordTestByCypress/*"
  }
});