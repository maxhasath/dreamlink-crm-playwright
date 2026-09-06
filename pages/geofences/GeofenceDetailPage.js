const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class GeofenceDetailPage extends BasePage {
    constructor(page) {
        super(page);
        this.pageTitle = page.locator(SELECTORS.geofenceListPageTitle);
        this.geofenceNavLink = page.locator(SELECTORS.geofenceNavLink);
        this.geofenceName = page.locator(SELECTORS.geofenceDetailName);
        this.geofenceDetailPageSubtitle = page.locator(SELECTORS.geofenceDetailPageSubtitle).first();
        this.geofenceDetailPageAssignUser = page.locator(SELECTORS.geofenceDetailPageAssignUser).nth(1);
        this.geofenceAssignUserModalTitle = page.getByText('Configure User Assignments', { exact: true });
        this.geofenceAssignUserCancelBtn = page.locator(SELECTORS.geofenceAssignUserCancelBtn).nth(3);
        this.geofenceCountryCard = page.locator(SELECTORS.geofenceCountryCard);
        this.geofenceMainland = page.getByText('LK - Mainland', { exact: true });
        this.geofenceBranchFirstItem = page.locator(SELECTORS.geofenceBranchFirstItem).first();
        this.geofenceBranchTab = page.locator(SELECTORS.geofenceBranchTab).nth(4);
        this.geofenceBranchTitle = page.locator(SELECTORS.geofenceBranchTitle).first();
        this.geofenceDetailPageAssignProduct = page.locator(SELECTORS.geofenceDetailPageAssignUser).nth(2);
        this.geofenceAssignProductModalTitle = page.getByText('Configure Product Assignments', { exact: true });
        this.geofenceAssignProductCancelBtn = page.locator(SELECTORS.geofenceAssignProductCancelBtn).nth(3);
    }

    async open() {
    await this.goto('/desk/geofences');
    }

    async expectLoaded() {
    await expect(this.page).toHaveURL(/geofences/, { timeout: TIMEOUTS.navigation });
    await this.expectVisible(this.pageTitle);
    }

    async expectGeofenceDetailPage() {
        await this.geofenceNavLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceNavLink.click();
        await this.geofenceCountryCard.click();
        await this.geofenceMainland.click();
        await this.geofenceDetailPageSubtitle.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceDetailPageAssignUser.click();
        await this.geofenceAssignUserModalTitle.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceAssignUserCancelBtn.click();

    }

    async expectGeofenceProductModal() {
        await this.geofenceNavLink.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceNavLink.click();
        await this.geofenceBranchTab.click();
        await this.geofenceBranchFirstItem.click();
        await this.geofenceBranchTitle.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceDetailPageAssignProduct.click();
        await this.geofenceAssignProductModalTitle.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
        await this.geofenceAssignProductCancelBtn.click();

    }
}

module.exports = { GeofenceDetailPage };