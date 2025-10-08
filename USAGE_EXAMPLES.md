# 📘 Ejemplos Prácticos de Uso - E-Commerce ADELCA

Este documento contiene ejemplos prácticos de cómo usar la arquitectura del sistema.

## 📋 Índice

1. [Crear una Nueva Página del Dashboard](#crear-una-nueva-página-del-dashboard)
2. [Agregar un Nuevo Servicio](#agregar-un-nuevo-servicio)
3. [Implementar Control de Roles](#implementar-control-de-roles)
4. [Crear un Componente Protegido](#crear-un-componente-protegido)
5. [Usar Hooks Personalizados](#usar-hooks-personalizados)
6. [Trabajar con Formularios](#trabajar-con-formularios)

---

## 1. Crear una Nueva Página del Dashboard

### Ejemplo: Página de Usuarios (Solo Admin)

```typescript
// app/dashboard/usuarios/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/services/dashboard';
import { ProtectedRoute } from '@/components/auth';
import { UserRole, type User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      const result = await getUsers({ page: 1, limit: 10 });
      
      if (result.success) {
        setUsers(result.data);
      } else {
        setError(result.error || 'Error al cargar usuarios');
      }
      
      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div>
        <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-adelca-primary" />
          </div>
        )}

        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && (
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.email}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Rol: {user.role}</p>
                  <p>Estado: {user.is_active ? 'Activo' : 'Inactivo'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
```

---

## 2. Agregar un Nuevo Servicio

### Ejemplo: Servicio de Notificaciones

#### Paso 1: Definir tipos

```typescript
// types/domain.types.ts
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
```

#### Paso 2: Agregar endpoints

```typescript
// constants/api.ts
export const dashboardEndpoints = {
  // ... otros endpoints
  notifications: {
    list: `${baseUrlDashboard}/notifications`,
    markAsRead: `${baseUrlDashboard}/notifications/read`,
    markAllAsRead: `${baseUrlDashboard}/notifications/read-all`,
  },
};
```

#### Paso 3: Crear servicio

```typescript
// services/dashboard/notifications/getNotifications.ts
import { dashboardEndpoints } from '@/constants/api';
import type { Notification, ApiResponse } from '@/types';

/**
 * Get user notifications
 */
export async function getNotifications(): Promise<ApiResponse<Notification[]>> {
  try {
    const response = await fetch(dashboardEndpoints.notifications.list, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener notificaciones',
    };
  }
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string): Promise<ApiResponse> {
  try {
    const response = await fetch(dashboardEndpoints.notifications.markAsRead, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId }),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al marcar como leída',
    };
  }
}
```

#### Paso 4: Exportar en index

```typescript
// services/dashboard/index.ts
export * from './notifications/getNotifications';
```

#### Paso 5: Crear API Route

```typescript
// app/api/dashboard/notifications/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Query notifications
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

---

## 3. Implementar Control de Roles

### Ejemplo A: Proteger una Ruta Completa

```typescript
// app/dashboard/configuracion/page.tsx
import { ProtectedRoute } from '@/components/auth';
import { UserRole } from '@/types';

export default function ConfigPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div>
        <h1>Configuración del Sistema</h1>
        {/* Solo admins pueden ver esto */}
      </div>
    </ProtectedRoute>
  );
}
```

### Ejemplo B: Renderizado Condicional en Componente

```typescript
// components/ProductCard.tsx
'use client';

import { RoleGate } from '@/components/auth';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4">
      <h3>{product.name}</h3>
      <p>{product.price}</p>

      {/* Todos pueden ver */}
      <Button>Ver Detalles</Button>

      {/* Solo admin puede editar */}
      <RoleGate allowedRoles={[UserRole.ADMIN]}>
        <Button>Editar Producto</Button>
      </RoleGate>

      {/* Solo admin puede eliminar */}
      <RoleGate allowedRoles={[UserRole.ADMIN]}>
        <Button variant="destructive">Eliminar</Button>
      </RoleGate>
    </div>
  );
}
```

### Ejemplo C: Verificación por Permiso

```typescript
// components/ReportButton.tsx
'use client';

import { RoleGate } from '@/components/auth';
import { Button } from '@/components/ui/button';

export function ReportButton() {
  return (
    <RoleGate requiredPermission="canViewReports">
      <Button>Generar Reporte</Button>
    </RoleGate>
  );
}
```

---

## 4. Crear un Componente Protegido

### Ejemplo: Botón de Eliminar Producto

```typescript
// components/DeleteProductButton.tsx
'use client';

import { useState } from 'react';
import { useRole } from '@/hooks';
import { deleteProduct } from '@/services/dashboard';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteProductButtonProps {
  productId: string;
  onDeleted?: () => void;
}

export function DeleteProductButton({ productId, onDeleted }: DeleteProductButtonProps) {
  const { hasPermission } = useRole();
  const [isDeleting, setIsDeleting] = useState(false);

  // No mostrar si no tiene permiso
  if (!hasPermission('canManageProducts')) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    setIsDeleting(true);

    const result = await deleteProduct(productId);

    if (result.success) {
      onDeleted?.();
    } else {
      alert(`Error: ${result.error}`);
    }

    setIsDeleting(false);
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </Button>
  );
}
```

---

## 5. Usar Hooks Personalizados

### Ejemplo A: Verificar Autenticación

```typescript
// app/dashboard/perfil/page.tsx
'use client';

import { useAuth } from '@/hooks';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Por favor, inicia sesión</div>;
  }

  return (
    <div>
      <h1>Mi Perfil</h1>
      <p>Email: {user?.user?.email}</p>
      <p>Nombre: {user?.profile?.first_name} {user?.profile?.last_name}</p>
    </div>
  );
}
```

### Ejemplo B: Verificar Rol Específico

```typescript
// components/AdminPanel.tsx
'use client';

import { useRole } from '@/hooks';

export function AdminPanel() {
  const { isAdmin, role } = useRole();

  if (!isAdmin) {
    return (
      <div className="text-red-600">
        No tienes permisos de administrador
      </div>
    );
  }

  return (
    <div>
      <h2>Panel de Administración</h2>
      <p>Tu rol: {role}</p>
      {/* Contenido solo para admins */}
    </div>
  );
}
```

### Ejemplo C: Verificar Múltiples Roles

```typescript
// components/SalesPanel.tsx
'use client';

import { useRole } from '@/hooks';
import { UserRole } from '@/types';

export function SalesPanel() {
  const { hasAnyRole } = useRole();

  const canViewSales = hasAnyRole([
    UserRole.ADMIN,
    UserRole.SALES_REP,
    UserRole.DISTRIBUTOR,
  ]);

  if (!canViewSales) {
    return null;
  }

  return (
    <div>
      <h2>Panel de Ventas</h2>
      {/* Contenido para roles autorizados */}
    </div>
  );
}
```

---

## 6. Trabajar con Formularios

### Ejemplo: Crear Producto

```typescript
// app/dashboard/productos/crear/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/dashboard';
import { ProtectedRoute } from '@/components/auth';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    base_price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createProduct(formData);

    if (result.success) {
      alert('Producto creado exitosamente');
      router.push('/dashboard/productos');
    } else {
      alert(`Error: ${result.error}`);
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'base_price' ? parseFloat(value) : value,
    }));
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Crear Producto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="category">Categoría</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="base_price">Precio Base</Label>
            <Input
              id="base_price"
              name="base_price"
              type="number"
              step="0.01"
              value={formData.base_price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creando...' : 'Crear Producto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
```

---

## 🎯 Casos de Uso Comunes

### 1. Dashboard con Datos en Tiempo Real

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/services/dashboard';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch inicial
    fetchStats();

    // Refetch cada 30 segundos
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  async function fetchStats() {
    const result = await getDashboardStats();
    if (result.success) {
      setStats(result.data);
    }
  }

  return <div>{/* Mostrar stats */}</div>;
}
```

### 2. Tabla con Paginación

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getOrders } from '@/services/dashboard';
import { Button } from '@/components/ui/button';

export function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      const result = await getOrders({ page, limit: 10 });
      if (result.success) {
        setOrders(result.data);
        setPagination(result.pagination);
      }
    }
    fetchOrders();
  }, [page]);

  return (
    <div>
      {/* Tabla */}
      <table>
        {/* Contenido de la tabla */}
      </table>

      {/* Paginación */}
      <div className="flex gap-2 mt-4">
        <Button
          disabled={!pagination?.hasPrevPage}
          onClick={() => setPage((p) => p - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {pagination?.page} de {pagination?.totalPages}
        </span>
        <Button
          disabled={!pagination?.hasNextPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
```

### 3. Búsqueda con Debounce

```typescript
'use client';

import { useState, useEffect } from 'react';
import { searchProducts } from '@/services/public/products/getData';
import { Input } from '@/components/ui/input';

export function ProductSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Debounce: esperar 500ms después de que el usuario deje de escribir
    const timer = setTimeout(async () => {
      if (search) {
        const result = await searchProducts({ search });
        if (result.success) {
          setResults(result.data);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <Input
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {results.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}
```

---

**Última actualización**: Octubre 2024

