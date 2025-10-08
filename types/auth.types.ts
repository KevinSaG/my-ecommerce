/**
 * Authentication & User Types
 * Centralized type definitions for authentication and user management
 */

// User Roles Enum (matches Supabase DB enum)
export enum UserRole {
  ADMIN = 'admin',
  SALES_REP = 'sales_rep',
  CUSTOMER = 'customer',
  DISTRIBUTOR = 'distributor',
  GUEST = 'guest',
}

// User type from auth.users
export interface AuthUser {
  id: string;
  email: string;
  phone?: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
  created_at: string;
  updated_at: string;
}

// User type from public.users
export interface User {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
  last_login?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

// User Profile type from public.user_profiles
export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  tax_id?: string;
  customer_type?: string;
  credit_limit?: number;
  credit_used?: number;
  discount_percentage?: number;
  preferred_plant?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Complete User Session (combines auth, user, and profile)
export interface UserSession {
  user: User;
  profile: UserProfile;
  authUser: AuthUser;
}

// Role Permissions Map
export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: {
    canAccessDashboard: true,
    canManageUsers: true,
    canManageProducts: true,
    canManageOrders: true,
    canViewReports: true,
    canManageInventory: true,
    canManageSettings: true,
  },
  [UserRole.SALES_REP]: {
    canAccessDashboard: true,
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: true,
    canViewReports: true,
    canManageInventory: false,
    canManageSettings: false,
  },
  [UserRole.CUSTOMER]: {
    canAccessDashboard: true,
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: false, // Can only view their own
    canViewReports: false,
    canManageInventory: false,
    canManageSettings: false,
  },
  [UserRole.DISTRIBUTOR]: {
    canAccessDashboard: true,
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: true,
    canViewReports: true,
    canManageInventory: false,
    canManageSettings: false,
  },
  [UserRole.GUEST]: {
    canAccessDashboard: false,
    canManageUsers: false,
    canManageProducts: false,
    canManageOrders: false,
    canViewReports: false,
    canManageInventory: false,
    canManageSettings: false,
  },
} as const;

// Helper type for permissions
export type RolePermissions = typeof ROLE_PERMISSIONS[UserRole];

