"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home, ShoppingCart, RefreshCw, HelpCircle } from 'lucide-react';

function OrderErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Ocurrió un error al procesar tu orden';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-red-200 shadow-xl">
          <CardContent className="pt-12 pb-8">
            {/* Icon de error */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <XCircle className="relative h-24 w-24 text-red-500" />
              </div>
            </div>

            {/* Mensaje principal */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
              Error al Procesar la Orden
            </h1>
            
            <p className="text-center text-lg text-slate-600 mb-8">
              Lo sentimos, no pudimos completar tu pedido en este momento.
            </p>

            {/* Mensaje de error */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-red-800">
                <strong>Detalles del error:</strong>
              </p>
              <p className="text-sm text-red-700 mt-2">
                {error}
              </p>
            </div>

            {/* Posibles soluciones */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                ¿Qué puedes hacer?
              </h3>
              <ul className="text-sm text-orange-800 space-y-2">
                <li>• Verifica que tu carrito tenga productos</li>
                <li>• Asegúrate de haber seleccionado un método de envío y pago</li>
                <li>• Verifica tu conexión a internet</li>
                <li>• Intenta nuevamente en unos momentos</li>
                <li>• Si el problema persiste, contacta a soporte</li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                onClick={() => router.push('/checkout')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Reintentar
              </Button>

              <Button
                onClick={() => router.push('/carrito')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ver Carrito
              </Button>
              
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-adelca-primary hover:bg-adelca-primary-hover"
                size="lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Ir al Inicio
              </Button>
            </div>

            {/* Mensaje de soporte */}
            <div className="text-center mt-8 pt-6 border-t">
              <p className="text-sm text-slate-600 mb-3">
                ¿Necesitas ayuda?
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/contacto"
                  className="text-adelca-primary hover:underline text-sm font-medium"
                >
                  Contactar Soporte
                </Link>
                <span className="text-slate-300">|</span>
                <Link 
                  href="tel:+593999999999"
                  className="text-adelca-primary hover:underline text-sm font-medium"
                >
                  Llamar Ahora
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OrderErrorPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <OrderErrorContent />
    </Suspense>
  );
}

