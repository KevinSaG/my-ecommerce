/**
 * Dashboard Product Service - Delete Product
 */

import { dashboardEndpoints } from "@/constants/api";
import type { ApiResponse } from "@/types";

/**
 * Delete product (admin only)
 */
export async function deleteProduct(productId: string): Promise<ApiResponse> {
  try {
    const response = await fetch(
      dashboardEndpoints.products.delete(productId),
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Error al eliminar producto",
    };
  }
}
