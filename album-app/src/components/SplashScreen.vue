<template>
  <div class="splash-screen" v-if="isVisible">
    <div class="splash-content">
      <div class="logo-container">
        <img 
          src="@/assets/logo.svg" 
          alt="Album App Logo" 
          class="logo-animation"
        />
      </div>
      <h1 class="app-title">Album App</h1>
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <p class="loading-text">Loading amazing albums...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(true)

const emit = defineEmits<{
  splashComplete: []
}>()

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
    emit('splashComplete')
  }, 3000) // Show splash for 3 seconds
})
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.5s ease-in;
}

.splash-content {
  text-align: center;
  color: white;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo-animation {
  width: 120px;
  height: 120px;
  animation: bounce 2s infinite;
}

.app-title {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: slideIn 1s ease-out 0.5s both;
}

.loading-spinner {
  margin: 2rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.loading-text {
  font-size: 1.2rem;
  opacity: 0.9;
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2.5rem;
  }
  
  .logo-animation {
    width: 100px;
    height: 100px;
  }
}
</style>