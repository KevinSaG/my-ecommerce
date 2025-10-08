"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  clearCart,
  calculateCartTotals,
  CartItem,
} from "@/services/public/cart/cartService";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchCart = async () => {
    setIsLoading(true);
    const result = await getCartItems();
    if (result.success) {
      setItems(result.data);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setUpdatingItems((prev) => new Set(prev).add(cartItemId));
    const result = await updateCartItem(cartItemId, newQuantity);
    
    if (result.success) {
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
    }
    
    setUpdatingItems((prev) => {
      const next = new Set(prev);
      next.delete(cartItemId);
      return next;
    });
  };

  const handleRemove = async (cartItemId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

    setUpdatingItems((prev) => new Set(prev).add(cartItemId));
    const result = await removeFromCart(cartItemId);
    
    if (result.success) {
      await fetchCart();
      window.dispatchEvent(new Event('cart-updated'));
    }
    
    setUpdatingItems((prev) => {
      const next = new Set(prev);
      next.delete(cartItemId);
      return next;
    });
  };

  const handleClearCart = async () => {
    if (!confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) return;
    
    setIsLoading(true);
    const result = await clearCart();
    
    if (result.success) {
      setItems([]);
      window.dispatchEvent(new Event('cart-updated'));
    }
    
    setIsLoading(false);
  };

  const totals = calculateCartTotals(items);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-adelca-primary to-red-700 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Carrito de Compras</h1>
          <p className="text-white/90 text-lg">
            Revisa tus productos antes de continuar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-adelca-primary mx-auto mb-4"></div>
              <p className="text-lg text-muted-foreground">Cargando carrito...</p>
            </div>
          </div>
        ) : !isAuthenticated ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-12 pb-12 text-center">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Inicia sesión para ver tu carrito</h2>
              <p className="text-muted-foreground mb-8">
                Debes iniciar sesión para agregar productos al carrito y realizar compras.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-adelca-primary hover:bg-[#C00511]">
                  <Link href="/signin">Iniciar Sesión</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/productos">Ver Productos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : items.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-12 pb-12 text-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-8">
                Agrega productos para comenzar tu compra
              </p>
              <Button asChild className="bg-adelca-primary hover:bg-[#C00511]">
                <Link href="/productos">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Ver Productos
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Productos ({totals.itemCount})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCart}
                  disabled={isLoading}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar Carrito
                </Button>
              </div>

              {items.map((item) => {
                const product = item.products;
                const isUpdating = updatingItems.has(item.id);
                const itemTotal = (product?.base_price || 0) * item.quantity;
                
                return (
                  <Card
                    key={item.id}
                    className={`transition-opacity ${isUpdating ? 'opacity-50' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="relative h-32 w-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                          <div className="flex items-center justify-center h-full">
                            <ShoppingBag className="h-16 w-16 text-slate-300" />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <Badge variant="secondary" className="mb-2 text-adelca-primary bg-red-50">
                                {product?.category || 'General'}
                              </Badge>
                              <Link
                                href={`/productos/${product?.id}`}
                                className="text-lg font-semibold hover:text-adelca-primary transition-colors line-clamp-2"
                              >
                                {product?.name || 'Producto'}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">
                                SKU: {product?.sku || 'N/A'}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemove(item.id)}
                              disabled={isUpdating}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          <Separator className="my-4" />

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Precio unitario</p>
                                <p className="text-xl font-bold text-adelca-primary">
                                  ${(product?.base_price || 0).toFixed(2)}
                                </p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={isUpdating || item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <div className="w-16 text-center">
                                  <p className="text-sm text-muted-foreground">Cantidad</p>
                                  <p className="text-xl font-semibold">{item.quantity}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-10 w-10"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  disabled={isUpdating}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Subtotal</p>
                              <p className="text-2xl font-bold text-slate-900">
                                ${itemTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-muted-foreground">IVA (12%)</span>
                      <span className="font-medium">${totals.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-adelca-primary">${totals.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Nota:</strong> Los precios son referenciales y pueden variar según
                      la cantidad y ubicación de entrega.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button
                    asChild
                    className="w-full bg-adelca-primary hover:bg-[#C00511] h-12 text-base font-semibold"
                  >
                    <Link href="/checkout">
                      Proceder al Pago
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/productos">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Seguir Comprando
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Trust Badges */}
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Compra Segura</p>
                        <p className="text-xs text-muted-foreground">Protegemos tus datos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Envío Rápido</p>
                        <p className="text-xs text-muted-foreground">Entrega en todo Ecuador</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Soporte 24/7</p>
                        <p className="text-xs text-muted-foreground">Estamos para ayudarte</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

