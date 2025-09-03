<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SplashScreen from './components/SplashScreen.vue'
import BurgerMenu from './components/BurgerMenu.vue'

const splashCompleted = ref(false)

const onSplashComplete = () => {
  splashCompleted.value = true
}
</script>

<template>
  <!-- Splash Screen (shows first) -->
  <SplashScreen v-if="!splashCompleted" @splash-complete="onSplashComplete" />
  
  <!-- Main App (shows after splash) -->
  <div v-else class="app">
    <header class="app-header">
      <div class="header-content">
        <!-- Mobile Burger Menu -->
        <div class="mobile-menu">
          <BurgerMenu />
        </div>
        
        <!-- Logo -->
        <div class="logo-container">
          <RouterLink to="/" class="logo-link">
            <img alt="Album App logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
            <span class="app-name">Album App</span>
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/albums" class="nav-link">Albums</RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2024 Album App. Made with ❤️ and Vue.js</p>
        <div class="footer-links">
          <RouterLink to="/" class="footer-link">Home</RouterLink>
          <RouterLink to="/albums" class="footer-link">Albums</RouterLink>
          <RouterLink to="/about" class="footer-link">About</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu {
  display: none;
}

.logo-container {
  flex: 1;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-heading);
  transition: color 0.3s ease;
}

.logo-link:hover {
  color: var(--vt-c-green);
}

.logo {
  margin-right: 0.75rem;
  transition: transform 0.3s ease;
}

.logo-link:hover .logo {
  transform: rotate(10deg);
}

.app-name {
  font-size: 1.5rem;
  font-weight: 600;
}

.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--vt-c-green);
  background-color: var(--color-background-soft);
}

.nav-link.router-link-active {
  color: var(--vt-c-green);
  background-color: var(--color-background-soft);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: var(--vt-c-green);
  border-radius: 1px;
}

.main-content {
  flex: 1;
}

.app-footer {
  background-color: var(--color-background-soft);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-content p {
  color: var(--color-text);
  margin: 0;
  opacity: 0.8;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: var(--color-text);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.footer-link:hover {
  opacity: 1;
  color: var(--vt-c-green);
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .mobile-menu {
    display: block;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .logo-container {
    flex: none;
  }
  
  .header-content {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .app-name {
    font-size: 1.25rem;
  }
}

/* Accessibility */
.nav-link:focus,
.footer-link:focus {
  outline: 2px solid var(--vt-c-green);
  outline-offset: 2px;
}

/* Loading transition */
.app {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
