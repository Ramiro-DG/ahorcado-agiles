import { expect, test } from "vitest";
import { Ahorcado } from "./ahorcado";

const ahc = new Ahorcado("dia")

test("Adivinar 'dia'", () => expect(ahc.adivinar("dia")).toBe(true));

test('Validar que una la letra este en la palabra', () => expect(ahc.adivinar("d")).toBe(true));