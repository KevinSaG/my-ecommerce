/**
 * Domain Types
 * Business domain specific type definitions
 */

// Product Related Types
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category: string;
  base_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Order Related Types
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  updated_at: string;
}

// Cart Related Types
export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalUsers?: number;
  totalOrders?: number;
  totalRevenue?: number;
  totalProducts?: number;
  recentOrders?: Order[];
  topProducts?: Product[];
}

