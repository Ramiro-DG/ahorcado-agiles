Feature: Rechazar o aceptar una letra
    Rechazar o aceptar una letra dependiendo si pertenece a la palabra o no.

    Scenario: El jugador adivina una letra correcta
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador adivina una letra "correcta"
        And el número de intentos restantes debe indicar 7

    Scenario: El jugador adivina una letra incorrecta
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 6