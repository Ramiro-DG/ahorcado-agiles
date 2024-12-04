<script setup lang="ts">
    import { onMounted } from 'vue';
    let array_palabra_a_adivinar = ref([""]);
    let intentos_restantes = ref(0);

    interface GameResponse {
        array_palabra_a_adivinar: string[];
        intentos_restantes: number;
    }

    onMounted(async () => {
        console.log('Mounted /gaming');
        let response: GameResponse = await $fetch('/api/startGame');
        array_palabra_a_adivinar.value = response.array_palabra_a_adivinar;
        intentos_restantes.value = response.intentos_restantes;
    });

    let guessLetter = async (event: any) => {
        console.log('Guessing letter:', event.target.id);
        let response:GameResponse = await $fetch('/api/guess?letter=' + event.target.id[0], { method: 'GET' });
        array_palabra_a_adivinar.value = await response.array_palabra_a_adivinar;
        intentos_restantes.value = await response.intentos_restantes;
        console.log(response.array_palabra_a_adivinar);
        console.log(response.intentos_restantes);
        checkStatus();
    };

    async function guessWord(palabra: string) {
        console.log('Guessing word:', palabra);
        let response: GameResponse = await $fetch('/api/guess?word='+palabra);
        checkStatus();
    }

    function checkStatus() {
        console.log('Checking status');
        if(intentos_restantes.value <= 0) {
        alert('Perdiste :_(');
            navigateTo('/');
        } else if(array_palabra_a_adivinar.value.indexOf('-') === -1) {
            alert('Ganaste! :D');
            navigateTo('/');
        }
    }
</script>

<template>
    <h1>/gaming</h1>
    <div>
        <h2>Intentos restantes: <strong id="intentos_restantes">{{intentos_restantes}}</strong></h2>
        <p id="letras_mostradas">{{array_palabra_a_adivinar}}</p>
    </div>
    <div>
        <button v-for="letter in 'abcdefghijklmnopqrstuvwxyz'" :key="letter" :id="letter" @click="guessLetter">
            Guess {{ letter.toUpperCase() }}
        </button>
    </div>
</template>
