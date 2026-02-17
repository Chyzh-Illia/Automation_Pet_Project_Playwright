export class BasePage {
        /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        this.page = page;
        this.url = url;
    }

    async openStartPage() {
        await this.page.goto(this.url);
    } 
}