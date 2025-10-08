"use client";

import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/public/cart/cartService";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  text?: string;
}

export function AddToCartButton({
  productId,
  quantity = 1,
  variant = "default",
  size = "default",
  className = "",
  showIcon = true,
  text = "Agregar al Carrito",
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    const result = await addToCart(productId, quantity);

    if (result.success) {
      setIsAdded(true);
      
      // Dispatch event to update cart count
      window.dispatchEvent(new Event('cart-updated'));

      // Reset after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } else {
      // Si falla por autenticación, redirigir al login
      if (result.error?.includes('autenticado')) {
        if (confirm('Debes iniciar sesión para agregar productos al carrito. ¿Deseas continuar?')) {
          router.push('/signin');
        }
      } else {
        alert(result.error || 'Error al agregar al carrito');
      }
    }

    setIsAdding(false);
  };

  const buttonVariant = variant === "default" ? "default" : variant;
  const buttonClassName = variant === "default" 
    ? `bg-adelca-primary hover:bg-adelca-primary-hover ${className}`
    : className;

  return (
    <Button
      variant={buttonVariant}
      size={size}
      className={buttonClassName}
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
    >
      {isAdding ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Agregando...
        </>
      ) : isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          ¡Agregado!
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          {text}
        </>
      )}
    </Button>
  );
}

