# Copilot / AI agent quick guidance — Automation_Pet_Project_Playwright

TL;DR
- This is a Playwright JavaScript/e2e project using Page Object Model (Pages/) and `@playwright/test`.
- Core flow: `tests/setup/auth.setup.js` creates a storage state (auth file), `playwright.config.js` defines two projects: `setup` and `e2e` (e2e depends on setup). The `e2e` project loads a saved `storageState` and executes the real tests in `tests/*.spec.js`.
- Environment variables (via `.env`) drive the `BASE_FRONT_URL` and user credentials (`USER_LOGIN`, `USER_PASSWORD`). The project expects you to use a `.env` file (or environment) to run tests locally.

Key files and patterns
- `playwright.config.js`
  - `testDir: './tests'`, `reporter: 'html'`, `testIdAttribute: 'data-qa'`.
  - Projects: `setup` and `e2e`. `setup` is the first project and `e2e` depends on it and uses `storageState: path.join(__dirname, '.auth/user.json')` (root `.auth`).
- `tests/setup/auth.setup.js`
  - Produces a `user.json` via `page.context().storageState({path: authFile})` and uses `process.env.USER_LOGIN` and `process.env.USER_PASSWORD`.
  - Note: It writes to `tests/.auth/user.json`. Check the path mismatch with `playwright.config.js` (root vs tests/.auth). Confirm or unify storageState path.
- `tests/*.spec.js`
  - Tests follow Playwright `test.describe` and `test()` patterns and use `expect` from `@playwright/test`.
  - Example: `tests/mainPage.spec.js` uses page-objects: `new MainPage(page)`.
- `Pages/` directory (Page Object Model)
  - `BasePage.js`: common base with `openStartPage` and standard constructor `(page, url)`.
  - `MainPage.js`, `LoginPage.js`, `RegistrationPage.js`: each class extends `BasePage`. Use `page.locator`, `getByTestId`, and `getByRole` for selectors.
  - Keep changes to POMs in `Pages/` and reuse them in specs.

Environment & credential conventions
- `dotenv` is used in `playwright.config.js`. Put environment variables in a `.env` file at repo root. Minimal example:
  BASE_FRONT_URL=https://automationexercise.com
  USER_LOGIN=example@mail.test
  USER_PASSWORD=MyPassword123

Essential developer workflows (commands)
- Install dependencies
```bash
npm install
npx playwright install
```
- Run the setup project (creates `storageState`):
```bash
npx playwright test --project=setup
```
- Run only e2e tests (depends on previously created storage state):
```bash
npx playwright test --project=e2e
```
- Run all tests:
```bash
npx playwright test
```
- Run a specific test file:
```bash
npx playwright test tests/mainPage.spec.js
```
- Run in headed or debug mode (visual mode):
```bash
npx playwright test --headed
PWDEBUG=1 npx playwright test
```
- Show report:
```bash
npx playwright show-report
```
- Show trace (useful when playwright configured `trace`):
```bash
npx playwright show-trace <trace.zip>
```

Patterns & conventions to follow
- Page Object Model: Add new UI locators or actions to `Pages/`. Tests should use POM instances (example in `tests/mainPage.spec.js`).
- Use `getByTestId` for stable selectors: `playwright.config.js` sets `testIdAttribute: 'data-qa'` — prefer `getByTestId('foo')` or `getByRole(...)` where applicable.
- Use `getByRole` for semantic queries (Buttons, Links, Headings, etc.). This increases resilience for visual changes.
- Naming conventions: Page classes are PascalCase in `Pages/`. Test files are placed inside `tests/` and end with `.spec.js`.
- Storage state: the setup test saves auth state; e2e uses it via `storageState`. Ensure the path used by setup and config are the same (root `.auth/` vs `tests/.auth/`).

Common pitfalls and gotchas
- There are a few typos / broken code fragments (e.g., `await page.get` in `tests/setup/auth.setup.js` and `this.signUpLoginButton = page.locator('i.fa fa-lock')` missing a dot in class selector). Don't attempt to refactor or fix large behavior without running tests and validating.
- Mismatched storageState paths: `setup` writes to `tests/.auth/user.json` while `playwright.config.js` expects `.auth/user.json` in project root; ensure these match or update the path.
- `package.json` currently has an empty `scripts` object; running commands rely on `npx playwright ...` (explicit commands in the file might be helpful).

How to modify or add new tests
1. Add new UI actions to a `Pages/*.js` page object, following the existing style (constructor accepts `page[, url]`, store locators on `this` and add methods that operate on them). See `MainPage.js` and `LoginPage.js` for examples.
2. Author a test using `test`, `expect` and create or instantiate your POM: `const mainPage = new MainPage(page);`
3. Use `getByTestId` or `getByRole` for selectors. Example:
```js
const login = new LoginPage(page, process.env.BASE_FRONT_URL);
await login.userLogin(process.env.USER_LOGIN, process.env.USER_PASSWORD);
```
4. Add test to `tests/` and, if auth is necessary, ensure `tests/setup/auth.setup.js` creates a storage state for it.

Test code examples and patterns to follow
- Creating a Page Object (following existing style):
```js
export class ExamplePage extends BasePage {
  constructor(page, url) {
    super(page, url);
    this.someButton = page.getByRole('button', { name: 'Do Something' });
  }
  async doSomething() {
    await this.someButton.click();
  }
}
```
- Using getByTestId (Playwright config uses `data-qa`):
```js
await page.getByTestId('login-email').fill(process.env.USER_LOGIN);
```

What to ask when unsure
- If the POM file and tests use different locator styles or the same props are present twice (e.g., `logoMainPage` defined twice in `MainPage.js`), ask the repository maintainer which pattern to prefer before changing.
- Confirm the intended storage state path (root `.auth/` or `tests/.auth/`) and whether the `setup` step needs to be restructured.
- If tests rely on a specific page structure that isn't present at runtime (failing locators), ask if the tested site is under control or if a stub/mock/alternate environment is expected.

Useful local debugging commands
- Run a single test and keep the browser open:
```bash
PWDEBUG=1 npx playwright test tests/mainPage.spec.js
```
- Run with `--headed` and slow mode to observe actions:
```bash
npx playwright test --headed --project=e2e --timeout=60s
```

Files to reference when performing tasks
- `playwright.config.js` — test runner configuration, `testIdAttribute`, projects and storageState.
- `tests/setup/auth.setup.js` — setup (authentication) test that saves storage state.
- `tests/mainPage.spec.js` — example of test using Page Objects and expectations.
- `Pages/BasePage.js`, `Pages/MainPage.js`, `Pages/LoginPage.js` — Page Object Model code to follow or extend.

If you want a changelist: I can also do one of the following next steps based on your preference:
1) Create a `.env.example` and add `npm` scripts for common flows (install/test/report). 
2) Fix the storageState path mismatch and test failing code snippets.
3) Add a `scripts` section to `package.json` to simplify developer flows.

Request for clarifications
- Would you like me to standardize/fix the storageState path (`.auth/user.json`) so `setup` and `playwright.config.js` match, or would you prefer the path be adjusted to keep tests working with the current `tests/.auth` layout?
- Should I add helper npm scripts (e.g., `npm run test`, `npm run test:e2e`, `npm run test:setup`) and `npx playwright install` to `package.json`?

Thanks — I can update the repository with either a new `.github/copilot-instructions.md` or merge the new content into an existing file if required. Any questions or preferences about how strict you want the style rules (selector & path normalization) to be? 
