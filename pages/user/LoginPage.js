const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.proceedToLoginBtn = page
      .getByRole("link", { name: "Proceed to Login" })
      .first();
    this.usernameInput = page.locator(SELECTORS.usernameInput);
    this.passwordInput = page.locator(SELECTORS.passwordInput);
    this.signInBtn = page.locator(SELECTORS.signInBtn);
    this.loginError = page.locator(SELECTORS.loginError);
    this.dreamLinkApp = page.locator(SELECTORS.dreamLinkApp);
    this.logoutMenuTrigger = page
      .locator(SELECTORS.logoutMenuTrigger)
      .filter({ hasText: "DreamLink" });
    this.logoutMenuItem = page
      .locator(SELECTORS.logoutMenuItem)
      .filter({ hasText: "Logout" });
    this.logoutConfirmBtn = page.locator(SELECTORS.logoutConfirmBtn);
  }

  async open() {
    await this.page.goto("/");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickProceedToLogin() {
    await this.proceedToLoginBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.proceedToLoginBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async submitCredentials(username, password) {
    await this.usernameInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async isLoggedIn() {
    return this.dreamLinkApp.isVisible({ timeout: 3000 }).catch(() => false);
  }

  async login(username, password) {
    if (await this.isLoggedIn()) return;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await this.clickProceedToLogin();
        await this.submitCredentials(username, password);
        await expect(this.dreamLinkApp).toBeVisible({
          timeout: TIMEOUTS.default,
        });
        return;
      } catch (error) {
        if (attempt === 1) throw error;
        await this.page.goto("/");
        await this.page.waitForLoadState("domcontentloaded");
      }
    }
  }

  async loginWithInvalidCredentials(username, password) {
    await this.clickProceedToLogin();
    await this.submitCredentials(username, password);
    await expect(this.loginError).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.loginError).toHaveText("Invalid username or password.");
  }

  async clickDreamLinkApp() {
    await this.dreamLinkApp.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.dreamLinkApp.click(),
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }

  async expectLoginSuccessful() {
    await expect(this.page).toHaveURL(/desk/, { timeout: TIMEOUTS.navigation });
    await expect(this.dreamLinkApp).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async logout() {
    await this.logoutMenuTrigger.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.logoutMenuTrigger.click();
    await this.logoutMenuItem.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.logoutMenuItem.click();
    await this.logoutConfirmBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.logoutConfirmBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectLoggedOut() {
    await expect(this.page).toHaveURL(/\/login/, {
      timeout: TIMEOUTS.navigation,
    });
    await expect(this.proceedToLoginBtn).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }
}

module.exports = { LoginPage };
