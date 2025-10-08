/**
 * Sales Rep Dashboard Layout
 * Layout específico para representantes de ventas
 */

'use client';

import { UserRole } from '@/types';
import { ProtectedRoute } from '@/components/auth';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart3,
} from 'lucide-react';

interface SalesRepLayoutProps {
  children: React.ReactNode;
}

const salesRepNavigation = [
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
    title: 'Clientes',
    href: '/dashboard/clientes',
    icon: Users,
  },
  {
    title: 'Mis Ventas',
    href: '/dashboard/mis-ventas',
    icon: BarChart3,
  },
];

export function SalesRepLayout({ children }: SalesRepLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.SALES_REP]}>
      <div className="flex h-screen bg-slate-50">
        <DashboardSidebar navigation={salesRepNavigation} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

