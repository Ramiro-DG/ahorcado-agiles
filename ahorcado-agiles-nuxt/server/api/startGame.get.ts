import { Ahorcado } from "../utils/ahorcado";
import { setSharedData } from "../utils/shared";
import { palabras } from "../utils/palabras";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  let word: any = "palabras";

  if (!query.word) {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    word = palabras[randomIndex];
  } else word = query.word;

  let ahorcado_instance = new Ahorcado(word);
  setSharedData("ahorcado", ahorcado_instance);

  return {
    array_palabra_a_adivinar: ahorcado_instance.array_palabra_a_adivinar,
    intentos_restantes: ahorcado_instance.intentos_restantes,
  };
});
