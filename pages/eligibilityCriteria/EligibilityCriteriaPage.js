const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");
const { BasePage } = require("../BasePage");

class EligibilityCriteriaPage extends BasePage {
  constructor(page) {
    super(page);
    this.criteriaNavLink = page.locator(SELECTORS.eligibilityCriteriaNavLink);
    this.criteriaRow = page.locator(SELECTORS.eligibilityCriteriaRow);
    this.criterionNameLink = page.locator(SELECTORS.criterionNameLink);
    this.criteriaSetsTab = page.locator(SELECTORS.criteriaSetsTab);
  }

  async open() {
    await this.goto("/desk/eligibility-criteria");
  }

  async clickEligibilityCriteriaNav() {
    await this.criteriaNavLink.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.criteriaNavLink.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickCriteriaSetsTab() {
    await this.criteriaSetsTab.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.criteriaSetsTab.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/eligibility-criteria/, {
      timeout: TIMEOUTS.navigation,
    });
    await this.expectVisible(this.criteriaRow.first());
  }

  async expectCriteriaListPopulated() {
    await this.criteriaRow
      .first()
      .waitFor({ state: "visible", timeout: TIMEOUTS.default });
    const count = await this.criteriaRow.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickFirstCriterion() {
    await this.criteriaRow
      .first()
      .waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await this.criteriaRow.first().locator(SELECTORS.criterionNameLink).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}

module.exports = { EligibilityCriteriaPage };
