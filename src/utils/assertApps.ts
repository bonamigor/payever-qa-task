import { assert } from "chai";
import { By, WebDriver, until } from "selenium-webdriver";

export const assertApps = async (
  { appsToBeDisplayed, appsToBeCompared, driver }: 
  { appsToBeDisplayed: Array<string>, appsToBeCompared: Array<string>, driver: WebDriver }) => {
  const apps = await driver.wait(until.elementsLocated(By.css('div.icons__link')),10000);

  for await (const app of apps) {
    appsToBeCompared.push(await app.getText())
  }

  appsToBeDisplayed.forEach(app => {
    assert.include(appsToBeCompared, app, `The Apps Array contains the value '${app}'`);
  })

  console.log('All apps have been asserted')
}