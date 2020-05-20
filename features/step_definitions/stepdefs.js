const { Given, When, Then, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, Capabilities, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');
require('dotenv').config()

require("chromedriver");
setDefaultTimeout(60 * 1000);

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

Given(/I open Kalcare website$/, async function() {
    await driver.get(process.env.KALCARE_URL);
    await driver.findElement({ css: ".MuiAppBar-positionFixed .MuiBox-root > img"});
    await driver.sleep(5000);
});

When(/I click the Masuk button$/, async function() {
    await driver.findElement({ css: ".MuiAppBar-positionFixed .MuiToolbar-root button:nth-child(5)"}).click();
    await driver.sleep(1000);
});

When(/^I fill the email field with "([^"]*)" and click Selanjutnya at popup login$/, 
async function(email) {
    await driver.findElement({ css: "input[name='username']"}).sendKeys(email);
    await driver.findElement({ css: ".MuiDialog-paperScrollPaper form button .MuiButton-label"}).click();
    await driver.sleep(1000);
});

When(/^I fill the password field with "([^"]*)" and click Masuk at popup login$/, 
async function(password) {
    await driver.findElement({ css: "input[name='password']"}).sendKeys(password);
    await driver.findElement({ css: ".MuiDialog-paperScrollPaper form button .MuiButton-label"}).click();
    await driver.sleep(1000);
});

When(/^I do login at Kalcare website$/, 
async function() {
    await driver.findElement({ css: "input[name='username']"}).sendKeys(process.env.KALCARE_EMAIL);
    await driver.findElement({ css: ".MuiDialog-paperScrollPaper form button .MuiButton-label"}).click();
    await driver.sleep(1000);
    await driver.findElement({ css: "input[name='password']"}).sendKeys(process.env.KALCARE_PASSWORD);
    await driver.findElement({ css: ".MuiDialog-paperScrollPaper form > button .MuiButton-label"}).click();
    await driver.sleep(5000);
});

Then(/I can see I am logged in to the Kalcare homepage$/, async function() {
    await driver.sleep(2000);
    let wording = await driver.findElement({css:"header .MuiToolbar-root div:nth-child(5) .MuiButton-label"}).getText();
    await assert.ok(wording.includes("Akun"));
    await driver.sleep(3000);
});

When(/^I search product "([^"]*)" in homepage$/, async function(item) {
    await driver.sleep(2000);
    // await driver.findElement({ css: ".MuiInputBase-root~.MuiButtonBase-root span:nth-child(1)"}).click();
    await driver.findElement({ css: "input[placeholder='Cari di E-Store']"}).sendKeys(item);
    await driver.findElement({ css: ".MuiInputBase-root~.MuiButtonBase-root span:nth-child(1)"}).click();
    await driver.sleep(1000);
});

Then(/I can see the search result page for "([^"]*)"$/, async function(item) {
    // await driver.sleep(2000);
    let wording = await driver.findElement({css:".MuiTypography-body1 strong"}).getText();
    await assert.ok(wording.includes(item));
    await driver.sleep(3000);
});

When(/^I click the first product on the search result list$/, 
async function() {
    await driver.findElement({ css: ".MuiBox-root:nth-child(3) > .MuiGrid-container > div:nth-child(1)"}).click();
    await driver.sleep(1000);
});

Then(/I go to that product PDP$/, async function() {
    // await driver.sleep(2000);
    await driver.findElement({css:".MuiGrid-container > div:nth-child(2) > p:nth-child(1)"});
    await driver.sleep(3000);
}); 

When(/^I choose the first list of the shop$/, 
    async function() {
        await driver.findElement({ css: ".MuiBox-root > .MuiGrid-container .MuiGrid-item:nth-child(1) button"}).click();
        await driver.sleep(1000);
});

When(/^I click Tambah ke Keranjang button$/, 
    async function() {
        await driver.findElement({ css: ".MuiBox-root button:nth-child(3)"}).click();
        await driver.sleep(1000);
});

Then(/I can see that the Cart is now have "([^"]*)" item$/, async function(count) {
    let wording = await driver.findElement({css:"span.MuiBadge-anchorOriginTopRightCircle"}).getText();
    await assert.ok(wording.includes(count));
    await driver.sleep(3000);
});

// Step definitions for Keranjang actions

When(/^I click Beli Sekarang button$/, async function() {
    await driver.findElement({ css: ".MuiBox-root button:nth-child(2)"}).click();
    await driver.sleep(1000);
});

Then(/I can see that I now in Keranjang Belanja$/, async function() {
await driver.findElement({css:".MuiContainer-fixed > div > a.MuiTypography-root~p.MuiTypography-root"});
await driver.sleep(3000);
}); 

When(/^I click Beli button on Keranjang page$/, async function() {
    await driver.findElement({ css: ".MuiContainer-root > div > div:nth-child(2) .MuiButton-label"}).click();
    await driver.sleep(1000);
});

When(/^I click Pilih pengiriman on Keranjang page$/, async function() {
await driver.findElement({ css: ".MuiGrid-item > div:nth-child(2) button"}).click();
await driver.sleep(1000);
});

When(/^I click Pembayaran button on Keranjang page$/, async function() {
    await driver.findElement({ css: ".MuiContainer-root > div > div:nth-child(2) .MuiButton-label"}).click();
    await driver.sleep(1000);
});

Then(/I can see the error message about the Pengiriman$/, async function() {
let wording = await driver.findElement({css:"div[role]  div div:nth-child(2) span"}).getText();
await assert.ok(wording.includes("Maaf, Pengiriman ke alamat anda tidak tersedia."));
await driver.sleep(3000);
});

AfterAll('end', async function () {
    await driver.quit();
});