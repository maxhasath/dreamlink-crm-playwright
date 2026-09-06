const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class TaskDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.taskNumber = page.locator(SELECTORS.taskDetailNumber);
    this.taskTitle = page.locator(SELECTORS.taskDetailTitle);
    this.taskStatus = page.locator(SELECTORS.taskDetailStatus);
    this.taskStage = page.locator(SELECTORS.taskDetailStage);
    this.taskReference = page.locator(SELECTORS.taskDetailReference);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-task\//, { timeout: TIMEOUTS.navigation });
  }

  async expectTaskNumberNotEmpty() {
    await expect(this.taskNumber).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.taskNumber.innerText();
    expect(value.trim()).not.toBe('');
  }

  async expectTaskTitleNotEmpty() {
    await expect(this.taskTitle).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.taskTitle.innerText();
    expect(value.trim()).not.toBe('');
  }

  async expectTaskStatusNotEmpty() {
    await expect(this.taskStatus).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.taskStatus.innerText();
    expect(value.trim()).not.toBe('');
  }

  async expectTaskStageNotEmpty() {
    await expect(this.taskStage).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.taskStage.innerText();
    expect(value.trim()).not.toBe('');
  }

  async expectTaskReferenceNotEmpty() {
    await expect(this.taskReference).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.taskReference.innerText();
    expect(value.trim()).not.toBe('');
  }
}

module.exports = { TaskDetailPage };