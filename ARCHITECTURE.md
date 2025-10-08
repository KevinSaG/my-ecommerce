# 🏗️ Arquitectura del Sistema E-Commerce ADELCA

## 📋 Índice
1. [Visión General](#visión-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Flujo de Datos](#flujo-de-datos)
4. [Control de Roles](#control-de-roles)
5. [Servicios y APIs](#servicios-y-apis)
6. [Componentes Clave](#componentes-clave)
7. [Patrones de Diseño](#patrones-de-diseño)
8. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Visión General

### Stack Tecnológico
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth
- **UI**: shadcn/ui + Tailwind CSS
- **Estado**: React Hooks + Context (opcional)

### Arquitectura de Capas

```
┌─────────────────────────────────────────┐
│           FRONTEND (Client)             │
│  - React Components                     │
│  - Pages & Layouts                      │
│  - Custom Hooks                         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          SERVICES LAYER                 │
│  - Business Logic                       │
│  - Data Transformation                  │
│  - API Calls                            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         API ROUTES (Server)             │
│  - Authentication                       │
│  - Authorization                        │
│  - Request Validation                   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│      SUPABASE (Database)                │
│  - PostgreSQL                           │
│  - Row Level Security (RLS)             │
│  - Triggers & Functions                 │
└─────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
my-ecommerce/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rutas públicas
│   │   ├── page.tsx              # Home
│   │   ├── productos/            # Catálogo
│   │   └── categorias/           # Categorías
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── signin/
│   │   └── signup/
│   ├── dashboard/                # Dashboard (protegido)
│   │   ├── layout.tsx            # Layout base
│   │   ├── page.tsx              # Dashboard home
│   │   ├── usuarios/             # Gestión usuarios (admin)
│   │   ├── productos/            # Gestión productos
│   │   ├── pedidos/              # Gestión pedidos
│   │   ├── inventario/           # Gestión inventario (admin)
│   │   └── reportes/             # Reportes (admin/sales)
│   └── api/                      # API Routes
│       ├── auth/                 # Autenticación
│       ├── products/             # Productos
│       ├── cart/                 # Carrito
│       └── dashboard/            # Dashboard APIs
│           ├── stats/
│           ├── users/
│           ├── orders/
│           ├── products/
│           ├── reports/
│           └── inventory/
│
├── components/                   # Componentes React
│   ├── ui/                       # shadcn/ui components
│   ├── auth/                     # Componentes de autenticación
│   │   ├── ProtectedRoute.tsx    # HOC para proteger rutas
│   │   └── RoleGate.tsx          # Renderizado condicional por rol
│   ├── dashboard/                # Componentes del dashboard
│   │   ├── layouts/              # Layouts por rol
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── SalesRepLayout.tsx
│   │   │   ├── CustomerLayout.tsx
│   │   │   └── DistributorLayout.tsx
│   │   └── RoleBasedDashboard.tsx
│   ├── Navbar.tsx
│   ├── CartIcon.tsx
│   └── ...
│
├── services/                     # Capa de servicios
│   ├── authentication/           # Servicios de autenticación
│   │   └── authService.ts
│   ├── public/                   # Servicios públicos
│   │   ├── products/
│   │   │   └── getData.ts
│   │   ├── categories/
│   │   │   └── getData.ts
│   │   └── cart/
│   │       └── cartService.ts
│   └── dashboard/                # Servicios del dashboard
│       ├── stats/
│       │   └── getStats.ts
│       ├── profile/
│       │   └── getProfile.ts
│       ├── users/
│       │   └── getUsers.ts
│       ├── orders/
│       │   └── getOrders.ts
│       ├── products/
│       │   └── getProducts.ts
│       ├── reports/
│       │   └── getReports.ts
│       ├── inventory/
│       │   └── getInventory.ts
│       └── index.ts              # Barrel export
│
├── hooks/                        # Custom React Hooks
│   ├── useAuth.ts                # Hook de autenticación
│   ├── useRole.ts                # Hook de control de roles
│   └── index.ts
│
├── types/                        # TypeScript Types
│   ├── auth.types.ts             # Tipos de autenticación
│   ├── api.types.ts              # Tipos de API
│   ├── domain.types.ts           # Tipos de dominio
│   └── index.ts
│
├── constants/                    # Constantes
│   └── api.ts                    # URLs de API
│
├── lib/                          # Utilidades
│   ├── supabase/                 # Clientes Supabase
│   │   ├── client.ts             # Cliente (browser)
│   │   ├── server.ts             # Cliente (server)
│   │   └── middleware.ts         # Middleware
│   └── utils.ts
│
└── middleware.ts                 # Next.js Middleware
```

---

## 🔄 Flujo de Datos

### Flujo Completo (Frontend → Backend → Database)

```
1. USER INTERACTION
   └─→ Component (React)
        └─→ Event Handler

2. BUSINESS LOGIC
   └─→ Service Function (services/)
        ├─→ Data Validation
        ├─→ API Call (fetch)
        └─→ Error Handling

3. API LAYER
   └─→ API Route (app/api/)
        ├─→ Authentication Check
        ├─→ Authorization (Role Check)
        ├─→ Request Validation
        └─→ Supabase Query

4. DATABASE
   └─→ Supabase
        ├─→ Row Level Security (RLS)
        ├─→ Triggers
        └─→ Data Return

5. RESPONSE
   └─→ API Response
        └─→ Service Transformation
             └─→ Component State Update
                  └─→ UI Render
```

### Ejemplo Práctico: Crear un Producto

```typescript
// 1. COMPONENT (Frontend)
import { createProduct } from '@/services/dashboard';

function ProductForm() {
  const handleSubmit = async (data) => {
    const result = await createProduct(data);
    if (result.success) {
      // Update UI
    }
  };
}

// 2. SERVICE LAYER
// services/dashboard/products/getProducts.ts
export async function createProduct(data) {
  const response = await fetch(dashboardEndpoints.products.create, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
}

// 3. API ROUTE
// app/api/dashboard/products/create/route.ts
export async function POST(request) {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Role check
  if (userRole !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  // Database operation
  const { data, error } = await supabase
    .from('products')
    .insert(productData);
  
  return NextResponse.json({ success: true, data });
}
```

---

## 🔐 Control de Roles

### Roles del Sistema

```typescript
enum UserRole {
  ADMIN = 'admin',           // Acceso completo
  SALES_REP = 'sales_rep',   // Ventas y clientes
  CUSTOMER = 'customer',     // Pedidos propios
  DISTRIBUTOR = 'distributor', // Distribución
  GUEST = 'guest',           // Solo lectura
}
```

### Matriz de Permisos

| Permiso | Admin | Sales Rep | Customer | Distributor | Guest |
|---------|-------|-----------|----------|-------------|-------|
| Dashboard Access | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Products | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Orders | ✅ | ✅ | Ver propios | ✅ | ❌ |
| View Reports | ✅ | ✅ | ❌ | ✅ | ❌ |
| Manage Inventory | ✅ | ❌ | ❌ | ❌ | ❌ |

### Implementación de Control de Roles

#### 1. Hooks Personalizados

```typescript
// hooks/useRole.ts
export function useRole() {
  const { user } = useAuth();
  const role = user?.user?.role;
  
  return {
    role,
    isAdmin: role === UserRole.ADMIN,
    hasPermission: (permission) => ROLE_PERMISSIONS[role]?.[permission],
    hasAnyRole: (roles) => roles.includes(role),
  };
}
```

#### 2. Componente de Protección de Rutas

```typescript
// components/auth/ProtectedRoute.tsx
<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SALES_REP]}>
  <DashboardPage />
</ProtectedRoute>
```

#### 3. Renderizado Condicional

```typescript
// components/auth/RoleGate.tsx
<RoleGate allowedRoles={[UserRole.ADMIN]}>
  <DeleteButton />
</RoleGate>
```

#### 4. Layouts por Rol

```typescript
// components/dashboard/RoleBasedDashboard.tsx
export function RoleBasedDashboard({ children }) {
  const { role } = useRole();
  
  switch (role) {
    case UserRole.ADMIN:
      return <AdminLayout>{children}</AdminLayout>;
    case UserRole.CUSTOMER:
      return <CustomerLayout>{children}</CustomerLayout>;
    // ...
  }
}
```

#### 5. API Protection

```typescript
// app/api/dashboard/users/route.ts
export async function GET(request) {
  const { user, role } = await getCurrentUser();
  
  if (role !== UserRole.ADMIN) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }
  
  // Proceed with query
}
```

---

## 🔌 Servicios y APIs

### Organización de Servicios

Los servicios están organizados por dominio:

```
services/
├── authentication/     # Login, logout, session
├── public/            # Servicios públicos (sin auth)
│   ├── products/
│   ├── categories/
│   └── cart/
└── dashboard/         # Servicios protegidos
    ├── stats/
    ├── users/
    ├── orders/
    ├── products/
    ├── reports/
    └── inventory/
```

### Patrón de Servicios

Cada servicio sigue este patrón:

```typescript
// services/dashboard/users/getUsers.ts
import { dashboardEndpoints } from '@/constants/api';
import type { User, PaginatedResponse } from '@/types';

export async function getUsers(params?: ListQueryParams) {
  try {
    const url = `${dashboardEndpoints.users.list}?${params}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

### Endpoints Centralizados

```typescript
// constants/api.ts
export const dashboardEndpoints = {
  users: {
    list: `${baseUrlDashboard}/users`,
    byId: (id: string) => `${baseUrlDashboard}/users/${id}`,
    updateRole: `${baseUrlDashboard}/users/role`,
  },
  orders: {
    list: `${baseUrlDashboard}/orders`,
    byId: (id: string) => `${baseUrlDashboard}/orders/${id}`,
  },
  // ...
};
```

### API Routes

Todas las rutas API siguen este patrón:

```typescript
// app/api/dashboard/users/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }
    
    // 2. Get user role
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    // 3. Authorization
    if (userData?.role !== 'admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
    
    // 4. Query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 5. Database query
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .range((page - 1) * limit, page * limit - 1);
    
    if (error) throw error;
    
    // 6. Response
    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
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

## 🧩 Componentes Clave

### 1. Custom Hooks

#### useAuth
```typescript
const { user, isLoading, isAuthenticated, refetch } = useAuth();
```

#### useRole
```typescript
const { 
  role, 
  isAdmin, 
  hasPermission, 
  hasAnyRole 
} = useRole();
```

### 2. Componentes de Autenticación

#### ProtectedRoute
- Protege rutas completas
- Redirige si no autorizado
- Muestra loading state

#### RoleGate
- Renderizado condicional
- No redirige
- Útil para UI elements

### 3. Layouts por Rol

Cada rol tiene su propio layout con navegación específica:

- **AdminLayout**: Acceso completo
- **SalesRepLayout**: Ventas y clientes
- **CustomerLayout**: Pedidos y perfil
- **DistributorLayout**: Distribución y reportes

### 4. RoleBasedDashboard

Componente inteligente que renderiza el layout correcto automáticamente.

---

## 🎨 Patrones de Diseño

### 1. Barrel Exports

```typescript
// services/dashboard/index.ts
export * from './stats/getStats';
export * from './users/getUsers';
// ...

// Uso
import { getDashboardStats, getUsers } from '@/services/dashboard';
```

### 2. TypeScript Types Centralizados

```typescript
// types/auth.types.ts
export enum UserRole { ... }
export interface User { ... }

// types/index.ts
export * from './auth.types';
export * from './api.types';
```

### 3. Separation of Concerns

- **Components**: Solo UI y presentación
- **Services**: Lógica de negocio y llamadas API
- **API Routes**: Autenticación, autorización, queries
- **Hooks**: Estado y efectos reutilizables

### 4. Error Handling

```typescript
try {
  const result = await service();
  if (!result.success) {
    // Handle error
  }
} catch (error) {
  // Handle exception
}
```

---

## ✅ Mejores Prácticas

### 1. Nunca Llamar Supabase Directamente desde el Frontend

❌ **Incorrecto**:
```typescript
// En un componente
const { data } = await supabase.from('users').select('*');
```

✅ **Correcto**:
```typescript
// En un componente
const { data } = await getUsers();

// En services/dashboard/users/getUsers.ts
export async function getUsers() {
  const response = await fetch(dashboardEndpoints.users.list);
  return await response.json();
}

// En app/api/dashboard/users/route.ts
const { data } = await supabase.from('users').select('*');
```

### 2. Usar Types en Todo el Código

```typescript
// Definir tipos
interface User {
  id: string;
  email: string;
  role: UserRole;
}

// Usar en funciones
export async function getUsers(): Promise<ApiResponse<User[]>> {
  // ...
}
```

### 3. Validar Roles en Múltiples Capas

```typescript
// 1. Frontend
<ProtectedRoute allowedRoles={[UserRole.ADMIN]}>

// 2. API Route
if (role !== UserRole.ADMIN) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}

// 3. Database (RLS)
CREATE POLICY "admin_only" ON users
FOR SELECT USING (auth.role() = 'admin');
```

### 4. Manejar Estados de Carga

```typescript
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getUsers();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchData();
}, []);
```

### 5. Usar Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

```typescript
// constants/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
```

### 6. Código Limpio y Documentado

```typescript
/**
 * Get all users with pagination
 * @param params - Query parameters
 * @returns Paginated list of users
 */
export async function getUsers(
  params?: ListQueryParams
): Promise<PaginatedResponse<User>> {
  // Implementation
}
```

---

## 🚀 Cómo Extender el Sistema

### Agregar un Nuevo Dominio al Dashboard

1. **Crear tipos** en `types/domain.types.ts`
2. **Crear endpoints** en `constants/api.ts`
3. **Crear servicios** en `services/dashboard/nuevo-dominio/`
4. **Crear API routes** en `app/api/dashboard/nuevo-dominio/`
5. **Actualizar layout** si necesita nueva navegación
6. **Crear páginas** en `app/dashboard/nuevo-dominio/`

### Agregar un Nuevo Rol

1. **Agregar enum** en `types/auth.types.ts`
2. **Definir permisos** en `ROLE_PERMISSIONS`
3. **Crear layout** en `components/dashboard/layouts/`
4. **Actualizar RoleBasedDashboard**
5. **Actualizar middleware** si es necesario

---

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**Última actualización**: Octubre 2024
**Versión**: 1.0.0

