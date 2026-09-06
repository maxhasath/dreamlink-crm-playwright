const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class ClassificationPage {
  constructor(page) {
    this.page = page;
    this.actionsBtn = page.locator(SELECTORS.classificationActionsBtn);
    this.runMenuItem = page.locator(SELECTORS.classificationRunMenuItem);
    this.confirmBtn = page.locator(SELECTORS.classificationConfirmBtn);
    this.summaryPill = page.locator(SELECTORS.classificationSummaryPill);
    this.summaryPillGreen = page.locator(
      SELECTORS.classificationSummaryPillGreen,
    );
    this.summaryCloseBtn = page.locator(
      SELECTORS.classificationSummaryCloseBtn,
    );
    this.modalBackdrop = page.locator(SELECTORS.classificationModalBackdrop);
    this.fullyEligibleBadge = page.locator(SELECTORS.fullyEligibleBadge);
    this.dataCorrectionalBadge = page.locator(SELECTORS.dataCorrectionalBadge);
  }

  async selectFirstGroupCheckbox() {
    const checkbox = this.page
      .locator(SELECTORS.deskListRow)
      .first()
      .locator('input[type="checkbox"]');
    await checkbox.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await checkbox.check();
  }

  async openActionsDropdown() {
    await this.actionsBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.actionsBtn.click();
  }

  async clickRunClassificationMenuItem() {
    await this.runMenuItem.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.runMenuItem.click();
  }

  async confirmRunClassification() {
    await this.confirmBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.confirmBtn.click();
  }

  async closeSummaryModal() {
    await this.summaryCloseBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.summaryCloseBtn.click();
  }

  async expectSummaryPillText() {
    await expect(this.summaryPill).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.summaryPill).toContainText(
      SELECTORS.classificationSummaryText,
    );
  }

  async expectFullyEligibleSummaryPill() {
    await expect(this.summaryPillGreen).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(this.summaryPillGreen).toContainText(
      SELECTORS.classificationSummaryTextGreen,
    );
  }

  async expectModalDismissed() {
    await expect(this.modalBackdrop).toHaveCount(0, {
      timeout: TIMEOUTS.default,
    });
  }

  async expectFullyEligibleBadgeVisible() {
    await expect(this.fullyEligibleBadge).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectDataCorrectionBadgeVisible() {
    await expect(this.dataCorrectionalBadge).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }
}

module.exports = { ClassificationPage };
