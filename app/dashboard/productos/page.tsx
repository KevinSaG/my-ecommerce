import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function DashboardProductosPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Productos</h1>
        <p className="text-slate-600 mt-1">
          Gestión de productos (próximamente)
        </p>
      </div>

      {/* Coming Soon Card */}
      <Card>
        <CardHeader>
          <CardTitle>En Desarrollo</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="bg-slate-100 p-8 rounded-full mb-6">
            <Package className="h-16 w-16 text-slate-400" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Módulo de Productos
          </h2>
          <p className="text-slate-600 text-center max-w-md">
            Esta sección estará disponible próximamente. Aquí podrás gestionar
            tus productos, inventario y más.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

