const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class UserProfilePage {
  constructor(page, displayName) {
    this.page = page;
    this.userMenuBtn = page.locator(SELECTORS.userProfileMenuBtn);
    this.fullName = page
      .locator(SELECTORS.userProfileFullName)
      .getByText(displayName);
    this.pageTitle = page.locator(SELECTORS.userProfilePageTitle);
  }

  async navigateViaUserMenu() {
    await this.userMenuBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.userMenuBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-user-profile/, {
      timeout: TIMEOUTS.navigation,
    });
  }

  async expectFullNameVisible() {
    await expect(this.fullName).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async expectPageTitleVisible() {
    await expect(this.pageTitle).toBeVisible({ timeout: TIMEOUTS.default });
  }
}

module.exports = { UserProfilePage };
