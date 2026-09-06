const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { GeofencePage } = require("../../pages/geofences/GeofencePage");
const { AddGeofencePage } = require("../../pages/geofences/AddGeofencePage");
const {
  GeofenceDetailPage,
} = require("../../pages/geofences/GeofenceDetailPage");
const { getCredentials } = require("../../util/helpers");
const geofenceData = require("../../data/geofenceData.json");

test.describe("DreamLink CRM - Geofence", () => {
  let loginPage;
  let geofencePage;
  let addGeofencePage;
  let geofenceDetailPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    geofencePage = new GeofencePage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await geofencePage.open();
    await geofencePage.expectLoaded();
  });

  test("TC-GF-01 | Geofence List page loads via sidebar navigation and country data exists", async ({
    page,
  }) => {
    await geofencePage.expectCountryDataExists();
  });

  test("TC-GF-02 | The Organizational hierarchy list is populated", async ({
    page,
  }) => {
    await geofencePage.clickOrgHierarchy();
  });

  test("TC-GF-03 | The FO Area list is populated", async ({ page }) => {
    await geofencePage.expectFoDataExists();
  });

  test("TC-GF-04 | Search for a Geofence by a single keyword and verify the search results", async ({
    page,
  }) => {
    await geofencePage.searchGeofenceByName(geofenceData.searchInput.search);
    await geofencePage.expectListPopulated();
  });

  test("TC-GF-05 | Search for a Geofence by an invalid keyword and verify the No Geofence Message is displayed", async ({
    page,
  }) => {
    await geofencePage.searchGeofenceByName(
      geofenceData.searchInvalidInput.search,
    );
    await geofencePage.expectInvalidSearchMessage();
  });

  test("TC-GF-06 | Download Geofence CSV", async ({ page }) => {
    const download = await geofencePage.downloadGeofenceCsv();
    await geofencePage.expectCsvDownloaded(download);
  });

  test("TC-GF-07 | Navigate to the Add Geofence page and view all the required fields", async ({
    page,
  }) => {
    addGeofencePage = new AddGeofencePage(page);
    await addGeofencePage.clickNewGeofence(
      geofenceData.addGeofence.geofenceName,
      geofenceData.addGeofence.overlapPriority,
    );
  });

  test("TC-GF-08 | Navigate to the Geofence Detail page and view the User Assign Modal", async ({
    page,
  }) => {
    geofenceDetailPage = new GeofenceDetailPage(page);
    await geofenceDetailPage.expectGeofenceDetailPage();
  });

  test("TC-GF-09 | Navigate to the Geofence Detail page and view the Product Assign Modal", async ({
    page,
  }) => {
    geofenceDetailPage = new GeofenceDetailPage(page);
    await geofenceDetailPage.expectGeofenceProductModal();
  });

  test("TC-GF-10 | Selecting a geofence from search results renders the map correctly", async ({
    page,
  }) => {
    await geofencePage.searchGeofenceByName(geofenceData.mapSearch.keyword);
    await geofencePage.expectResultCount(geofenceData.mapSearch.expectedCount);
    await geofencePage.clickFocusOnMap();
    await geofencePage.expectMapVisible();
  });

  test("TC-GF-11 | Geofence detail page displays assigned users and assigned products", async ({
    page,
  }) => {
    await geofencePage.searchGeofenceByName(geofenceData.detailSearch.keyword);
    await geofencePage.expectResultCount(
      geofenceData.detailSearch.expectedCount,
    );
    await geofencePage.clickFirstGeofenceResult();
    await geofencePage.expectAssignedUsersNotEmpty();
    await geofencePage.expectAssignedProductsNotEmpty();
  });
  test("TC-GF-12 | Search with a broad keyword returns multiple results all containing the keyword", async ({
    page,
  }) => {
    await geofencePage.searchGeofenceByName(
      geofenceData.multipleKeywordSearch.keyword,
    );
    await geofencePage.expectAllResultsContainKeyword(
      geofenceData.multipleKeywordSearch.keyword,
    );
  });
});
