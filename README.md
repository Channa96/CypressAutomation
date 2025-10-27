# CypressAutomation Project

## Overview

This project demonstrates end-to-end test automation using Cypress. It follows the Page Object Model (POM) and includes examples for:
- UI tests (POM)
- BDD (Cucumber)
- API/JWT authentication
- Reading/writing Excel
- DB access (SQL Server)
- Reporting (Mochawesome)

---

## Prerequisites (Windows)

- Node.js (LTS). Verify:
  ```
  node -v
  npm -v
  npx -v
  ```
- If `npx` or `npm` PowerShell scripts are blocked, either:
  - Run PowerShell as Administrator and set:
    ```
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
  - Or use Command Prompt (cmd.exe) instead of PowerShell.

---

## Install

1. From project root:
   ```
   npm install
   ```
   - If `npm install` fails complaining about `neat-csv@5.0.1`, open `package.json` and change the version to a valid release (for example `"neat-csv": "^6.0.0"`), then remove lockfile and node_modules and run `npm install` again:
   ```
   del package-lock.json
   rmdir /s /q node_modules
   npm install
   ```

2. Install Cypress binary (first time):
   ```
   npx cypress install
   ```

---

## Common fixes / notes

- "npx not recognized": install Node.js and restart the terminal/VS Code.
- "Running scripts is disabled": set PowerShell execution policy or use cmd.exe.
- Cypress binary missing -> run `npx cypress install`.
- `cypress.config.js` must be an ES module (uses `import`). Do not use `require()` in that file. Example:
  ```javascript
  import { defineConfig } from "cypress";
  import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
  import sqlServer from "cypress-sql-server";
  // ...
  export default defineConfig({ e2e: { setupNodeEvents }});
  ```
- When using `@badeball/cypress-cucumber-preprocessor`, do not register conflicting `"file:preprocessor"` handlers. Use `addCucumberPreprocessorPlugin(on, config)` and follow the plugin docs for event handlers.

- `promisify is not a function` / `neat-csv` browser error: Node-only modules cannot run in the browser test context. Parse CSV in Node via `cy.task` (see example below).

---

## CSV parsing (recommended pattern)

Add a task in `cypress.config.js` (Node context):
```javascript
// inside setupNodeEvents(on, config)
import neatCSV from 'neat-csv';
import fs from 'fs';

on('task', {
  async parseCSV(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    return neatCSV(text);
  }
});
```

Call it from tests:
```javascript
const filePath = Cypress.config('fileServerFolder') + '/cypress/downloads/order.csv';
cy.task('parseCSV', filePath).then((rows) => {
  // assertions using rows
});
```

---

## Project structure

```
cypress/
  e2e/                       # test specs (features + .cy.js)
  fixtures/                   # test data
  support/
    pageObjects/              # Page Object classes (HomePage, ProductPage, etc.)
cypress.config.js             # Cypress config (ESM)
package.json
README.md
```

- Page objects live in `cypress/support/pageObjects/`.
- BDD feature files live in `cypress/e2e/BDD/`.

---

## Run tests

- Open interactive runner:
  ```
  npx cypress open
  ```
- Run headless:
  ```
  npx cypress run
  ```
- Run single spec:
  ```
  npx cypress run --spec "cypress/e2e/RecordTestByCypress/CypressStudioTest.js"
  ```

---

## Helpful npm scripts (add these to package.json)

```json
"scripts": {
  "cypress:open": "cypress open",
  "cypress:install": "cypress install",
  "test": "cypress run"
}
```

---

## Troubleshooting

- If config file errors reference `require is not defined`, convert all `require()` to `import` in `cypress.config.js`.
- If cucumber plugin reports "Unexpected state in beforeSpecHandler", remove duplicate event handlers and follow the preprocessor docs: https://github.com/badeball/cypress-cucumber-preprocessor
- If a file import fails (module not found), verify relative paths and that the target file exists (watch casing and relative `..` levels).

---

## Author

Created by Channa Jayawickrama

Contributions and improvements welcome.// filepath: c:\Personal Space\AutomationPractice\CypressProjects\CypressAutomation\CypressAutomation\README.md