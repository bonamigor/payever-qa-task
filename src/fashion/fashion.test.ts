import { Builder, ThenableWebDriver } from "selenium-webdriver";
import { FashionPageFactory } from "./FashionPageFactory";

const driver: ThenableWebDriver = new Builder().forBrowser('chrome').build();

describe('Test Case 1 - Value = "fashion"', () => {
  before(async () => {
    await driver.navigate().to('https://commerceos.staging.devpayever.com/registration/fashion');
  })

  it('Run "fashion" steps', async () => {
    const fashionFactory = new FashionPageFactory(driver);
    await fashionFactory.runFashionSteps();
  });

  after(async () => {
    await driver.close();
  })
});