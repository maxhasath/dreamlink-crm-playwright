const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class PreLeadsSearchBar extends BasePage {
  constructor(page) {
    super(page);
    this.savingGroupInput = page.locator(SELECTORS.preLeadSavingGroupSearchInput);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
    this.recordCount = page.locator(SELECTORS.recordCount);
    this.noResultsMessage = page.locator(SELECTORS.deskNoResultsMessage);
  }

  async searchBySavingGroup(groupName) {
    await this.searchByAutocomplete(this.savingGroupInput, groupName);
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
  }

  async expectResultCount(expectedCount) {
    await expect(this.recordCount).toContainText(expectedCount, { timeout: TIMEOUTS.default });
  }

  async expectPreLeadVisible() {
    await expect(this.page.locator(SELECTORS.preLeadNameLink).first())
      .toBeVisible({ timeout: TIMEOUTS.default });
  }

  async expectNoResults() {
    await expect(this.noResultsMessage).toBeVisible({ timeout: TIMEOUTS.default });
  }
}

module.exports = { PreLeadsSearchBar };