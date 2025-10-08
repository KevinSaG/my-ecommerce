# 🎭 Dashboards Dinámicos por Rol - Explicación Completa

## 🎯 Respuesta Rápida

**NO, hay MÚLTIPLES dashboards, uno para cada rol.**

El sistema automáticamente detecta el rol del usuario y muestra el dashboard correspondiente con:

- ✅ Navegación específica para cada rol
- ✅ Opciones diferentes según permisos
- ✅ UI personalizada por tipo de usuario

---

## 🎨 Cómo Funciona

### 1. El Usuario Inicia Sesión

```
Usuario → SignIn → Supabase Auth
                    ├─→ Crea sesión
                    └─→ Asigna rol (admin, sales_rep, customer, distributor, guest)
```

### 2. Accede al Dashboard

```
Usuario navega a /dashboard
         │
         ▼
app/dashboard/layout.tsx (archivo actualizado ✅)
         │
         └─→ <RoleBasedDashboard>
                 │
                 └─→ useRole() detecta el rol del usuario
                         │
          ┌──────────────┼──────────────┬──────────────┐
          │              │              │              │
          ▼              ▼              ▼              ▼
    role='admin'   role='sales_rep'  role='customer' role='distributor'
          │              │              │              │
          ▼              ▼              ▼              ▼
   AdminLayout    SalesRepLayout  CustomerLayout  DistributorLayout
```

### 3. Se Renderiza el Dashboard Específico

Cada layout tiene su propia navegación y opciones:

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD                                                 │
├─────────────────────────────────────────────────────────────────┤
│  📊 Dashboard                                                    │
│  👥 Usuarios          ← Solo admin puede ver                    │
│  📦 Productos                                                    │
│  🛒 Pedidos                                                      │
│  📦 Inventario        ← Solo admin puede ver                    │
│  📈 Reportes                                                     │
│  ⚙️  Configuración     ← Solo admin puede ver                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CUSTOMER DASHBOARD                                              │
├─────────────────────────────────────────────────────────────────┤
│  📊 Dashboard                                                    │
│  🛒 Mis Pedidos       ← Solo ve sus propios pedidos             │
│  ❤️  Favoritos                                                   │
│  📄 Cotizaciones                                                 │
│  👤 Mi Perfil                                                    │
│                                                                  │
│  NO ve: Usuarios, Inventario, Configuración                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Arquitectura Implementada

### Archivos Clave

```
app/
└── dashboard/
    └── layout.tsx                    ✅ ACTUALIZADO (usa RoleBasedDashboard)

components/
└── dashboard/
    ├── RoleBasedDashboard.tsx        ✅ Componente inteligente
    └── layouts/
        ├── AdminLayout.tsx           ✅ Dashboard para admins
        ├── SalesRepLayout.tsx        ✅ Dashboard para vendedores
        ├── CustomerLayout.tsx        ✅ Dashboard para clientes
        └── DistributorLayout.tsx     ✅ Dashboard para distribuidores
```

### Código del Layout Principal

```typescript
// app/dashboard/layout.tsx (ACTUALIZADO ✅)
"use client";

import { RoleBasedDashboard } from "@/components/dashboard";

export default function DashboardLayout({ children }) {
  return <RoleBasedDashboard>{children}</RoleBasedDashboard>;
}
```

### Código del RoleBasedDashboard

```typescript
// components/dashboard/RoleBasedDashboard.tsx
'use client';

import { useRole } from '@/hooks';
import { UserRole } from '@/types';
import {
  AdminLayout,
  SalesRepLayout,
  CustomerLayout,
  DistributorLayout,
} from './layouts';

export function RoleBasedDashboard({ children }) {
  const { role } = useRole();

  // Renderiza el layout correcto según el rol
  switch (role) {
    case UserRole.ADMIN:
      return <AdminLayout>{children}</AdminLayout>;

    case UserRole.SALES_REP:
      return <SalesRepLayout>{children}</SalesRepLayout>;

    case UserRole.CUSTOMER:
      return <CustomerLayout>{children}</CustomerLayout>;

    case UserRole.DISTRIBUTOR:
      return <DistributorLayout>{children}</DistributorLayout>;

    default:
      return <div>Acceso Denegado</div>;
  }
}

┌─────────────────────────────────────────────────────────────┐
│           4 DASHBOARDS DIFERENTES (Uno por Rol)             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👑 ADMIN                                                   │
│  ├─ 7 opciones en el sidebar                               │
│  ├─ Gestión completa de usuarios                           │
│  ├─ Control de inventario                                  │
│  └─ Configuración del sistema                              │
│                                                             │
│  📞 SALES REP (Vendedor)                                    │
│  ├─ 4 opciones enfocadas en ventas                         │
│  ├─ Gestión de pedidos y clientes                          │
│  └─ Reportes de ventas                                     │
│                                                             │
│  🛒 CUSTOMER (Cliente)                                      │
│  ├─ 5 opciones para sus compras                            │
│  ├─ Solo ve sus propios pedidos                            │
│  └─ No puede ver usuarios ni inventario                    │
│                                                             │
│  🚚 DISTRIBUTOR (Distribuidor)                              │
│  ├─ 5 opciones para distribución                           │
│  ├─ Gestión de entregas                                    │
│  └─ Reportes de distribución                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘

```

---

## 🎭 Navegación por Rol

### 👑 Admin (Acceso Completo)

```typescript
const adminNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Usuarios", href: "/dashboard/usuarios", icon: Users },
  { title: "Productos", href: "/dashboard/productos", icon: Package },
  { title: "Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
  { title: "Inventario", href: "/dashboard/inventario", icon: Warehouse },
  { title: "Reportes", href: "/dashboard/reportes", icon: BarChart3 },
  { title: "Configuración", href: "/dashboard/configuracion", icon: Settings },
];
```

### 📞 Sales Rep (Ventas)

```typescript
const salesRepNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
  { title: "Clientes", href: "/dashboard/clientes", icon: Users },
  { title: "Mis Ventas", href: "/dashboard/mis-ventas", icon: BarChart3 },
];
```

### 🛒 Customer (Cliente)

```typescript
const customerNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Mis Pedidos", href: "/dashboard/mis-pedidos", icon: ShoppingCart },
  { title: "Favoritos", href: "/dashboard/favoritos", icon: Heart },
  { title: "Cotizaciones", href: "/dashboard/cotizaciones", icon: FileText },
  { title: "Mi Perfil", href: "/dashboard/perfil", icon: User },
];
```

### 🚚 Distributor (Distribuidor)

```typescript
const distributorNavigation = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Pedidos", href: "/dashboard/pedidos", icon: ShoppingCart },
  { title: "Productos", href: "/dashboard/productos", icon: Package },
  { title: "Entregas", href: "/dashboard/entregas", icon: Truck },
  { title: "Reportes", href: "/dashboard/reportes", icon: BarChart3 },
];
```

---

## 🔍 Ejemplo Práctico

### Usuario Admin se Logea

```
1. Kevin (admin) hace login
   └─→ Email: kevin@adelca.com
   └─→ Supabase asigna: role = "admin"

2. Kevin navega a /dashboard
   └─→ RoleBasedDashboard detecta role = "admin"
   └─→ Renderiza AdminLayout

3. Kevin ve su dashboard con:
   ├─→ Usuarios (gestionar todos los usuarios)
   ├─→ Productos (crear, editar, eliminar)
   ├─→ Pedidos (ver todos los pedidos)
   ├─→ Inventario (gestionar stock)
   ├─→ Reportes (ver analytics)
   └─→ Configuración (ajustes del sistema)
```

### Usuario Cliente se Logea

```
1. María (customer) hace login
   └─→ Email: maria@empresa.com
   └─→ Supabase asigna: role = "customer"

2. María navega a /dashboard
   └─→ RoleBasedDashboard detecta role = "customer"
   └─→ Renderiza CustomerLayout

3. María ve su dashboard con:
   ├─→ Mis Pedidos (solo sus pedidos)
   ├─→ Favoritos (productos guardados)
   ├─→ Cotizaciones (sus cotizaciones)
   └─→ Mi Perfil (su información)

4. María NO ve:
   ✖ Usuarios
   ✖ Inventario
   ✖ Configuración
   ✖ Pedidos de otros clientes
```

---

## ✅ Ventajas de Este Sistema

### 1. **Seguridad Multi-Capa**

```
Frontend:  RoleBasedDashboard muestra solo opciones permitidas
           ↓
Middleware: Verifica autenticación antes de renderizar
           ↓
API:       Valida rol antes de ejecutar acciones
           ↓
Database:  RLS policies verifican permisos a nivel de datos
```

### 2. **UX Optimizada**

- Cada usuario ve solo lo relevante para él
- No hay opciones confusas o inaccesibles
- Navegación limpia y enfocada

### 3. **Mantenibilidad**

- Cada layout es independiente
- Agregar nuevo rol = crear nuevo layout
- Modificar navegación de un rol no afecta a otros

### 4. **Escalabilidad**

```typescript
// Agregar nuevo rol es fácil:

// 1. Agregar enum
enum UserRole {
  // ...existentes
  WAREHOUSE_MANAGER = 'warehouse_manager', // ✅ Nuevo
}

// 2. Crear layout
// components/dashboard/layouts/WarehouseManagerLayout.tsx
export function WarehouseManagerLayout({ children }) {
  // Navegación específica
}

// 3. Agregar a RoleBasedDashboard
case UserRole.WAREHOUSE_MANAGER:
  return <WarehouseManagerLayout>{children}</WarehouseManagerLayout>;
```

---

## 🎯 Comparación: Antes vs Ahora

### ❌ Antes (Dashboard Único)

```
Todos los usuarios veían:
├─ Dashboard
├─ Productos
└─ Ver Tienda

Problemas:
✖ Admin no puede gestionar usuarios
✖ Cliente ve opciones que no puede usar
✖ No hay diferenciación por rol
```

### ✅ Ahora (Dashboards Dinámicos)

```
Admin ve:
├─ Dashboard
├─ Usuarios
├─ Productos
├─ Pedidos
├─ Inventario
├─ Reportes
└─ Configuración

Cliente ve:
├─ Dashboard
├─ Mis Pedidos
├─ Favoritos
├─ Cotizaciones
└─ Mi Perfil

Beneficios:
✅ Cada rol ve solo lo relevante
✅ UX personalizada
✅ Seguridad mejorada
```

---

## 🔧 Cómo Probar

### 1. Como Admin

```typescript
// Crear usuario admin en Supabase:
UPDATE users SET role = 'admin' WHERE email = 'tu-email@admin.com';

// Iniciar sesión y ver:
- Sidebar con 7 opciones
- Acceso completo
```

### 2. Como Cliente

```typescript
// Crear usuario customer en Supabase:
UPDATE users SET role = 'customer' WHERE email = 'tu-email@cliente.com';

// Iniciar sesión y ver:
- Sidebar con 5 opciones
- Solo funciones de cliente
```

### 3. Verificar Rol Actual

```typescript
// Crear componente de debug:
import { useRole } from "@/hooks";

export function DebugRole() {
  const { role } = useRole();
  return <div>Tu rol: {role}</div>;
}
```

---

## 📊 Resumen

| Pregunta                        | Respuesta                            |
| ------------------------------- | ------------------------------------ |
| **¿Hay un solo dashboard?**     | ❌ NO - Hay 4 dashboards diferentes  |
| **¿Se decide automáticamente?** | ✅ SÍ - Según el rol del usuario     |
| **¿Dónde se configura el rol?** | En `public.users.role` (Supabase)    |
| **¿Se puede cambiar el rol?**   | ✅ SÍ - Admin puede actualizar roles |
| **¿Es seguro?**                 | ✅ SÍ - 4 capas de validación        |
| **¿Es fácil agregar roles?**    | ✅ SÍ - 3 pasos simples              |

---

## 🎊 Conclusión

**Tienes un sistema de dashboards dinámicos completamente funcional:**

✅ **4 layouts diferentes** (Admin, SalesRep, Customer, Distributor)  
✅ **Detección automática** de rol via `useRole()` hook  
✅ **Navegación personalizada** para cada tipo de usuario  
✅ **Seguridad multi-capa** (Frontend + Middleware + API + DB)  
✅ **Fácil de extender** (agregar nuevo rol en minutos)  
✅ **UX optimizada** (cada usuario ve solo lo relevante)

**El sistema está listo para producción y puede crecer con tu negocio.** 🚀

---

**Última actualización**: Octubre 2024  
**Archivo actualizado**: `app/dashboard/layout.tsx` ✅
