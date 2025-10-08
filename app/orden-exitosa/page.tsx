"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Home, FileText } from 'lucide-react';

function OrderSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-green-200 shadow-xl">
          <CardContent className="pt-12 pb-8">
            {/* Icon de éxito */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <CheckCircle2 className="relative h-24 w-24 text-green-500" />
              </div>
            </div>

            {/* Mensaje principal */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
              ¡Orden Realizada con Éxito!
            </h1>
            
            <p className="text-center text-lg text-slate-600 mb-8">
              Gracias por tu compra. Tu orden ha sido procesada correctamente.
            </p>

            {/* Número de orden */}
            {orderNumber && (
              <div className="bg-slate-100 rounded-lg p-6 mb-8 text-center">
                <p className="text-sm text-slate-600 mb-2">Número de Orden:</p>
                <p className="text-2xl font-bold text-adelca-primary font-mono">
                  {orderNumber}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Guarda este número para hacer seguimiento de tu pedido
                </p>
              </div>
            )}

            {/* Información */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                ¿Qué sigue?
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>✓ Recibirás un email de confirmación con los detalles de tu orden</li>
                <li>✓ Nuestro equipo procesará tu pedido en las próximas 24 horas</li>
                <li>✓ Te notificaremos cuando tu pedido esté listo para recoger o en camino</li>
                <li>✓ Puedes hacer seguimiento en tu historial de órdenes</li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push('/mis-ordenes')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                Ver Mis Órdenes
              </Button>
              
              <Button
                onClick={() => router.push('/')}
                className="w-full bg-adelca-primary hover:bg-adelca-primary-hover"
                size="lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Volver al Inicio
              </Button>
            </div>

            {/* Mensaje adicional */}
            <p className="text-center text-sm text-slate-500 mt-6">
              Si tienes alguna pregunta, no dudes en{' '}
              <Link href="/contacto" className="text-adelca-primary hover:underline">
                contactarnos
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

