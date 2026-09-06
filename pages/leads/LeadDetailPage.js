const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class LeadDetailPage {
  constructor(page) {
    this.page = page;
    this.leadNumber = page.locator(SELECTORS.leadNumber);
    this.leadGeneratedDate = page.locator(SELECTORS.leadGeneratedDate);
    this.leadSavingGroupValue = page.locator(SELECTORS.leadSavingGroupValue);
    this.tasksGroupHead = page.locator(SELECTORS.leadTasksGroupHead);
    this.tasksStagePill = page.locator(SELECTORS.leadTasksStagePill);
    this.tasksCountLabel = page.locator(SELECTORS.leadTasksCountLabel);
    this.leadTaskStatusPills = page.locator(SELECTORS.leadTaskStatusPill);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-lead\//, { timeout: TIMEOUTS.navigation });
  }

  async expectLeadNumberNotEmpty() {
    await expect(this.leadNumber).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.leadNumber.innerText();
    expect(value.trim()).not.toBe('');
  }

  async expectLeadSavingGroup(groupName) {
    await expect(this.leadSavingGroupValue).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.leadSavingGroupValue).toContainText(groupName);
  }

  async expectGeneratedDateIsToday() {
    await expect(this.leadGeneratedDate).toBeVisible({ timeout: TIMEOUTS.default });
    const dateText = await this.leadGeneratedDate.innerText();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    expect(dateText.trim()).toContain(`${dd}-${mm}-${yyyy}`);
  }

  async expectSixTasksAllAssigned() {
    // Assert tasks header shows correct stage and count
    await expect(this.tasksStagePill).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.tasksStagePill).toContainText('Client Assessment');
    await expect(this.tasksCountLabel).toContainText('6 tasks');

    // Assert all 6 task rows have Assigned status
    const pills = this.leadTaskStatusPills;
    await expect(pills).toHaveCount(6, { timeout: TIMEOUTS.default });
    for (let i = 0; i < 6; i++) {
      await expect(pills.nth(i)).toContainText('Assigned');
    }
  }
}

module.exports = { LeadDetailPage };