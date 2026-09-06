const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const {
  EligibilityCriteriaPage,
} = require("../../pages/eligibilityCriteria/EligibilityCriteriaPage");
const {
  CriterionDetailPage,
} = require("../../pages/eligibilityCriteria/CriterionDetailPage");
const {
  CriteriaSearchBar,
} = require("../../pages/eligibilityCriteria/CriteriaSearchBar");
const {
  AddCriterionPage,
} = require("../../pages/eligibilityCriteria/AddCriterionPage");
const { getCredentials } = require("../../util/helpers");
const criteriaData = require("../../data/criteria.json");
const addCriterionData = require("../../data/addCriterion.json");

test.describe("DreamLink CRM - Eligibility Criteria", () => {
  let loginPage;
  let eligibilityCriteriaPage;
  let criterionDetailPage;
  let criteriaSearchBar;
  let addCriterionPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    eligibilityCriteriaPage = new EligibilityCriteriaPage(page);
    criterionDetailPage = new CriterionDetailPage(page);
    criteriaSearchBar = new CriteriaSearchBar(page);
    addCriterionPage = new AddCriterionPage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await eligibilityCriteriaPage.open();
    await eligibilityCriteriaPage.expectLoaded();
  });

  test("TC-EC-01 | Eligibility Criteria page loads via sidebar navigation and list is populated", async ({
    page,
  }) => {
    await eligibilityCriteriaPage.clickEligibilityCriteriaNav();
    await eligibilityCriteriaPage.expectLoaded();
    await eligibilityCriteriaPage.expectCriteriaListPopulated();
  });

  test("TC-EC-02 | Clicking the first criterion navigates to its detail page with non-empty Attribute and Group Type", async ({
    page,
  }) => {
    await eligibilityCriteriaPage.clickFirstCriterion();
    await criterionDetailPage.expectLoaded();
    await criterionDetailPage.expectAttributeNotEmpty();
    await criterionDetailPage.expectGroupTypeNotEmpty();
  });

  test("TC-EC-03 | Valid search returns exactly one matching criterion", async ({
    page,
  }) => {
    const { keyword, expectedRowCount } = criteriaData.validSearch;
    await criteriaSearchBar.searchByCriterionName(keyword);
    await criteriaSearchBar.expectExactRowCount(expectedRowCount);
  });

  test("TC-EC-04 | Invalid search displays no matching criteria message", async ({
    page,
  }) => {
    const { keyword } = criteriaData.invalidSearch;
    await criteriaSearchBar.searchByCriterionName(keyword);
    await criteriaSearchBar.expectNoResults();
  });

  test("TC-EC-05 | New criterion can be created and appears in the search results", async ({
    page,
  }) => {
    const uniqueName = `${addCriterionData.newCriterion.baseName}_${Date.now()}`;
    const { description } = addCriterionData.newCriterion;

    await addCriterionPage.clickCreateCriterion();
    await addCriterionPage.fillCriterionName(uniqueName);
    await addCriterionPage.fillDescription(description);
    await addCriterionPage.saveCriterion();
    await addCriterionPage.expectSuccessToast(uniqueName);

    await eligibilityCriteriaPage.expectLoaded();
    await criteriaSearchBar.searchByCriterionName(uniqueName);
    await criteriaSearchBar.expectExactRowCount(1);
  });
});
