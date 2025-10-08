"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ShoppingCart, MapPin, CreditCard } from 'lucide-react';
import { getCartItems } from '@/services/public/cart/cartService';
import { createOrder } from '@/services/public/orders/orderService';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    shipping_method: 'pickup_quito',
    pickup_location: 'aloag',
    payment_method: 'cash',
    customer_notes: '',
  });

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setIsLoading(true);
    const result = await getCartItems();
    if (result.success) {
      setCartItems(result.data);
    }
    setIsLoading(false);
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = item.products?.base_price || 0;
      return sum + (price * item.quantity);
    }, 0);

    const tax = subtotal * 0.15; // 15% IVA
    const shipping = formData.shipping_method.startsWith('pickup') ? 0 : 10;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    setIsProcessing(true);

    const result = await createOrder(formData);

    if (result.success) {
      router.push(`/orden-exitosa?order=${result.data.order_number}`);
    } else {
      router.push(`/orden-error?error=${encodeURIComponent(result.error || 'Error desconocido')}`);
    }
  };

  const totals = calculateTotals();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-adelca-primary" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <ShoppingCart className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Carrito Vacío</h2>
            <p className="text-slate-600 mb-4">
              No tienes productos en tu carrito
            </p>
            <Button onClick={() => router.push('/productos')}>
              Ver Productos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Método de Envío */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Método de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="pickup_quito"
                        checked={formData.shipping_method === 'pickup_quito'}
                        onChange={(e) => setFormData({ ...formData, shipping_method: e.target.value, pickup_location: 'aloag' })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Retiro en Planta Quito (Aloag)</div>
                        <div className="text-sm text-slate-600">Gratis</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="pickup_milagro"
                        checked={formData.shipping_method === 'pickup_milagro'}
                        onChange={(e) => setFormData({ ...formData, shipping_method: e.target.value, pickup_location: 'milagro' })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Retiro en Planta Milagro</div>
                        <div className="text-sm text-slate-600">Gratis</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="delivery"
                        checked={formData.shipping_method === 'delivery'}
                        onChange={(e) => setFormData({ ...formData, shipping_method: e.target.value })}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-medium">Entrega a Domicilio</div>
                        <div className="text-sm text-slate-600">$10.00</div>
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Método de Pago */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Método de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment_method"
                        value="cash"
                        checked={formData.payment_method === 'cash'}
                        onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        className="mr-3"
                      />
                      <div className="font-medium">Efectivo</div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment_method"
                        value="bank_transfer"
                        checked={formData.payment_method === 'bank_transfer'}
                        onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        className="mr-3"
                      />
                      <div className="font-medium">Transferencia Bancaria</div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                      <input
                        type="radio"
                        name="payment_method"
                        value="credit_line"
                        checked={formData.payment_method === 'credit_line'}
                        onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                        className="mr-3"
                      />
                      <div className="font-medium">Línea de Crédito</div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Notas */}
              <Card>
                <CardHeader>
                  <CardTitle>Notas del Pedido (Opcional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Agrega cualquier nota especial para tu pedido..."
                    value={formData.customer_notes}
                    onChange={(e) => setFormData({ ...formData, customer_notes: e.target.value })}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Resumen de Orden */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen de Orden</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Productos */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.products?.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${((item.products?.base_price || 0) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">IVA (15%)</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Envío</span>
                    <span>{totals.shipping === 0 ? 'Gratis' : `$${totals.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-adelca-primary">${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-adelca-primary hover:bg-adelca-primary-hover"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Confirmar Pedido'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

