const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class CriterionDetailPage {
  constructor(page) {
    this.page = page;
    this.attributeField = page.locator(SELECTORS.criterionAttribute).first();
    this.groupTypeField = page.locator(SELECTORS.criterionGroupType).first();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/eligibility-criteria\//, {
      timeout: TIMEOUTS.navigation,
    });
    await this.attributeField.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
  }

  async expectAttributeNotEmpty() {
    const attribute = await this.attributeField.innerText();
    expect(attribute.trim()).not.toBe("");
  }

  async expectGroupTypeNotEmpty() {
    const groupType = await this.groupTypeField.innerText();
    expect(groupType.trim()).not.toBe("");
  }
}

module.exports = { CriterionDetailPage };
