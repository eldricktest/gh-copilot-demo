<template>
  <div class="splash-screen">
    <div class="splash-content">
      <div class="logo-container">
        <div class="music-icon">🎵</div>
        <h1 class="app-title">Album App</h1>
        <p class="app-subtitle">Discover Your Music Collection</p>
      </div>
      <div class="loading-indicator">
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Simulate loading time and then redirect to albums
  setTimeout(() => {
    router.push('/albums')
  }, 2500)
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
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.splash-content {
  text-align: center;
  color: white;
  animation: fadeInUp 1s ease-out;
}

.logo-container {
  margin-bottom: 3rem;
}

.music-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
}

.app-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2.5rem;
  }
  
  .music-icon {
    font-size: 3rem;
  }
}
</style>