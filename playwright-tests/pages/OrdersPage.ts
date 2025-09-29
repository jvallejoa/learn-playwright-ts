import { Locator, Page } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

export class OrdersPage {
    readonly page: Page;
    readonly ordersRegion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersRegion = page.getByRole("region", { name: "Orders" })
    }

    async goto() {
        await this.page.goto(`${BASE_URL}/orders.html`);
        await this.ordersRegion.waitFor({ state: 'visible' })
    }

    // Orders
    getOrdersSection(orderNumber: string): Locator {
        return this.ordersRegion.getByText(`Order #${orderNumber}`).locator("..");
    }

    getCancelButton(orderSection: Locator): Locator {
        return orderSection.getByRole('button', { name: 'Cancel subscription' });
    }

    getAllCancelButtons(): Locator {
        return this.page.getByRole('button', { name: 'Cancel subscription' });
    }

    async cancelOrder(orderNumber: string): Promise<void> {
        const orderSection = this.getOrdersSection(orderNumber);
        const cancelButton = this.getCancelButton(orderSection);
        await cancelButton.waitFor({ state: 'visible' })
        await cancelButton.waitFor({ state: 'attached' })
        await cancelButton.click();
    }

    async hasOrder(orderNumber: string): Promise<boolean> {
        const orderSection = this.getOrdersSection(orderNumber);
        try {
            await orderSection.waitFor({ state: 'visible', timeout: 1000 })
            return true;
        } catch {
            return false;
        }
    }

    // Filters
    getFilterSection(): Locator {
        return this.page.getByRole("region", { name: "Filters" });
    }
    
    getFilterCheckbox(filterName: string): Locator {
        return this.getFilterSection().getByRole('checkbox', { name: `${filterName}` });
    }

    async checkFilter(filterName: string): Promise<void> {
        (await this.getFilterCheckbox(filterName)).check();
    }
    async unCheckFilter(filterName: string): Promise<void> {
        (await this.getFilterCheckbox(filterName)).uncheck();
    }
}