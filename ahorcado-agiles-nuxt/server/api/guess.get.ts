import { Ahorcado } from "../utils/ahorcado";
import { getSharedData, setSharedData } from "../utils/shared";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const game: Ahorcado = getSharedData("ahorcado");

  if (!game) {
    return {
      error: "No hay juego en progreso",
    };
  }
  if (query.word) game.adivinar(query.word);
  if (query.letter) game.adivinar_letra(query.letter);

  setSharedData("ahorcado", game);

  return {
    array_palabra_a_adivinar: game.array_palabra_a_adivinar,
    intentos_restantes: game.intentos_restantes,
  };
});

// server/api/get-data.js
