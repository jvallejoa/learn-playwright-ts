import { test, expect } from "@playwright/test";
import { OrdersPage } from "../pages/OrdersPage";

test.describe("Order cancellation tests", () => {
    let ordersPage: OrdersPage;

    test.beforeEach(async ({ page }) => {
        ordersPage = new OrdersPage(page);
        await ordersPage.goto();
    });

    test("should remove order section after canceling order #2", async () => {
        const orderSection = ordersPage.getOrdersSection("2");
        await expect(orderSection).toBeVisible();
        await ordersPage.cancelOrder("2");
        await expect(orderSection).toHaveCount(0);
    });

    test("should decrease cancel button count when clicking last cancel button", async () => {
        const cancelButtons = ordersPage.getAllCancelButtons();
        const initialCount = await cancelButtons.count();
        await cancelButtons.last().click();
        const finalCount = await cancelButtons.count();
        expect(finalCount).toBe(initialCount - 1);
    });

    test("should remove order #1 completely from the page", async () => {
        expect(await ordersPage.hasOrder("1")).toBe(true);

        await ordersPage.cancelOrder("1");

        const orderSection = await ordersPage.getOrdersSection("1");
        // await expect(await orderSection.count()).toBe(0);
        await expect(orderSection).toHaveCount(0);
        expect(await ordersPage.hasOrder("1")).toBe(false);
    });

    test("should apply pending filter", async () => {
        await ordersPage.unCheckFilter("Pending");
        await expect(ordersPage.getFilterCheckbox("Pending")).not.toBeChecked();
        await expect(ordersPage.getOrdersSection("2")).toBeHidden();
    })
});