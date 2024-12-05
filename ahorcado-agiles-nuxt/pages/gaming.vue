<script setup lang="ts">
import { onMounted } from "vue";
let array_palabra_a_adivinar = ref([""]);
let intentos_restantes = ref(0);
let wordInput = ref("");

interface GameResponse {
  array_palabra_a_adivinar: string[];
  intentos_restantes: number;
}

onMounted(async () => {
  console.log("Mounted /gaming");
  document.querySelector("input").disabled = false;
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
  const urlParams = new URLSearchParams(window.location.search);
  const endpoint = urlParams.has("testing")
    ? "/api/startGame?word=palabras"
    : "/api/startGame";
  let response: GameResponse = await $fetch(endpoint);
  array_palabra_a_adivinar.value = response.array_palabra_a_adivinar;
  intentos_restantes.value = response.intentos_restantes;
});

let guessLetter = async (event: any) => {
  console.log("Guessing letter:", event.target.id);
  let response: GameResponse = await $fetch(
    "/api/guess?letter=" + event.target.id[0],
    { method: "GET" }
  );
  array_palabra_a_adivinar.value = await response.array_palabra_a_adivinar;
  intentos_restantes.value = await response.intentos_restantes;
  console.log(response.array_palabra_a_adivinar);
  console.log(response.intentos_restantes);
  event.target.disabled = true;
  checkStatus();
};

async function guessWord(palabra: string) {
  console.log("Guessing word:", palabra);
  let response: GameResponse = await $fetch("/api/guess?word=" + palabra);
  array_palabra_a_adivinar.value = response.array_palabra_a_adivinar;
  intentos_restantes.value = response.intentos_restantes;
  console.log(response);
  checkStatus();
}
const submitGuess = () => {
  if (wordInput.value.trim()) {
    guessWord(wordInput.value);
    wordInput.value = ""; // Clear input after submission
  }
};

function checkStatus() {
  console.log("Checking status");
  if (intentos_restantes.value <= 0) {
    alert("Perdiste :_(");
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
    document.querySelector("input").disabled = true;
    setTimeout(() => {
      navigateTo("/");
    }, 1000);
  } else if (array_palabra_a_adivinar.value.indexOf("-") === -1) {
    alert("Ganaste! :D");
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
    document.querySelector("input").disabled = true;
    setTimeout(() => {
      navigateTo("/");
    }, 1000);
  }
}
</script>

<template>
  <section
    class="hero block"
    :class="{
      'is-primary': intentos_restantes > 3,
      'is-warning': intentos_restantes <= 3 && intentos_restantes > 1,
      'is-danger': intentos_restantes <= 1,
    }"
  >
    <div class="hero-body">
      <h2 class="title">
        Intentos restantes:
        <strong id="intentos_restantes">{{ intentos_restantes }}</strong>
      </h2>
      <p class=""></p>
    </div>
  </section>
  <div class="container block">
    <div class="block">
      <div class="">
        <p class="title is-1 has-text-centered">
          {{ array_palabra_a_adivinar.join("").toUpperCase() }}
        </p>
      </div>
    </div>

    <div class="is-flex is-justify-content-center is-align-items-center">
      <div class="box has-text-centered block">
        <div class="field has-addons is-justify-content-center">
          <div class="control">
            <input
              class="input"
              v-model="wordInput"
              type="text"
              placeholder="Enter your guess"
              @keyup.enter="submitGuess"
            />
          </div>
          <div class="control">
            <button @click="submitGuess" class="button is-warning">
              Guess Word
            </button>
          </div>
        </div>
        <p class="transparent-text">:: {{ array_palabra_a_adivinar }} ::</p>
        <div class="keyboard">
          <div class="keyboard-row is-flex is-justify-content-center">
            <button
              v-for="letter in 'qwertyuiop'"
              :key="letter"
              :id="letter"
              class="button is-primary m-1"
              @click="guessLetter"
            >
              {{ letter.toUpperCase() }}
            </button>
          </div>
          <div class="keyboard-row is-flex is-justify-content-center">
            <button
              v-for="letter in 'asdfghjkl'"
              :key="letter"
              :id="letter"
              class="button is-primary m-1"
              @click="guessLetter"
            >
              {{ letter.toUpperCase() }}
            </button>
          </div>
          <div class="keyboard-row is-flex is-justify-content-center">
            <button
              v-for="letter in 'zxcvbnm'"
              :key="letter"
              :id="letter"
              class="button is-primary m-1"
              @click="guessLetter"
            >
              {{ letter.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.transparent-text {
  color: transparent;
  user-select: none;
}
</style>
