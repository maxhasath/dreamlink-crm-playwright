const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");
const { BasePage } = require("../BasePage");

class CriteriaSetsPage extends BasePage {
  constructor(page) {
    super(page);
    this.createCriteriaSetBtn = page.locator(SELECTORS.createCriteriaSetBtn);
    this.criteriaSetRow = page.locator(SELECTORS.criteriaSetRow);
    this.searchInput = page.locator(SELECTORS.criteriaSetSearchInput);
    this.noResultsMessage = page.locator(SELECTORS.criteriaSetNoResultsMessage);
  }

  async clickCreateCriteriaSet() {
    await this.createCriteriaSetBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.createCriteriaSetBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectCriteriaSetListPopulated() {
    await expect(this.criteriaSetRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async searchBySetName(keyword) {
    await this.searchInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.searchInput.clear();
    await this.searchInput.fill(keyword);
    await expect(this.searchInput).toHaveValue(keyword, {
      timeout: TIMEOUTS.default,
    });
  }

  async expectExactRowCount(expectedCount) {
    await expect(this.criteriaSetRow).toHaveCount(expectedCount, {
      timeout: TIMEOUTS.default,
    });
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.noResultsMessage).toHaveText(
      "No matching eligibility criteria sets.",
    );
  }
}

module.exports = { CriteriaSetsPage };
