const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class GeofencePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator(SELECTORS.geofenceListPageTitle);
        this.geofenceNavLink = page.locator(SELECTORS.geofenceNavLink);
        this.geofenceListRow = page.locator(SELECTORS.geofenceListRow);
        this.geofenceBranchSelect = page.locator(SELECTORS.geofenceBranchSelect);
        this.geofenceHierarchySelect = page.locator(SELECTORS.geofenceHierarchySelect);
        this.loadingIndicator = page.locator(SELECTORS.deskLoadingIndicator);
        this.geofenceOrgSummary = page.locator(SELECTORS.geofenceOrgSummary);
        this.geofenceFoSelect = page.locator(SELECTORS.geofenceFoSelect);
        this.geofenceSearchInput = page.locator(SELECTORS.geofenceSearchInput);
        this.geofenceSearchByInvalidName = page.locator(SELECTORS.geofenceInvalidSearchMessage);
        this.geofenceExportBtn = page.locator(SELECTORS.geofenceExportBtn);
        this.geofenceExportDownload = page.locator(SELECTORS.geofenceExportDownload).first();
    }

    async open() {
    await this.goto('/desk/geofences');
  }

  async clickGeofencesNav() {
    await this.geofenceNavLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.geofenceNavLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/geofences/, { timeout: TIMEOUTS.navigation });
    await this.expectVisible(this.pageTitle);
  }

  async expectCountryDataExists() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    const count = await this.geofenceListRow.count();
    expect(count).toBeGreaterThan(0);
  }

  async expectFoDataExists() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await this.geofenceFoSelect.click();
    const count = await this.geofenceListRow.count();
    expect(count).toBeGreaterThan(0);
  }

  async clickOrgHierarchy() {
    await this.geofenceHierarchySelect.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.geofenceHierarchySelect.click();
    await this.expectVisible(this.geofenceOrgSummary);
  }
    
  async clickFirstGeofence() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    const count = await this.geofenceListRow.count();
    expect(count).toBeGreaterThan(0);
    await this.geofenceListRow.first().click();
    await this.geofenceListRow.nth(1).click();
  }

  async searchGeofenceByName(searchInput) {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await this.geofenceSearchInput.fill(searchInput);
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    const count = await this.geofenceListRow.count();
    expect(count).toBeGreaterThan(0);
  }

  async searchGeofenceByInvalidName(searchInput) {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await this.geofenceSearchInput.fill(searchInput);
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: TIMEOUTS.default });
    await this.expectVisible(this.geofenceSearchByInvalidName);
  }

  async downloadGeofenceCsv() {
    await this.geofenceExportBtn.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.geofenceExportBtn.click();
    await this.geofenceExportDownload.waitFor({ state: 'visible', timeout: TIMEOUTS.default });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.geofenceExportDownload.click(),
    ]);

    expect(download.suggestedFilename()).toMatch(/\.csv$/i);
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    return download;
  }
}

module.exports = { GeofencePage };