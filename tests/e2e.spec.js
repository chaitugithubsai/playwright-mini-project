const { expect } = require('@playwright/test');
const { test } = require('../fixtures/testSetup');
const data = require('../test-data/data.json');

test.describe('E2E Testing Tasks', () => {

  test('TEST 1: Complete User Flow', async ({ saucePage }) => {
    await saucePage.login(data.users.valid.user, data.users.valid.pass);
    await expect(saucePage.inventoryList).toBeVisible();
    await saucePage.page.locator('.inventory_item button').first().click();
    await saucePage.page.locator('.shopping_cart_link').click();
    await expect(saucePage.page.locator('.cart_item')).toBeVisible();
  });

  test('TEST 2: Negative End-to-End Flow', async ({ saucePage }) => {
    await saucePage.login(data.users.invalid.user, data.users.invalid.pass);
    await expect(saucePage.errorMessage).toContainText('Epic sadface');
  });
});
