import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
     readonly errorMessage: Locator;
     readonly completeHeader: Locator;
    

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });



        this.errorMessage = page.locator('[data-test="error"]');
        this.completeHeader = page.locator('h2.complete-header');
        }

        async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise < void> {
            await this.safeFill(this.firstNameInput, firstName);
            await this.safeFill(this.lastNameInput, lastName);
            await this.safeFill(this.postalCodeInput, postalCode);
        }
           
        async clickContinue(): Promise<void> {
         await  this.safeClick(this.continueButton);
         
        }

        async clickFinish(): Promise<void> {
            await this.safeClick(this.finishButton);
        }   

        }