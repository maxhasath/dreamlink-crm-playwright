const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class AddGeofencePage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator(SELECTORS.addGeofencePageTitle);
        this.geofenceNavLink = page.locator(SELECTORS.geofenceNavLink);
        this.geofenceCreateBtn = page.locator(SELECTORS.geofenceCreateBtn);
        this.geofenceNameInput = page.locator(SELECTORS.addGeofenceNameInput);
        this.geofenceTypeDropdown = page.locator(SELECTORS.geofenceTypeDropdown).first();
        this.geofenceParentDropdown = page.locator(SELECTORS.geofenceParentDropdown).nth(1);
        this.overlapPriorityInput = page.locator(SELECTORS.overlapPriorityInput);
        this.geofenceDrawBtn = page.locator(SELECTORS.geofenceDrawBtn).nth(2);
    }

    async open() {
    await this.goto('/desk/geofences');
    }

    async expectLoaded() {
    await expect(this.page).toHaveURL(/geofences/, { timeout: TIMEOUTS.navigation });
    await this.expectVisible(this.pageTitle);
    }

    async clickNewGeofence(geofenceName, overlapPriority) {
    await this.geofenceNavLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.geofenceNavLink.click();
    await this.geofenceCreateBtn.click();
    await this.pageTitle.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.geofenceNameInput.fill(geofenceName);
    await this.expectVisible(this.geofenceTypeDropdown);
    await this.geofenceParentDropdown.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.overlapPriorityInput.fill(overlapPriority);
    await this.geofenceDrawBtn.click();
      
    }
}

module.exports = { AddGeofencePage };