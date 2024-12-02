<script setup lang="ts">
import { onMounted } from 'vue';

interface GameResponse {
    array_palabra_a_adivinar: string[];
    intentos_restantes: number;
}

onMounted(async () => {
    console.log('Mounted /gaming');
    let response: GameResponse = await $fetch('/api/startGame');
    console.log(response.array_palabra_a_adivinar);
    console.log(response.intentos_restantes);
});

let guessLetter = async (event: any) => {
    console.log('Guessing letter:', event.target.id);
    let response:GameResponse = await $fetch('/api/guess?letter=' + event.target.id[0], { method: 'GET' });

};

async function guessWord(palabra: string) {
    console.log('Guessing word:', palabra);
    let response: GameResponse = await $fetch('/api/guess?word='+palabra);
    console.log(response.array_palabra_a_adivinar);
    console.log(response.intentos_restantes);
}
</script>

<template>
    <h1>/gaming</h1>
    <div>
        <h2>Intentos restantes: {{intentos_restantes}}</h2>
        <h2>Palabra a adivinar: {{array_palabra_a_adivinar}}</h2>
    </div>

    <button id="a" @click="guessLetter">Guess A</button>
    <button id="b" @click="guessLetter">Guess B</button>
    <button id="p" @click="guessLetter">Guess p</button>
</template>
