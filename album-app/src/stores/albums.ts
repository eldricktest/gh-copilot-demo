import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { albumApi, type Album } from '@/services/albumApi'

export const useAlbumsStore = defineStore('albums', () => {
  const albums = ref<Album[]>([])
  const currentAlbum = ref<Album | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const albumsCount = computed(() => albums.value.length)

  async function fetchAlbums() {
    loading.value = true
    error.value = null
    try {
      albums.value = await albumApi.getAllAlbums()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch albums'
    } finally {
      loading.value = false
    }
  }

  async function fetchAlbumById(id: number) {
    loading.value = true
    error.value = null
    try {
      currentAlbum.value = await albumApi.getAlbumById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch album'
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    albums,
    currentAlbum,
    loading,
    error,
    albumsCount,
    fetchAlbums,
    fetchAlbumById,
    clearError,
  }
})
