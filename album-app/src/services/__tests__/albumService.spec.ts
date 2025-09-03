import { describe, it, expect, vi, beforeEach } from 'vitest'
import { albumService } from '../albumService'
import axios from 'axios'

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn()
    }))
  }
}))

const mockAxiosInstance = {
  get: vi.fn()
}

// Mock axios.create to return our mock instance
vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as unknown as ReturnType<typeof axios.create>)

describe('albumService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAllAlbums', () => {
    it('should return albums data on successful request', async () => {
      const mockAlbums = [
        { id: 1, title: 'Test Album', artist: 'Test Artist', price: 10.99, image_url: 'test.jpg' }
      ]
      
      mockAxiosInstance.get.mockResolvedValue({
        data: mockAlbums
      })

      const result = await albumService.getAllAlbums()

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/albums')
      expect(result).toEqual(mockAlbums)
    })

    it('should throw error on failed request', async () => {
      const mockError = new Error('Network error')
      mockAxiosInstance.get.mockRejectedValue(mockError)

      await expect(albumService.getAllAlbums()).rejects.toThrow('Failed to fetch albums')
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/albums')
    })

    it('should log error on failed request', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const mockError = new Error('Network error')
      mockAxiosInstance.get.mockRejectedValue(mockError)

      try {
        await albumService.getAllAlbums()
      } catch {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching albums:', mockError)
      consoleSpy.mockRestore()
    })
  })

  describe('getAlbumById', () => {
    it('should return album data on successful request', async () => {
      const mockAlbum = { id: 1, title: 'Test Album', artist: 'Test Artist', price: 10.99, image_url: 'test.jpg' }
      
      mockAxiosInstance.get.mockResolvedValue({
        data: mockAlbum
      })

      const result = await albumService.getAlbumById(1)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/albums/1')
      expect(result).toEqual(mockAlbum)
    })

    it('should throw error on failed request', async () => {
      const mockError = new Error('Network error')
      mockAxiosInstance.get.mockRejectedValue(mockError)

      await expect(albumService.getAlbumById(1)).rejects.toThrow('Failed to fetch album with id 1')
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/albums/1')
    })

    it('should use correct endpoint for different IDs', async () => {
      const mockAlbum = { id: 5, title: 'Test Album', artist: 'Test Artist', price: 10.99, image_url: 'test.jpg' }
      
      mockAxiosInstance.get.mockResolvedValue({
        data: mockAlbum
      })

      await albumService.getAlbumById(5)

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/albums/5')
    })
  })
})