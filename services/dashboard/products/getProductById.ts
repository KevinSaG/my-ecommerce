/**
 * Dashboard Product Service - Get Product By ID
 */

import { dashboardEndpoints } from "@/constants/api";
import type { Product, ApiResponse } from "@/types";

/**
 * Get product by ID (dashboard)
 */
export async function getProductById(
  productId: string
): Promise<ApiResponse<Product>> {
  try {
    const response = await fetch(dashboardEndpoints.products.byId(productId), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Error al obtener producto",
    };
  }
}
