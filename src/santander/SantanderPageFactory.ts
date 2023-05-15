import { ThenableWebDriver } from "selenium-webdriver";
import { SantanderPage } from "./SantanderPage";

export class SantanderPageFactory {
  driver: ThenableWebDriver;

  constructor(driver: ThenableWebDriver) {
    this.driver = driver;
  }

  // Create Account, register business and validate apps;
  async runSantanderSteps() {
    const SantanderPageObject = new SantanderPage({ driver: this.driver })

    await SantanderPageObject.createAccount()

    await SantanderPageObject.registerBusiness()
  }
}