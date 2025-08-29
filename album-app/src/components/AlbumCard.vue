<template>
  <div class="album-card" @click="goToDetail">
    <div class="album-image">
      <img 
        :src="album.image_url" 
        :alt="album.title"
        @error="handleImageError"
        loading="lazy"
      />
    </div>
    <div class="album-info">
      <h3 class="album-title">{{ album.title }}</h3>
      <p class="album-artist">{{ album.artist }}</p>
      <p class="album-price">${{ album.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Album } from '@/services/albumApi'

const props = defineProps<{
  album: Album
}>()

const router = useRouter()

function goToDetail() {
  router.push(`/album/${props.album.id}`)
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x300/667eea/ffffff?text=Album'
}
</script>

<style scoped>
.album-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.album-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.album-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
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
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.album-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.album-artist {
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.album-price {
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
  margin: 0;
  margin-top: auto;
}

@media (max-width: 480px) {
  .album-info {
    padding: 1rem;
  }
  
  .album-title {
    font-size: 1.1rem;
  }
}
</style>