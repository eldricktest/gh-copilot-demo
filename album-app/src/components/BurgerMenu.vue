<template>
  <div class="burger-menu">
    <!-- Burger Button -->
    <button 
      class="burger-button"
      @click="toggleMenu"
      :aria-expanded="isMenuOpen"
      aria-label="Toggle navigation menu"
      :class="{ 'active': isMenuOpen }"
    >
      <span class="burger-line"></span>
      <span class="burger-line"></span>
      <span class="burger-line"></span>
    </button>

    <!-- Overlay -->
    <div 
      v-if="isMenuOpen" 
      class="menu-overlay"
      @click="closeMenu"
      aria-hidden="true"
    ></div>

    <!-- Sliding Menu -->
    <nav 
      class="slide-menu"
      :class="{ 'open': isMenuOpen }"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="menu-header">
        <h2>Navigation</h2>
        <button 
          class="close-button"
          @click="closeMenu"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>
      
      <ul class="menu-items">
        <li>
          <RouterLink 
            to="/" 
            @click="closeMenu"
            class="menu-link"
            active-class="active"
          >
            <span class="menu-icon">🏠</span>
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/albums" 
            @click="closeMenu"
            class="menu-link"
            active-class="active"
          >
            <span class="menu-icon">🎵</span>
            Albums
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/about" 
            @click="closeMenu"
            class="menu-link"
            active-class="active"
          >
            <span class="menu-icon">ℹ️</span>
            About
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Close menu on escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.burger-menu {
  position: relative;
}

.burger-button {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
  transition: all 0.3s ease;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
  transform-origin: center;
}

.burger-button.active .burger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.burger-button.active .burger-line:nth-child(2) {
  opacity: 0;
}

.burger-button.active .burger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

.slide-menu {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100vh;
  background-color: var(--color-background);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
  padding: 0;
  overflow-y: auto;
}

.slide-menu.open {
  left: 0;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
}

.menu-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-heading);
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--color-text);
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--color-heading);
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-items li {
  border-bottom: 1px solid var(--color-border);
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.menu-link:hover {
  background-color: var(--color-background-soft);
  color: var(--color-heading);
}

.menu-link.active {
  background-color: var(--vt-c-green);
  color: white;
}

.menu-icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Hide burger menu on larger screens */
@media (min-width: 1024px) {
  .burger-menu {
    display: none;
  }
}

/* Accessibility */
.burger-button:focus,
.close-button:focus,
.menu-link:focus {
  outline: 2px solid var(--vt-c-green);
  outline-offset: 2px;
}

/* Prevent scrolling when menu is open */
body:has(.slide-menu.open) {
  overflow: hidden;
}
</style>