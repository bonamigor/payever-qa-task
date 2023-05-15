import { faker } from "@faker-js/faker";
import { By, ThenableWebDriver, until } from "selenium-webdriver";

export abstract class AbstractPages {
  driver: ThenableWebDriver;

  constructor({ driver }: { driver: ThenableWebDriver }) {
    this.driver = driver;
  }

  async createAccount() {
    const inputElements = await this.driver.wait(until.elementsLocated(By.css('div.label-container')), 10000);
    const password = `Katun.${faker.date.anytime().getFullYear()}`;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    for await (const element of inputElements) {
      await element.click();
      const input = (await element.getText()).trim()

      switch (input) {
        case 'First name':
          await this.driver.wait(until.elementLocated(By.css('input[formcontrolname="firstName"]'))).sendKeys(firstName);
          break;

        case 'Last name':
          await this.driver.wait(until.elementLocated(By.css('input[formcontrolname="lastName"]'))).sendKeys(lastName);
          break;

        case 'Email':
          await this.driver.wait(until.elementLocated(By.css('input[formcontrolname="email"]'))).sendKeys(faker.internet.email({ firstName, lastName }));
          break;

        case 'Password':
          await this.driver.wait(until.elementLocated(By.css('input[formcontrolname="password"]'))).sendKeys(password);
          break;

        case 'Confirm Password':
          await this.driver.wait(until.elementLocated(By.css('input[formcontrolname="confirmPass"]'))).sendKeys(password);
          break;
      }
    }

    await this.driver.wait(until.elementLocated(By.css('button[type="submit"]'))).click();
  }

  async registerBusiness() {}
}