const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class AddCriteriaSetPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator(SELECTORS.criteriaSetNameInput);
    this.saveBtn = page.locator(SELECTORS.saveCriteriaSetBtn);
    this.successToast = page.locator(SELECTORS.criteriaSetSuccessToast);
  }

  async fillCriteriaSetName(name) {
    await this.nameInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.nameInput.fill(name);
  }

  async selectCriteria(targetCount) {
    const checkboxes = this.page.locator(SELECTORS.criteriaSetCheckbox);
    await checkboxes
      .first()
      .waitFor({ state: "visible", timeout: TIMEOUTS.default });

    const total = await checkboxes.count();
    let selected = 0;

    for (let i = 0; i < total; i++) {
      if (selected >= targetCount) break;

      const checkbox = checkboxes.nth(i);
      const isDisabled = await checkbox.isDisabled();

      if (!isDisabled) {
        await checkbox.click();
        selected++;
      }
    }

    expect(selected).toBe(targetCount);
  }

  async saveCriteriaSet() {
    await this.saveBtn.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await this.saveBtn.scrollIntoViewIfNeeded();
    await this.saveBtn.click();
  }

  async expectSuccessToast() {
    await expect(this.successToast).toBeVisible({ timeout: TIMEOUTS.default });
  }
}

module.exports = { AddCriteriaSetPage };
