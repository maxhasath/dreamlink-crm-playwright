const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");
const { BasePage } = require("../BasePage");

class GroupsPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.locator(SELECTORS.groupsPageTitle);
    this.groupListRow = page.locator(SELECTORS.deskListRow);
    this.loggedInUser = page.locator(SELECTORS.loggedInUser);
    this.recordCount = page.locator(SELECTORS.recordCount);
  }

  async open() {
    await this.goto("/desk/dl-dreamsave-group");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-dreamsave-group/, {
      timeout: TIMEOUTS.navigation,
    });
    await this.expectVisible(this.pageTitle);
  }

  async expectLoggedInUser(displayName) {
    await expect(this.loggedInUser).toContainText(displayName, {
      ignoreCase: true,
    });
  }

  async expectGroupListVisible() {
    await expect(this.groupListRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectDefaultPageSize(expectedCount) {
    // Wait for loading indicator to be hidden
    await this.page
      .locator(SELECTORS.deskLoadingIndicator)
      .waitFor({ state: "hidden", timeout: TIMEOUTS.default });

    // Assert count text
    await expect(this.recordCount).toContainText("20 of", {
      timeout: TIMEOUTS.default,
    });

    // Assert rendered row count
    const rows = await this.groupListRow.count();
    expect(rows).toBe(expectedCount);
  }

  async clickFirstGroup() {
    const firstGroupLink = this.groupListRow
      .first()
      .locator(SELECTORS.groupNameLink);
    await firstGroupLink.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    const groupName = await firstGroupLink.innerText();
    await firstGroupLink.click();
    await this.page.waitForLoadState("domcontentloaded");
    return groupName.trim();
  }
}

module.exports = { GroupsPage };
