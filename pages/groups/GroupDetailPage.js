const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class GroupDetailPage {
  constructor(page) {
    this.page = page;
    this.groupNameField = page.locator(SELECTORS.groupNameDetail);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-dreamsave-group\//, {
      timeout: TIMEOUTS.navigation,
    });
    await this.groupNameField.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
  }

  async expectGroupDetailName(expectedName) {
    await expect(this.groupNameField).toHaveText(expectedName, {
      timeout: TIMEOUTS.default,
    });
  }
}

module.exports = { GroupDetailPage };
