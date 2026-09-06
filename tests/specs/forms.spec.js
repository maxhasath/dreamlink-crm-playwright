const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/user/LoginPage");
const { FormsPage } = require("../../pages/forms/FormsPage");
const { FormDetailPage } = require("../../pages/forms/FormDetailPage");
const { FormCreatePage } = require("../../pages/forms/FormCreatePage");
const { getCredentials } = require("../../util/helpers");
const formsData = require("../../data/forms.json");

test.describe("DreamLink CRM - Forms", () => {
  let loginPage;
  let formsPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    formsPage = new FormsPage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await formsPage.open();
    await formsPage.expectLoaded();
  });

  test("TC-FM-01 | Forms list page loads and list is not empty", async ({
    page,
  }) => {
    await formsPage.expectFormsListNotEmpty();
  });

  test("TC-FM-02 | Navigating inside a form displays form name, created date and status", async ({
    page,
  }) => {
    const formDetailPage = new FormDetailPage(page);
    await formsPage.clickFirstForm();
    await formDetailPage.expectLoaded();
    await formDetailPage.expectFormNameNotEmpty();
    await formDetailPage.expectCreatedDateNotEmpty();
    await formDetailPage.expectStatusNotEmpty();
  });

  test("TC-FM-03 | Valid keyword search returns matching result containing the keyword", async ({
    page,
  }) => {
    const { keyword } = formsData.validSearch;
    await formsPage.searchByKeyword(keyword);
    await formsPage.expectExactResultCount(1);
    await formsPage.expectResultContainsKeyword(keyword);
  });

  test("TC-FM-04 | Invalid keyword search displays no results message", async ({
    page,
  }) => {
    const { keyword } = formsData.invalidSearch;
    await formsPage.searchByKeyword(keyword);
    await formsPage.expectNoResultsMessage(formsData.noResultsMessage);
  });

  test(
    "TC-FM-05 | Successfully creating and publishing a form lists it in the forms list",
    { retries: 0 },
    async ({ page }) => {
      const formCreatePage = new FormCreatePage(page);
      const uniqueName = `${formsData.createForm.baseName} ${Math.floor(Math.random() * 10000)}`;

      // Navigate to Create Form
      await formsPage.clickCreateForm();

      // Click Add Question first
      await formCreatePage.addQuestion();

      // Fill survey title and question name
      await formCreatePage.fillSurveyTitle(uniqueName);
      await formCreatePage.fillQuestionName(formsData.createForm.questionName);

      // Save and publish
      await formCreatePage.saveAndPublish();

      // Assert success toast
      await formCreatePage.expectSuccessToast(uniqueName);

      // Navigate back to forms list and assert form is listed
      await formsPage.open();
      await formsPage.expectLoaded();
      await formsPage.searchByKeyword(uniqueName);
      await formsPage.expectExactResultCount(1);
      await formsPage.expectResultContainsKeyword(uniqueName);
    },
  );
});
