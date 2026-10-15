const base = require('@playwright/test');
const { InternetPage, SauceDemoPage } = require('../pages/appPages');

exports.test = base.test.extend({
  saucePage: async ({ page }, use) => {
    const sauceDemo = new SauceDemoPage(page);
    await page.goto('https://www.saucedemo.com/');
    await use(sauceDemo);
  },
  internetPage: async ({ page }, use) => {
    const internet = new InternetPage(page);
    await use(internet);
  }
});
