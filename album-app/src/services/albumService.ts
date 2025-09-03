import axios from 'axios'
import type { Album } from '@/types/Album'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export const albumService = {
  async getAllAlbums(): Promise<Album[]> {
    try {
      const response = await apiClient.get<Album[]>('/albums')
      return response.data
    } catch (error) {
      console.error('Error fetching albums:', error)
      throw new Error('Failed to fetch albums')
    }
  },

  async getAlbumById(id: number): Promise<Album> {
    try {
      const response = await apiClient.get<Album>(`/albums/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching album with id ${id}:`, error)
      throw new Error(`Failed to fetch album with id ${id}`)
    }
  }
}