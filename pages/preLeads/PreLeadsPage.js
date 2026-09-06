const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");

class PreLeadsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(SELECTORS.preLeadsPageTitle);
    this.preLeadNameLink = page.locator(SELECTORS.preLeadNameLink);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
  }

  async open() {
    await this.page.goto("/desk/dl-pre-lead");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-pre-lead/, {
      timeout: TIMEOUTS.navigation,
    });
    await expect(this.pageTitle).toBeVisible({ timeout: TIMEOUTS.default });
  }

  async expectPreLeadListNotEmpty() {
    await this.loadingIndicator.waitFor({
      state: "hidden",
      timeout: TIMEOUTS.default,
    });
    await expect(this.preLeadNameLink.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    const rowCount = await this.preLeadNameLink.count();
    expect(rowCount).toBeGreaterThan(0);
  }

  async clickFirstPreLead() {
    await this.loadingIndicator.waitFor({
      state: "hidden",
      timeout: TIMEOUTS.default,
    });
    const firstRow = this.preLeadNameLink.first();
    await firstRow.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await firstRow.click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async expectPreLeadRowVisible() {
    await expect(this.preLeadNameLink.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }
}

module.exports = { PreLeadsPage };
