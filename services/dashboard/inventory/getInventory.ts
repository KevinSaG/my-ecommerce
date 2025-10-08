/**
 * Dashboard Inventory Service
 * Service for inventory management in dashboard
 */

import { dashboardEndpoints } from '@/constants/api';
import type { ApiResponse, PaginatedResponse, ListQueryParams } from '@/types';

interface InventoryItem {
  id: string;
  product_id: string;
  plant_code: string;
  available_quantity: number;
  reserved_quantity: number;
  in_transit_quantity: number;
  min_stock_level?: number;
  max_stock_level?: number;
  reorder_point?: number;
}

/**
 * Get inventory list
 */
export async function getInventory(
  params?: ListQueryParams
): Promise<PaginatedResponse<InventoryItem>> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${dashboardEndpoints.inventory.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching inventory:', error);
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
      error: error instanceof Error ? error.message : 'Error al obtener inventario',
    };
  }
}

/**
 * Update inventory quantity
 */
export async function updateInventoryQuantity(
  inventoryId: string,
  quantity: number
): Promise<ApiResponse<InventoryItem>> {
  try {
    const response = await fetch(dashboardEndpoints.inventory.update, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inventoryId, quantity }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating inventory:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar inventario',
    };
  }
}

/**
 * Get low stock alerts
 */
export async function getLowStockAlerts(): Promise<ApiResponse<InventoryItem[]>> {
  try {
    const response = await fetch(dashboardEndpoints.inventory.lowStock, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching low stock alerts:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener alertas de stock',
    };
  }
}

