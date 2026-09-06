const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class UserDetailPage {
  constructor(page) {
    this.page = page;
    this.fullNameField = page.locator(SELECTORS.userFullName);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-user\//, {
      timeout: TIMEOUTS.navigation,
    });
    await this.fullNameField.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
  }

  async expectFullNameNotEmpty() {
    const fullName = await this.fullNameField.innerText();
    expect(fullName.trim()).not.toBe("");
  }
}

module.exports = { UserDetailPage };
