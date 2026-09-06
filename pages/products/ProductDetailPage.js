const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productNameField = page.locator('form').filter({ hasText: 'Product Name' }).getByRole('textbox');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/dl-product\//, { timeout: TIMEOUTS.navigation });
    await this.productNameField.waitFor({ state: 'visible', timeout: TIMEOUTS.default });
  }

  async expectProductName(expectedName) {
    expect(await this.productNameField.inputValue()).toBe(expectedName);
  }
}

module.exports = { ProductDetailPage };