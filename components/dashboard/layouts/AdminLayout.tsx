/**
 * Admin Dashboard Layout
 * Layout específico para usuarios con rol de administrador
 */

'use client';

import { UserRole } from '@/types';
import { ProtectedRoute } from '@/components/auth';
import DashboardSidebar from '@/components/DashboardSidebar';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Warehouse,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Usuarios',
    href: '/dashboard/usuarios',
    icon: Users,
  },
  {
    title: 'Productos',
    href: '/dashboard/productos',
    icon: Package,
  },
  {
    title: 'Pedidos',
    href: '/dashboard/pedidos',
    icon: ShoppingCart,
  },
  {
    title: 'Inventario',
    href: '/dashboard/inventario',
    icon: Warehouse,
  },
  {
    title: 'Reportes',
    href: '/dashboard/reportes',
    icon: BarChart3,
  },
  {
    title: 'Configuración',
    href: '/dashboard/configuracion',
    icon: Settings,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-slate-50">
        <DashboardSidebar navigation={adminNavigation} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

