/**
 * RoleGate Component
 * Conditional rendering based on user roles
 * Does NOT redirect, just hides/shows content
 */

'use client';

import { useRole } from '@/hooks';
import { UserRole, type RolePermissions } from '@/types';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermission?: keyof RolePermissions;
  fallback?: React.ReactNode;
}

export function RoleGate({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
}: RoleGateProps) {
  const { role, hasAnyRole, hasPermission } = useRole();

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    if (!role || !hasAnyRole(allowedRoles)) {
      return <>{fallback}</>;
    }
  }

  // Check permission-based access
  if (requiredPermission) {
    if (!hasPermission(requiredPermission)) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
}

