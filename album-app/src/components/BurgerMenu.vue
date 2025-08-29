<template>
  <nav class="burger-nav">
    <div class="nav-brand">
      <RouterLink to="/albums" class="brand-link">
        <span class="music-icon">🎵</span>
        <span class="brand-text">Album App</span>
      </RouterLink>
    </div>
    
    <button 
      class="burger-toggle"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu"
      aria-label="Toggle navigation menu"
    >
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>

    <div class="nav-menu" :class="{ active: isMenuOpen }">
      <RouterLink 
        to="/albums" 
        class="nav-link"
        @click="closeMenu"
      >
        Albums
      </RouterLink>
      <RouterLink 
        to="/about" 
        class="nav-link"
        @click="closeMenu"
      >
        About
      </RouterLink>
    </div>

    <div 
      v-if="isMenuOpen" 
      class="nav-overlay"
      @click="closeMenu"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.burger-nav {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 1.2rem;
}

.music-icon {
  font-size: 1.5rem;
}

.brand-text {
  color: #667eea;
}

.burger-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.25rem;
  z-index: 1001;
}

.burger-line {
  width: 25px;
  height: 3px;
  background: #333;
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-toggle.active .burger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.burger-toggle.active .burger-line:nth-child(2) {
  opacity: 0;
}

.burger-toggle.active .burger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #f0f0f0;
  color: #667eea;
}

.nav-link.router-link-active {
  background: #667eea;
  color: white;
}

.nav-overlay {
  display: none;
}

@media (max-width: 768px) {
  .burger-nav {
    padding: 1rem;
  }

  .burger-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 250px;
    height: 100vh;
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 5rem 0 2rem 0;
    gap: 0;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-link {
    padding: 1rem 2rem;
    border-radius: 0;
    border-bottom: 1px solid #eee;
  }

  .nav-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>