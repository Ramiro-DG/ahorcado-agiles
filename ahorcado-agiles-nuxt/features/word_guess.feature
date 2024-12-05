Feature: Adivinar o no la palabra
    Jugar bien o no la palabra

    Scenario: El jugador adivina la palabra
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador "" adivina la palabra
        Then la alerta aparece

    Scenario: El jugador no adivina la palabra
        Given el jugador inicia un nuevo juego de ahorcado
        When el jugador "no" adivina la palabra
        Then el número de intentos restantes debe indicar 6