/**
 * Dashboard Reports Service
 * Service for reports and analytics in dashboard
 */

import { dashboardEndpoints } from '@/constants/api';
import type { ApiResponse } from '@/types';

interface SalesReport {
  period: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
}

interface ProductPerformanceReport {
  productId: string;
  productName: string;
  unitsSold: number;
  revenue: number;
}

interface CustomerReport {
  customerId: string;
  customerName: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

/**
 * Get sales report
 */
export async function getSalesReport(
  startDate: string,
  endDate: string
): Promise<ApiResponse<SalesReport[]>> {
  try {
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
    });

    const response = await fetch(
      `${dashboardEndpoints.reports.sales}?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error fetching sales report:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener reporte de ventas',
    };
  }
}

/**
 * Get product performance report
 */
export async function getProductPerformanceReport(
  startDate: string,
  endDate: string
): Promise<ApiResponse<ProductPerformanceReport[]>> {
  try {
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
    });

    const response = await fetch(
      `${dashboardEndpoints.reports.products}?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Error fetching product performance report:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener reporte de productos',
    };
  }
}

/**
 * Get customer report
 */
export async function getCustomerReport(): Promise<ApiResponse<CustomerReport[]>> {
  try {
    const response = await fetch(dashboardEndpoints.reports.customers, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching customer report:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener reporte de clientes',
    };
  }
}

