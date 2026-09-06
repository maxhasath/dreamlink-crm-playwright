const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class PreLeadDetailPage {
  constructor(page) {
    this.page = page;
    this.preLeadNumber = page.locator(SELECTORS.preLeadNumber);
    this.preLeadGeneratedDate = page.locator(SELECTORS.preLeadGeneratedDate);
    this.preLeadSavingGroupValue = page.locator(
      SELECTORS.preLeadSavingGroupValue,
    );
    this.preLeadStatus = page.locator(SELECTORS.preLeadStatus);
    this.tasksStagePill = page.locator(SELECTORS.preLeadTasksStagePill);
    this.tasksCountLabel = page.locator(SELECTORS.preLeadTasksCountLabel);
    this.taskStatusPills = page.locator(SELECTORS.preLeadTaskStatusPill);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-pre-lead\//, {
      timeout: TIMEOUTS.navigation,
    });
  }

  async expectPreLeadNumberNotEmpty() {
    await expect(this.preLeadNumber).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.preLeadNumber.innerText();
    expect(value.trim()).not.toBe("");
  }

  async expectSavingGroupNotEmpty() {
    await expect(this.preLeadSavingGroupValue).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    const value = await this.preLeadSavingGroupValue.innerText();
    expect(value.trim()).not.toBe("");
  }

  async expectStatusNotEmpty() {
    await expect(this.preLeadStatus).toBeVisible({ timeout: TIMEOUTS.default });
    const value = await this.preLeadStatus.innerText();
    expect(value.trim()).not.toBe("");
  }

  async expectTasksListNotEmpty() {
    await expect(this.tasksStagePill).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.tasksCountLabel).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    const countText = await this.tasksCountLabel.innerText();
    expect(countText.trim()).not.toBe("");
  }

  async expectSavingGroup(groupName) {
    await expect(this.preLeadSavingGroupValue).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.preLeadSavingGroupValue).toContainText(groupName);
  }

  async expectGeneratedDateIsToday() {
    await expect(this.preLeadGeneratedDate).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    const dateText = await this.preLeadGeneratedDate.innerText();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    expect(dateText.trim()).toContain(`${dd}-${mm}-${yyyy}`);
  }

  async expectClientIdentificationStage() {
    await expect(this.tasksStagePill).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.tasksStagePill).toContainText("Client Identification");
    await expect(this.tasksCountLabel).toContainText("tasks");
  }

  async expectCorrectGroupInformationTaskAssigned() {
    const correctGroupRow = this.page
      .locator(SELECTORS.preLeadTasksGrid)
      .filter({ hasText: "Correct Group Information" })
      .filter({ has: this.page.locator(SELECTORS.preLeadTaskStatusPill) });
    await expect(correctGroupRow).toHaveCount(1, { timeout: TIMEOUTS.default });
    await expect(
      correctGroupRow.locator(SELECTORS.preLeadTaskStatusPill),
    ).toContainText("Assigned");
  }
}

module.exports = { PreLeadDetailPage };
