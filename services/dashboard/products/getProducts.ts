/**
 * Dashboard Products Service
 * Service for product management in dashboard
 */

import { dashboardEndpoints } from '@/constants/api';
import type { Product, ApiResponse, PaginatedResponse, ListQueryParams } from '@/types';

/**
 * Get all products for dashboard
 */
export async function getDashboardProducts(
  params?: ListQueryParams
): Promise<PaginatedResponse<Product>> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${dashboardEndpoints.products.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching dashboard products:', error);
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
      error: error instanceof Error ? error.message : 'Error al obtener productos',
    };
  }
}

/**
 * Create new product (admin only)
 */
export async function createProduct(productData: Partial<Product>): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(dashboardEndpoints.products.create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear producto',
    };
  }
}

/**
 * Update product (admin only)
 */
export async function updateProduct(
  productId: string,
  productData: Partial<Product>
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(dashboardEndpoints.products.update, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, ...productData }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar producto',
    };
  }
}

/**
 * Delete product (admin only)
 */
export async function deleteProduct(productId: string): Promise<ApiResponse> {
  try {
    const response = await fetch(dashboardEndpoints.products.delete, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar producto',
    };
  }
}

