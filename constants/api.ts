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

// Auth endpoints
export const baseUrlAuth = `${API_BASE_URL}/api/auth`;

// Specific auth endpoints
export const authEndpoints = {
  signInEmail: `${baseUrlAuth}/signin-email`,      // Sign in with email + password
  signUpOTP: `${baseUrlAuth}/signup-otp`,          // Sign up - send OTP
  verifyOTP: `${baseUrlAuth}/verify-otp`,          // Verify OTP code
  signInGoogle: `${baseUrlAuth}/signin-google`,    // Google OAuth
  signOut: `${baseUrlAuth}/signout`,               // Sign out
  getSession: `${baseUrlAuth}/session`,            // Get current session
} as const;

// Cart endpoints
export const baseUrlCart = `${API_BASE_URL}/api/cart`;

export const cartEndpoints = {
  list: baseUrlCart,
  add: `${baseUrlCart}/add`,
  update: `${baseUrlCart}/update`,
  remove: `${baseUrlCart}/remove`,
  clear: `${baseUrlCart}/clear`,
  count: `${baseUrlCart}/count`,
} as const;

// Other API endpoints (for future expansion)
export const baseUrlOrders = `${API_BASE_URL}/api/orders`;
export const baseUrlUsers = `${API_BASE_URL}/api/users`;
export const baseUrlQuotes = `${API_BASE_URL}/api/quotes`;

// Export all endpoints for easy access
export const apiEndpoints = {
  products: productEndpoints,
  categories: categoryEndpoints,
  auth: authEndpoints,
  cart: cartEndpoints,
  orders: baseUrlOrders,
  users: baseUrlUsers,
  quotes: baseUrlQuotes,
} as const;
