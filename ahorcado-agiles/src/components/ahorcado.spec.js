import { expect, test } from "vitest";
import { Ahorcado } from "./ahorcado";

const ahc = new Ahorcado("Dia")

test("Adivinar 'Dia'", () => expect(ahc.adivinar("Dia")).toBe(true));
test("Adivinar 'Dio'", () => expect(ahc.adivinar("Dio")).toBe(false));

test("Adivinar letra 'a'", () => expect(ahc.adivinar_letra("a")).toBe(true));
test("Adivinar letra 'b'", () => expect(ahc.adivinar_letra("b")).toBe(false));