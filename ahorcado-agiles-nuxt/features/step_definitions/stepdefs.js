import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
import { Ahorcado } from '../../components/functionality/ahorcado.js';

let ahorcado= new Ahorcado("palabras");
const letras_correctas = ["p", "a", "l", "b", "r", "s"]
const letras_incorrectas = ["z", "x", "y", "w", "v", "u", "t"]
let good_index=0,bad_index=0;

Given('el jugador inicia un nuevo juego de ahorcado', function () {
    ahorcado = new Ahorcado("palabras");
    good_index=0
    bad_index=0
  });

When('el jugador adivina una letra {string}', function (string) {
    if(string==="correcta"){ahorcado.adivinar_letra(letras_correctas[good_index++]);} 
    else {ahorcado.adivinar_letra(letras_incorrectas[bad_index++]);}
});

Then('la letra {string} se muestra en la palabra oculta', function (string) {
    if(string!=="no"){
        assert.strictEqual(ahorcado.array_palabra_a_adivinar.includes(letras_correctas[good_index-1]), true);
    } else {
        assert.strictEqual(ahorcado.array_palabra_a_adivinar.includes(letras_incorrectas[bad_index-1]), false);
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
        else assert.strictEqual(ahorcado.array_palabra_a_adivinar.includes("-"),true);
    });