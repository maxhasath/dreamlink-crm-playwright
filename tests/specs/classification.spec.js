const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { GroupsPage } = require("../../pages/groups/GroupsPage");
const { GroupsSearchBar } = require("../../pages/groups/GroupsSearchBar");
const { ClassificationPage } = require("../../pages/groups/ClassificationPage");
const { LeadsPage } = require("../../pages/leads/LeadsPage");
const { LeadsSearchBar } = require("../../pages/leads/LeadsSearchBar");
const { LeadDetailPage } = require("../../pages/leads/LeadDetailPage");
const { PreLeadsPage } = require("../../pages/preLeads/PreLeadsPage");
const { PreLeadsSearchBar } = require("../../pages/preLeads/PreLeadsSearchBar");
const { PreLeadDetailPage } = require("../../pages/preLeads/PreLeadDetailPage");
const { getCredentials } = require("../../util/helpers");
const groupsData = require("../../data/groups.json");
const preLeadsData = require("../../data/preLeads.json");

test.describe("DreamLink CRM - Run Classification", () => {
  let loginPage;
  let groupsPage;
  let groupsSearchBar;
  let classificationPage;
  let leadsPage;
  let leadsSearchBar;
  let leadDetailPage;
  let preLeadsPage;
  let preLeadsSearchBar;
  let preLeadDetailPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    groupsPage = new GroupsPage(page);
    groupsSearchBar = new GroupsSearchBar(page);
    classificationPage = new ClassificationPage(page);
    leadsPage = new LeadsPage(page);
    leadsSearchBar = new LeadsSearchBar(page);
    leadDetailPage = new LeadDetailPage(page);
    preLeadsPage = new PreLeadsPage(page);
    preLeadsSearchBar = new PreLeadsSearchBar(page);
    preLeadDetailPage = new PreLeadDetailPage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await groupsPage.open();
    await groupsPage.expectLoaded();
  });

  test('TC-CL-01 | Running classification on a group with an active workflow shows "No Groups Classified" summary', async ({
    page,
  }) => {
    const { keyword, expectedCount } = groupsData.classificationSearch;

    await groupsSearchBar.searchByGroupName(keyword);
    await groupsSearchBar.expectResultCount(expectedCount);
    await classificationPage.selectFirstGroupCheckbox();
    await classificationPage.openActionsDropdown();
    await classificationPage.clickRunClassificationMenuItem();
    await classificationPage.confirmRunClassification();
    await classificationPage.expectSummaryPillText();
    await classificationPage.closeSummaryModal();
    await classificationPage.expectModalDismissed();
  });

  // PRE-CONDITION: Reset "Karoo Transport Collective 01D0F8E1-0240" to Not Classified before running
  test(
    "TC-CL-02 | Running classification on a fully eligible group creates a lead with 6 assigned tasks",
    { retries: 0 },
    async ({ page }) => {
      const { keyword, expectedCount, groupName } =
        groupsData.fullyEligibleSearch;

      await groupsSearchBar.searchByGroupName(keyword);
      await groupsSearchBar.expectResultCount(expectedCount);
      await classificationPage.selectFirstGroupCheckbox();
      await classificationPage.openActionsDropdown();
      await classificationPage.clickRunClassificationMenuItem();
      await classificationPage.confirmRunClassification();
      await classificationPage.expectFullyEligibleSummaryPill();
      await classificationPage.closeSummaryModal();
      await classificationPage.expectModalDismissed();
      await classificationPage.expectFullyEligibleBadgeVisible();

      await leadsPage.open();
      await leadsPage.expectLoaded();
      await leadsSearchBar.searchBySavingGroup(groupName);
      await leadsPage.expectLeadRowVisible();
      await leadsPage.clickActiveLead();
      await leadDetailPage.expectLoaded();
      await leadDetailPage.expectLeadNumberNotEmpty();
      await leadDetailPage.expectLeadSavingGroup(groupName);
      await leadDetailPage.expectGeneratedDateIsToday();
      await leadDetailPage.expectSixTasksAllAssigned();
    },
  );

  // PRE-CONDITION: Reset "Nile Supplies Group 0179E714-0189" to Not Classified before running
  test(
    "TC-CL-03 | Running classification on a data correction group creates a pre lead with correct group information task assigned",
    { retries: 0 },
    async ({ page }) => {
      const { keyword, expectedCount, groupName } =
        preLeadsData.dataCorrectSearch;

      // Search and select the group
      await groupsSearchBar.searchByGroupName(keyword);
      await groupsSearchBar.expectResultCount(expectedCount);
      await classificationPage.selectFirstGroupCheckbox();

      // Run classification — reusing existing methods
      await classificationPage.openActionsDropdown();
      await classificationPage.clickRunClassificationMenuItem();
      await classificationPage.confirmRunClassification();

      // Assert green summary pill
      await classificationPage.expectFullyEligibleSummaryPill();
      await classificationPage.closeSummaryModal();
      await classificationPage.expectModalDismissed();

      // Assert Data Correction Required badge on groups list
      await classificationPage.expectDataCorrectionBadgeVisible();

      // Navigate to Pre Leads and search by saving group name
      await preLeadsPage.open();
      await preLeadsPage.expectLoaded();
      await preLeadsSearchBar.searchBySavingGroup(groupName);
      await preLeadsSearchBar.expectResultCount(expectedCount);
      await preLeadsPage.expectPreLeadRowVisible();

      // Open the pre lead
      await preLeadsPage.clickFirstPreLead();
      await preLeadDetailPage.expectLoaded();

      // Assert pre lead details
      await preLeadDetailPage.expectPreLeadNumberNotEmpty();
      await preLeadDetailPage.expectSavingGroup(groupName);
      await preLeadDetailPage.expectGeneratedDateIsToday();

      // Assert tasks section
      await preLeadDetailPage.expectClientIdentificationStage();
      await preLeadDetailPage.expectCorrectGroupInformationTaskAssigned();
    },
  );
});
