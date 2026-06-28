import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productsTitle: Locator;
  readonly loginButtonOnPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator('[data-test="error"]');
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.productsTitle = page.locator(".title");
    this.loginButtonOnPage = page.locator("#login-button");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertOnDashboard() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.productsTitle).toHaveText("Products");
  }

  async assertOnLoginPage() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    await expect(this.loginButtonOnPage).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(message);
  }

  async logout() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}
