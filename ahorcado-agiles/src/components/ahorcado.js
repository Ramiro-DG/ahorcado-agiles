export class Ahorcado {
    palabra_secreta;
    intentos_restantes = 7;
    letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


    constructor(palabra_secreta) {
        this.palabra_secreta = palabra_secreta
    }

    adivinar_letra(letra) {
        // Si la letra no esta dentro de letras, solo se retorna false
        if (!this.letras.includes(letra)) return false;

        // Si la letra esta en letras, se elimina de letras y continua
        this.letras[this.letras.indexOf(letra)] = "-";

        // Si esta en palabra_secreta, se retorna true
        if (this.palabra_secreta.includes(letra)) {
            return true
        } else {
            // Si no esta en palabra_secreta, se resta un intento y se retorna false
            this.intentos_restantes -= 1;
            return false;
        }   
    }

    adivinar(palabra) {
        if (palabra !== this.palabra_secreta){
            this.intentos_restantes -= 1;
            return false
        } else return true
    }

}