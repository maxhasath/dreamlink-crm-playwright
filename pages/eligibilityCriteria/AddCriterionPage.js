const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class AddCriterionPage {
  constructor(page) {
    this.page = page;
    this.createCriterionBtn = page.locator(SELECTORS.createCriterionBtn);
    this.nameInput = page.getByRole("textbox", {
      name: SELECTORS.criterionNameInput,
    });
    this.descriptionInput = page.getByRole("textbox", {
      name: SELECTORS.criterionDescriptionInput,
    });
    this.saveBtn = page.getByRole("button", {
      name: SELECTORS.saveCriterionBtn,
    });
    this.successToast = page.locator(SELECTORS.criterionSuccessToast);
  }

  async clickCreateCriterion() {
    await this.createCriterionBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.createCriterionBtn.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async fillCriterionName(name) {
    await this.nameInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.nameInput.fill(name);
  }

  async fillDescription(description) {
    await this.descriptionInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.descriptionInput.fill(description);
  }

  async saveCriterion() {
    await this.saveBtn.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await this.saveBtn.click();
  }

  async expectSuccessToast(criterionName) {
    await expect(this.successToast).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.successToast).toContainText(criterionName);
  }
}

module.exports = { AddCriterionPage };
