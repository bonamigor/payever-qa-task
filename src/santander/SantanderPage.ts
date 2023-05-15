import { By, until } from "selenium-webdriver";
import { AbstractPages } from "../AbstractCreateAccount";
import { faker } from "@faker-js/faker";
import { assertApps } from "../utils/assertApps";

export class SantanderPage extends AbstractPages {
  private selectors = {
    businessForm: 'entry-dynamic-business-form',
    inputElements: 'div.label-container > span.label-text',
    inputs: 'div.input-field > input',
    buttons: {
      submit: 'button[type="submit"]',
      getStarted: 'button.welcome-screen-content-button'
    }
  }

  private appsToBeDisplayed = ['Transactions', 'Checkout', 'Connect', 'Point of Sale', 'Settings']
  private appsToBeCompared: Array<string> = [];

  async registerBusiness() {
    const businessForm = await this.driver.wait(until.elementLocated(By.css(this.selectors.businessForm)))

    if (businessForm) {
      const inputElements = await this.driver.wait(until.elementsLocated(By.css(this.selectors.inputElements)));
      const inputs = await this.driver.wait(until.elementsLocated(By.css(this.selectors.inputs)))

      for await (const element of inputElements) {
        const input = (await element.getText()).trim()

        switch(input) {
          case 'Company name':
            const companyName = faker.lorem.word()
            await element.click();
            await inputs[0].sendKeys(`${companyName.substring(0, 1).toUpperCase()}${companyName.substring(1)}`)
            break;

          case 'Industry':
            await element.click();
            await this.driver.wait(until.elementLocated(By.css('mat-option[role="option"]'))).click()
            break;

          case 'Phone Number':
            await element.click();
            await inputs[2].sendKeys('123123123')
            break;

          case 'VAT number':
            await element.click();
            await inputs[3].sendKeys('123123123')
            break;
        }
      }

      await this.driver.wait(until.elementLocated(By.css(this.selectors.buttons.submit))).click();
    }

    await this.driver.wait(until.elementLocated(By.css(this.selectors.buttons.getStarted))).click()

    await assertApps({ appsToBeDisplayed: this.appsToBeDisplayed, appsToBeCompared: this.appsToBeCompared, driver: this.driver })
  }
}