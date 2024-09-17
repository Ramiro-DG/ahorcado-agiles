

export default class Ahorcado {
    palabra_secreta;
    intentos_restantes = 5;
    letras = [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, k, q, r, s, t, u, v, w, x, y, z];


    constructor(palabra_secreta) {
        this.palabra_secreta = palabra_secreta
    }

    adivinar_letra(letra) {
        if (this.palabra_secreta.includes(letra)) {
            this.letras.filter((element) => element !== letra);
            return true
        } else {
            this.letras.filter((element) => element !== letra);
            if (this.intentos_restantes > 1) {
                this.intentos_restantes -= 1;
            } else {
                return false;
            }
            return true;
        }
    }

    adivinar(palabra) {
        return palabra == this.palabra_secreta
    }

}