<template>
  <div class="album-detail-view">
    <div class="container">
      <button class="back-button" @click="goBack">
        ← Back to Albums
      </button>

      <LoadingSpinner 
        v-if="albumsStore.loading" 
        message="Loading album details..."
      />

      <ErrorMessage 
        v-else-if="albumsStore.error"
        :message="albumsStore.error"
        :show-retry="true"
        @retry="handleRetry"
      />

      <div v-else-if="albumsStore.currentAlbum" class="album-detail">
        <div class="album-image-large">
          <img 
            :src="albumsStore.currentAlbum.image_url" 
            :alt="albumsStore.currentAlbum.title"
            @error="handleImageError"
          />
        </div>
        <div class="album-info-large">
          <h1 class="album-title-large">{{ albumsStore.currentAlbum.title }}</h1>
          <h2 class="album-artist-large">{{ albumsStore.currentAlbum.artist }}</h2>
          <div class="album-price-large">${{ albumsStore.currentAlbum.price.toFixed(2) }}</div>
          <div class="album-description">
            <p>Experience this amazing album from {{ albumsStore.currentAlbum.artist }}. 
               "{{ albumsStore.currentAlbum.title }}" brings you an incredible musical journey 
               that will captivate your senses and touch your soul.</p>
            <p>Available now for just ${{ albumsStore.currentAlbum.price.toFixed(2) }}.</p>
          </div>
        </div>
      </div>

      <div v-else class="not-found">
        <h2>Album not found</h2>
        <p>The album you're looking for doesn't exist.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlbumsStore } from '@/stores/albums'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const albumsStore = useAlbumsStore()

const albumId = computed(() => parseInt(route.params.id as string))

onMounted(() => {
  if (albumId.value) {
    albumsStore.fetchAlbumById(albumId.value)
  }
})

watch(albumId, (newId) => {
  if (newId) {
    albumsStore.fetchAlbumById(newId)
  }
})

function goBack() {
  router.push('/albums')
}

function handleRetry() {
  albumsStore.clearError()
  if (albumId.value) {
    albumsStore.fetchAlbumById(albumId.value)
  }
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/400x400/667eea/ffffff?text=Album'
}
</script>

<style scoped>
.album-detail-view {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.back-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.back-button:hover {
  background: #5a67d8;
}

.album-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.album-image-large {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.album-image-large img {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.album-info-large {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.album-title-large {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
}

.album-artist-large {
  font-size: 1.8rem;
  color: #667eea;
  margin: 0;
  font-weight: 600;
}

.album-price-large {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 2px solid #e2e8f0;
}

.album-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.album-description p {
  margin: 0 0 1rem 0;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.not-found h2 {
  color: #333;
  margin: 0 0 1rem 0;
}

.not-found p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .album-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }
  
  .album-title-large {
    font-size: 2rem;
  }
  
  .album-artist-large {
    font-size: 1.5rem;
  }
  
  .album-price-large {
    font-size: 1.5rem;
  }
}
</style>