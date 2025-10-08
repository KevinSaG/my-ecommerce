/**
 * Order Service
 * Service for managing orders
 */

import { orderEndpoints } from '@/constants/api';

export interface CreateOrderData {
  shipping_method: string;
  shipping_address_id?: string;
  pickup_location?: string;
  payment_method: string;
  customer_notes?: string;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  payment_method: string;
  shipping_method: string;
  customer_notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new order from cart items
 */
export async function createOrder(orderData: CreateOrderData) {
  try {
    const response = await fetch(orderEndpoints.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al crear orden');
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al crear orden',
    };
  }
}

/**
 * Get user's orders
 */
export async function getMyOrders() {
  try {
    const response = await fetch(orderEndpoints.myOrders, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener órdenes');
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener órdenes',
      data: [],
    };
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string) {
  try {
    const response = await fetch(orderEndpoints.byId(orderId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener orden');
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error fetching order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener orden',
    };
  }
}

