/**
 * Unit Tests - Order Services
 */

import { getDashboardOrders } from '@/services/dashboard/orders/getOrders'
import { getOrderById } from '@/services/dashboard/orders/getOrderById'

global.fetch = jest.fn()

describe('Order Services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getDashboardOrders', () => {
    it('should fetch orders successfully', async () => {
      const mockResponse = {
        success: true,
        data: [
          {
            id: '1',
            order_number: 'ORD-001',
            status: 'pending',
            total: 100.00,
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getDashboardOrders({ page: 1 })

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(1)
      expect(result.data[0].order_number).toBe('ORD-001')
    })
  })

  describe('getOrderById', () => {
    it('should fetch order detail successfully', async () => {
      const mockOrder = {
        id: '1',
        order_number: 'ORD-001',
        status: 'pending',
        total: 100.00,
        order_items: [
          { id: '1', product_id: 'p1', quantity: 2, unit_price: 50 }
        ],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockOrder }),
      })

      const result = await getOrderById('1')

      expect(result.success).toBe(true)
      expect(result.data?.order_number).toBe('ORD-001')
      expect(result.data?.order_items).toHaveLength(1)
    })

    it('should handle non-existent order', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Order not found' }),
      })

      const result = await getOrderById('999')

      expect(result.success).toBe(false)
      expect(result.error).toBeDefined()
    })
  })
})

