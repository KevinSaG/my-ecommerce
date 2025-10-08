# ⚡ Quick Start - Arquitectura Multi-Rol ADELCA

## 🎯 Guía Rápida para Desarrolladores

Esta guía te permite entender y usar la arquitectura implementada en **5 minutos**.

---

## 📚 Documentación Disponible

| Documento | Cuándo Usarlo |
|-----------|---------------|
| **QUICK_START_ARQUITECTURA.md** ← Este | Empezar rápido (5 min) |
| **ARCHITECTURE.md** | Entender arquitectura completa |
| **USAGE_EXAMPLES.md** | Ver ejemplos de código |
| **DASHBOARD_STRUCTURE.md** | Ver estructura de archivos |
| **DIAGRAMA_ARQUITECTURA.md** | Ver diagramas visuales |
| **PROJECT_SUMMARY.md** | Resumen ejecutivo |

---

## 🚀 Cómo Usar la Arquitectura (3 Minutos)

### 1. Proteger una Página Completa

```typescript
// app/dashboard/admin/page.tsx
import { ProtectedRoute } from '@/components/auth';
import { UserRole } from '@/types';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <h1>Solo Admins Pueden Ver Esto</h1>
    </ProtectedRoute>
  );
}
```

### 2. Ocultar un Botón por Rol

```typescript
// components/ProductCard.tsx
import { RoleGate } from '@/components/auth';
import { UserRole } from '@/types';

export function ProductCard() {
  return (
    <div>
      <h3>Producto XYZ</h3>
      
      {/* Todos lo ven */}
      <button>Ver Detalles</button>
      
      {/* Solo admin lo ve */}
      <RoleGate allowedRoles={[UserRole.ADMIN]}>
        <button>Eliminar</button>
      </RoleGate>
    </div>
  );
}
```

### 3. Verificar Rol en Código

```typescript
// components/Dashboard.tsx
import { useRole } from '@/hooks';

export function Dashboard() {
  const { isAdmin, hasPermission } = useRole();

  return (
    <div>
      {isAdmin && <p>Eres administrador</p>}
      {hasPermission('canViewReports') && <button>Ver Reportes</button>}
    </div>
  );
}
```

### 4. Obtener Datos del Usuario

```typescript
// components/Profile.tsx
import { useAuth } from '@/hooks';

export function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <p>Email: {user?.user?.email}</p>
      <p>Nombre: {user?.profile?.first_name}</p>
    </div>
  );
}
```

### 5. Llamar a un Servicio

```typescript
// components/UsersList.tsx
import { useEffect, useState } from 'react';
import { getUsers } from '@/services/dashboard';

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const result = await getUsers({ page: 1, limit: 10 });
      if (result.success) {
        setUsers(result.data);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  );
}
```

---

## 🎭 Roles Disponibles (1 Minuto)

```typescript
import { UserRole } from '@/types';

// 5 roles en el sistema:
UserRole.ADMIN        // 👑 Acceso completo
UserRole.SALES_REP    // 📞 Ventas y clientes
UserRole.CUSTOMER     // 🛒 Compras propias
UserRole.DISTRIBUTOR  // 🚚 Distribución
UserRole.GUEST        // 👤 Solo lectura
```

### Verificar Roles

```typescript
import { useRole } from '@/hooks';

const { 
  role,           // Rol actual del usuario
  isAdmin,        // true si es admin
  isSalesRep,     // true si es sales_rep
  isCustomer,     // true si es customer
  isDistributor,  // true si es distributor
  hasPermission,  // Función para verificar permisos
  hasAnyRole,     // Función para verificar múltiples roles
  hasRole,        // Función para verificar un rol específico
} = useRole();

// Ejemplos:
if (isAdmin) { /* ... */ }
if (hasPermission('canManageProducts')) { /* ... */ }
if (hasAnyRole([UserRole.ADMIN, UserRole.SALES_REP])) { /* ... */ }
```

---

## 📂 Dónde Está Cada Cosa (2 Minutos)

### Frontend

```
app/
├── page.tsx                      # Home pública
├── productos/                    # Catálogo público
├── signin/ signup/               # Autenticación
└── dashboard/                    # Dashboard protegido
    ├── layout.tsx                # Check de auth
    ├── page.tsx                  # Dashboard home
    └── [modulo]/                 # Módulos específicos
```

### Servicios

```
services/
├── authentication/               # Login, signup, session
├── public/                       # Sin autenticación
│   ├── products/
│   ├── categories/
│   └── cart/
└── dashboard/                    # Con autenticación
    ├── stats/
    ├── profile/
    ├── users/
    ├── orders/
    ├── products/
    ├── reports/
    └── inventory/
```

### Componentes

```
components/
├── ui/                           # shadcn/ui
├── auth/                         # ProtectedRoute, RoleGate
├── dashboard/                    # Layouts por rol
│   └── layouts/
│       ├── AdminLayout.tsx
│       ├── SalesRepLayout.tsx
│       ├── CustomerLayout.tsx
│       └── DistributorLayout.tsx
├── Navbar.tsx
└── DashboardSidebar.tsx
```

### Hooks y Tipos

```
hooks/
├── useAuth.ts                    # Hook de autenticación
└── useRole.ts                    # Hook de roles

types/
├── auth.types.ts                 # UserRole, User, etc.
├── api.types.ts                  # ApiResponse, etc.
└── domain.types.ts               # Product, Order, etc.
```

---

## 🔧 Casos de Uso Comunes

### 1. Agregar un Nuevo Módulo al Dashboard

```bash
# 1. Crear tipo
# types/domain.types.ts
export interface Invoice { id: string; amount: number; }

# 2. Agregar endpoint
# constants/api.ts
dashboardEndpoints.invoices = { list: '...' }

# 3. Crear servicio
# services/dashboard/invoices/getInvoices.ts
export async function getInvoices() { ... }

# 4. Exportar
# services/dashboard/index.ts
export * from './invoices/getInvoices';

# 5. Crear API route
# app/api/dashboard/invoices/route.ts
export async function GET() { ... }

# 6. Crear página
# app/dashboard/facturas/page.tsx
export default function InvoicesPage() { ... }
```

### 2. Crear un Formulario Protegido

```typescript
import { ProtectedRoute } from '@/components/auth';
import { createProduct } from '@/services/dashboard';
import { UserRole } from '@/types';
import { useState } from 'react';

export default function CreateProductPage() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createProduct(formData);
    if (result.success) {
      alert('Producto creado!');
    }
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
      </form>
    </ProtectedRoute>
  );
}
```

### 3. Mostrar Datos con Loading State

```typescript
import { useEffect, useState } from 'react';
import { getOrders } from '@/services/dashboard';
import { Loader2 } from 'lucide-react';

export function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      const result = await getOrders();
      
      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.error);
      }
      
      setIsLoading(false);
    }
    
    fetchOrders();
  }, []);

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>{order.order_number}</div>
      ))}
    </div>
  );
}
```

---

## 🎯 Patrones a Seguir

### ✅ DO (Hacer)

```typescript
// ✅ Usar servicios para llamar APIs
import { getUsers } from '@/services/dashboard';
const users = await getUsers();

// ✅ Usar tipos de TypeScript
import type { User } from '@/types';
const user: User = ...;

// ✅ Usar hooks para verificar roles
const { isAdmin } = useRole();

// ✅ Usar componentes de seguridad
<ProtectedRoute allowedRoles={[UserRole.ADMIN]}>

// ✅ Manejar estados de loading y error
if (isLoading) return <Loader />;
if (error) return <Error />;
```

### ❌ DON'T (No Hacer)

```typescript
// ❌ NO llamar Supabase directamente desde componentes
const { data } = await supabase.from('users').select('*');

// ❌ NO hardcodear URLs de API
fetch('http://localhost:3000/api/users')

// ❌ NO verificar roles manualmente en cada componente
if (user.role === 'admin') { ... }

// ❌ NO repetir código de auth en cada página
const user = await supabase.auth.getUser();
if (!user) redirect('/signin');

// ❌ NO usar 'any' en TypeScript
const data: any = ...;
```

---

## 🔥 Atajos Útiles

### Importaciones Comunes

```typescript
// Hooks
import { useAuth, useRole } from '@/hooks';

// Componentes de seguridad
import { ProtectedRoute, RoleGate } from '@/components/auth';

// Tipos
import { UserRole, type User, type ApiResponse } from '@/types';

// Servicios
import { 
  getDashboardStats,
  getUserProfile,
  getUsers,
  getOrders,
} from '@/services/dashboard';

// UI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
```

### Snippets Útiles

```typescript
// Verificar autenticación
const { isAuthenticated, isLoading } = useAuth();
if (isLoading) return <Loader />;
if (!isAuthenticated) return <SignIn />;

// Verificar rol específico
const { hasRole } = useRole();
if (!hasRole(UserRole.ADMIN)) return null;

// Verificar múltiples roles
const { hasAnyRole } = useRole();
const canView = hasAnyRole([UserRole.ADMIN, UserRole.SALES_REP]);

// Llamar servicio con manejo de errores
const result = await getUsers();
if (!result.success) {
  alert(result.error);
  return;
}
setUsers(result.data);
```

---

## 🐛 Debugging

### Ver rol actual del usuario

```typescript
import { useRole } from '@/hooks';

export function Debug() {
  const { role, permissions } = useRole();
  
  return (
    <div>
      <p>Rol: {role}</p>
      <pre>{JSON.stringify(permissions, null, 2)}</pre>
    </div>
  );
}
```

### Ver sesión completa

```typescript
import { useAuth } from '@/hooks';

export function DebugSession() {
  const { user } = useAuth();
  
  return (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  );
}
```

---

## 📞 Ayuda

### Si algo no funciona:

1. **Verificar que estás autenticado**: `const { isAuthenticated } = useAuth()`
2. **Verificar tu rol**: `const { role } = useRole()`
3. **Ver errores en consola**: `console.error(...)`
4. **Revisar documentación**: Ver archivos MD

### Archivos importantes:

- `types/auth.types.ts` → Definición de roles y permisos
- `constants/api.ts` → URLs de todos los endpoints
- `services/dashboard/index.ts` → Todos los servicios disponibles

---

## ✅ Checklist Rápido

Antes de crear un nuevo componente protegido:

- [ ] ¿Importé los tipos necesarios de `@/types`?
- [ ] ¿Usé `ProtectedRoute` o `RoleGate` si necesito protección?
- [ ] ¿Usé `useAuth()` o `useRole()` si necesito datos del usuario?
- [ ] ¿Llamé a servicios de `@/services/*` en lugar de fetch directo?
- [ ] ¿Manejé estados de loading y error?
- [ ] ¿Usé tipos de TypeScript en lugar de `any`?

---

**¡Listo! Ahora puedes usar la arquitectura de forma profesional. 🚀**

Para más detalles, consulta `ARCHITECTURE.md` o `USAGE_EXAMPLES.md`.

