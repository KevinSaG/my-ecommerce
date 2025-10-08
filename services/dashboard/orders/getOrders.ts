/**
 * Dashboard Orders Service
 * Service for order management in dashboard
 */

import { dashboardEndpoints } from '@/constants/api';
import type { Order, ApiResponse, PaginatedResponse, ListQueryParams } from '@/types';

/**
 * Get all orders (with role-based filtering)
 */
export async function getOrders(params?: ListQueryParams): Promise<PaginatedResponse<Order>> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    // Add filters (status, date range, etc.)
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${dashboardEndpoints.orders.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
      error: error instanceof Error ? error.message : 'Error al obtener pedidos',
    };
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string): Promise<ApiResponse<Order>> {
  try {
    const response = await fetch(dashboardEndpoints.orders.byId(orderId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener pedido',
    };
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<ApiResponse<Order>> {
  try {
    const response = await fetch(dashboardEndpoints.orders.updateStatus, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar estado',
    };
  }
}

