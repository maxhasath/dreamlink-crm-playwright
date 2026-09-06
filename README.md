# DreamLink CRM — Playwright Automation Suite

End-to-end test automation for the DreamLink CRM platform using Playwright with the Page Object Model (POM).

## Project Structure

crm/
├── common/constants.js # All selectors, timeouts, and defaults
├── data/
│ ├── users.json # Test user data (credentials loaded from env)
│ ├── groups.json # DreamSave Groups test data
│ ├── criteria.json # Eligibility Criteria test data
│ ├── addCriterion.json # Add Criterion form data
│ ├── criteriaSet.json # Criteria Sets test data
├── env/
│ └── qa.env # Environment variables (excluded from git)
├── pages/
│ ├── BasePage.js
│ ├── groups/
│ │ ├── GroupsPage.js
│ │ ├── GroupDetailPage.js
│ │ └── GroupsSearchBar.js
│ ├── users/
│ │ ├── UsersPage.js
│ │ ├── UserDetailPage.js
│ │ ├── UserProfilePage.js
│ │ └── UsersSearchBar.js
│ ├── eligibilityCriteria/
│ │ ├── EligibilityCriteriaPage.js
│ │ ├── CriterionDetailPage.js
│ │ ├── CriteriaSearchBar.js
│ │ ├── CriteriaSetsPage.js
│ │ ├── AddCriterionPage.js
│ │ └── AddCriteriaSetPage.js
│ ├── products/
│ │ └── ProductsPage.js
│ └── user/
│ └── LoginPage.js
├── tests/specs/
│ ├── login.spec.js
│ ├── groups.spec.js
│ ├── users.spec.js
│ ├── userProfile.spec.js
│ ├── eligibilityCriteria.spec.js
│ ├── criteriaSets.spec.js
│ └── products.spec.js
├── util/
│ ├── helpers.js
│ └── loggers.js
└── playwright.config.js


## Test Cases (26 total)

### Login (`login.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-DL-01 | Landing page loads and shows Proceed to Login button |
| TC-DL-02 | Clicking Proceed to Login redirects to Keycloak |
| TC-DL-03 | Valid credentials log user in and DreamLink app is visible |
| TC-DL-04 | Invalid credentials show error on Keycloak page |
| TC-DL-05 | DreamSave Groups page loads and shows logged in user |
| TC-DL-06 | Logged in user can successfully log out |

### DreamSave Groups (`groups.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-DS-01 | Groups list displays 20 records by default |
| TC-DS-02 | Clicking the first group navigates to its detail page |
| TC-DS-03 | Valid search returns exact matching group |
| TC-DS-04 | Search with broad keyword returns multiple results |
| TC-DS-05 | Invalid search displays no results message |

### Users (`users.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-US-01 | Users page loads via sidebar navigation and list is populated |
| TC-US-02 | Clicking the first user navigates to their detail page |
| TC-US-03 | Valid email search returns exactly one matching user |
| TC-US-04 | Invalid search keyword displays no results message |

### User Profile (`userProfile.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-UP-01 | Logged in user can navigate to their profile and verify Full Name |

### Eligibility Criteria (`eligibilityCriteria.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-EC-01 | Eligibility Criteria page loads and list is populated |
| TC-EC-02 | Clicking the first criterion navigates to its detail page |
| TC-EC-03 | Valid search returns exactly one matching criterion |
| TC-EC-04 | Invalid search displays no matching criteria message |
| TC-EC-05 | New criterion can be created and appears in search results |

### Eligibility Criteria Sets (`criteriaSets.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-ECS-01 | New criteria set can be created with 7 criteria and shows success toast |
| TC-ECS-02 | Criteria Sets list is populated after navigating via tab |
| TC-ECS-03 | Valid search returns exactly one matching criteria set |
| TC-ECS-04 | Invalid search displays no matching criteria sets message |

### Products (`products.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-PR-01 | Manage Products page loads and list is populated |

### Add Products (`addProducts.spec.js`)

| ID | Test Case |
|----|-----------|
| TC-PR-02 | Open the Add Product page and verify the page title |
| TC-PR-03 | Create a new Product and verify its creation |
| TC-PR-04 | View the details of an existing Product and verify the displayed information |

## Configuration

**Target Environment:** `https://lk-qa.dreamstartlabs.com`

Credentials are loaded from `env/qa.env` — this file is excluded from git.
Create it locally with:

BASE_URL=https://lk-qa.dreamstartlabs.com
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
TEST_DISPLAY_NAME=Your Name


## Running Tests

```bash
npm ci
npx playwright install

# Run full suite
npm test

# Run headed with single worker
npm run test:headed

# Run individual spec
npm run test:login
npm run test:groups
npm run test:users
npm run test:profile
npm run test:eligibility
npm run test:criteriasets
npm run test:products

# View report
npm run report
```

## Framework Conventions

- All selectors centralised in `common/constants.js`
- All test data in `data/*.json` files — never hardcoded in specs
- Assertions only in `expectXxx()` methods or spec files
- `waitFor({ state: 'visible' })` before interactions
- `waitForLoadState('domcontentloaded')` after navigation
- No `waitForTimeout` anywhere in the suite
- Run with `--workers=1` to avoid Keycloak session conflicts