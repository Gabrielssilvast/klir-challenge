import { expect, test } from "@playwright/test";

test("1 Validating size datails costumer", async ({ page }) => {
  test.fail(); // it is expected that the test will fail because I'll be checking a non-compliance scenario
  await page.goto("http://localhost:3000/");
  await expect(await page.title()).toBe("Klir Interview Project");

  await page.locator("#name").fill("localUser");
  await page.locator('input[type="button"][value="Submit"]').click();
  // You can also select the first h1 with h1:nth-child(1)
  await page.waitForSelector('//h1[text()="Welcome to Water Customer App"]');

  await page.click('text="Las Vegas Water"');
  //Asserts
  await expect(page.getByText("Customer Details")).toBeVisible();
  await expect(page.getByText("Las Vegas Water")).toBeVisible();
  await expect(page.getByText("3200")).toBeVisible();
  await expect(page.getByText("Medium")).toBeVisible(); //value described by the business rule
  await expect(page.getByText("Luke Skywalker")).toBeVisible();

  //await page.pause();
});

test("2 No contact info available", async ({ page }) => {
  test.fail();
  await page.goto("http://localhost:3000/");
  await expect(await page.title()).toBe("Klir Interview Project");

  await page.locator("#name").fill("localUser");
  await page.locator('input[type="button"][value="Submit"]').click();

  await page.waitForSelector('//h1[text()="Welcome to Water Customer App"]');

  await page.click('a:has-text("Denver\'s Water")');

  //information given when the customer details screen is not displayed
  await expect(page.getByText("No contact info available")).toBeVisible();
});

test("3 No contact info available", async ({ page }) => {
  test.fail();
  await page.goto("http://localhost:3000/");
  await page.locator("#name").fill("localUser");
  await page.locator('input[type="button"][value="Submit"]').click();

  await page.click('a:has-text("New York\'s Water")');
  //Asserts
  await expect(page.getByText("Customer Details")).toBeVisible();
  await expect(page.getByText("New York's Water")).toBeVisible();
  await expect(page.getByText("9053")).toBeVisible();
  await expect(page.getByText("Big")).toBeVisible();
  await expect(page.getByText("Leia Skywalker")).toBeVisible(); //According to the business rule, this information must be present
  await expect(page.getByText("leiaskywalker@newyorkwaters.com")).toBeVisible();
});
