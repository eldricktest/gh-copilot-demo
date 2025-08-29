<template>
  <div class="albums-view">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">Music Albums</h1>
        <p class="page-subtitle">Discover and explore our music collection</p>
      </header>

      <LoadingSpinner 
        v-if="albumsStore.loading" 
        message="Loading albums..."
      />

      <ErrorMessage 
        v-else-if="albumsStore.error"
        :message="albumsStore.error"
        :show-retry="true"
        @retry="handleRetry"
      />

      <div v-else-if="albumsStore.albums.length > 0" class="albums-grid">
        <AlbumCard 
          v-for="album in albumsStore.albums"
          :key="album.id"
          :album="album"
        />
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🎵</div>
        <h3>No albums found</h3>
        <p>We couldn't find any albums in the collection.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAlbumsStore } from '@/stores/albums'
import AlbumCard from '@/components/AlbumCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const albumsStore = useAlbumsStore()

onMounted(() => {
  if (albumsStore.albums.length === 0) {
    albumsStore.fetchAlbums()
  }
})

function handleRetry() {
  albumsStore.clearError()
  albumsStore.fetchAlbums()
}
</script>

<style scoped>
.albums-view {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin: 0;
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.empty-state p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .albums-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .albums-view {
    padding: 1rem 0;
  }
}

@media (max-width: 480px) {
  .albums-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>