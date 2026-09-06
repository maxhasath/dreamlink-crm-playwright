const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class FormDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.formTitle = page.locator(SELECTORS.formPreviewTitle);
    this.formStatusBadge = page.locator(SELECTORS.formPreviewStatusBadge);
    this.formSummaryValues = page.locator(SELECTORS.formPreviewSummaryValue);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/forms\/.+\/preview/, { timeout: TIMEOUTS.navigation });
    await expect(this.formTitle).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async expectFormNameNotEmpty() {
    await expect(this.formTitle).toBeVisible({ timeout: TIMEOUTS.default });
    const title = await this.formTitle.innerText();
    expect(title.trim()).not.toBe('');
  }

  async expectStatusNotEmpty() {
    await expect(this.formStatusBadge).toBeVisible({ timeout: TIMEOUTS.default });
    const status = await this.formStatusBadge.innerText();
    expect(status.trim()).not.toBe('');
  }

  async expectCreatedDateNotEmpty() {
    const createdValue = this.formSummaryValues.first();
    await expect(createdValue).toBeVisible({ timeout: TIMEOUTS.default });
    const dateText = await createdValue.innerText();
    expect(dateText.trim()).not.toBe('');
  }
}

module.exports = { FormDetailPage };