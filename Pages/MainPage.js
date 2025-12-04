import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
        /** @param {import ('@playwright/test').Page} */
    constructor(page, url) {
        super (page, url);
        this.homePageBtn = page.locator('i.fa.fa-home');
        this.productsBtn = page.locator('i.material-icons.card_travel');
        this.cartBtn = page.locator('i.fa.fa-shopping-cart');
        this.logoutBtn = page.locator('i.fa.fa-lock');
        this.deleteAccountBtn = page.getByRole('link', { name: 'Delete Account' });
        this.testCasesBtn = page.getByRole('link', { name: 'Test Cases' });
        this.apiTestingBtn = page.getByRole('link', { name: 'API Testing' });
        this.youTubeBtn = page.getByRole('link', { name: 'Video Tutorials'} );
        this.contactUsBtn = page.getByRole('link', { name: 'Contact us' });
        this.authorizationNameText = page.getByText('Autotest');
        this.womenCategoryBtn = page.getByRole('link', { name: 'Women' });
        this.dressBtn = page.getByRole('link', { name: 'Dress' });
        this.topBtn = page.getByRole('link', { name: 'Tops' });
        this.sareeBtn = page.getByRole('link', { name: 'Saree'});
        this.imageBanner = page.locator('img[src*="girl1.jpg"]');
        this.switchLeftBannerBtn = page.locator('i.fa.fa-angle-left');
        this.switchRightBannerBtn = page.locator('i.fa.fa-angle-right');
        this.logoMainPage = page.locator('i.logo.pull-left');
        this.logoMainPage = page.getByTestId('i.logo.pull-left');
        this.brandPolop = page.getByRole('link', { name: 'Polo' });
        this.brandHnM = page.getByRole('link', { name: 'H&M' });
        this.brandMadame = page.getByRole('link', { name: 'Madame' });
        this.brandMastHarbour = page.getByRole('link', { name: 'Mast & Harbour' });
        this.brandBabyhug = page.getByRole('link', { name: 'Babyhug' });
        this.brandAllenSolly = page.getByRole('link', { name: 'Allen Solly' });
        this.brandKookieKids = page.getByRole('link', { name: 'Kookie Kids' });
        this.brandBiba = page.getByRole('link', { name: 'Biba' });
    }

    async womenCategoryOpen(item1, item2, item3){
        await this.womenCategoryBtn.click();
        await expect(this.dressBtn).toHaveText(item1);
        await expect(this.topBtn).toHaveText(item2)
        await expect(this.sareeBtn).toHaveText(item3)
    }

    async veryfingImageBanner() {
        await expect(this.imageBanner).toBeVisible();
        await this.switchRightBannerBtn.click();
        await expect(this.imageBanner).toBeVisible();
        await this.switchRightBannerBtn.click();
        await expect(this.imageBanner).toBeVisible();
    }

    

}