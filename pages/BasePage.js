const { expect } = require("@playwright/test");
const { SELECTORS, TIMEOUTS } = require("../common/constants");
const { logInfo } = require("../util/loggers");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForPageReady() {
    await this.page.waitForLoadState("load");
  }

  async closePopup() {
    try {
      const closeBtn = this.page
        .locator(".popup-close, .close-btn, .next-dialog-close")
        .first();
      await closeBtn.waitFor({ state: "visible", timeout: 5000 });
      await closeBtn.click();
      logInfo("Popup dismissed");
    } catch (error) {
      logInfo("No popup to dismiss");
    }
  }

  async expectVisible(locator, options = {}) {
    await expect(locator).toBeVisible({
      timeout: TIMEOUTS.default,
      ...options,
    });
  }

  async searchByAutocomplete(inputLocator, groupName) {
    const searchTerm = groupName.split(" ").pop();

    await inputLocator.waitFor({ state: "visible", timeout: TIMEOUTS.default });
    await inputLocator.clear();
    await inputLocator.fill(searchTerm);

    const listbox = this.page.locator(SELECTORS.autocompleteListbox);
    await listbox.waitFor({ state: "visible", timeout: TIMEOUTS.default });

    const dropdownOption = listbox
      .locator(SELECTORS.autocompleteDropdownOption)
      .filter({ hasText: groupName })
      .first();
    await dropdownOption.waitFor({
      state: "visible",
      timeout: TIMEOUTS.default,
    });
    await dropdownOption.click();

    await expect(inputLocator).toHaveValue(groupName, {
      timeout: TIMEOUTS.default,
    });
  }
}

module.exports = { BasePage, SELECTORS, TIMEOUTS };
