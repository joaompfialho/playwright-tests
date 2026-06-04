import { test, expect } from "@playwright/test";

const validUsers = [
  "standard_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];

test("Login with valid credentials", async ({ page }) => {
  // 1. Navigate to login page
  await page.goto("https://www.saucedemo.com/");

  // 2. Enter username
  await page.fill("#user-name", "standard_user");

  // 3. Enter password from environment variable
  const password = process.env.PASSWORD;
  if (!password)
    throw new Error("PASSWORD environment variable is not defined");
  await page.fill("#password", password);

  // 4. Click Login
  await page.click("#login-button");

  // 5. Verify dashboard
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".title")).toHaveText("Products");

  // 6. Close browser
  await page.close();
});

test("Login with invalid credentials", async ({ page }) => {
  // 1. Navigate to login page
  await page.goto("https://www.saucedemo.com/");

  // 2. Enter username
  await page.fill("#user-name", "standard_user");

  // 3. Enter password from environment variable
  await page.fill("#password", "wrong_password");

  // 4. Click Login
  await page.click("#login-button");

  // 5. Verify if the error message appears inside the dashboard
  const errorMessage = page.locator('[data-test="error"]');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );

  // 6. Close browser
  await page.close();
});

test("Login with valid credentials and logout", async ({ page }) => {
  // 1. Navigate to login page
  await page.goto("https://www.saucedemo.com/");

  // 2. Enter username
  await page.fill("#user-name", "standard_user");

  // 3. Enter password from environment variable
  const password = process.env.PASSWORD;
  if (!password)
    throw new Error("PASSWORD environment variable is not defined");
  await page.fill("#password", password);

  // 4. Click Login
  await page.click("#login-button");

  // 5. Verify dashboard
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator(".title")).toHaveText("Products");

  // 6. Click on the menu button
  await page.getByRole("button", { name: "Open Menu" }).click();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();

  // 7. Click on the logout link
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // 8. Verify if we are back to the login page
  await expect(page).toHaveURL("https://www.saucedemo.com/");
  await expect(page.locator("#login-button")).toBeVisible();

  // 9. Close browser
  await page.close();
});

for (const username of validUsers) {
  test(`Login with valid credentials and logout - ${username}`, async ({
    page,
  }) => {
    // 1. Navigate to login page
    await page.goto("https://www.saucedemo.com/");

    // 2. Enter username
    await page.fill("#user-name", username);

    // 3. Enter password from environment variable
    const password = process.env.PASSWORD;
    if (!password)
      throw new Error("PASSWORD environment variable is not defined");
    await page.fill("#password", password);

    // 4. Click Login
    await page.click("#login-button");

    // 5. Verify dashboard
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");

    // 6. Click on the menu button
    await page.getByRole("button", { name: "Open Menu" }).click();
    await expect(
      page.locator('[data-test="logout-sidebar-link"]'),
    ).toBeVisible();

    // 7. Click on the logout link
    await page.locator('[data-test="logout-sidebar-link"]').click();

    // 8. Verify if we are back to the login page
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    await expect(page.locator("#login-button")).toBeVisible();

    // 9. Close browser
    await page.close();
  });
}
