import { Ahorcado } from "../utils/ahorcado";
import { setSharedData } from "../utils/shared";

export default defineEventHandler((event) => {
  let ahorcado_instance = new Ahorcado("Palabras");
  setSharedData("ahorcado", ahorcado_instance);
  return {
    array_palabra_a_adivinar: ahorcado_instance.array_palabra_a_adivinar,
    intentos_restantes: ahorcado_instance.intentos_restantes,
    palabra_secreta: ahorcado_instance.palabra_a_adivinar,
  };
});
