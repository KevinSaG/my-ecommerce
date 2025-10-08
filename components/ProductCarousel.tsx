'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/AddToCartButton';

interface Product {
  id: string;
  name: string;
  sku: string;
  base_price: number;
  category: string;
  inventory?: any[];
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === 'left'
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => updateScrollButtons(), 100);
    }
  };

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  const getTotalStock = (inventory: any[] | undefined) => {
    if (!inventory || !Array.isArray(inventory)) return 0;
    return inventory.reduce((sum, inv) => sum + (parseFloat(inv.quantity_available) || 0), 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            <div className="w-20 h-1 bg-adelca-primary mt-2"></div>
          </div>
          <Button variant="link" className="text-adelca-primary hover:text-adelca-primary-hover" asChild>
            <Link href="/productos">
              Ver todos
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left button */}
          {canScrollLeft && (
            <Button
              onClick={() => scroll('left')}
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 shadow-lg rounded-full z-10"
              aria-label="Scroll left"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          )}

          {/* Products container */}
          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <Card key={product.id} className="flex-shrink-0 w-72 hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  {/* Image placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-orange-500/10"></div>
                    <svg
                      className="w-32 h-32 text-slate-300 group-hover:text-orange-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                    </svg>
                    <Badge className="absolute top-4 right-4 bg-adelca-primary hover:bg-adelca-primary-hover">
                      {getTotalStock(product.inventory)} und
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pb-4">
                  <Badge variant="secondary" className="mb-2 text-adelca-primary bg-red-50">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-adelca-primary transition">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-slate-600 mb-4">SKU: {product.sku}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {formatPrice(product.base_price)}
                      </p>
                      <p className="text-xs text-slate-500">Precio base</p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                  <AddToCartButton
                    productId={product.id}
                    quantity={1}
                    className="w-full bg-adelca-primary hover:bg-adelca-primary-hover"
                    text="Agregar al Carrito"
                  />
                  <Button 
                    variant="outline" 
                    className="w-full border-adelca-primary text-adelca-primary hover:bg-adelca-primary hover:text-white" 
                    asChild
                  >
                    <Link href={`/productos/${product.id}`}>
                      Ver Detalles
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Right button */}
          {canScrollRight && (
            <Button
              onClick={() => scroll('right')}
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 shadow-lg rounded-full z-10"
              aria-label="Scroll right"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

