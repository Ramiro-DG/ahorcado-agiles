Feature: Simulacion completa de juego
    Simulacion de situaciones comunes en un juego

    Scenario: El jugador gana el juego
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador adivina una letra "correcta"
        Then la letra "" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 7
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 6
        When el jugador "" adivina la palabra
        Then la palabra oculta "" se muestra
        And el número de intentos restantes debe indicar 6

    Scenario: El jugador no acierta 7 letras y pierde
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 6
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 5
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 4
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 3
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 2
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 1
        When el jugador adivina una letra "incorrecta"
        Then la letra "no" se muestra en la palabra oculta
        And el número de intentos restantes debe indicar 0
