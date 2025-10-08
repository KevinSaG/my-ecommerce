import { dashboardEndpoints } from '@/constants/api';

export interface UserProfile {
  user: {
    id: string;
    email: string;
    phone?: string;
  };
  profile: {
    id?: string;
    user_id?: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
    customer_type?: string;
    credit_limit?: number;
    credit_used?: number;
    discount_percentage?: number;
  };
}

/**
 * Get user profile
 */
export async function getUserProfile() {
  try {
    const response = await fetch(dashboardEndpoints.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al obtener perfil');
    }

    return {
      success: true,
      data: result.data as UserProfile,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener perfil',
      data: null,
    };
  }
}

