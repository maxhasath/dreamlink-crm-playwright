const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');
const { BasePage } = require('../BasePage');

class AddProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.addProductBtn = page.getByRole('button', { name: /add product/i });
    this.productPageTitle = page.locator(SELECTORS.addProductPageTitle);
    this.productNameInput = page.locator('form').filter({ hasText: 'Product Name' }).getByRole('textbox');
    this.productDescriptionInput = page.locator('form').filter({ hasText: 'Description' }).locator('textarea[type="text"]');
    this.productDSCriteriaSetSelect = page.locator('.rows > div > .data-row > div:nth-child(4)').first();
    this.productDSCriteriaSetForm = page.locator('div:nth-child(7) > .section-body > .form-column');
    this.productSaveBtn = page.getByRole('button', { name: 'Save' });
    this.productListRow = page.locator(SELECTORS.deskListRow);
  }

  async open() {
    await this.goto('/desk/dl-product');
  }

  async clickAddProduct() {
    await this.addProductBtn.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.addProductBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillProductName(name) {
    await this.productNameInput.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.productNameInput.fill(name);
  }

  async fillProductDescription(description) {
    await this.productDescriptionInput.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.productDescriptionInput.fill(description);
  }

  async selectEligibilityCriteriaSet(criteriaSetName) {
    await this.productDSCriteriaSetSelect.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.productDSCriteriaSetSelect.click();
    await this.page.getByText(criteriaSetName).click();
    await this.productDSCriteriaSetForm.click();
  }
   
  async clickSaveProduct() {
    await this.productSaveBtn.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
    await this.productSaveBtn.click();
  } 

  async searchProductByName(name) {
    const productSearchField = this.page.locator(SELECTORS.productSearchField);
    await productSearchField.fill(name);
    const count = await this.productListRow.count();
    expect(count).toBeGreaterThan(0);
  }
}  

module.exports = { AddProductPage };
