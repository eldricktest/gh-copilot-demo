<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { albumService } from '@/services/albumService'
import type { Album } from '@/types/Album'

const router = useRouter()
const featuredAlbums = ref<Album[]>([])
const loading = ref(false)

const fetchFeaturedAlbums = async () => {
  loading.value = true
  try {
    const allAlbums = await albumService.getAllAlbums()
    // Show first 3 albums as featured
    featuredAlbums.value = allAlbums.slice(0, 3)
  } catch (error) {
    console.error('Error fetching featured albums:', error)
  } finally {
    loading.value = false
  }
}

const goToAlbums = () => {
  router.push('/albums')
}

const goToAlbumDetail = (id: number) => {
  router.push(`/album/${id}`)
}

onMounted(() => {
  fetchFeaturedAlbums()
})
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to Album App</h1>
        <p class="hero-subtitle">
          Discover amazing music albums from talented artists around the world
        </p>
        <button @click="goToAlbums" class="cta-button">
          🎵 Browse All Albums
        </button>
      </div>
      <div class="hero-image">
        <img src="@/assets/logo.svg" alt="Album App" class="logo-large" />
      </div>
    </section>

    <!-- Featured Albums Section -->
    <section class="featured-section">
      <h2 class="section-title">Featured Albums</h2>
      
      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading featured albums...</p>
      </div>
      
      <div v-else-if="featuredAlbums.length > 0" class="featured-albums">
        <div 
          v-for="album in featuredAlbums" 
          :key="album.id"
          class="featured-album"
          @click="goToAlbumDetail(album.id)"
        >
          <div class="album-image">
            <img :src="album.image_url" :alt="`${album.title} cover`" />
          </div>
          <div class="album-info">
            <h3>{{ album.title }}</h3>
            <p>{{ album.artist }}</p>
            <span class="price">${{ album.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <div class="view-all-container">
        <button @click="goToAlbums" class="view-all-button">
          View All Albums →
        </button>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="info-cards">
        <div class="info-card">
          <div class="info-icon">🎵</div>
          <h3>Curated Collection</h3>
          <p>Hand-picked albums from the best artists across various genres</p>
        </div>
        <div class="info-card">
          <div class="info-icon">🎧</div>
          <h3>High Quality</h3>
          <p>Premium audio quality for the ultimate listening experience</p>
        </div>
        <div class="info-card">
          <div class="info-icon">💫</div>
          <h3>Discover Music</h3>
          <p>Find new favorites and rediscover classic albums</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--color-heading);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 2rem;
  opacity: 0.8;
  line-height: 1.5;
}

.cta-button {
  background-color: var(--vt-c-green);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.cta-button:hover {
  background-color: var(--vt-c-green-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-large {
  width: 300px;
  height: 300px;
  animation: float 3s ease-in-out infinite;
}

.featured-section {
  padding: 4rem 2rem;
  background-color: var(--color-background-soft);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: var(--color-heading);
  margin-bottom: 3rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--vt-c-green);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.featured-albums {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.featured-album {
  background: var(--color-background);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--color-border);
  text-align: center;
}

.featured-album:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--vt-c-green);
}

.album-image {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: var(--color-border);
}

.album-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.album-info h3 {
  font-size: 1.2rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
}

.album-info p {
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  opacity: 0.8;
}

.price {
  font-weight: 600;
  color: var(--vt-c-green);
  font-size: 1.1rem;
}

.view-all-container {
  text-align: center;
  margin-top: 3rem;
}

.view-all-button {
  background: none;
  border: 2px solid var(--vt-c-green);
  color: var(--vt-c-green);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.view-all-button:hover {
  background-color: var(--vt-c-green);
  color: white;
}

.info-section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.info-card {
  text-align: center;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.info-card p {
  color: var(--color-text);
  opacity: 0.8;
  line-height: 1.5;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .logo-large {
    width: 200px;
    height: 200px;
  }
  
  .featured-section,
  .info-section {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
