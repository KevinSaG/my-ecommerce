/**
 * Dashboard Users Service
 * Service for user management in dashboard
 */

import { dashboardEndpoints } from '@/constants/api';
import type { User, ApiResponse, PaginatedResponse, ListQueryParams } from '@/types';

/**
 * Get all users (admin only)
 */
export async function getUsers(params?: ListQueryParams): Promise<PaginatedResponse<User>> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${dashboardEndpoints.users.list}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      success: false,
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
      error: error instanceof Error ? error.message : 'Error al obtener usuarios',
    };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(dashboardEndpoints.users.byId(userId), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener usuario',
    };
  }
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(userId: string, role: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(dashboardEndpoints.users.updateRole, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating user role:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar rol',
    };
  }
}

/**
 * Deactivate user (admin only)
 */
export async function deactivateUser(userId: string): Promise<ApiResponse> {
  try {
    const response = await fetch(dashboardEndpoints.users.deactivate, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error deactivating user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al desactivar usuario',
    };
  }
}

