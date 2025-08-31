const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  env:{
    url : "https://rahulshettyacademy.com",
    userName: "rahulshettyacademy",
    passWord: "learning",
    firstProductName: "Nokia Edge",
    secondProductName: "iphone X"
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
