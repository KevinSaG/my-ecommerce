/**
 * Customer Dashboard Layout
 * Layout específico para clientes
 */

"use client";

import { UserRole } from "@/types";
import { ProtectedRoute } from "@/components/auth";
import DashboardSidebar from "@/components/DashboardSidebar";
import {
  LayoutDashboard,
  ShoppingCart,
  Heart,
  User,
  FileText,
  Package,
} from "lucide-react";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

const customerNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mis Órdenes",
    href: "/dashboard/ordenes",
    icon: Package,
  } /*
  {
    title: 'Favoritos',
    href: '/dashboard/favoritos',
    icon: Heart,
  },
  {
    title: 'Cotizaciones',
    href: '/dashboard/cotizaciones',
    icon: FileText,
  },
  {
    title: 'Mi Perfil',
    href: '/dashboard/perfil',
    icon: User,
  },*/,
];

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={[UserRole.CUSTOMER]}>
      <div className="flex h-screen bg-slate-50">
        <DashboardSidebar navigation={customerNavigation} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
