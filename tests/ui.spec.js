const { expect } = require('@playwright/test');
const { test } = require('../fixtures/testSetup');
const data = require('../test-data/data.json');

test.describe('UI Testing Tasks', () => {

  test('TEST 1: Page Load Validation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  test('TEST 2: Locators Validation', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
    await expect(page.locator('input.new-todo'))
      .toHaveAttribute('placeholder', 'What needs to be done?');
  });

  test('TEST 3: User Actions', async ({ internetPage }) => {
    await internetPage.navigate('dropdown');
    await internetPage.dropdown.selectOption('1');
    await expect(internetPage.dropdown).toHaveValue('1');

    await internetPage.navigate('checkboxes');
    await internetPage.checkboxes.first().check();
    await expect(internetPage.checkboxes.first()).toBeChecked();
  });

  test('TEST 4: Assertions', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL(/saucedemo/);
    const loginBtn = page.locator('#login-button');
    await expect(loginBtn).toHaveAttribute('type', 'submit');
  });

  test('TEST 5: Waits and Dynamic Content', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await page.locator('button').click();
    const finishText = page.locator('#finish h4');
    await expect(finishText).toBeVisible({ timeout: 10000 });
    await expect(finishText).toHaveText('Hello World!');
  });

  test('TEST 6: Login Flow', async ({ saucePage }) => {
    await saucePage.login(data.users.valid.user, data.users.valid.pass);
    await expect(saucePage.inventoryList).toBeVisible();
  });

  test('TEST 7: Negative Login', async ({ saucePage }) => {
    await saucePage.login(data.users.invalid.user, data.users.invalid.pass);
    await expect(saucePage.errorMessage).toContainText('Epic sadface');
  });

  test('TEST 8: Complex UI Handling', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', dialog => dialog.accept());
    await page.getByText('Click for JS Alert').click();

    await page.goto('https://the-internet.herokuapp.com/iframe');
    const frame = page.frameLocator('#mce_0_ifr');
    await expect(frame.locator('body')).toBeVisible();
    await frame.locator('body').pressSequentially('Hello inside iframe');
  });

  test('TEST 9: Data-Driven UI Test', async ({ saucePage, page }) => {
    const users = [data.users.valid, data.users.invalid];
    for (const user of users) {
      await page.goto('https://www.saucedemo.com/');
      await saucePage.login(user.user, user.pass);
      if (user.user === 'standard_user') {
        await expect(page).toHaveURL(/inventory/);
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();
      } else {
        await expect(saucePage.errorMessage).toBeVisible();
      }
    }
  });

  test('TEST 10: Network Validation', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', data.users.valid.user);
    await page.fill('#password', data.users.valid.pass);
    await page.locator('#login-button').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });
});
