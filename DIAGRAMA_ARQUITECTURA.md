# 🎨 Diagrama Visual de Arquitectura - ADELCA E-Commerce

## 📐 Vista General del Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                           🌐 NAVEGADOR (CLIENTE)                            │
│                                                                             │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                          📱 FRONTEND (Next.js App)                           │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────┐            │
│  │   PAGES         │  │   COMPONENTS    │  │   CUSTOM HOOKS   │            │
│  ├─────────────────┤  ├─────────────────┤  ├──────────────────┤            │
│  │ • Home          │  │ • Navbar        │  │ • useAuth()      │            │
│  │ • Productos     │  │ • CartIcon      │  │ • useRole()      │            │
│  │ • Categorías    │  │ • AddToCart     │  │                  │            │
│  │ • SignIn        │  │ • ProductCard   │  │                  │            │
│  │ • SignUp        │  │                 │  │                  │            │
│  │ • Dashboard     │  ├─────────────────┤  └──────────────────┘            │
│  │   ├─ Admin      │  │ AUTH GUARDS     │                                  │
│  │   ├─ SalesRep   │  ├─────────────────┤                                  │
│  │   ├─ Customer   │  │ • ProtectedRoute│                                  │
│  │   └─ Distrib.   │  │ • RoleGate      │                                  │
│  └─────────────────┘  └─────────────────┘                                  │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      📦 TYPES (TypeScript)                            │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  • auth.types.ts    • api.types.ts    • domain.types.ts              │   │
│  │  • UserRole enum    • ApiResponse<T>  • Product, Order, Cart         │   │
│  │  • ROLE_PERMISSIONS • PaginatedResp.  • DashboardStats               │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                         🔧 SERVICES LAYER (Business Logic)                    │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────────────────┐   │
│  │ PUBLIC         │  │ AUTHENTICATION │  │ DASHBOARD (Protected)        │   │
│  ├────────────────┤  ├────────────────┤  ├──────────────────────────────┤   │
│  │ products/      │  │ authService.ts │  │ stats/    • getStats()       │   │
│  │  getData.ts    │  │                │  │ profile/  • getProfile()     │   │
│  │                │  │ • signIn()     │  │ users/    • getUsers()       │   │
│  │ categories/    │  │ • signUp()     │  │ orders/   • getOrders()      │   │
│  │  getData.ts    │  │ • signOut()    │  │ products/ • getProducts()    │   │
│  │                │  │ • getSession() │  │ reports/  • getReports()     │   │
│  │ cart/          │  │                │  │ inventory/• getInventory()   │   │
│  │  cartService.ts│  │                │  │                              │   │
│  └────────────────┘  └────────────────┘  └──────────────────────────────┘   │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                   🔗 CONSTANTS (API Endpoints)                        │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  • productEndpoints  • authEndpoints  • dashboardEndpoints           │   │
│  │  • cartEndpoints     • categoryEndpoints                             │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                      🔌 API ROUTES (Next.js Server)                          │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────────┐    │
│  │ /api/products   │  │ /api/auth       │  │ /api/dashboard           │    │
│  ├─────────────────┤  ├─────────────────┤  ├──────────────────────────┤    │
│  │ • GET /         │  │ • signin-email  │  │ • stats                  │    │
│  │ • GET /[id]     │  │ • signup-otp    │  │ • profile                │    │
│  │ • GET /search   │  │ • verify-otp    │  │ • users/                 │    │
│  │ • GET /recent   │  │ • signin-google │  │ • orders/                │    │
│  │ • GET /viewed   │  │ • signout       │  │ • products/              │    │
│  │ • GET /quoted   │  │ • session       │  │ • reports/               │    │
│  │ • GET /featured │  │                 │  │ • inventory/             │    │
│  │ • GET /category │  │                 │  │                          │    │
│  └─────────────────┘  └─────────────────┘  └──────────────────────────┘    │
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐                                   │
│  │ /api/cart       │  │ /api/categories │                                   │
│  ├─────────────────┤  ├─────────────────┤                                   │
│  │ • GET /         │  │ • GET /         │                                   │
│  │ • POST /add     │  │                 │                                   │
│  │ • PATCH /update │  │                 │                                   │
│  │ • DELETE /remove│  │                 │                                   │
│  │ • DELETE /clear │  │                 │                                   │
│  │ • GET /count    │  │                 │                                   │
│  └─────────────────┘  └─────────────────┘                                   │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    🔐 SECURITY LAYER                                  │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │  1️⃣ Authentication Check  (supabase.auth.getUser())                  │   │
│  │  2️⃣ Authorization Check   (verify role from DB)                      │   │
│  │  3️⃣ Validation           (zod, joi, manual)                          │   │
│  │  4️⃣ Error Handling       (try/catch, status codes)                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└───────────────────────────────────┬───────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                       🗄️  SUPABASE (Backend as a Service)                    │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    🔑 AUTHENTICATION                                 │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  • auth.users (managed by Supabase)                                 │    │
│  │  • Email + Password auth                                            │    │
│  │  • Email + OTP (Magic Link)                                         │    │
│  │  • Google OAuth                                                     │    │
│  │  • JWT tokens                                                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    💾 DATABASE (PostgreSQL)                          │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │                                                                      │    │
│  │  public.users                                                        │    │
│  │  ├─ id (references auth.users.id)                                   │    │
│  │  ├─ email                                                            │    │
│  │  ├─ role (user_role enum)                                           │    │
│  │  └─ is_active                                                        │    │
│  │                                                                      │    │
│  │  public.user_profiles                                                │    │
│  │  ├─ user_id (FK to users)                                           │    │
│  │  ├─ first_name, last_name                                           │    │
│  │  ├─ company_name                                                    │    │
│  │  └─ credit_limit, discount                                          │    │
│  │                                                                      │    │
│  │  public.products                                                     │    │
│  │  ├─ id, sku, name                                                   │    │
│  │  ├─ category                                                        │    │
│  │  └─ base_price                                                      │    │
│  │                                                                      │    │
│  │  public.carts                                                        │    │
│  │  ├─ id                                                              │    │
│  │  └─ user_id (FK to users)                                           │    │
│  │                                                                      │    │
│  │  public.cart_items                                                   │    │
│  │  ├─ cart_id (FK to carts)                                           │    │
│  │  ├─ product_id (FK to products)                                     │    │
│  │  └─ quantity                                                        │    │
│  │                                                                      │    │
│  │  public.orders                                                       │    │
│  │  ├─ id, order_number                                                │    │
│  │  ├─ user_id (FK to users)                                           │    │
│  │  ├─ status (order_status enum)                                      │    │
│  │  └─ total                                                           │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    🛡️  ROW LEVEL SECURITY (RLS)                      │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  • Políticas por tabla                                              │    │
│  │  • Acceso basado en auth.uid()                                      │    │
│  │  • Verificación de roles                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    ⚡ TRIGGERS & FUNCTIONS                           │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  • handle_new_user (auto-create user profile)                       │    │
│  │  • update_updated_at (auto-update timestamps)                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎭 Flujo de Control de Roles

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          👤 USUARIO INICIA SESIÓN                       │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │  Supabase Auth valida        │
                    │  credenciales                │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │  Trigger crea/actualiza      │
                    │  public.users y profile      │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │  Frontend obtiene session    │
                    │  con useAuth() hook          │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │  useRole() detecta rol       │
                    │  del usuario                 │
                    └──────────────┬───────────────┘
                                   │
                   ┌───────────────┴────────────────┐
                   │                                │
                   ▼                                ▼
        ┌──────────────────┐            ┌──────────────────┐
        │  role = "admin"  │            │ role = "customer"│
        └─────────┬────────┘            └─────────┬────────┘
                  │                               │
                  ▼                               ▼
        ┌──────────────────┐            ┌──────────────────┐
        │ RoleBasedDashboard│            │ RoleBasedDashboard│
        │ renderiza         │            │ renderiza        │
        │ AdminLayout       │            │ CustomerLayout   │
        └─────────┬────────┘            └─────────┬────────┘
                  │                               │
                  ▼                               ▼
        ┌──────────────────┐            ┌──────────────────┐
        │ Dashboard con:   │            │ Dashboard con:   │
        │ • Usuarios       │            │ • Mis Pedidos    │
        │ • Productos      │            │ • Favoritos      │
        │ • Pedidos        │            │ • Cotizaciones   │
        │ • Inventario     │            │ • Mi Perfil      │
        │ • Reportes       │            │                  │
        │ • Configuración  │            │                  │
        └──────────────────┘            └──────────────────┘
```

---

## 🔄 Flujo de Datos: Crear un Producto

```
┌──────────────────────────────────────────────────────────────────┐
│ 1️⃣  USUARIO (Admin) llena formulario de producto                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 2️⃣  FRONTEND valida campos                                       │
│    • Verifica que todos los campos requeridos estén llenos      │
│    • Verifica formato de datos                                  │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 3️⃣  HOOK useRole() verifica permisos                             │
│    • hasPermission('canManageProducts') === true                │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 4️⃣  SERVICE llama a API                                          │
│    services/dashboard/products/getProducts.ts                   │
│    └─→ createProduct(productData)                               │
│        └─→ fetch(dashboardEndpoints.products.create)            │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5️⃣  API ROUTE procesa request                                    │
│    app/api/dashboard/products/create/route.ts                   │
│                                                                  │
│    Step 1: Authentication                                       │
│    ├─→ const user = await supabase.auth.getUser()              │
│    └─→ if (!user) return 401                                   │
│                                                                  │
│    Step 2: Get Role                                             │
│    ├─→ const { role } = await supabase                          │
│    │       .from('users')                                       │
│    │       .select('role')                                      │
│    │       .eq('id', user.id)                                   │
│    └─→ if (role !== 'admin') return 403                        │
│                                                                  │
│    Step 3: Validation                                           │
│    ├─→ Valida datos del producto                               │
│    └─→ if (invalid) return 400                                 │
│                                                                  │
│    Step 4: Database Query                                       │
│    └─→ const { data } = await supabase                         │
│            .from('products')                                    │
│            .insert(productData)                                 │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 6️⃣  SUPABASE ejecuta query                                       │
│                                                                  │
│    • Row Level Security verifica permisos                       │
│    • Inserta producto en la tabla                               │
│    • Ejecuta triggers si los hay                                │
│    • Retorna producto creado                                    │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 7️⃣  RESPONSE retorna al frontend                                 │
│    { success: true, data: product }                             │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│ 8️⃣  FRONTEND actualiza UI                                        │
│    • Muestra mensaje de éxito                                   │
│    • Redirige a lista de productos                              │
│    • Actualiza estado global si es necesario                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Capas de Seguridad Multi-Nivel

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SOLICITUD DE USUARIO                           │
└──────────────────────────────────┬──────────────────────────────────────┘
                                   │
                                   ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ CAPA 1: FRONTEND (UX Protection)                                         │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  useRole() verifica permisos                                             │
│  ├─→ if (!hasPermission('canManageProducts')) {                          │
│  │       // No muestra botón "Eliminar"                                  │
│  │   }                                                                    │
│  │                                                                        │
│  RoleGate oculta elementos                                               │
│  ├─→ <RoleGate allowedRoles={[UserRole.ADMIN]}>                          │
│  │       <DeleteButton />                                                │
│  │   </RoleGate>                                                         │
│  │                                                                        │
│  ProtectedRoute redirige                                                 │
│  └─→ <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>                    │
│          <AdminPanel />                                                  │
│      </ProtectedRoute>                                                   │
│                                                                           │
│  ✅ Mejora UX (no muestra opciones no disponibles)                        │
│  ❌ NO es seguro (fácil de bypassear con DevTools)                       │
│                                                                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ CAPA 2: MIDDLEWARE (Routing Protection)                                  │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  middleware.ts verifica autenticación                                    │
│  ├─→ const user = await supabase.auth.getUser()                          │
│  ├─→ if (!user && protectedRoute) {                                      │
│  │       redirect('/signin')                                             │
│  │   }                                                                    │
│  │                                                                        │
│  ✅ Protege rutas antes de renderizar                                     │
│  ⚠️  No verifica permisos granulares                                      │
│                                                                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ CAPA 3: API ROUTES (Business Logic Protection)                           │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Verificación completa de auth + permisos                                │
│  ├─→ Step 1: Auth Check                                                  │
│  │   const { data: { user }, error } = await supabase.auth.getUser()    │
│  │   if (error || !user) return 401 Unauthorized                         │
│  │                                                                        │
│  ├─→ Step 2: Role Check                                                  │
│  │   const { data: userData } = await supabase                           │
│  │       .from('users')                                                  │
│  │       .select('role')                                                 │
│  │       .eq('id', user.id)                                              │
│  │       .single()                                                       │
│  │   if (userData.role !== 'admin') return 403 Forbidden                 │
│  │                                                                        │
│  └─→ Step 3: Business Logic                                              │
│      // Procesa request solo si pasó validaciones                        │
│                                                                           │
│  ✅ Seguridad real del servidor                                           │
│  ✅ Verifica auth + permisos                                              │
│  ⚠️  Puede tener bugs en lógica                                           │
│                                                                           │
└───────────────────────────────────┬───────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ CAPA 4: DATABASE (Data Protection)                                       │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Row Level Security (RLS) Policies                                       │
│  ├─→ CREATE POLICY "admin_only_insert" ON products                       │
│  │   FOR INSERT                                                          │
│  │   USING (                                                             │
│  │     EXISTS (                                                          │
│  │       SELECT 1 FROM users                                             │
│  │       WHERE users.id = auth.uid()                                     │
│  │       AND users.role = 'admin'                                        │
│  │     )                                                                 │
│  │   );                                                                  │
│  │                                                                        │
│  └─→ Última línea de defensa                                             │
│      Si API tiene bug, RLS lo bloquea                                    │
│                                                                           │
│  ✅ Protección a nivel de base de datos                                   │
│  ✅ Imposible de bypassear                                                │
│  ✅ Última línea de defensa                                               │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Estructura Modular de Servicios

```
services/
│
├── authentication/
│   └── authService.ts
│       ├── signInWithEmail()
│       ├── signUpWithOTP()
│       ├── verifyOTP()
│       ├── signInWithGoogle()
│       ├── signOut()
│       └── getSession()
│
├── public/
│   ├── products/
│   │   └── getData.ts
│   │       ├── getRecentProducts()
│   │       ├── getMostViewedProducts()
│   │       ├── getMostQuotedProducts()
│   │       ├── getFeaturedProducts()
│   │       ├── searchProducts()
│   │       ├── getProductById()
│   │       └── getProductsByCategory()
│   │
│   ├── categories/
│   │   └── getData.ts
│   │       └── getCategories()
│   │
│   └── cart/
│       └── cartService.ts
│           ├── getCartItems()
│           ├── addToCart()
│           ├── updateCartItem()
│           ├── removeFromCart()
│           ├── clearCart()
│           └── getCartCount()
│
└── dashboard/                    ← ✅ NUEVA ESTRUCTURA MODULAR
    ├── stats/
    │   └── getStats.ts
    │       └── getDashboardStats()
    │
    ├── profile/
    │   └── getProfile.ts
    │       └── getUserProfile()
    │
    ├── users/                    ← ✅ NUEVO
    │   └── getUsers.ts
    │       ├── getUsers()
    │       ├── getUserById()
    │       ├── updateUserRole()
    │       └── deactivateUser()
    │
    ├── orders/                   ← ✅ NUEVO
    │   └── getOrders.ts
    │       ├── getOrders()
    │       ├── getOrderById()
    │       └── updateOrderStatus()
    │
    ├── products/                 ← ✅ NUEVO
    │   └── getProducts.ts
    │       ├── getDashboardProducts()
    │       ├── createProduct()
    │       ├── updateProduct()
    │       └── deleteProduct()
    │
    ├── reports/                  ← ✅ NUEVO
    │   └── getReports.ts
    │       ├── getSalesReport()
    │       ├── getProductPerformanceReport()
    │       └── getCustomerReport()
    │
    ├── inventory/                ← ✅ NUEVO
    │   └── getInventory.ts
    │       ├── getInventory()
    │       ├── updateInventoryQuantity()
    │       └── getLowStockAlerts()
    │
    └── index.ts                  ← ✅ Barrel export (todo junto)
```

**Ventaja**: Agregar nuevo dominio = crear carpeta + archivo + export

---

## 🎨 Layouts Dinámicos por Rol

```
                    ┌─────────────────────────┐
                    │  RoleBasedDashboard     │
                    │  detecta rol del user   │
                    └───────────┬─────────────┘
                                │
                ┌───────────────┼───────────────┬─────────────┐
                │               │               │             │
                ▼               ▼               ▼             ▼
    ┌──────────────────┐ ┌─────────────┐ ┌──────────┐ ┌──────────────┐
    │ role = 'admin'   │ │role='sales' │ │role='cust│ │role='distrib'│
    └────────┬─────────┘ └──────┬──────┘ └────┬─────┘ └──────┬───────┘
             │                  │              │              │
             ▼                  ▼              ▼              ▼
    ┌──────────────────┐ ┌─────────────┐ ┌──────────┐ ┌──────────────┐
    │  AdminLayout     │ │SalesRepLayout│ │CustomerL.│ │DistributorL. │
    └────────┬─────────┘ └──────┬──────┘ └────┬─────┘ └──────┬───────┘
             │                  │              │              │
             ▼                  ▼              ▼              ▼
    ┌──────────────────┐ ┌─────────────┐ ┌──────────┐ ┌──────────────┐
    │ Dashboard        │ │ Dashboard   │ │ Dashboard│ │ Dashboard    │
    │ Usuarios         │ │ Pedidos     │ │Mis Pedidos│ │ Pedidos      │
    │ Productos        │ │ Clientes    │ │ Favoritos│ │ Productos    │
    │ Pedidos          │ │ Mis Ventas  │ │Cotizacion│ │ Entregas     │
    │ Inventario       │ │             │ │ Mi Perfil│ │ Reportes     │
    │ Reportes         │ │             │ │          │ │              │
    │ Configuración    │ │             │ │          │ │              │
    └──────────────────┘ └─────────────┘ └──────────┘ └──────────────┘
```

---

**Última actualización**: Octubre 2024  
**Versión del Diagrama**: 1.0.0

