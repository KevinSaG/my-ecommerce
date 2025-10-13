/**
 * Dashboard Product Service - Create Product
 */

import { dashboardEndpoints } from "@/constants/api";
import type { Product, ApiResponse } from "@/types";

/**
 * Create new product (admin only)
 */
export async function createProduct(
  productData: Partial<Product>
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(dashboardEndpoints.products.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    const result = await response.json();
    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al crear producto",
    };
  }
}
