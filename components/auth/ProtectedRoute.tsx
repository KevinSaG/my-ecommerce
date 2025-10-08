/**
 * ProtectedRoute Component
 * Client-side route protection based on authentication and roles
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useRole } from '@/hooks';
import { UserRole } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  requireAuth = true,
  redirectTo = '/signin',
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { role, hasAnyRole } = useRole();

  // Si está autenticado pero el rol aún no está definido, seguir esperando
  const isRoleLoading = isAuthenticated && !role;

  useEffect(() => {
    // Wait for loading to complete (auth + role)
    if (isLoading || isRoleLoading) return;

    // Check authentication
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Check role permissions
    if (allowedRoles && allowedRoles.length > 0) {
      if (!role || !hasAnyRole(allowedRoles)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isLoading, isRoleLoading, role, requireAuth, allowedRoles, router, redirectTo, hasAnyRole]);

  // Show loading state (including role loading)
  if (isLoading || isRoleLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-adelca-primary mx-auto mb-4" />
            <p className="text-slate-600">Verificando permisos...</p>
          </div>
        </div>
      )
    );
  }

  // Check if user is authenticated
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Check if user has required role
  if (allowedRoles && allowedRoles.length > 0) {
    if (!role || !hasAnyRole(allowedRoles)) {
      return null; // Will redirect in useEffect
    }
  }

  return <>{children}</>;
}

