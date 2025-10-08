"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getCartCount } from "@/services/public/cart/cartService";

interface CartIconProps {
  onClick?: () => void;
}

export function CartIcon({ onClick }: CartIconProps) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartCount = async () => {
    setIsLoading(true);
    const result = await getCartCount();
    if (result.success) {
      setCount(result.count);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCartCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={onClick}
      aria-label="Carrito de compras"
    >
      <ShoppingCart className="h-5 w-5" />
      {!isLoading && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#E30613] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Button>
  );
}

