/**
 * Unit Tests - Product Services
 */

import { getDashboardProducts } from '@/services/dashboard/products/getProducts'
import { createProduct } from '@/services/dashboard/products/createProduct'

// Mock fetch globally
global.fetch = jest.fn()

describe('Product Services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getDashboardProducts', () => {
    it('should fetch products successfully', async () => {
      const mockResponse = {
        success: true,
        data: [
          { id: '1', name: 'Product 1', sku: 'SKU-001', category: 'rebar' },
          { id: '2', name: 'Product 2', sku: 'SKU-002', category: 'wire' },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getDashboardProducts({ page: 1, limit: 10 })

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(2)
      expect(result.data[0].name).toBe('Product 1')
    })

    it('should handle errors gracefully', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      )

      const result = await getDashboardProducts()

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should handle 404 responses', async () => {
      const mockErrorResponse = {
        success: false,
        error: 'Not found',
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockErrorResponse,
      })

      const result = await getDashboardProducts()

      expect(result.success).toBe(false)
      expect(result.data).toHaveLength(0)
    })
  })

  describe('createProduct', () => {
    it('should create product successfully', async () => {
      const mockProduct = {
        id: '1',
        name: 'New Product',
        sku: 'SKU-NEW',
        category: 'rebar',
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockProduct }),
      })

      const result = await createProduct({
        name: 'New Product',
        sku: 'SKU-NEW',
        category: 'rebar',
      } as any)

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockProduct)
    })

    it('should handle creation errors', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ 
          success: false, 
          error: 'SKU already exists' 
        }),
      })

      const result = await createProduct({ sku: 'DUPLICATE' } as any)

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })
})

