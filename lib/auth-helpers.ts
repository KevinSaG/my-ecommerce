/**
 * Authentication Helper Functions for Adelca E-Commerce
 */

import { createClient } from '@/lib/supabase/server';
import { User, UserProfile } from './ecommerce-schema';

/**
 * Get the current authenticated user with profile
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !authUser) {
    return { user: null, profile: null, error: authError };
  }
  
  // Get user details from our custom table
  const { data: user, error: userError } = await supabase
    .from('users')
    .select(`
      *,
      profile:user_profiles(*)
    `)
    .eq('id', authUser.id)
    .single();
    
  if (userError) {
    return { user: null, profile: null, error: userError };
  }
  
  return {
    user: user as User,
    profile: user.profile as unknown as UserProfile,
    error: null
  };
}

/**
 * Check if current user is admin
 */
export async function isAdmin() {
  const { user } = await getCurrentUser();
  return user?.role === 'admin' || user?.role === 'sales_rep';
}

/**
 * Check if current user has a specific role
 */
export async function hasRole(role: string | string[]) {
  const { user } = await getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}

/**
 * Get user's customer type for pricing
 */
export async function getCustomerType() {
  const { profile } = await getCurrentUser();
  return profile?.customer_type || 'retail';
}

/**
 * Sign up a new user
 */
export async function signUp(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  taxId?: string;
  customerType?: string;
  phone?: string;
}) {
  const supabase = await createClient();
  
  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName,
        tax_id: data.taxId,
        customer_type: data.customerType || 'retail',
      }
    }
  });
  
  if (error) {
    return { user: null, error };
  }
  
  // Update phone if provided
  if (data.phone && authData.user) {
    await supabase
      .from('users')
      .update({ phone: data.phone })
      .eq('id', authData.user.id);
  }
  
  return { user: authData.user, error: null };
}

/**
 * Sign in a user
 */
export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    return { session: null, user: null, error };
  }
  
  // Update last login
  if (data.user) {
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);
  }
  
  return { session: data.session, user: data.user, error: null };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Update user profile
 */
export async function updateProfile(data: Partial<UserProfile>) {
  const supabase = await createClient();
  const { user } = await getCurrentUser();
  
  if (!user) {
    return { error: new Error('Not authenticated') };
  }
  
  const { error } = await supabase
    .from('user_profiles')
    .update(data)
    .eq('user_id', user.id);
    
  return { error };
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  });
  
  return { error };
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  return { error };
}

/**
 * Check if user has sufficient credit
 */
export async function hasSufficientCredit(amount: number) {
  const { profile } = await getCurrentUser();
  
  if (!profile) return false;
  
  const availableCredit = (profile.credit_limit || 0) - (profile.credit_used || 0);
  return availableCredit >= amount;
}

/**
 * Get available credit
 */
export async function getAvailableCredit() {
  const { profile } = await getCurrentUser();
  
  if (!profile) return 0;
  
  return (profile.credit_limit || 0) - (profile.credit_used || 0);
}

