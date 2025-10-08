"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  getCartItems,
  updateCartItem,
  removeFromCart,
  clearCart,
  calculateCartTotals,
  CartItem,
} from "@/services/public/cart/cartService";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const fetchCart = async () => {
    setIsLoading(true);
    const result = await getCartItems();
    if (result.success) {
      setItems(result.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchCart();
    }
  }, [open]);

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
    if (!confirm('¿Estás seguro de que quieres vaciar el carrito?')) return;
    
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#E30613]" />
            Carrito de Compras
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Tu carrito está vacío"
              : `${totals.itemCount} ${totals.itemCount === 1 ? "producto" : "productos"}`}
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E30613] mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando carrito...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
              <p className="text-muted-foreground mb-6">
                Agrega productos para comenzar tu compra
              </p>
              <Button asChild className="bg-[#E30613] hover:bg-[#C00511]">
                <Link href="/productos" onClick={() => onOpenChange(false)}>
                  Ver Productos
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => {
                const product = item.products;
                const isUpdating = updatingItems.has(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-4 rounded-lg border bg-card transition-opacity ${
                      isUpdating ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <div className="flex items-center justify-center h-full">
                        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/productos/${product?.id}`}
                        onClick={() => onOpenChange(false)}
                        className="font-medium text-sm hover:text-[#E30613] transition-colors line-clamp-2"
                      >
                        {product?.name || 'Producto'}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">
                        SKU: {product?.sku || 'N/A'}
                      </p>
                      <p className="text-lg font-bold text-[#E30613] mt-2">
                        ${(product?.base_price || 0).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemove(item.id)}
                        disabled={isUpdating}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2 border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA (12%)</span>
                  <span className="font-medium">${totals.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#E30613]">${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full bg-[#E30613] hover:bg-[#C00511] h-12 text-base font-semibold"
                >
                  <Link href="/checkout" onClick={() => onOpenChange(false)}>
                    Proceder al Pago
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearCart}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

