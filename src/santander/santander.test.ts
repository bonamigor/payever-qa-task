import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { SantanderPageFactory } from "./SantanderPageFactory";

const driver: ThenableWebDriver = new Builder().forBrowser('chrome').build();

describe('Test Case 2 - Value = "santander"', () => {
  before(async () => {
    await driver.navigate().to('https://commerceos.staging.devpayever.com/registration/santander');
  })

  it('Run "santander" steps', async () => {
    const santanderFactory = new SantanderPageFactory(driver);
    await santanderFactory.runSantanderSteps();
  });

  after(async () => {
    await driver.close();
  })
});