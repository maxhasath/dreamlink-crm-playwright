const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class FormCreatePage extends BasePage {
  constructor(page) {
    super(page);
    this.surveyTitleInput = page.locator(SELECTORS.formsSurveyTitleInput);
    this.addQuestionBtn = page.getByText(SELECTORS.formsAddQuestionText);
    this.questionNameInput = page.locator(SELECTORS.formsQuestionNameInput);
    this.saveAndPublishBtn = page.locator(SELECTORS.formsSaveAndPublishBtn);
    this.successToast = page.locator(SELECTORS.formsSuccessToast);
    this.successToastTitle = page.locator(SELECTORS.formsSuccessToastTitle);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/forms\/new/, { timeout: TIMEOUTS.navigation });
    await expect(this.surveyTitleInput).toBeVisible({ timeout: TIMEOUTS.default });
  }

async addQuestion() {
  await this.addQuestionBtn.first().waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await this.addQuestionBtn.first().click();
}

async fillSurveyTitle(title) {
  await this.surveyTitleInput.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await this.surveyTitleInput.click();
  await this.surveyTitleInput.selectText();
  await this.surveyTitleInput.pressSequentially(title);
}

async fillQuestionName(questionName) {
  await this.questionNameInput.first().waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  await this.questionNameInput.first().selectText();
  await this.questionNameInput.first().pressSequentially(questionName);
}

  async saveAndPublish() {
    await this.saveAndPublishBtn.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.saveAndPublishBtn.click();
  }

  // Assertions
  async expectSuccessToast(formName) {
    await expect(this.successToast).toBeVisible({ timeout: TIMEOUTS.default });
    await expect(this.successToastTitle)
      .toContainText(`Form "${formName}" created and published successfully.`, { timeout: TIMEOUTS.default });
  }
}

module.exports = { FormCreatePage };