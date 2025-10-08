/**
 * API Constants for ADELCA E-commerce
 * 
 * These constants define the base URLs for all API endpoints.
 * They use environment variables to support different deployment environments.
 */

// Base API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Product API endpoints
export const baseUrlProducts = `${API_BASE_URL}/api/products`;
export const baseUrlCategories = `${API_BASE_URL}/api/categories`;

// Specific product endpoints
export const productEndpoints = {
  search: `${baseUrlProducts}/search`,
  recent: `${baseUrlProducts}/recent`,
  viewed: `${baseUrlProducts}/viewed`,
  quoted: `${baseUrlProducts}/quoted`,
  featured: `${baseUrlProducts}/featured`,
  byCategory: `${baseUrlProducts}/by-category`,
  byId: (id: string) => `${baseUrlProducts}/${id}`,
} as const;

// Category endpoints
export const categoryEndpoints = {
  list: baseUrlCategories,
} as const;

// Auth endpoints (for future use)
export const baseUrlAuth = `${API_BASE_URL}/api/user-authentication`;

// Other API endpoints (for future expansion)
export const baseUrlOrders = `${API_BASE_URL}/api/orders`;
export const baseUrlUsers = `${API_BASE_URL}/api/users`;
export const baseUrlQuotes = `${API_BASE_URL}/api/quotes`;

// Export all endpoints for easy access
export const apiEndpoints = {
  products: productEndpoints,
  categories: categoryEndpoints,
  auth: baseUrlAuth,
  orders: baseUrlOrders,
  users: baseUrlUsers,
  quotes: baseUrlQuotes,
} as const;
