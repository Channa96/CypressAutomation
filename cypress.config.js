import { defineConfig } from "cypress";
import browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';
import sqlServer from 'cypress-sql-server';
import excelToJson from "convert-excel-to-json";
import fs from "fs";

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

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions)),
  );

  mochawesome(on);
  return config;
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
    //specPattern:"cypress/e2e/BDD/*.feature",
    specPattern:"cypress/e2e/*"
  }
});