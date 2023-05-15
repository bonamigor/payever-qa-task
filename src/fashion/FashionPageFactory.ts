import { ThenableWebDriver } from "selenium-webdriver";
import { FashionPage } from "./FashionPage";

export class FashionPageFactory {
  driver: ThenableWebDriver;

  constructor(driver: ThenableWebDriver) {
    this.driver = driver;
  }

  // Create Account, register business and validate apps;
  async runFashionSteps() {
    const FashionPageObject = new FashionPage({ driver: this.driver })

    await FashionPageObject.createAccount()

    await FashionPageObject.registerBusiness()
  }
}