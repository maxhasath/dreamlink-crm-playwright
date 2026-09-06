const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { GroupsPage } = require("../../pages/groups/GroupsPage");
const { GroupDetailPage } = require("../../pages/groups/GroupDetailPage");
const { GroupsSearchBar } = require("../../pages/groups/GroupsSearchBar");
const { getCredentials } = require("../../util/helpers");
const groupsData = require("../../data/groups.json");

test.describe("DreamLink CRM - DreamSave Groups", () => {
  let loginPage;
  let groupsPage;
  let groupDetailPage;
  let groupsSearchBar;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupsPage = new GroupsPage(page);
    groupDetailPage = new GroupDetailPage(page);
    groupsSearchBar = new GroupsSearchBar(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await groupsPage.open();
    await groupsPage.expectLoaded();
  });

  test("TC-DS-01 | DreamSave Groups list displays 20 records by default", async ({
    page,
  }) => {
    await groupsPage.expectDefaultPageSize(20);
  });

  test("TC-DS-02 | Clicking the first group navigates to its detail page with correct group name", async ({
    page,
  }) => {
    const selectedGroupName = await groupsPage.clickFirstGroup();
    await groupDetailPage.expectLoaded();
    await groupDetailPage.expectGroupDetailName(selectedGroupName);
  });

  test("TC-DS-03 | Valid search returns exact matching group", async ({
    page,
  }) => {
    const { keyword, expectedName, expectedCount } = groupsData.validSearch;
    await groupsSearchBar.searchByGroupName(keyword);
    await groupsSearchBar.expectResultCount(expectedCount);
    await groupsSearchBar.expectGroupVisible(expectedName);
  });

  test("TC-DS-04 | Search with broad keyword returns multiple results", async ({
    page,
  }) => {
    const { keyword } = groupsData.multipleSearch;
    await groupsSearchBar.searchByGroupName(keyword);
    await groupsSearchBar.expectMultipleResults();
  });

  test("TC-DS-05 | Invalid search displays no results message", async ({
    page,
  }) => {
    const { keyword } = groupsData.invalidSearch;
    await groupsSearchBar.searchByGroupName(keyword);
    await groupsSearchBar.expectNoResults();
  });
});
