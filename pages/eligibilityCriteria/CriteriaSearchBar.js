const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS, DEFAULTS } = require("../../common/constants");

class CriteriaSearchBar {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator(SELECTORS.criteriaSearchInput);
    this.criteriaRow = page.locator(SELECTORS.eligibilityCriteriaRow);
    this.noResultsMessage = page.locator(SELECTORS.criteriaNoResultsMessage);
  }

  async searchByCriterionName(keyword) {
    await this.searchInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.searchInput.fill(keyword);
    await expect(this.criteriaRow).not.toHaveCount(DEFAULTS.pageSize, {
      timeout: TIMEOUTS.default,
    });
  }

  async expectExactRowCount(expectedCount) {
    const count = await this.criteriaRow.count();
    expect(count).toBe(expectedCount);
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.noResultsMessage).toHaveText(
      "No matching eligibility criteria.",
    );
  }
}

module.exports = { CriteriaSearchBar };
