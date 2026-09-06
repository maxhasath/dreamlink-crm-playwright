const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { GroupsPage } = require("../../pages/groups/GroupsPage");
const { UserProfilePage } = require("../../pages/users/UserProfilePage");
const { getCredentials } = require("../../util/helpers");

test.describe("DreamLink CRM - User Profile", () => {
  let loginPage;
  let groupsPage;
  let userProfilePage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupsPage = new GroupsPage(page);
    userProfilePage = new UserProfilePage(page, userData.displayName);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await groupsPage.open();
    await groupsPage.expectLoaded();
  });

  test("TC-UP-01 | Logged in user can navigate to their profile and verify Full Name and page title", async ({
    page,
  }) => {
    await userProfilePage.navigateViaUserMenu();
    await userProfilePage.expectLoaded();
    await userProfilePage.expectPageTitleVisible();
    await userProfilePage.expectFullNameVisible();
  });
});
