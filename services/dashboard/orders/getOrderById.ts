/**
 * Dashboard Orders Service - Get Order By ID
 */

import { dashboardEndpoints } from '@/constants/api';
import type { ApiResponse } from '@/types';
import type { Order } from './getOrders';

export interface OrderDetail extends Order {
  shipping_addresses?: {
    id: string;
    label: string;
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    phone: string;
  } | null;
  order_items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    discount_percentage: number;
    subtotal: number;
    weight_total: number;
    plant_location: string;
    products?: {
      id: string;
      sku: string;
      name: string;
      description?: string;
      category: string;
      weight_per_unit: number;
      stock_unit: string;
    };
  }>;
}

/**
 * Get order by ID
 */
export async function getOrderById(
  orderId: string
): Promise<ApiResponse<OrderDetail>> {
  try {
    const response = await fetch(dashboardEndpoints.customerOrders.byId(orderId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      return {
        success: false,
        error: errorData.error || `Error ${response.status}: ${response.statusText}`,
      };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener orden',
    };
  }
}
