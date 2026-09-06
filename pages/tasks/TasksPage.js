const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class TasksPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.locator(SELECTORS.tasksPageTitle);
    this.taskListRow = page.locator(SELECTORS.deskListRow);
    this.recordCount = page.locator(SELECTORS.recordCount);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
  }

  async open() {
    await this.goto('/desk/dl-task');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-task/, { timeout: TIMEOUTS.navigation });
    await this.expectVisible(this.pageTitle);
  }

  async expectTaskListNotEmpty() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await expect(this.taskListRow.first()).toBeVisible({ timeout: TIMEOUTS.default });
    const rowCount = await this.taskListRow.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async expectRecordCountVisible() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await expect(this.recordCount).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async clickFirstTask() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    const firstTaskLink = this.taskListRow
      .first()
      .locator(SELECTORS.taskNameLink);
    await firstTaskLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await firstTaskLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { TasksPage };