const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { GroupsPage } = require("../../pages/groups/GroupsPage");
const { getCredentials } = require("../../util/helpers");
const users = require("../../data/users.json");

test.describe("DreamLink CRM - Login", () => {
  let loginPage;
  let groupsPage;
  const userData = getCredentials();
  const invalidData = users.invalid;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupsPage = new GroupsPage(page);
    await loginPage.open();
  });

  test("TC-DL-01 | Landing page loads and shows Proceed to Login button", async ({
    page,
  }) => {
    await expect(loginPage.proceedToLoginBtn).toBeVisible();
  });

  test("TC-DL-02 | Clicking Proceed to Login redirects to Keycloak", async ({
    page,
  }) => {
    await loginPage.clickProceedToLogin();
    await expect(page).toHaveURL(/keycloak/);
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInBtn).toBeVisible();
  });

  test("TC-DL-03 | Valid credentials log user in and DreamLink app is visible on desk", async ({
    page,
  }) => {
    await loginPage.login(userData.username, userData.password);
    await loginPage.expectLoginSuccessful();
  });

  test("TC-DL-04 | Invalid credentials show error on Keycloak page", async ({
    page,
  }) => {
    await loginPage.loginWithInvalidCredentials(
      invalidData.username,
      invalidData.password,
    );
  });

  test("TC-DL-05 | DreamSave Groups page loads and shows logged in user", async ({
    page,
  }) => {
    await loginPage.login(userData.username, userData.password);
    await groupsPage.open();
    await groupsPage.expectLoaded();
    await groupsPage.expectGroupListVisible();
    await groupsPage.expectLoggedInUser(userData.displayName);
  });

  test("TC-DL-06 | Logged in user can successfully log out and is redirected to login page", async ({
    page,
  }) => {
    await loginPage.login(userData.username, userData.password);
    await page.goto("/desk/dl-dreamsave-group");
    await page.waitForLoadState("domcontentloaded");
    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });
});
