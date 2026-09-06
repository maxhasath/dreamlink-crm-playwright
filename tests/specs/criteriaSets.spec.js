const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const {
  EligibilityCriteriaPage,
} = require("../../pages/eligibilityCriteria/EligibilityCriteriaPage");
const {
  CriteriaSetsPage,
} = require("../../pages/eligibilityCriteria/CriteriaSetsPage");
const {
  AddCriteriaSetPage,
} = require("../../pages/eligibilityCriteria/AddCriteriaSetPage");
const { getCredentials } = require("../../util/helpers");
const criteriaSetData = require("../../data/criteriaSet.json");

test.describe("DreamLink CRM - Eligibility Criteria Sets", () => {
  let loginPage;
  let eligibilityCriteriaPage;
  let criteriaSetsPage;
  let addCriteriaSetPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    eligibilityCriteriaPage = new EligibilityCriteriaPage(page);
    criteriaSetsPage = new CriteriaSetsPage(page);
    addCriteriaSetPage = new AddCriteriaSetPage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await eligibilityCriteriaPage.open();
    await eligibilityCriteriaPage.expectLoaded();
    await eligibilityCriteriaPage.clickCriteriaSetsTab();
  });

  test("TC-ECS-01 | New criteria set can be created with 7 selected criteria and shows success toast", async ({
    page,
  }) => {
    const uniqueName = `${criteriaSetData.newCriteriaSet.baseName}_${Date.now()}`;
    await criteriaSetsPage.clickCreateCriteriaSet();
    await addCriteriaSetPage.fillCriteriaSetName(uniqueName);
    await addCriteriaSetPage.selectCriteria(
      criteriaSetData.newCriteriaSet.criteriaCount,
    );
    await addCriteriaSetPage.saveCriteriaSet();
    await addCriteriaSetPage.expectSuccessToast();
    await criteriaSetsPage.expectCriteriaSetListPopulated();
    await criteriaSetsPage.searchBySetName(uniqueName);
    await criteriaSetsPage.expectExactRowCount(1);
  });

  test("TC-ECS-02 | Criteria Sets list is populated after navigating via tab", async ({
    page,
  }) => {
    await criteriaSetsPage.expectCriteriaSetListPopulated();
  });

  test("TC-ECS-03 | Valid search returns exactly one matching criteria set", async ({
    page,
  }) => {
    const { keyword, expectedRowCount } = criteriaSetData.validSearch;
    await criteriaSetsPage.searchBySetName(keyword);
    await criteriaSetsPage.expectExactRowCount(expectedRowCount);
  });

  test("TC-ECS-04 | Invalid search displays no matching criteria sets message", async ({
    page,
  }) => {
    const { keyword } = criteriaSetData.invalidSearch;
    await criteriaSetsPage.searchBySetName(keyword);
    await criteriaSetsPage.expectNoResults();
  });
});
