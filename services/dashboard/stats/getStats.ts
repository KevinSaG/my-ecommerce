import { dashboardEndpoints } from '@/constants/api';

export interface DashboardStats {
  productCount: number;
  orderCount: number;
  cartCount: number;
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const response = await fetch(dashboardEndpoints.stats, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener estadísticas');
    }

    return {
      success: true,
      data: result.data as DashboardStats,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener estadísticas',
      data: {
        productCount: 0,
        orderCount: 0,
        cartCount: 0,
      },
    };
  }
}

