const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class UsersSearchBar {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(SELECTORS.userSearchInput);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
    this.recordCount = page.locator(SELECTORS.recordCount);
    this.noResultsMessage = page.locator(SELECTORS.deskNoResultsMessage);
    this.userListRow = page.locator(SELECTORS.deskListRow);
  }

  async searchByEmail(keyword) {
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

  async expectExactRowCount(expectedCount) {
    const count = await this.userListRow.count();
    expect(count).toBe(expectedCount);
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.noResultsMessage).toHaveText(
      "No Users found with matching filters. Clear filters to see all Users.",
    );
  }
}

module.exports = { UsersSearchBar };
