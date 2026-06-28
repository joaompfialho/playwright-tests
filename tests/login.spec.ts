import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const validUsers = [
  "standard_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];

function getPassword(): string {
  const password = process.env.PASSWORD;
  if (!password) {
    throw new Error("PASSWORD environment variable is not defined");
  }
  return password;
}

test.describe("SauceDemo login flows", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("logs in successfully with valid credentials", async () => {
    await loginPage.login("standard_user", getPassword());
    await loginPage.assertOnDashboard();
  });

  test("shows an error for invalid credentials", async () => {
    await loginPage.login("standard_user", "wrong_password");
    await loginPage.expectErrorMessage(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("logs out successfully", async () => {
    await loginPage.login("standard_user", getPassword());
    await loginPage.assertOnDashboard();
    await loginPage.logout();
    await loginPage.assertOnLoginPage();
  });

  for (const username of validUsers) {
    test(`supports login for ${username}`, async () => {
      await loginPage.login(username, getPassword());
      await loginPage.assertOnDashboard();
      await loginPage.logout();
      await loginPage.assertOnLoginPage();
    });
  }
});
