import assert from "assert";
import { Given, When, Then, After, Before } from "@cucumber/cucumber";
import { Ahorcado } from "../../components/functionality/ahorcado.js";
import puppeteer, { Browser, Page } from "puppeteer";

let ahorcado = new Ahorcado("palabras");
const base_URL = "http://localhost:3000";
const letras_correctas = ["p", "a", "l", "b", "r", "s"];
const letras_incorrectas = ["z", "x", "y", "w", "v", "u", "t","q","o","n","m","k","j","i"];
let good_index = 0,
  bad_index = 0;
let browser, page;

Before(async function () {
  browser = await puppeteer.launch({
    headless: true
  });
  browser.defaultBrowserContext();
  page = await browser.newPage();
  await page.goto(base_URL, {waitUntil: 'load', timeout: 0});
  good_index = 0;
  bad_index = 0;
});

After(async function () {
  await browser.close();
});

Given("el jugador inicia un nuevo juego de ahorcado", async function () {
  await page.locator("text/Start Game").click();
  good_index = 0;
  bad_index = 0;
});

When("el jugador adivina una letra {string}", async function (string) {
  const text = string === "correcta" ? letras_correctas[good_index++] : letras_incorrectas[bad_index++];
  await page .locator("text/Guess "+text.toUpperCase()).click();
  await page.waitForNetworkIdle({
    idleTime: 500,  // 500ms of no network activity
    maxInflightRequests: 0 // No ongoing network requests
  });
});

Then(
  "la letra {string} se muestra en la palabra oculta",
  async function (string) {
    const pHandle = await page.$("p");
    const text_shown = await page.evaluate((p) => p.textContent, pHandle);
    await pHandle.dispose();

    if (string !== "no") {
      assert(    
            text_shown.includes(letras_correctas[good_index-1]));
    } else {
      assert.equal(
        text_shown.includes(letras_incorrectas[bad_index - 1]),
        false
      );
    }
  }
);

Then(
  "el número de intentos restantes debe indicar {int}",
  async function (int) {
    await page.waitForNetworkIdle({
      idleTime: 500,  // 500ms of no network activity
      maxInflightRequests: 0 // No ongoing network requests
    });
    const h2Handle = await page.$("strong");
    const text_shown = await page.evaluate((strong) => strong.innerText, h2Handle);
    await h2Handle.dispose();

    assert.equal(int, text_shown);
  }
);

When("el jugador {string} adivina la palabra",async function (string) {
  const text = string !== "no" ? "palabras" : "orangutan";
  await page.locator('input').fill(text);
  await page.locator("text/Guess Word").click();
  await page.waitForNetworkIdle({
    idleTime: 500,  // 500ms of no network activity
    maxInflightRequests: 0 // No ongoing network requests
  });
});

Then("la alerta aparece",{timeout:10000},async function () {
  await page.waitForNetworkIdle({
    idleTime: 500,  // 500ms of no network activity
    maxInflightRequests: 0 // No ongoing network requests
  });
  await page.on('dialog',async dialog => {   //on event listener trigger

    console.log(dialog.message());  //get alert message

    await dialog.accept();        //accept alert

 })
});
