const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/user/LoginPage');
const { GeofencePage } = require('../../pages/geofences/GeofencePage');
const { AddGeofencePage } = require('../../pages/geofences/AddGeofencePage');
const { GeofenceDetailPage } = require('../../pages/geofences/GeofenceDetailPage');
const { getCredentials } = require('../../util/helpers');
const geofenceData = require('../../data/geofenceData.json');


test.describe('DreamLink CRM - Geofence', () => {
    let loginPage;
    let geofencePage;
    let addGeofencePage;
    let geofenceDetailPage;
    const userData = getCredentials();
    const geofenceSearchData = geofenceData.searchInput;
    const geofenceInvalidSearchData = geofenceData.searchInvalidInput;
    const geofenceCreateData = geofenceData.addGeofence;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(userData.username, userData.password);
        geofencePage = new GeofencePage(page);
        addGeofencePage = new AddGeofencePage(page);
        geofenceDetailPage = new GeofenceDetailPage(page);
    });

    test('TC-GF-01 | Geofence List page loads via sidebar navigation and country data exists', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.expectCountryDataExists();
    });

    test('TC-GF-02 | The Organizational hierarchy list is populated', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.clickOrgHierarchy();
    });

    test('TC-GF-03 | The FO Area list is populated', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.expectFoDataExists();
    });

    test('TC-GF-04 | Search for a Geofence by a single keyword and verify the search results', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.searchGeofenceByName(geofenceSearchData.search);
    });

    test('TC-GF-05 | Search for a Geofence by an invalid keyword and verify the No Geofence Message is displayed', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.searchGeofenceByInvalidName(geofenceInvalidSearchData.search);
    });

    test('TC-GF-06 | Download Geofence CSV', async ({ page }) => {
        await geofencePage.open();
        await geofencePage.expectLoaded();
        await geofencePage.downloadGeofenceCsv();
    });

    test('TC-GF-07 | Navigate to the Add Geofence page and view all the required fields', async ({ page }) => {
        await addGeofencePage.open();
        await addGeofencePage.expectLoaded();
        await addGeofencePage.clickNewGeofence(geofenceCreateData.geofenceName, geofenceCreateData.overlapPriority);
    });

    test('TC-GF-08 | Navigate to the Geofence Detail page and view the User Assign Modal', async ({ page }) => {
        await geofenceDetailPage.open();
        await geofenceDetailPage.expectLoaded();
        await geofenceDetailPage.expectGeofenceDetailPage();
    });

    test('TC-GF-09 | Navigate to the Geofence Detail page and view the Product Assign Modal', async ({ page }) => {
        await geofenceDetailPage.open();
        await geofenceDetailPage.expectLoaded();
        await geofenceDetailPage.expectGeofenceProductModal();
    });

});
