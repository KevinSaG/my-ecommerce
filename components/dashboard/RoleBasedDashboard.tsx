/**
 * Role-Based Dashboard Component
 * Automatically renders the correct dashboard layout based on user role
 */

'use client';

import { useRole } from '@/hooks';
import { UserRole } from '@/types';
import {
  AdminLayout,
  SalesRepLayout,
  CustomerLayout,
  DistributorLayout,
} from './layouts';
import { Loader2 } from 'lucide-react';

interface RoleBasedDashboardProps {
  children: React.ReactNode;
}

export function RoleBasedDashboard({ children }: RoleBasedDashboardProps) {
  const { role } = useRole();

  // Show loading while determining role
  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-adelca-primary mx-auto mb-4" />
          <p className="text-slate-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Render appropriate layout based on role
  switch (role) {
    case UserRole.ADMIN:
      return <AdminLayout>{children}</AdminLayout>;
    
    case UserRole.SALES_REP:
      return <SalesRepLayout>{children}</SalesRepLayout>;
    
    case UserRole.CUSTOMER:
      return <CustomerLayout>{children}</CustomerLayout>;
    
    case UserRole.DISTRIBUTOR:
      return <DistributorLayout>{children}</DistributorLayout>;
    
    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-2">Acceso Denegado</p>
            <p className="text-slate-600">No tienes permisos para acceder al dashboard.</p>
          </div>
        </div>
      );
  }
}

