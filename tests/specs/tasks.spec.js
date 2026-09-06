const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/user/LoginPage');
const { TasksPage } = require('../../pages/tasks/TasksPage');
const { TaskDetailPage } = require('../../pages/tasks/TaskDetailPage');
const { TasksSearchBar } = require('../../pages/tasks/TasksSearchBar');
const { getCredentials } = require('../../util/helpers');
const tasksData = require('../../data/tasks.json');

test.describe('DreamLink CRM - Tasks', () => {
  let loginPage;
  let tasksPage;
  let taskDetailPage;
  let tasksSearchBar;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    tasksPage = new TasksPage(page);
    taskDetailPage = new TaskDetailPage(page);
    tasksSearchBar = new TasksSearchBar(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await tasksPage.open();
    await tasksPage.expectLoaded();
  });

  test('TC-TK-01 | Tasks list page loads and displays at least one task record', async ({ page }) => {
    await tasksPage.expectTaskListNotEmpty();
    await tasksPage.expectRecordCountVisible();
  });

  test('TC-TK-02 | Clicking the first task navigates to detail page with Number, Title, Reference, Stage and Status all populated', async ({ page }) => {
    await tasksPage.clickFirstTask();
    await taskDetailPage.expectLoaded();
    await taskDetailPage.expectTaskNumberNotEmpty();
    await taskDetailPage.expectTaskTitleNotEmpty();
    await taskDetailPage.expectTaskReferenceNotEmpty();
    await taskDetailPage.expectTaskStageNotEmpty();
    await taskDetailPage.expectTaskStatusNotEmpty();
  });

  test('TC-TK-03 | Search by task number returns exactly 1 result containing the searched keyword', async ({ page }) => {
    const { keyword, expectedCount } = tasksData.taskNumberSearch;
    await tasksSearchBar.searchByTaskNumber(keyword);
    await tasksSearchBar.expectResultCount(expectedCount);
    await tasksSearchBar.expectTaskVisible(keyword);
  });
});