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

// Dashboard endpoints
export const baseUrlDashboard = `${API_BASE_URL}/api/dashboard`;

export const dashboardEndpoints = {
  // Stats & Profile
  stats: `${baseUrlDashboard}/stats`,
  profile: `${baseUrlDashboard}/profile`,
  
  // Users Management
  users: {
    list: `${baseUrlDashboard}/users`,
    byId: (id: string) => `${baseUrlDashboard}/users/${id}`,
    updateRole: `${baseUrlDashboard}/users/role`,
    deactivate: `${baseUrlDashboard}/users/deactivate`,
  },
  
  // Orders Management
  orders: {
    list: `${baseUrlDashboard}/orders`,
    byId: (id: string) => `${baseUrlDashboard}/orders/${id}`,
    updateStatus: `${baseUrlDashboard}/orders/status`,
  },
  
  // Products Management
  products: {
    list: `${baseUrlDashboard}/products`,
    create: `${baseUrlDashboard}/products/create`,
    update: `${baseUrlDashboard}/products/update`,
    delete: `${baseUrlDashboard}/products/delete`,
  },
  
  // Reports & Analytics
  reports: {
    sales: `${baseUrlDashboard}/reports/sales`,
    products: `${baseUrlDashboard}/reports/products`,
    customers: `${baseUrlDashboard}/reports/customers`,
  },
  
  // Inventory Management
  inventory: {
    list: `${baseUrlDashboard}/inventory`,
    update: `${baseUrlDashboard}/inventory/update`,
    lowStock: `${baseUrlDashboard}/inventory/low-stock`,
  },
} as const;

// Orders endpoints
export const baseUrlOrders = `${API_BASE_URL}/api/orders`;

export const orderEndpoints = {
  list: baseUrlOrders,
  create: `${baseUrlOrders}/create`,
  byId: (id: string) => `${baseUrlOrders}/${id}`,
  myOrders: `${baseUrlOrders}/my-orders`,
} as const;

// Other API endpoints (for future expansion)
export const baseUrlUsers = `${API_BASE_URL}/api/users`;
export const baseUrlQuotes = `${API_BASE_URL}/api/quotes`;

// Export all endpoints for easy access
export const apiEndpoints = {
  products: productEndpoints,
  categories: categoryEndpoints,
  auth: authEndpoints,
  cart: cartEndpoints,
  dashboard: dashboardEndpoints,
  orders: orderEndpoints,
  users: baseUrlUsers,
  quotes: baseUrlQuotes,
} as const;
