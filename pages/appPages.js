class InternetPage {
  constructor(page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
    this.checkboxes = page.locator('input[type="checkbox"]');
  }

  async navigate(path) {
    await this.page.goto(`https://the-internet.herokuapp.com/${path}`);
  }
}

class SauceDemoPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async login(user, pass) {
    await this.page.fill('#user-name', user);
    await this.page.fill('#password', pass);
    await this.page.click('#login-button');
  }
}

module.exports = { InternetPage, SauceDemoPage };
