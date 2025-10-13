/**
 * Dashboard Orders Service - Get Orders
 */

import { dashboardEndpoints } from '@/constants/api';
import type { PaginatedResponse, ListQueryParams } from '@/types';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: string;
  payment_status: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  payment_method?: string;
  paid_amount: number;
  shipping_method?: string;
  pickup_location?: string;
  estimated_delivery_date?: string;
  actual_delivery_date?: string;
  tracking_number?: string;
  customer_notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: Array<{
    id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    products?: {
      id: string;
      name: string;
      sku: string;
      category: string;
    };
  }>;
}

/**
 * Get all orders for the authenticated user
 */
export async function getDashboardOrders(
  params?: ListQueryParams
): Promise<PaginatedResponse<Order>> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${dashboardEndpoints.customerOrders.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
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
        error: errorData.error || `Error ${response.status}: ${response.statusText}`,
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard orders:', error);
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
      error: error instanceof Error ? error.message : 'Error al obtener órdenes',
    };
  }
}