import { expect, Page } from "@playwright/test";

export class LoginPage {
  page: Page;
  usernameInput: string;
  passwordInput: string;
  loginButton: string;
  pageTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = "#user-name";
    this.passwordInput = "#password";
    this.loginButton = "#login-button";
    this.pageTitle = ".title";
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async assertOnDashboard() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.locator(this.pageTitle)).toHaveText("Products");
  }

  async close() {
    await this.page.close();
  }
}
