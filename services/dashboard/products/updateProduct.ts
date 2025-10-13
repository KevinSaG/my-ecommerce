/**
 * Dashboard Product Service - Update Product
 */

import { dashboardEndpoints } from '@/constants/api';
import type { Product, ApiResponse } from '@/types';

/**
 * Update product (admin only)
 */
export async function updateProduct(
  productId: string,
  productData: Partial<Product>
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(dashboardEndpoints.products.update(productId), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
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

