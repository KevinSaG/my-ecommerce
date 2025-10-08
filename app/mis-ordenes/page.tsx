"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2, Package, Eye, ShoppingBag, AlertCircle } from 'lucide-react';
import { getMyOrders } from '@/services/public/orders/orderService';

interface Order {
  id: string;
  order_number: string;
  status: string;
  payment_status: string;
  total: number;
  created_at: string;
  order_items: any[];
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    const result = await getMyOrders();

    if (result.success) {
      setOrders(result.data);
    } else {
      setError(result.error || 'Error al cargar órdenes');
    }

    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      ready_for_pickup: 'bg-green-100 text-green-800',
      in_transit: 'bg-cyan-100 text-cyan-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      processing: 'Procesando',
      ready_for_pickup: 'Lista para Recoger',
      in_transit: 'En Tránsito',
      delivered: 'Entregada',
      cancelled: 'Cancelada',
      refunded: 'Reembolsada',
    };
    return texts[status] || status;
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      partially_paid: 'bg-orange-100 text-orange-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Pendiente',
      paid: 'Pagada',
      partially_paid: 'Pago Parcial',
      failed: 'Fallida',
      refunded: 'Reembolsada',
    };
    return texts[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-adelca-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Mis Órdenes</h1>
          <p className="text-slate-600">
            Historial completo de tus pedidos
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-800">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {orders.length === 0 ? (
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <ShoppingBag className="h-16 w-16 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">No tienes órdenes aún</h2>
              <p className="text-slate-600 mb-6">
                Cuando realices tu primera compra, aparecerá aquí
              </p>
              <Button
                onClick={() => router.push('/productos')}
                className="bg-adelca-primary hover:bg-adelca-primary-hover"
              >
                Explorar Productos
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        Orden #{order.order_number}
                      </CardTitle>
                      <p className="text-sm text-slate-600 mt-1">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                      <Badge className={getPaymentStatusColor(order.payment_status)}>
                        {getPaymentStatusText(order.payment_status)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Items de la orden */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-slate-700">
                        Productos ({order.order_items?.length || 0})
                      </h4>
                      <div className="space-y-2">
                        {order.order_items?.slice(0, 3).map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-slate-600">
                              {item.products?.name} × {item.quantity}
                            </span>
                            <span className="font-medium">
                              ${item.subtotal?.toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {order.order_items && order.order_items.length > 3 && (
                          <p className="text-xs text-slate-500">
                            + {order.order_items.length - 3} productos más
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Total y acciones */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Total</p>
                        <p className="text-2xl font-bold text-adelca-primary">
                          ${order.total?.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/orden/${order.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalles
                        </Button>
                        {order.status === 'delivered' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/productos`)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            Repetir Orden
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Paginación - Para futuro */}
        {orders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Mostrando {orders.length} orden{orders.length !== 1 ? 'es' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

