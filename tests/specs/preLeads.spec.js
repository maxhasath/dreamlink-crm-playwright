const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { PreLeadsPage } = require("../../pages/preLeads/PreLeadsPage");
const { PreLeadDetailPage } = require("../../pages/preLeads/PreLeadDetailPage");
const { PreLeadsSearchBar } = require("../../pages/preLeads/PreLeadsSearchBar");
const { getCredentials } = require("../../util/helpers");
const preLeadsData = require("../../data/preLeads.json");

test.describe("DreamLink CRM - Pre Leads", () => {
  let loginPage;
  let preLeadsPage;
  let preLeadDetailPage;
  let preLeadsSearchBar;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    preLeadsPage = new PreLeadsPage(page);
    preLeadDetailPage = new PreLeadDetailPage(page);
    preLeadsSearchBar = new PreLeadsSearchBar(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await preLeadsPage.open();
    await preLeadsPage.expectLoaded();
  });

  test("TC-PL-01 | Pre Leads list page loads and displays at least one pre lead record", async ({
    page,
  }) => {
    await preLeadsPage.expectPreLeadListNotEmpty();
  });

  test("TC-PL-02 | Clicking the first pre lead navigates to detail page with Number, Saving Group, Status and Tasks list all populated", async ({
    page,
  }) => {
    await preLeadsPage.clickFirstPreLead();
    await preLeadDetailPage.expectLoaded();
    await preLeadDetailPage.expectPreLeadNumberNotEmpty();
    await preLeadDetailPage.expectSavingGroupNotEmpty();
    await preLeadDetailPage.expectStatusNotEmpty();
    await preLeadDetailPage.expectTasksListNotEmpty();
  });

  test("TC-PL-03 | Search by pre lead number returns exactly 1 result containing the searched keyword", async ({
    page,
  }) => {
    const { keyword, expectedCount } = preLeadsData.preLeadNumberSearch;
    await preLeadsSearchBar.searchByPreLeadNumber(keyword);
    await preLeadsSearchBar.expectResultCount(expectedCount);
    await preLeadsSearchBar.expectPreLeadVisible(keyword);
  });

  test("TC-PL-04 | Search with an invalid pre lead number displays no results message", async ({
    page,
  }) => {
    const { keyword } = preLeadsData.invalidSearch;
    await preLeadsSearchBar.searchByPreLeadNumber(keyword);
    await preLeadsSearchBar.expectNoResults();
  });
});
