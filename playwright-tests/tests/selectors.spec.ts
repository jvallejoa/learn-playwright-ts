import { test, expect } from "@playwright/test";

test("Challenge 1: cancel order #2 button disappears after click", async ({
    page,
}) => {
    await page.goto("http://localhost:3000/orders.html");

    const orderRegion = await page.getByRole("region", { name: "Orders" });
    const orderSection = await orderRegion.getByText("Order #2").locator("..");
    await orderSection
        .getByRole("button", { name: "Cancel subscription" })
        .click();

    //await expect(orderSection.getByRole("button")).toHaveCount(0);
    await expect(orderSection).toHaveCount(0);
});

test("Challenge 2: Click the last cancel button", async ({ page }) => {
    await page.goto("http://localhost:3000/orders.html");

    const cancelButtons = page.getByRole("button", { name: 'Cancel subscription' });
    const countBefore = await cancelButtons.count();
    await cancelButtons.last().click();
    const countAfter = await cancelButtons.count();
    //await expect(countAfter).toBeLessThan(countBefore);
    expect(countAfter).toBe(countBefore - 1);
});

test("Challenge 3: Ensure order disappears", async ({ page }) => {
    await page.goto("http://localhost:3000/orders.html");

    const firstOrder = page.getByText("Order #1").locator("..");
    await firstOrder.getByRole("button", {name: 'Cancel subscription'}).click();
    
    // await expect(await firstOrder.count()).toBe(0);
    await expect(firstOrder).toHaveCount(0);
});