/**
 * Get recent products
 */
export async function getRecentProducts(limit: number = 8) {
  try {
    const response = await fetch(`/api/products/recent?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Para obtener datos frescos en cada petición
    });

    if (!response.ok) {
      console.error('Error fetching recent products');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching recent products:', error);
    return [];
  }
}

/**
 * Get most viewed products
 */
export async function getMostViewedProducts(limit: number = 8) {
  try {
    const response = await fetch(`/api/products/viewed?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching most viewed products');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching most viewed products:', error);
    return [];
  }
}

/**
 * Get most quoted products (productos más cotizados)
 */
export async function getMostQuotedProducts(limit: number = 8) {
  try {
    const response = await fetch(`/api/products/quoted?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching most quoted products');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching most quoted products:', error);
    return [];
  }
}

/**
 * Get all categories with products count
 */
export async function getCategories() {
  try {
    const response = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching categories');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(categorySlug: string, limit: number = 12) {
  try {
    const response = await fetch(`/api/products/by-category?slug=${categorySlug}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching products by category');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Get featured products (destacados)
 */
export async function getFeaturedProducts(limit: number = 4) {
  try {
    const response = await fetch(`/api/products/featured?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching featured products');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

/**
 * Get total stock for a product across all plants
 */
export function getTotalStock(inventory: any[]): number {
  if (!inventory || !Array.isArray(inventory)) return 0;
  return inventory.reduce((sum, inv) => sum + (parseFloat(inv.quantity_available) || 0), 0);
}

/**
 * Format price in USD
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Get category display name
 */
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    rebar: 'Varillas Corrugadas',
    wire: 'Alambre',
    mesh: 'Mallas',
    profiles: 'Perfiles',
    sheets: 'Planchas',
    tubes: 'Tubos',
    angles: 'Ángulos',
    channels: 'Canales',
    beams: 'Vigas',
    accessories: 'Accesorios',
  };
  
  return categories[category] || category;
}

