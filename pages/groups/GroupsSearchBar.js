const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");
const groupsData = require("../../data/groups.json");

class GroupsSearchBar {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(SELECTORS.groupSearchInput);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
    this.recordCount = page.locator(SELECTORS.recordCount);
    this.noResultsMessage = page.locator(SELECTORS.deskNoResultsMessage);
  }

  async searchByGroupName(keyword) {
    await this.searchInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.searchInput.fill(keyword);
    await this.loadingIndicator.waitFor({
      state: "hidden",
      timeout: TIMEOUTS.default,
    });
  }

  async expectResultCount(expectedCount) {
    await expect(this.recordCount).toContainText(expectedCount, {
      timeout: TIMEOUTS.default,
    });
  }

  async expectGroupVisible(groupName) {
    const groupLink = this.page.locator(SELECTORS.groupNameLink, {
      hasText: groupName,
    });
    await expect(groupLink).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async expectMultipleResults() {
    const rows = this.page.locator(SELECTORS.deskListRow);
    const count = await rows.count();
    expect(count).toBeGreaterThan(1);
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.noResultsMessage).toHaveText(groupsData.noResultsMessage);
  }
}

module.exports = { GroupsSearchBar };
