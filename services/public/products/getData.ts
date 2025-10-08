import { productEndpoints, categoryEndpoints } from '@/constants/api';

/**
 * Get recent products
 */
export async function getRecentProducts(limit: number = 8) {
  try {
    const response = await fetch(`${productEndpoints.recent}?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Para obtener datos frescos en cada petición
    });

    if (!response.ok) {
      console.error("Error fetching recent products");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return [];
  }
}

/**
 * Get most viewed products
 */
export async function getMostViewedProducts(limit: number = 8) {
  try {
    const response = await fetch(`${productEndpoints.viewed}?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error fetching most viewed products");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching most viewed products:", error);
    return [];
  }
}

/**
 * Get most quoted products (productos más cotizados)
 */
export async function getMostQuotedProducts(limit: number = 8) {
  try {
    const response = await fetch(`${productEndpoints.quoted}?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error fetching most quoted products");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching most quoted products:", error);
    return [];
  }
}

/**
 * Get all categories with products count
 */
export async function getCategories() {
  try {
    const response = await fetch(categoryEndpoints.list, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error fetching categories");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categorySlug: string,
  limit: number = 12,
  excludeId?: string
) {
  try {
    const params = new URLSearchParams();
    params.append("slug", categorySlug);
    params.append("limit", limit.toString());
    if (excludeId) {
      params.append("excludeId", excludeId);
    }

    const response = await fetch(
      `${productEndpoints.byCategory}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Error fetching products by category");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

/**
 * Get featured products (destacados)
 */
export async function getFeaturedProducts(limit: number = 4) {
  try {
    const response = await fetch(`${productEndpoints.featured}?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error fetching featured products");
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Get total stock for a product across all plants
 */
export function getTotalStock(inventory: any[]): number {
  if (!inventory || !Array.isArray(inventory)) return 0;
  return inventory.reduce(
    (sum, inv) => sum + (parseFloat(inv.quantity_available) || 0),
    0
  );
}

/**
 * Format price in USD
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Get category display name
 */
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    rebar: "Varillas Corrugadas",
    wire: "Alambre",
    mesh: "Mallas",
    profiles: "Perfiles",
    sheets: "Planchas",
    tubes: "Tubos",
    angles: "Ángulos",
    channels: "Canales",
    beams: "Vigas",
    accessories: "Accesorios",
  };

  return categories[category] || category;
}

/**
 * Search products with filters and pagination
 */
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductSearchResponse {
  data: any[];
  pagination: PaginationMeta;
}

export async function searchProducts(
  filters: ProductFilters = {}
): Promise<ProductSearchResponse> {
  try {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.minPrice !== undefined)
      params.append("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined)
      params.append("maxPrice", filters.maxPrice.toString());
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    const response = await fetch(`${productEndpoints.search}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Error searching products");
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 12,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error searching products:", error);
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

/**
 * Get product by ID with full details
 */
export async function getProductById(id: string) {
  try {
    const response = await fetch(productEndpoints.byId(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Error fetching product by id");
      return null;
    }

    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}
