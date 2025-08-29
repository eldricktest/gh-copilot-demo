<template>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h3 class="error-title">Oops! Something went wrong</h3>
    <p class="error-message">{{ message }}</p>
    <button 
      v-if="showRetry" 
      class="retry-button"
      @click="$emit('retry')"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  showRetry?: boolean
}>()

defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 1rem;
  margin: 2rem auto;
  max-width: 500px;
}

.error-icon {
  font-size: 3rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e53e3e;
  margin: 0;
}

.error-message {
  font-size: 1rem;
  color: #c53030;
  margin: 0;
  line-height: 1.5;
}

.retry-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #5a67d8;
}

.retry-button:active {
  transform: translateY(1px);
}
</style>