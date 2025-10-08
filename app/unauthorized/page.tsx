"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-orange-200 shadow-xl">
          <CardContent className="pt-12 pb-8">
            {/* Icon de acceso denegado */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <ShieldAlert className="relative h-24 w-24 text-orange-500" />
              </div>
            </div>

            {/* Mensaje principal */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900">
              Acceso No Autorizado
            </h1>
            
            <p className="text-center text-lg text-slate-600 mb-8">
              No tienes permisos para acceder a esta sección del sistema.
            </p>

            {/* Información */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-orange-900 mb-2">
                ¿Por qué veo este mensaje?
              </h3>
              <ul className="text-sm text-orange-800 space-y-2">
                <li>• Tu cuenta no tiene los permisos necesarios para acceder al dashboard</li>
                <li>• Es posible que tu rol de usuario no esté configurado correctamente</li>
                <li>• Si crees que esto es un error, contacta al administrador</li>
              </ul>
            </div>

            {/* Botones de acción */}
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver Atrás
              </Button>
              
              <Button
                onClick={() => router.push("/")}
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
                ¿Necesitas ayuda o permisos adicionales?
              </p>
              <Link 
                href="/contacto"
                className="text-adelca-primary hover:underline text-sm font-medium"
              >
                Contactar al Administrador
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

