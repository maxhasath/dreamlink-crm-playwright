const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { UsersPage } = require("../../pages/users/UsersPage");
const { UserDetailPage } = require("../../pages/users/UserDetailPage");
const { UsersSearchBar } = require("../../pages/users/UsersSearchBar");
const { getCredentials } = require("../../util/helpers");
const usersData = require("../../data/users.json");

test.describe("DreamLink CRM - Users", () => {
  let loginPage;
  let usersPage;
  let userDetailPage;
  let usersSearchBar;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);
    userDetailPage = new UserDetailPage(page);
    usersSearchBar = new UsersSearchBar(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await usersPage.open();
    await usersPage.expectLoaded();
  });

  test("TC-US-01 | Users page loads via sidebar navigation and list is populated", async ({
    page,
  }) => {
    await usersPage.clickUsersNav();
    await usersPage.expectLoaded();
    await usersPage.expectUserListPopulated();
  });

  test("TC-US-02 | Clicking the first user navigates to their detail page with a non-empty Full Name", async ({
    page,
  }) => {
    await usersPage.clickFirstUser();
    await userDetailPage.expectLoaded();
    await userDetailPage.expectFullNameNotEmpty();
  });

  test("TC-US-03 | Valid email search returns exactly one matching user", async ({
    page,
  }) => {
    const { keyword, expectedCount } = usersData.validSearch;
    await usersSearchBar.searchByEmail(keyword);
    await usersSearchBar.expectResultCount(expectedCount);
    await usersSearchBar.expectExactRowCount(1);
  });

  test("TC-US-04 | Invalid search keyword displays no results message", async ({
    page,
  }) => {
    const { keyword } = usersData.invalidSearch;
    await usersSearchBar.searchByEmail(keyword);
    await usersSearchBar.expectNoResults();
  });
});
