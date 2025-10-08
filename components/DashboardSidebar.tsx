"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Menu, X, ShoppingCart, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { signOut } from "@/services/authentication/authService";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const defaultMenuItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Productos",
    href: "/dashboard/productos",
    icon: Package,
  },
  {
    title: "Ver Tienda",
    href: "/",
    icon: ShoppingCart,
  },
];

interface DashboardSidebarProps {
  navigation?: NavigationItem[];
}

export default function DashboardSidebar({ navigation }: DashboardSidebarProps) {
  const menuItems = navigation || defaultMenuItems;
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const result = await signOut();
    
    if (result.success) {
      router.push('/signin');
      router.refresh();
    } else {
      alert('Error al cerrar sesión');
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-slate-200
          transform transition-transform duration-200 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-200">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="bg-adelca-primary p-2 rounded-lg flex items-center justify-center">
                <Image 
                  src="/images/logo-a.png" 
                  alt="ADELCA" 
                  width={32} 
                  height={32}
                  className="brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">ADELCA</h1>
                <p className="text-[10px] text-slate-500">Panel de Control</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'bg-adelca-primary text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* Logout button */}
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleSignOut}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

