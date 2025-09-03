<template>
  <div class="albums-view">
    <header class="albums-header">
      <h1>All Albums</h1>
      <p>Discover our collection of amazing albums</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading albums...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h2>Oops! Something went wrong</h2>
      <p>{{ error }}</p>
      <button @click="fetchAlbums" class="retry-button">
        Try Again
      </button>
    </div>

    <!-- Albums Grid -->
    <div v-else-if="albums.length > 0" class="albums-grid">
      <div 
        v-for="album in albums" 
        :key="album.id"
        class="album-card"
        @click="goToAlbumDetail(album.id)"
        @keyup.enter="goToAlbumDetail(album.id)"
        tabindex="0"
        role="button"
        :aria-label="`View details for ${album.title} by ${album.artist}`"
      >
        <div class="album-image">
          <img 
            :src="album.image_url" 
            :alt="`${album.title} album cover`"
            @error="handleImageError"
          />
        </div>
        <div class="album-info">
          <h3 class="album-title">{{ album.title }}</h3>
          <p class="album-artist">{{ album.artist }}</p>
          <p class="album-price">${{ album.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon">🎵</div>
      <h2>No Albums Found</h2>
      <p>We couldn't find any albums in our collection.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { albumService } from '@/services/albumService'
import type { Album } from '@/types/Album'

const router = useRouter()
const albums = ref<Album[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchAlbums = async () => {
  loading.value = true
  error.value = null
  
  try {
    albums.value = await albumService.getAllAlbums()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load albums'
    console.error('Error fetching albums:', err)
  } finally {
    loading.value = false
  }
}

const goToAlbumDetail = (id: number) => {
  router.push(`/album/${id}`)
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-album.jpg' // Fallback image
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style scoped>
.albums-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.albums-header {
  text-align: center;
  margin-bottom: 3rem;
}

.albums-header h1 {
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.albums-header p {
  font-size: 1.2rem;
  color: var(--color-text);
  opacity: 0.8;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
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

.error-container {
  text-align: center;
  padding: 4rem 2rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-container h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.error-container p {
  color: var(--color-text);
  margin-bottom: 2rem;
}

.retry-button {
  background-color: var(--vt-c-green);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: var(--vt-c-green-light);
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.album-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.album-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--vt-c-green);
}

.album-card:focus {
  outline: 2px solid var(--vt-c-green);
  outline-offset: 2px;
}

.album-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: var(--color-border);
}

.album-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-card:hover .album-image img {
  transform: scale(1.05);
}

.album-info {
  text-align: center;
}

.album-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.album-artist {
  font-size: 1rem;
  color: var(--color-text);
  margin: 0 0 0.75rem 0;
  opacity: 0.8;
}

.album-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vt-c-green);
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--color-text);
  opacity: 0.8;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .albums-view {
    padding: 1rem;
  }
  
  .albums-header h1 {
    font-size: 2rem;
  }
  
  .albums-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .album-card {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .albums-grid {
    grid-template-columns: 1fr;
  }
}
</style>