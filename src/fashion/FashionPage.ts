import { By, until } from "selenium-webdriver";
import { AbstractPages } from "../AbstractCreateAccount";
import { faker } from "@faker-js/faker";
import { assertApps } from "../utils/assertApps";

export class FashionPage extends AbstractPages {
  private selectors = {
    businessForm: 'entry-default-business-registration',
    inputContainer: 'div.label-container',
    inputs: {
      companyName: 'input[formcontrolname="name"]',
      phoneNumber: 'input[formcontrolname="phoneNumber"]'
    },
    buttons: {
      submit: 'button[type="submit"]',
      getStarted: 'button.welcome-screen-content-button'
    }
  }

  private appsToBeDisplayed = ['Transactions', 'Checkout', 'Connect', 'Products', 'Shop', 'Settings']
  private appsToBeCompared: Array<string> = [];

  async registerBusiness() {
    const businessForm = await this.driver.wait(until.elementLocated(By.css(this.selectors.businessForm)))

    if (businessForm) {
      const inputElements = await this.driver.wait(until.elementsLocated(By.css(this.selectors.inputContainer)));
      for await (const element of inputElements) {
        const input = (await element.getText()).trim()

        if (input.includes('Company name')) {
          await element.click();
          const companyName = faker.lorem.word()
          await this.driver.wait(until.elementLocated(By.css(this.selectors.inputs.companyName))).sendKeys(`${companyName.substring(0, 1).toUpperCase()}${companyName.substring(1)}`);
        } 
        
        if (input.includes('Phone Number')) {
          await element.click();
          await this.driver.wait(until.elementLocated(By.css(this.selectors.inputs.phoneNumber))).sendKeys('123123123');
        }
      }

      await this.driver.wait(until.elementLocated(By.css(this.selectors.buttons.submit))).click();
    }

    await this.driver.wait(until.elementLocated(By.css(this.selectors.buttons.getStarted))).click()

    await assertApps({ appsToBeDisplayed: this.appsToBeDisplayed, appsToBeCompared: this.appsToBeCompared, driver: this.driver })
  }
}