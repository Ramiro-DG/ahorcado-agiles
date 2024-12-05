<template>
  <div
    class="is-flex is-justify-content-center is-align-items-center"
    style="height: 100vh"
  >
    <div class="box has-text-centered">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <h1 class="title is-1">Ahorcado / Hangman</h1>
          <div class="buttons is-centered">
            <NuxtLink to="/gaming">
              <button class="button is-primary is-large">Start Game</button>
            </NuxtLink>
            <NuxtLink to="/gaming?testing">
              <button class="button is-link is-large">Start Testing</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
});
</script>

<style></style>
