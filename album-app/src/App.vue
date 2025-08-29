<script setup lang="ts">
import { RouterView } from 'vue-router'
import BurgerMenu from './components/BurgerMenu.vue'
</script>

<template>
  <div id="app">
    <BurgerMenu />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  background: #f8f9fa;
}

.main-content {
  min-height: calc(100vh - 80px);
}
</style>
