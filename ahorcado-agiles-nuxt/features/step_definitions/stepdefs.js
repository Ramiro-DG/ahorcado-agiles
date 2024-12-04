import assert from 'assert';
import { Given, When, Then, After } from '@cucumber/cucumber';
import { Ahorcado } from '../../components/functionality/ahorcado.js';
import { Builder, By, Browser, until } from 'selenium-webdriver';

let ahorcado= new Ahorcado("palabras");
let driver;
const letras_correctas = ["p", "a", "l", "b", "r", "s"]
const letras_incorrectas = ["z", "x", "y", "w", "v", "u", "t"]
let good_index=0,bad_index=0;

After(async function () {
    await driver.quit();
  });

Given('el jugador inicia un nuevo juego de ahorcado',async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:3000/');
    await driver.manage().setTimeouts({implicit: 5000});
    let start_game_button=await driver.findElement(By.id('start_game_button'));
    // await driver.wait(until.elementLocated(By.id('start_game_button')), 5000);
    await start_game_button.click();

    good_index=0
    bad_index=0
  });

When('el jugador adivina una letra {string}',async function (string) {
    let letra_a = driver.findElement(By.id(letras_correctas[good_index]))
    await driver.wait(until.elementIsVisible(letra_a), 5000);
    // await driver.manage().setTimeouts({implicit: 5000});

    if(string==="correcta"){
        await driver.findElement(By.id(letras_correctas[good_index++])).click();
    } 
    else {
        await driver.findElement(By.id(letras_incorrectas[bad_index++])).click();}
});

Then('la letra {string} se muestra en la palabra oculta',async function (string) {
    let letras_mostradas = await driver.findElement(By.id('letras_mostradas')).getText();
    console.log("letras_mostradas: "+letras_mostradas)

    if(string!=="no"){
        assert.strictEqual(letras_mostradas.includes(letras_correctas[good_index-1]), true);
    } else {
        assert.strictEqual(letras_mostradas.includes(letras_incorrectas[bad_index-1]), false);
    }
});

Then('el número de intentos restantes debe indicar {int}',async function (int) {
    await driver.manage().setTimeouts({implicit: 5000});
    let intentos_restantes = await driver.findElement(By.id('intentos_restantes')).getText();
    console.log("intentos_restantes: "+intentos_restantes)

    assert.strictEqual(intentos_restantes, String(int));
});

When('el jugador {string} adivina la palabra', function (string) {
    if(string===""){
        ahorcado.adivinar("palabras");
    } else {
        ahorcado.adivinar("banana");
    }
  });

Then('la palabra oculta {string} se muestra', function (string) {
    
    if(string===""){
        assert.deepStrictEqual(ahorcado.array_palabra_a_adivinar, ["p", "a", "l", "a", "b", "r", "a", "s"]);
    }
        else assert.strictEqual(ahorcado.array_palabra_a_adivinar.includes("-"),true);
    });