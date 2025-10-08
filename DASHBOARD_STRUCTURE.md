# 🎯 Estructura del Dashboard Multi-Rol - ADELCA E-Commerce

## 📊 Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Client Side)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Pages    │  │ Components │  │   Hooks    │           │
│  │            │  │            │  │            │           │
│  │  • Home    │  │  • Auth    │  │  • useAuth │           │
│  │  • Products│  │  • Dashboard│  │  • useRole │           │
│  │  • Dashboard│  │  • UI      │  │            │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
│        │               │               │                   │
│        └───────────────┴───────────────┘                   │
│                        │                                   │
└────────────────────────┼───────────────────────────────────┘
                         │
┌────────────────────────▼───────────────────────────────────┐
│                  SERVICES LAYER                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐      │
│  │ Public      │  │ Auth        │  │  Dashboard   │      │
│  │             │  │             │  │              │      │
│  │ • Products  │  │ • SignIn    │  │  • Stats     │      │
│  │ • Cart      │  │ • SignUp    │  │  • Users     │      │
│  │ • Categories│  │ • Session   │  │  • Orders    │      │
│  │             │  │             │  │  • Reports   │      │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘      │
│         │                │                │              │
│         └────────────────┴────────────────┘              │
│                          │                               │
└──────────────────────────┼───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│                 API ROUTES (Server Side)                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  /api/products     /api/auth      /api/dashboard        │
│  /api/cart         /api/orders    /api/categories       │
│                                                          │
│  [Auth Check] → [Role Check] → [Query] → [Response]     │
│                                                          │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│                    SUPABASE                              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  PostgreSQL + Auth + Storage + Realtime                  │
│  Row Level Security (RLS) + Triggers                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 📂 Estructura de Archivos Detallada

```
my-ecommerce/
│
├── 📱 app/                                    # Next.js App Router
│   │
│   ├── 🌐 (public)/                          # Rutas públicas (sin auth)
│   │   ├── page.tsx                          # Home
│   │   ├── productos/
│   │   │   ├── page.tsx                      # Catálogo
│   │   │   └── [id]/page.tsx                 # Detalle producto
│   │   ├── categorias/
│   │   │   └── page.tsx                      # Categorías
│   │   └── carrito/
│   │       └── page.tsx                      # Carrito
│   │
│   ├── 🔐 (auth)/                            # Rutas de autenticación
│   │   ├── signin/
│   │   │   └── page.tsx                      # Iniciar sesión
│   │   └── signup/
│   │       └── page.tsx                      # Registrarse
│   │
│   ├── 📊 dashboard/                         # Dashboard (protegido)
│   │   ├── layout.tsx                        # ✅ Layout con auth check
│   │   ├── page.tsx                          # ✅ Dashboard home
│   │   │
│   │   ├── 👥 usuarios/                      # ADMIN ONLY
│   │   │   ├── page.tsx                      # Lista de usuarios
│   │   │   └── [id]/page.tsx                 # Detalle usuario
│   │   │
│   │   ├── 📦 productos/                     # ADMIN/SALES_REP
│   │   │   ├── page.tsx                      # ✅ Lista productos (placeholder)
│   │   │   ├── crear/page.tsx                # Crear producto
│   │   │   └── [id]/
│   │   │       ├── page.tsx                  # Ver producto
│   │   │       └── editar/page.tsx           # Editar producto
│   │   │
│   │   ├── 🛒 pedidos/                       # Role-based access
│   │   │   ├── page.tsx                      # Lista pedidos
│   │   │   └── [id]/page.tsx                 # Detalle pedido
│   │   │
│   │   ├── 📊 reportes/                      # ADMIN/SALES_REP/DISTRIBUTOR
│   │   │   ├── page.tsx                      # Reportes generales
│   │   │   ├── ventas/page.tsx               # Reporte ventas
│   │   │   ├── productos/page.tsx            # Reporte productos
│   │   │   └── clientes/page.tsx             # Reporte clientes
│   │   │
│   │   ├── 📦 inventario/                    # ADMIN ONLY
│   │   │   ├── page.tsx                      # Gestión inventario
│   │   │   └── alertas/page.tsx              # Alertas stock bajo
│   │   │
│   │   ├── ⚙️ configuracion/                 # ADMIN ONLY
│   │   │   └── page.tsx                      # Configuración sistema
│   │   │
│   │   └── 👤 perfil/                        # ALL ROLES
│   │       └── page.tsx                      # Perfil usuario
│   │
│   └── 🔌 api/                               # API Routes
│       │
│       ├── auth/                             # Autenticación
│       │   ├── signin-email/route.ts         # ✅ Login email/pass
│       │   ├── signup-otp/route.ts           # ✅ Registro con OTP
│       │   ├── verify-otp/route.ts           # ✅ Verificar OTP
│       │   ├── signin-google/route.ts        # ✅ Google OAuth
│       │   ├── signout/route.ts              # ✅ Cerrar sesión
│       │   └── session/route.ts              # ✅ Obtener sesión
│       │
│       ├── products/                         # Productos públicos
│       │   ├── route.ts                      # ✅ Lista productos
│       │   ├── [id]/route.ts                 # ✅ Producto por ID
│       │   ├── search/route.ts               # ✅ Búsqueda
│       │   ├── recent/route.ts               # ✅ Recientes
│       │   ├── viewed/route.ts               # ✅ Más vistos
│       │   ├── quoted/route.ts               # ✅ Más cotizados
│       │   ├── featured/route.ts             # ✅ Destacados
│       │   └── by-category/route.ts          # ✅ Por categoría
│       │
│       ├── categories/                       # Categorías
│       │   └── route.ts                      # ✅ Lista categorías
│       │
│       ├── cart/                             # Carrito
│       │   ├── route.ts                      # ✅ Obtener carrito
│       │   ├── add/route.ts                  # ✅ Agregar item
│       │   ├── update/route.ts               # ✅ Actualizar cantidad
│       │   ├── remove/route.ts               # ✅ Eliminar item
│       │   ├── clear/route.ts                # ✅ Limpiar carrito
│       │   └── count/route.ts                # ✅ Contar items
│       │
│       └── dashboard/                        # Dashboard APIs
│           ├── stats/route.ts                # ✅ Estadísticas
│           ├── profile/route.ts              # ✅ Perfil usuario
│           │
│           ├── users/                        # 🆕 Gestión usuarios
│           │   ├── route.ts                  # Lista usuarios
│           │   ├── [id]/route.ts             # Usuario por ID
│           │   ├── role/route.ts             # Actualizar rol
│           │   └── deactivate/route.ts       # Desactivar usuario
│           │
│           ├── orders/                       # 🆕 Gestión pedidos
│           │   ├── route.ts                  # Lista pedidos
│           │   ├── [id]/route.ts             # Pedido por ID
│           │   └── status/route.ts           # Actualizar estado
│           │
│           ├── products/                     # 🆕 Gestión productos (dashboard)
│           │   ├── route.ts                  # Lista productos
│           │   ├── create/route.ts           # Crear producto
│           │   ├── update/route.ts           # Actualizar producto
│           │   └── delete/route.ts           # Eliminar producto
│           │
│           ├── reports/                      # 🆕 Reportes
│           │   ├── sales/route.ts            # Reporte ventas
│           │   ├── products/route.ts         # Reporte productos
│           │   └── customers/route.ts        # Reporte clientes
│           │
│           └── inventory/                    # 🆕 Inventario
│               ├── route.ts                  # Lista inventario
│               ├── update/route.ts           # Actualizar stock
│               └── low-stock/route.ts        # Alertas stock bajo
│
├── 🧩 components/                            # Componentes React
│   │
│   ├── ui/                                   # shadcn/ui components
│   │   ├── button.tsx                        # ✅
│   │   ├── card.tsx                          # ✅
│   │   ├── input.tsx                         # ✅
│   │   ├── sheet.tsx                         # ✅
│   │   ├── badge.tsx                         # ✅
│   │   └── ...                               # Otros componentes UI
│   │
│   ├── 🔐 auth/                              # 🆕 Componentes autenticación
│   │   ├── ProtectedRoute.tsx                # HOC proteger rutas
│   │   ├── RoleGate.tsx                      # Renderizado por rol
│   │   └── index.ts                          # Barrel export
│   │
│   ├── 📊 dashboard/                         # 🆕 Componentes dashboard
│   │   ├── layouts/                          # Layouts por rol
│   │   │   ├── AdminLayout.tsx               # Layout admin
│   │   │   ├── SalesRepLayout.tsx            # Layout vendedor
│   │   │   ├── CustomerLayout.tsx            # Layout cliente
│   │   │   ├── DistributorLayout.tsx         # Layout distribuidor
│   │   │   └── index.ts                      # Barrel export
│   │   ├── RoleBasedDashboard.tsx            # Dashboard dinámico
│   │   └── index.ts                          # Barrel export
│   │
│   ├── Navbar.tsx                            # ✅ Barra navegación
│   ├── DashboardSidebar.tsx                  # ✅ Sidebar dashboard (flexible)
│   ├── CartIcon.tsx                          # ✅ Icono carrito
│   ├── CartDrawer.tsx                        # ✅ Drawer carrito
│   ├── AddToCartButton.tsx                   # ✅ Botón agregar carrito
│   ├── HeroBanner.tsx                        # ✅ Banner principal
│   ├── CategoryGrid.tsx                      # ✅ Grid categorías
│   └── ProductCarousel.tsx                   # ✅ Carrusel productos
│
├── 🔧 services/                              # Capa de servicios
│   │
│   ├── authentication/                       # ✅ Servicios autenticación
│   │   └── authService.ts                    # Login, signup, session
│   │
│   ├── public/                               # Servicios públicos
│   │   ├── products/
│   │   │   └── getData.ts                    # ✅ Servicios productos
│   │   ├── categories/
│   │   │   └── getData.ts                    # ✅ Servicios categorías
│   │   └── cart/
│   │       └── cartService.ts                # ✅ Servicios carrito
│   │
│   └── dashboard/                            # 🆕 Servicios dashboard (modular)
│       ├── stats/
│       │   └── getStats.ts                   # ✅ Estadísticas
│       ├── profile/
│       │   └── getProfile.ts                 # ✅ Perfil
│       ├── users/
│       │   └── getUsers.ts                   # 🆕 Usuarios
│       ├── orders/
│       │   └── getOrders.ts                  # 🆕 Pedidos
│       ├── products/
│       │   └── getProducts.ts                # 🆕 Productos (dashboard)
│       ├── reports/
│       │   └── getReports.ts                 # 🆕 Reportes
│       ├── inventory/
│       │   └── getInventory.ts               # 🆕 Inventario
│       └── index.ts                          # ✅ Barrel export
│
├── 🎣 hooks/                                 # 🆕 Custom React Hooks
│   ├── useAuth.ts                            # Hook autenticación
│   ├── useRole.ts                            # Hook control roles
│   └── index.ts                              # Barrel export
│
├── 📝 types/                                 # 🆕 TypeScript Types
│   ├── auth.types.ts                         # Tipos autenticación + roles
│   ├── api.types.ts                          # Tipos API responses
│   ├── domain.types.ts                       # Tipos dominio (Product, Order, etc.)
│   └── index.ts                              # Barrel export
│
├── 🔧 constants/                             # Constantes
│   └── api.ts                                # ✅ URLs API (expandido)
│
├── 📚 lib/                                   # Utilidades
│   ├── supabase/
│   │   ├── client.ts                         # ✅ Cliente browser
│   │   ├── server.ts                         # ✅ Cliente server
│   │   └── middleware.ts                     # ✅ Middleware
│   └── utils.ts                              # ✅ Utilidades
│
├── 📖 Documentación/                         # 🆕 Documentación
│   ├── ARCHITECTURE.md                       # 🆕 Arquitectura completa
│   ├── USAGE_EXAMPLES.md                     # 🆕 Ejemplos prácticos
│   ├── DASHBOARD_STRUCTURE.md                # 🆕 Este archivo
│   ├── SUPABASE_AUTH_SETUP.md                # ✅ Setup autenticación
│   └── README.md                             # ✅ Readme general
│
├── middleware.ts                             # ✅ Next.js middleware
├── tailwind.config.ts                        # ✅ Config Tailwind
├── tsconfig.json                             # ✅ Config TypeScript
└── package.json                              # ✅ Dependencias

✅ = Implementado
🆕 = Nuevo (en esta arquitectura)
```

---

## 🎭 Sistema de Roles y Permisos

### Roles Disponibles

```typescript
┌─────────────────────────────────────────────────────────┐
│ ROLES                                                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  👑 ADMIN           - Acceso total al sistema           │
│  📞 SALES_REP       - Gestión de ventas y clientes      │
│  🛒 CUSTOMER        - Compras y pedidos propios         │
│  🚚 DISTRIBUTOR     - Distribución y entregas           │
│  👤 GUEST           - Solo lectura (catálogo)           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Navegación por Rol

```
┌─────────────────────────────────────────────────────┐
│ ADMIN LAYOUT                                        │
├─────────────────────────────────────────────────────┤
│  📊 Dashboard                                        │
│  👥 Usuarios                                         │
│  📦 Productos                                        │
│  🛒 Pedidos                                          │
│  📦 Inventario                                       │
│  📈 Reportes                                         │
│  ⚙️  Configuración                                   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ SALES REP LAYOUT                                    │
├─────────────────────────────────────────────────────┤
│  📊 Dashboard                                        │
│  🛒 Pedidos                                          │
│  👥 Clientes                                         │
│  📈 Mis Ventas                                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ CUSTOMER LAYOUT                                     │
├─────────────────────────────────────────────────────┤
│  📊 Dashboard                                        │
│  🛒 Mis Pedidos                                      │
│  ❤️  Favoritos                                       │
│  📄 Cotizaciones                                     │
│  👤 Mi Perfil                                        │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ DISTRIBUTOR LAYOUT                                  │
├─────────────────────────────────────────────────────┤
│  📊 Dashboard                                        │
│  🛒 Pedidos                                          │
│  📦 Productos                                        │
│  🚚 Entregas                                         │
│  📈 Reportes                                         │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos Completo

### Ejemplo: Crear un Producto (Admin)

```
1️⃣ USER ACTION
   │
   └─→ Click "Crear Producto" en dashboard
       │
       └─→ Llena formulario
           │
           └─→ Click "Guardar"

2️⃣ FRONTEND VALIDATION
   │
   └─→ Valida campos requeridos
       │
       └─→ Verifica rol (useRole hook)
           │
           └─→ ✅ isAdmin === true

3️⃣ SERVICE LAYER
   │
   └─→ services/dashboard/products/getProducts.ts
       │
       └─→ createProduct(productData)
           │
           └─→ fetch(dashboardEndpoints.products.create)

4️⃣ API ROUTE
   │
   └─→ app/api/dashboard/products/create/route.ts
       │
       ├─→ Auth Check (supabase.auth.getUser())
       │   └─→ ✅ Usuario autenticado
       │
       ├─→ Role Check (query users table)
       │   └─→ ✅ role === 'admin'
       │
       ├─→ Validation (zod/joi)
       │   └─→ ✅ Datos válidos
       │
       └─→ Database Query
           └─→ supabase.from('products').insert(data)

5️⃣ DATABASE (SUPABASE)
   │
   ├─→ Row Level Security (RLS)
   │   └─→ ✅ Policy allows insert for admin
   │
   ├─→ Insert Product
   │   └─→ ✅ Product created
   │
   └─→ Triggers (if any)
       └─→ Update related tables

6️⃣ RESPONSE
   │
   └─→ API returns { success: true, data: product }
       │
       └─→ Service returns result
           │
           └─→ Component updates state
               │
               └─→ UI shows success message
                   │
                   └─→ Redirect to products list
```

---

## 🔐 Capas de Seguridad

```
┌─────────────────────────────────────────────────────┐
│ LAYER 1: Frontend (Client-Side)                    │
├─────────────────────────────────────────────────────┤
│  • ProtectedRoute component                        │
│  • RoleGate component                              │
│  • useRole hook                                    │
│  • Conditional rendering                           │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ LAYER 2: Middleware                                │
├─────────────────────────────────────────────────────┤
│  • Check auth status                               │
│  • Redirect if not authenticated                   │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ LAYER 3: API Routes (Server-Side)                 │
├─────────────────────────────────────────────────────┤
│  • Verify JWT token                               │
│  • Check user role                                 │
│  • Validate permissions                            │
│  • Return 401/403 if unauthorized                  │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│ LAYER 4: Database (Supabase RLS)                  │
├─────────────────────────────────────────────────────┤
│  • Row Level Security policies                     │
│  • Role-based access rules                         │
│  • Final protection layer                          │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Módulos del Dashboard

### Módulos Implementados (✅)

| Módulo | Ruta | Rol Mínimo | Estado |
|--------|------|------------|--------|
| **Dashboard Home** | `/dashboard` | ALL | ✅ |
| **Productos (Lista)** | `/dashboard/productos` | ALL | ✅ (Placeholder) |
| **Perfil** | `/dashboard/perfil` | ALL | ✅ (Via layout) |

### Módulos Pendientes (🔜)

| Módulo | Ruta | Rol Mínimo | Archivos a Crear |
|--------|------|------------|------------------|
| **Usuarios** | `/dashboard/usuarios` | ADMIN | `app/dashboard/usuarios/page.tsx` + API |
| **Crear Producto** | `/dashboard/productos/crear` | ADMIN | `app/dashboard/productos/crear/page.tsx` + API |
| **Pedidos** | `/dashboard/pedidos` | CUSTOMER | `app/dashboard/pedidos/page.tsx` + API |
| **Inventario** | `/dashboard/inventario` | ADMIN | `app/dashboard/inventario/page.tsx` + API |
| **Reportes** | `/dashboard/reportes` | SALES_REP | `app/dashboard/reportes/page.tsx` + API |

---

## 🎯 Próximos Pasos

### 1. Implementar Páginas del Dashboard

```bash
# Crear páginas necesarias
app/dashboard/usuarios/page.tsx
app/dashboard/productos/crear/page.tsx
app/dashboard/pedidos/page.tsx
app/dashboard/inventario/page.tsx
app/dashboard/reportes/page.tsx
```

### 2. Crear APIs Faltantes

```bash
# Crear API routes
app/api/dashboard/users/route.ts
app/api/dashboard/orders/route.ts
app/api/dashboard/products/create/route.ts
app/api/dashboard/inventory/route.ts
app/api/dashboard/reports/sales/route.ts
```

### 3. Migración de Base de Datos

```sql
-- Asegurar que existe enum user_role
CREATE TYPE user_role AS ENUM (
  'admin',
  'sales_rep',
  'customer',
  'distributor',
  'guest'
);

-- Actualizar columna role en users
ALTER TABLE users
ALTER COLUMN role TYPE user_role USING role::user_role;
```

### 4. Actualizar Layout del Dashboard

```typescript
// app/dashboard/layout.tsx
import { RoleBasedDashboard } from '@/components/dashboard';

export default function DashboardLayout({ children }) {
  return (
    <RoleBasedDashboard>
      {children}
    </RoleBasedDashboard>
  );
}
```

---

## 📚 Recursos

- **Arquitectura Completa**: Ver `ARCHITECTURE.md`
- **Ejemplos de Uso**: Ver `USAGE_EXAMPLES.md`
- **Setup Autenticación**: Ver `SUPABASE_AUTH_SETUP.md`

---

**Última actualización**: Octubre 2024
**Versión**: 1.0.0

