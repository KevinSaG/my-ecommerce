"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, TrendingUp, Loader2, Link } from 'lucide-react';
import { 
  getDashboardStats, 
  getUserProfile,
  type DashboardStats,
  type UserProfile
} from '@/services/dashboard';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    productCount: 0,
    orderCount: 0,
    cartCount: 0,
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      setError('');

      // Load stats and profile in parallel
      const [statsResult, profileResult] = await Promise.all([
        getDashboardStats(),
        getUserProfile(),
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      } else {
        setError(statsResult.error || 'Error al cargar estadísticas');
      }

      if (profileResult.success && profileResult.data) {
        setProfile(profileResult.data);
      }

      setIsLoading(false);
    }

    loadDashboardData();
  }, []);

  const statsCards = [
    {
      title: 'Productos Disponibles',
      value: stats.productCount,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Mis Órdenes',
      value: stats.orderCount,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'En Carrito',
      value: stats.cartCount,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-adelca-primary mx-auto mb-4" />
          <p className="text-slate-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Bienvenido, {profile?.profile?.first_name || 'Usuario'}
        </h1>
        <p className="text-slate-600 mt-1">
          Panel de control de ADELCA - Gestiona tus compras y pedidos
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-full`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-adelca-primary hover:bg-red-50 transition-colors"
            >
              <div className="bg-adelca-primary p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Ver Catálogo</h3>
                <p className="text-sm text-slate-600">Explora nuestros productos</p>
              </div>
            </Link>

            <a
              href="/carrito"
              className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-adelca-primary hover:bg-red-50 transition-colors"
            >
              <div className="bg-green-600 p-3 rounded-lg">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Mi Carrito</h3>
                <p className="text-sm text-slate-600">Ver productos en carrito</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* User Info */}
      {profile && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Información de Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Nombre</p>
                <p className="font-medium text-slate-900">
                  {profile.profile?.first_name} {profile.profile?.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-medium text-slate-900">{profile.user?.email}</p>
              </div>
              {profile.profile?.company_name && (
                <div>
                  <p className="text-sm text-slate-600">Empresa</p>
                  <p className="font-medium text-slate-900">{profile.profile.company_name}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-600">Tipo de Cliente</p>
                <p className="font-medium text-slate-900 capitalize">
                  {profile.profile?.customer_type?.replace('_', ' ') || 'Retail'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
