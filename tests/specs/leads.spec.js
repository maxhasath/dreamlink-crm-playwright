const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/user/LoginPage');
const { LeadsPage } = require('../../pages/leads/LeadsPage');
const { LeadDetailPage } = require('../../pages/leads/LeadDetailPage');
const { LeadsSearchBar } = require('../../pages/leads/LeadsSearchBar');
const { getCredentials } = require('../../util/helpers');
const leadsData = require('../../data/leads.json');

test.describe('DreamLink CRM - Leads', () => {
  let loginPage;
  let leadsPage;
  let leadDetailPage;
  let leadsSearchBar;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadsPage = new LeadsPage(page);
    leadDetailPage = new LeadDetailPage(page);
    leadsSearchBar = new LeadsSearchBar(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await leadsPage.open();
    await leadsPage.expectLoaded();
  });

  test('TC-LD-01 | Leads list page loads and displays at least one lead record', async ({ page }) => {
    await leadsPage.expectLeadListNotEmpty();
  });

  test('TC-LD-02 | Clicking the first lead navigates to detail page with Number, Saving Group, Current Workflow Stage and Tasks list all populated', async ({ page }) => {
    await leadsPage.clickFirstLead();
    await leadDetailPage.expectLoaded();
    await leadDetailPage.expectLeadNumberNotEmpty();
    await leadDetailPage.expectLeadSavingGroupNotEmpty();
    await leadDetailPage.expectCurrentWorkflowStageNotEmpty();
    await leadDetailPage.expectTasksListNotEmpty();
  });

  test('TC-LD-03 | Search by lead number returns exactly 1 result containing the searched keyword', async ({ page }) => {
    const { keyword, expectedCount } = leadsData.validSearch;
    await leadsSearchBar.searchByLeadNumber(keyword);
    await leadsSearchBar.expectResultCount(expectedCount);
    await leadsSearchBar.expectLeadVisible(keyword);
  });
});