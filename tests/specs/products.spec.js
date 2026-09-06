const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/user/LoginPage');
const { ProductsPage } = require('../../pages/products/ProductsPage');
const { AddProductPage } = require('../../pages/products/AddProductPage');
const { ProductDetailPage } = require('../../pages/products/ProductDetailPage');
const { getCredentials } = require('../../util/helpers');
const addProductData = require('../../data/addProduct.json');

test.describe('DreamLink CRM - Products', () => {
  let loginPage;
  let productsPage;
  let addProductPage;
  let productDetailPage;
  const userData = getCredentials();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    addProductPage = new AddProductPage(page);
    productDetailPage = new ProductDetailPage(page);
    await loginPage.open();
    await loginPage.login(userData.username, userData.password);
    await productsPage.open();
    await productsPage.expectLoaded();
  });

  test('TC-PR-01 | Manage Products page loads via sidebar navigation and list is populated', async ({ page }) => {
    await productsPage.clickProductsNav();
    await productsPage.expectLoaded();
    await productsPage.expectProductListPopulated();
  });

  test('TC-PR-02 | Create a new Product and verify its creation', async ({ page }) => {
    const productData = addProductData.newProduct;
    await productsPage.open();
    await addProductPage.clickAddProduct();
    await addProductPage.fillProductName(productData.productName);
    await addProductPage.fillProductDescription(productData.productDescription);
    await addProductPage.selectEligibilityCriteriaSet(productData.criteriaSetName);
    await addProductPage.clickSaveProduct();
    await productsPage.open();
    await addProductPage.searchProductByName(productData.productName);
  });

  test ('TC-PR-03 | View the details of an existing Product and verify the displayed Product name verification', async ({ page }) => {
    const selectedProductName = await productsPage.clickFirstProduct();
    await productDetailPage.expectLoaded();
    await productDetailPage.expectProductName(selectedProductName);
  });

});