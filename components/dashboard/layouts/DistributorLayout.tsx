/**
 * Distributor Dashboard Layout
 * Layout específico para distribuidores
 */

'use client';

import { UserRole } from '@/types';
import { ProtectedRoute } from '@/components/auth';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  BarChart3,
  Truck,
} from 'lucide-react';

interface DistributorLayoutProps {
  children: React.ReactNode;
}

const distributorNavigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Pedidos',
    href: '/dashboard/pedidos',
    icon: ShoppingCart,
  },
  {
    title: 'Productos',
    href: '/dashboard/productos',
    icon: Package,
  },
  {
    title: 'Entregas',
    href: '/dashboard/entregas',
    icon: Truck,
  },
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    icon: BarChart3,
  },
];

export function DistributorLayout({ children }: DistributorLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.DISTRIBUTOR]}>
      <div className="flex h-screen bg-slate-50">
        <DashboardSidebar navigation={distributorNavigation} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

