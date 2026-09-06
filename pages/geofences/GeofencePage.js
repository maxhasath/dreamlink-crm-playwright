const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../../common/constants");
const { BasePage } = require("../BasePage");

class GeofencePage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = page.locator(SELECTORS.geofenceListPageTitle);
    this.geofenceNavLink = page.locator(SELECTORS.geofenceNavLink);
    this.geofenceListRow = page.locator(SELECTORS.geofenceListRow);
    this.geofenceHierarchySelect = page.locator(
      SELECTORS.geofenceHierarchySelect,
    );
    this.geofenceOrgSummary = page.locator(SELECTORS.geofenceOrgSummary);
    this.geofenceFoSelect = page.locator(SELECTORS.geofenceFoSelect);
    this.geofenceSearchInput = page.locator(SELECTORS.geofenceSearchInput);
    this.geofenceInvalidMessage = page.locator(
      SELECTORS.geofenceInvalidSearchMessage,
    );
    this.geofenceExportBtn = page.locator(SELECTORS.geofenceExportBtn);
    this.geofenceExportDownload = page
      .locator(SELECTORS.geofenceExportDownload)
      .first();
    this.geofenceMapContainer = page.locator(SELECTORS.geofenceMapContainer);
    this.geofenceResultsList = page.locator(SELECTORS.geofenceResultsList);
    this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
    this.focusOnMapBtn = page.locator(SELECTORS.geofenceFocusOnMapBtn);
    this.configureUsersBtn = page.locator(SELECTORS.geofenceConfigureUsersBtn);
    this.configureProductsBtn = page.locator(
      SELECTORS.geofenceConfigureProductsBtn,
    );
    this.geofenceItemName = page.locator(SELECTORS.geofenceItemName);
  }

  async open() {
    await this.goto("/desk/geofences");
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/geofences/, {
      timeout: TIMEOUTS.navigation,
    });
    await this.expectVisible(this.pageTitle);
  }

  async expectCountryDataExists() {
    await this.loadingIndicator.waitFor({
      state: "hidden",
      timeout: TIMEOUTS.default,
    });
    await expect(this.geofenceListRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectFoDataExists() {
    await this.loadingIndicator.waitFor({
      state: "hidden",
      timeout: TIMEOUTS.default,
    });
    await this.geofenceFoSelect.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.geofenceFoSelect.click();
    await expect(this.geofenceListRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async clickOrgHierarchy() {
    await this.geofenceHierarchySelect.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.geofenceHierarchySelect.click();
    await this.geofenceOrgSummary.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
  }

  async searchGeofenceByName(keyword) {
    await this.geofenceSearchInput.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.geofenceSearchInput.fill(keyword);
    await expect(this.geofenceListRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async clickFocusOnMap() {
    await this.focusOnMapBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.focusOnMapBtn.click();
  }

  async clickFirstGeofenceResult() {
    const firstItem = this.geofenceListRow.first();
    await firstItem.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await firstItem.click();
  }

  async downloadGeofenceCsv() {
    await this.geofenceExportBtn.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await this.geofenceExportBtn.click();
    await this.geofenceExportDownload.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.geofenceExportDownload.click(),
    ]);
    return download;
  }

  // Assertions
  async expectResultCount(expectedCount) {
    await expect(this.geofenceResultsList.locator("li")).toHaveCount(
      expectedCount,
      { timeout: TIMEOUTS.default },
    );
  }

  async expectMapVisible() {
    await expect(this.geofenceMapContainer).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectInvalidSearchMessage() {
    await expect(this.geofenceInvalidMessage).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectListPopulated() {
    await expect(this.geofenceListRow.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
  }

  async expectCsvDownloaded(download) {
    expect(download.suggestedFilename()).toMatch(/\.csv$/i);
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();
  }

  async expectAssignedUsersNotEmpty() {
    const usersSection = this.configureUsersBtn.locator(
      "xpath=ancestor::section",
    );
    await expect(
      usersSection.locator(SELECTORS.geofenceAssignedItemName),
    ).not.toHaveCount(0, { timeout: TIMEOUTS.default });
  }

  async expectAssignedProductsNotEmpty() {
    const productsSection = this.configureProductsBtn.locator(
      "xpath=ancestor::section",
    );
    await expect(
      productsSection.locator(SELECTORS.geofenceAssignedItemName),
    ).not.toHaveCount(0, { timeout: TIMEOUTS.default });
  }
  async expectAllResultsContainKeyword(keyword) {
    const matchingRows = this.geofenceListRow.filter({
      hasText: new RegExp(keyword, "i"),
    });
    await expect(matchingRows.first()).toBeVisible({
      timeout: TIMEOUTS.default,
    });
    await expect(matchingRows).not.toHaveCount(0, {
      timeout: TIMEOUTS.default,
    });
    const count = await matchingRows.count();
    expect(count).toBeGreaterThan(1);
  }
}

module.exports = { GeofencePage };
