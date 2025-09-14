# CypressAutomation Project

## Overview

This project demonstrates end-to-end test automation using [Cypress](https://www.cypress.io/) for web applications. It follows the Page Object Model (POM) design pattern for maintainability and scalability. The framework supports API testing, database integration, Excel file operations, BDD with Cucumber, and advanced reporting.

---

## Folder Structure

```
CypressAutomation/
├── cypress/
│   ├── e2e/                  # Test specs (including BDD and Studio tests)
│   ├── support/
│   │   └── pageObjects/      # Page Object classes
│   └── fixtures/             # Test data files
├── cypress.config.js         # Cypress configuration and plugins
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## Features

- **Page Object Model:** All UI actions are abstracted into page object classes for reusability.
- **BDD Support:** Write tests in Gherkin syntax using Cucumber preprocessor.
- **API Testing:** Includes JWT authentication and API-driven login flows.
- **Database Integration:** Connect and query SQL Server databases.
- **Excel Operations:** Read and write Excel files using JavaScript.
- **Reporting:** Generates Mochawesome HTML reports.
- **Cypress Studio:** Record and refactor tests visually.

---

## Setup Instructions

1. **Install Node.js**  
   Download and install [Node.js](https://nodejs.org/).

2. **Clone the Repository**  
   ```
   git clone <your-repo-url>
   cd CypressAutomation
   ```

3. **Install Dependencies**  
   ```
   npm install
   ```

4. **Configure Environment Variables**  
   Update `cypress.config.js` with your URLs, credentials, and database details.

5. **Run Tests**  
   - Open Cypress UI:  
     ```
     npx cypress open
     ```
   - Run tests headlessly:  
     ```
     npx cypress run
     ```

---

## Usage

- **Test Specs:**  
  Place your test files in `cypress/e2e/`.
- **Page Objects:**  
  Add or update page object classes in `cypress/support/pageObjects/`.
- **Test Data:**  
  Store fixture files in `cypress/fixtures/`.

---

## Plugins & Integrations

- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [cypress-mochawesome-reporter](https://github.com/lucasfeliciano/cypress-mochawesome-reporter)
- [cypress-sql-server](https://www.npmjs.com/package/cypress-sql-server)
- [exceljs](https://www.npmjs.com/package/exceljs)
- [neat-csv](https://www.npmjs.com/package/neat-csv)

---

## Troubleshooting

- **Node.js modules not found:**  
  Ensure all dependencies are installed with `npm install`.
- **Cypress config errors:**  
  Use ES module `import` statements in `cypress.config.js`.
- **Test failures:**  
  Check selectors and test data for accuracy.

---

## Author

Created by Channa Kumara  
Feel free to contribute or raise issues!

---
