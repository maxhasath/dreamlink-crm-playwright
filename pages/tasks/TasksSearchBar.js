const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class TasksSearchBar extends BasePage {
  constructor(page) {
    super(page);
    this.taskNumberInput = page.locator(SELECTORS.taskNumberSearchInput);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
    this.recordCount = page.locator(SELECTORS.recordCount);
  }

  async searchByTaskNumber(keyword) {
    await this.taskNumberInput.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.taskNumberInput.fill(keyword);
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
  }

  async expectResultCount(expectedCount) {
    await expect(this.recordCount).toContainText(expectedCount, { timeout: TIMEOUTS.default });
  }

  async expectTaskVisible(keyword) {
    const taskLink = this.page.locator(SELECTORS.taskNameLink, { hasText: keyword });
    await expect(taskLink).toBeVisible({ timeout: TIMEOUTS.default });
  }
}

module.exports = { TasksSearchBar };