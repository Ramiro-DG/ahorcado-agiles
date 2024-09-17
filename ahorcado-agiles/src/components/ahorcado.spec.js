import { expect, test } from "vitest";
import { Ahorcado } from "./ahorcado";

const ahc = new Ahorcado("Dia")

test("Adivinar 'Dia'", () => expect(ahc.adivinar("Dia")).toBe(true));