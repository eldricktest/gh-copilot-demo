<template>
  <div class="album-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading album details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h2>Album Not Found</h2>
      <p>{{ error }}</p>
      <div class="error-actions">
        <button @click="goBack" class="back-button">
          ← Go Back
        </button>
        <button @click="goToAlbums" class="albums-button">
          View All Albums
        </button>
      </div>
    </div>

    <!-- Album Details -->
    <div v-else-if="album" class="album-content">
      <button @click="goBack" class="back-button-top">
        ← Back
      </button>
      
      <div class="album-hero">
        <div class="album-image-large">
          <img 
            :src="album.image_url" 
            :alt="`${album.title} album cover`"
            @error="handleImageError"
          />
        </div>
        
        <div class="album-details">
          <h1 class="album-title">{{ album.title }}</h1>
          <h2 class="album-artist">by {{ album.artist }}</h2>
          <div class="album-price-container">
            <span class="price-label">Price:</span>
            <span class="album-price">${{ album.price.toFixed(2) }}</span>
          </div>
          
          <div class="album-actions">
            <button class="primary-button" @click="handlePurchase">
              🛒 Add to Cart
            </button>
            <button class="secondary-button" @click="handleWishlist">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <!-- Album Info Section -->
      <div class="album-info-section">
        <h3>Album Information</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Album ID:</span>
            <span class="info-value">{{ album.id }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Title:</span>
            <span class="info-value">{{ album.title }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Artist:</span>
            <span class="info-value">{{ album.artist }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Price:</span>
            <span class="info-value">${{ album.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { albumService } from '@/services/albumService'
import type { Album } from '@/types/Album'

const route = useRoute()
const router = useRouter()

const album = ref<Album | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchAlbum = async (id: number) => {
  loading.value = true
  error.value = null
  
  try {
    album.value = await albumService.getAlbumById(id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load album details'
    console.error('Error fetching album:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.go(-1)
}

const goToAlbums = () => {
  router.push('/albums')
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-album.jpg' // Fallback image
}

const handlePurchase = () => {
  alert(`Adding "${album.value?.title}" to cart!`)
}

const handleWishlist = () => {
  alert(`Adding "${album.value?.title}" to wishlist!`)
}

onMounted(() => {
  const albumId = parseInt(route.params.id as string)
  if (albumId && !isNaN(albumId)) {
    fetchAlbum(albumId)
  } else {
    error.value = 'Invalid album ID'
  }
})
</script>

<style scoped>
.album-detail {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--vt-c-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.back-button-top {
  background: none;
  border: none;
  color: var(--vt-c-green);
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.back-button-top:hover {
  color: var(--vt-c-green-light);
}

.album-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
  margin-bottom: 3rem;
}

.album-image-large {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  background-color: var(--color-border);
}

.album-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-details {
  padding: 1rem 0;
}

.album-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.album-artist {
  font-size: 1.5rem;
  color: var(--color-text);
  margin: 0 0 2rem 0;
  font-weight: normal;
  opacity: 0.8;
}

.album-price-container {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.price-label {
  font-size: 1rem;
  color: var(--color-text);
  margin-right: 0.5rem;
}

.album-price {
  font-size: 2rem;
  font-weight: bold;
  color: var(--vt-c-green);
}

.album-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button,
.back-button,
.albums-button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-weight: 500;
}

.primary-button {
  background-color: var(--vt-c-green);
  color: white;
}

.primary-button:hover {
  background-color: var(--vt-c-green-light);
  transform: translateY(-2px);
}

.secondary-button {
  background-color: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.secondary-button:hover {
  border-color: var(--vt-c-green);
  color: var(--vt-c-green);
}

.back-button,
.albums-button {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.back-button:hover,
.albums-button:hover {
  background-color: var(--color-border);
}

.album-info-section {
  margin-top: 3rem;
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.album-info-section h3 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0 0 1.5rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  font-weight: 500;
}

.info-value {
  font-size: 1rem;
  color: var(--color-heading);
  font-weight: 600;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .album-detail {
    padding: 1rem;
  }
  
  .album-hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .album-title {
    font-size: 2rem;
  }
  
  .album-artist {
    font-size: 1.25rem;
  }
  
  .album-actions {
    justify-content: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>