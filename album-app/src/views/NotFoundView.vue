<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-icon">🎵</div>
      <h1 class="error-title">404 - Page Not Found</h1>
      <p class="error-message">
        Oops! The page you're looking for doesn't exist.
        It might have been moved, deleted, or you entered the wrong URL.
      </p>
      
      <div class="error-actions">
        <button @click="goHome" class="home-button">
          🏠 Go Home
        </button>
        <button @click="goToAlbums" class="albums-button">
          🎵 Browse Albums
        </button>
        <button @click="goBack" class="back-button">
          ← Go Back
        </button>
      </div>
      
      <div class="suggestions">
        <h3>You might be looking for:</h3>
        <ul>
          <li><router-link to="/">Home page</router-link></li>
          <li><router-link to="/albums">All Albums</router-link></li>
          <li><router-link to="/about">About page</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToAlbums = () => {
  router.push('/albums')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
  background: var(--color-background);
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border);
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;
}

.error-title {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
  font-weight: bold;
}

.error-message {
  font-size: 1.1rem;
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.home-button,
.albums-button,
.back-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-weight: 500;
  text-decoration: none;
}

.home-button {
  background-color: var(--vt-c-green);
  color: white;
}

.home-button:hover {
  background-color: var(--vt-c-green-light);
  transform: translateY(-2px);
}

.albums-button {
  background-color: var(--vt-c-blue);
  color: white;
}

.albums-button:hover {
  background-color: var(--vt-c-blue-light);
  transform: translateY(-2px);
}

.back-button {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.back-button:hover {
  background-color: var(--color-border);
}

.suggestions {
  border-top: 1px solid var(--color-border);
  padding-top: 2rem;
}

.suggestions h3 {
  font-size: 1.2rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.suggestions ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions li {
  margin-bottom: 0.5rem;
}

.suggestions a {
  color: var(--vt-c-green);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.suggestions a:hover {
  color: var(--vt-c-green-light);
  text-decoration: underline;
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

@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem;
    margin: 1rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .home-button,
  .albums-button,
  .back-button {
    width: 200px;
  }
}
</style>