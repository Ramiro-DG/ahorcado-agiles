import { expect, test } from "vitest";
import { Ahorcado } from "./ahorcado";

const ahc = new Ahorcado("Dia")
test("Adivinar 'Dia'", () => expect(ahc.adivinar("Dia")).toBe(true));
test("Adivinar 'Dio'", () => expect(ahc.adivinar("Dio")).toBe(false));
test("Adivinar letra 'a'", () => expect(ahc.adivinar_letra("a")).toBe(true));
test("Adivinar letra 'b'", () => expect(ahc.adivinar_letra("b")).toBe(false));


test("Adivinar letra perteneciente, intentos intactos",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar_letra("a")
    expect(ahorcado.intentos_restantes).toBe(7)
})
test("Adivinar letra no perteneciente, intentos -1",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar_letra("d")
    expect(ahorcado.intentos_restantes).toBe(6)
})
test("Adivinar palabra correctamente, intentos intactos",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar("palabra")
    expect(ahorcado.intentos_restantes).toBe(7)
})
test("Adivinar palabra incorrectamente, intentos -1",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar("frase")
    expect(ahorcado.intentos_restantes).toBe(6)
})

test("Adivinar letra perteneciente, letras restantes sin la letra",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar_letra("a")
    expect(ahorcado.letras).not.toContain("a")
})
test("Adivinar letra no perteneciente, letras restantes sin la letra e intentos -1",()=>{
    let ahorcado = new Ahorcado("palabra")
    ahorcado.adivinar_letra("z")
    expect(ahorcado.letras).not.toContain("z")
    expect(ahorcado.intentos_restantes).toBe(6)
})