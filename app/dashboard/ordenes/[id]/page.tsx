'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, MapPin, CreditCard, Truck, Calendar, FileText, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { getOrderById, type OrderDetail } from '@/services/dashboard/orders';
import { toast } from 'sonner';

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pendiente', variant: 'outline' },
    confirmed: { label: 'Confirmado', variant: 'default' },
    processing: { label: 'En proceso', variant: 'default' },
    ready_for_pickup: { label: 'Listo para recoger', variant: 'default' },
    in_transit: { label: 'En tránsito', variant: 'default' },
    delivered: { label: 'Entregado', variant: 'secondary' },
    cancelled: { label: 'Cancelado', variant: 'destructive' },
  };

  const config = statusConfig[status] || { label: status, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const getPaymentBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    pending: { label: 'Pendiente', variant: 'outline' },
    paid: { label: 'Pagado', variant: 'secondary' },
    partially_paid: { label: 'Parcialmente pagado', variant: 'default' },
    failed: { label: 'Fallido', variant: 'destructive' },
  };

  const config = statusConfig[status] || { label: status, variant: 'outline' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      setIsLoading(true);
      const result = await getOrderById(id);
      console.log("result", result);

      if (result.success && result.data) {
        setOrder(result.data);
      } else {
        toast.error(result.error || 'Error al cargar orden');
        router.push('/dashboard/ordenes');
      }

      setIsLoading(false);
    };

    loadOrder();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-muted-foreground">Orden no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard/ordenes')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a órdenes
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Orden {order.order_number}</h1>
            <p className="text-muted-foreground">
              Creada el {new Date(order.created_at).toLocaleDateString('es-EC', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {getStatusBadge(order.status)}
            {getPaymentBadge(order.payment_status)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Productos
              </CardTitle>
              <CardDescription>
                {order.order_items.length} producto(s) en esta orden
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unitario</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.order_items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.products?.name || 'Producto desconocido'}
                        {item.discount_percentage > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            -{item.discount_percentage}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.products?.sku}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.products?.stock_unit || 'unidades'}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.unit_price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${item.subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Descuento</span>
                    <span className="text-green-600">-${order.discount_amount.toFixed(2)}</span>
                  </div>
                )}
                {order.tax_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA</span>
                    <span>${order.tax_amount.toFixed(2)}</span>
                  </div>
                )}
                {order.shipping_cost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span>${order.shipping_cost.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Notes */}
          {order.customer_notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notas del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.customer_notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <div className="mt-1">
                  {getPaymentBadge(order.payment_status)}
                </div>
              </div>
              {order.payment_method && (
                <div>
                  <p className="text-sm text-muted-foreground">Método</p>
                  <p className="font-medium capitalize">{order.payment_method.replace('_', ' ')}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Monto Pagado</p>
                <p className="font-medium">${order.paid_amount.toFixed(2)}</p>
              </div>
              {order.payment_status === 'partially_paid' && (
                <div>
                  <p className="text-sm text-muted-foreground">Monto Pendiente</p>
                  <p className="font-medium text-orange-600">
                    ${(order.total - order.paid_amount).toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.shipping_method && (
                <div>
                  <p className="text-sm text-muted-foreground">Método</p>
                  <p className="font-medium capitalize">{order.shipping_method.replace('_', ' ')}</p>
                </div>
              )}
              {order.pickup_location && (
                <div>
                  <p className="text-sm text-muted-foreground">Punto de Retiro</p>
                  <p className="font-medium capitalize">{order.pickup_location}</p>
                </div>
              )}
              {order.tracking_number && (
                <div>
                  <p className="text-sm text-muted-foreground">Número de Seguimiento</p>
                  <p className="font-medium">{order.tracking_number}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Dates */}
          {(order.estimated_delivery_date || order.actual_delivery_date) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Fechas de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.estimated_delivery_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha Estimada</p>
                    <p className="font-medium">
                      {new Date(order.estimated_delivery_date).toLocaleDateString('es-EC')}
                    </p>
                  </div>
                )}
                {order.actual_delivery_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha Real</p>
                    <p className="font-medium">
                      {new Date(order.actual_delivery_date).toLocaleDateString('es-EC')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Shipping Address */}
          {order.shipping_addresses && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dirección de Envío
                </CardTitle>
              </CardHeader>
               <CardContent>
                <address className="not-italic text-sm">
                  <p className="font-medium mb-1">{order.shipping_addresses.label}</p>
                  <p>{order.shipping_addresses.street}</p>
                  <p>
                    {order.shipping_addresses.city}, {order.shipping_addresses.province}
                  </p>
                  <p>{order.shipping_addresses.postal_code}</p>
                  <p className="font-medium">{order.shipping_addresses.country}</p>
                  {order.shipping_addresses.phone && (
                    <p className="mt-2 text-muted-foreground">Tel: {order.shipping_addresses.phone}</p>
                  )}
                </address>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
