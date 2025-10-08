/**
 * useRole Hook
 * Custom hook for role-based access control
 */

'use client';

import { useAuth } from './useAuth';
import { UserRole, ROLE_PERMISSIONS, type RolePermissions } from '@/types';

interface UseRoleReturn {
  role: UserRole | null;
  permissions: RolePermissions | null;
  isAdmin: boolean;
  isSalesRep: boolean;
  isCustomer: boolean;
  isDistributor: boolean;
  hasPermission: (permission: keyof RolePermissions) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasRole: (role: UserRole) => boolean;
}

export function useRole(): UseRoleReturn {
  const { user } = useAuth();
  const role = (user?.user?.role as UserRole) || null;
  const permissions = role ? ROLE_PERMISSIONS[role] : null;

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    if (!permissions) return false;
    return permissions[permission];
  };

  const hasRole = (checkRole: UserRole): boolean => {
    return role === checkRole;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    if (!role) return false;
    return roles.includes(role);
  };

  return {
    role,
    permissions,
    isAdmin: hasRole(UserRole.ADMIN),
    isSalesRep: hasRole(UserRole.SALES_REP),
    isCustomer: hasRole(UserRole.CUSTOMER),
    isDistributor: hasRole(UserRole.DISTRIBUTOR),
    hasPermission,
    hasAnyRole,
    hasRole,
  };
}

