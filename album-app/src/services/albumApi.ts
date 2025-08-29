import axios from 'axios'

export interface Album {
  id: number
  title: string
  artist: string
  price: number
  image_url: string
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const albumApi = {
  async getAllAlbums(): Promise<Album[]> {
    try {
      const response = await api.get('/albums')
      return response.data
    } catch (error) {
      console.error('Error fetching albums:', error)
      throw new Error('Failed to fetch albums')
    }
  },

  async getAlbumById(id: number): Promise<Album> {
    try {
      const response = await api.get(`/albums/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching album:', error)
      throw new Error('Failed to fetch album')
    }
  },
}