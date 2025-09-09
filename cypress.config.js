import { defineConfig } from "cypress";
import browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';

async function setupNodeEvents(on, config) 
{
  await addCucumberPreprocessorPlugin(on, config);

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
    specPattern:"cypress/e2e/BDD/*.feature",
  }
});