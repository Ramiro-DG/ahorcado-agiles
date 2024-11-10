import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Ahorcado } from '../../src/components/ahorcado.js';

let ahorcado= new Ahorcado("palabras");;

Given('el jugador inicia un nuevo juego de ahorcado', function () {
    ahorcado = new Ahorcado("palabras");
  });

When('el jugador adivina una letra {string}', function (string) {
    if(string==="correcta"){ahorcado.adivinar_letra("a");} else {ahorcado.adivinar_letra("z");}
});

Then('la letra {string} se muestra en la palabra oculta', function (string) {
    if(string!=="no"){
        assert.strictEqual(ahorcado.array_palabra_a_adivinar.includes("a"), true);
    } else {
        return true
    }
});

Then('el número de intentos restantes debe indicar {int}', function (int) {
    assert.strictEqual(ahorcado.intentos_restantes, int);
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
        else return true
    });