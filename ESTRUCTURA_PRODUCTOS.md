# 🏗️ Estructura del Sistema de Productos

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         NAVEGADOR                               │
│                    http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   /productos (Client Component)                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  SIDEBAR                │  MAIN CONTENT                   │  │
│  │  ────────               │  ─────────────                  │  │
│  │  🔍 Búsqueda            │  📦 Grid de Productos           │  │
│  │  ☑️  Categorías         │     (1-3 columnas)              │  │
│  │  💰 Rango Precio        │                                 │  │
│  │  🧹 Limpiar            │  📄 Paginación                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ searchProducts(filters)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              services/public/products/getData.ts                │
│                   (Service Layer)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ fetch('/api/products/search')
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               /api/products/search/route.ts                     │
│                    (API Route - Server)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  1. Parse query params (search, category, price, page)   │  │
│  │  2. Build Supabase query                                 │  │
│  │  3. Apply filters (OR, EQ, GTE, LTE)                     │  │
│  │  4. Execute query with count                             │  │
│  │  5. Return { data, pagination }                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ SQL Query
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE                                   │
│                    (PostgreSQL)                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  products                                                 │  │
│  │  ├── id                                                   │  │
│  │  ├── name (searchable)                                    │  │
│  │  ├── description (searchable)                             │  │
│  │  ├── category (filterable)                                │  │
│  │  ├── base_price (filterable)                              │  │
│  │  └── is_active                                            │  │
│  │                                                            │  │
│  │  product_inventory (joined)                               │  │
│  │  ├── plant_location                                       │  │
│  │  └── quantity_available                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Archivos Completa

```
my-ecommerce/
│
├── 📁 app/
│   ├── 📁 api/
│   │   ├── 📁 products/
│   │   │   ├── 📁 search/
│   │   │   │   └── 📄 route.ts ★ NUEVA - API de búsqueda
│   │   │   ├── 📁 recent/
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 viewed/
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 quoted/
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 featured/
│   │   │   │   └── 📄 route.ts
│   │   │   └── 📁 by-category/
│   │   │       └── 📄 route.ts
│   │   └── 📁 categories/
│   │       └── 📄 route.ts
│   │
│   ├── 📁 productos/
│   │   └── 📄 page.tsx ★ NUEVA - Página principal de productos
│   │
│   ├── 📄 page.tsx
│   ├── 📄 layout.tsx
│   └── 📄 globals.css
│
├── 📁 components/
│   ├── 📄 Navbar.tsx
│   ├── 📄 HeroBanner.tsx
│   ├── 📄 ProductCarousel.tsx
│   ├── 📄 CategoryGrid.tsx
│   ├── 📄 Pagination.tsx ★ NUEVO - Componente de paginación
│   │
│   └── 📁 ui/
│       ├── 📄 badge.tsx
│       ├── 📄 button.tsx
│       ├── 📄 card.tsx
│       ├── 📄 carousel.tsx
│       ├── 📄 navigation-menu.tsx
│       ├── 📄 separator.tsx
│       ├── 📄 input.tsx ★ NUEVO
│       ├── 📄 checkbox.tsx ★ NUEVO
│       ├── 📄 slider.tsx ★ NUEVO
│       └── 📄 label.tsx ★ NUEVO
│
├── 📁 services/
│   └── 📁 public/
│       └── 📁 products/
│           └── 📄 getData.ts ★ ACTUALIZADO - Nueva función searchProducts()
│
├── 📁 lib/
│   ├── 📁 supabase/
│   │   ├── 📄 client.ts
│   │   ├── 📄 server.ts
│   │   └── 📄 middleware.ts
│   ├── 📄 utils.ts
│   └── 📄 constants.ts
│
├── 📄 package.json ★ ACTUALIZADO - Nuevas dependencias
│
└── 📁 Documentación/
    ├── 📄 API_ROUTES_DOCUMENTATION.md
    ├── 📄 PRODUCTS_PAGE_DOCUMENTATION.md ★ NUEVA
    ├── 📄 PRODUCTS_IMPLEMENTATION_SUMMARY.md ★ NUEVA
    ├── 📄 QUICK_START_PRODUCTS.md ★ NUEVA
    └── 📄 ESTRUCTURA_PRODUCTOS.md ★ NUEVA (este archivo)
```

**Leyenda:**
- ★ = Archivo nuevo o actualizado en esta implementación
- 📁 = Directorio
- 📄 = Archivo

---

## 🔄 Flujo de Datos Detallado

### 1️⃣ Usuario Interactúa
```
┌──────────────────────────┐
│  Usuario escribe búsqueda│
│  "varilla corrugada"     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  useState actualiza      │
│  searchTerm              │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  useEffect detecta cambio│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  loadProducts() se ejecuta│
└──────────────────────────┘
```

### 2️⃣ Service Layer
```
┌──────────────────────────────────┐
│  searchProducts({               │
│    search: "varilla corrugada",  │
│    page: 1,                      │
│    limit: 12                     │
│  })                              │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Construye URLSearchParams:      │
│  ?search=varilla+corrugada       │
│  &page=1&limit=12                │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  fetch('/api/products/search?...')│
└──────────────────────────────────┘
```

### 3️⃣ API Route
```
┌──────────────────────────────────┐
│  Parse searchParams              │
│  ├── search = "varilla corrugada"│
│  ├── page = 1                    │
│  └── limit = 12                  │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────┐
│  Build Supabase Query:                          │
│                                                  │
│  supabase                                        │
│    .from('products')                             │
│    .select('*, inventory:product_inventory(...)')│
│    .eq('is_active', true)                        │
│    .or('name.ilike.%varilla corrugada%,          │
│         description.ilike.%varilla corrugada%')  │
│    .order('created_at', { ascending: false })    │
│    .range(0, 11)  // offset, offset + limit - 1  │
└────────────┬─────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Execute query + count           │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Build response:                 │
│  {                               │
│    data: [...products...],       │
│    pagination: {                 │
│      page: 1,                    │
│      total: 45,                  │
│      totalPages: 4,              │
│      hasNextPage: true,          │
│      hasPrevPage: false          │
│    }                             │
│  }                               │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Return NextResponse.json(...)   │
└──────────────────────────────────┘
```

### 4️⃣ Back to Client
```
┌──────────────────────────────────┐
│  Response llega a getData.ts     │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Parse JSON                      │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Return { data, pagination }     │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  page.tsx recibe resultado       │
│  ├── setProducts(data)           │
│  └── setPagination(pagination)   │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│  Re-render con nuevos datos      │
│  ├── Grid muestra productos      │
│  └── Paginación actualizada      │
└──────────────────────────────────┘
```

---

## 🎨 Componentes UI y sus Props

### Pagination
```typescript
<Pagination
  currentPage={number}      // Página actual
  totalPages={number}       // Total de páginas
  onPageChange={(page) => void}  // Callback al cambiar
/>
```

### Input (Búsqueda)
```typescript
<Input
  value={string}            // Valor controlado
  onChange={(e) => void}    // Callback al escribir
  placeholder={string}      // Texto placeholder
  className={string}        // Clases adicionales
/>
```

### Checkbox (Categorías)
```typescript
<Checkbox
  checked={boolean}         // Estado checked
  onCheckedChange={() => void}  // Callback al cambiar
  id={string}              // ID único
/>
```

### Slider (Precio)
```typescript
<Slider
  min={number}             // Valor mínimo (0)
  max={number}             // Valor máximo (1000)
  step={number}            // Incremento (10)
  value={[min, max]}       // Array con valores
  onValueChange={(values) => void}  // Callback
/>
```

---

## 📊 Estado del Componente Principal

```typescript
// /app/productos/page.tsx

const ProductsPage = () => {
  // Datos
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({...});
  
  // UI
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Effects
  useEffect(() => {
    // Load categories on mount
  }, []);
  
  useEffect(() => {
    // Load products when filters change
  }, [searchTerm, selectedCategories, priceRange, currentPage]);
  
  // Handlers
  const handleCategoryToggle = (slug: string) => {...};
  const handleSearchChange = (value: string) => {...};
  const handlePriceChange = (values: number[]) => {...};
  const clearFilters = () => {...};
  const handlePageChange = (page: number) => {...};
  
  return (
    // JSX...
  );
};
```

---

## 🔧 Configuración de la API

### Query de Supabase
```typescript
// app/api/products/search/route.ts

let query = supabase
  .from('products')
  .select(`
    *,
    inventory:product_inventory(
      plant_location,
      quantity_available
    )
  `, { count: 'exact' })  // ← Importante para paginación
  .eq('is_active', true);

// Búsqueda (OR en múltiples campos)
if (search) {
  query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
}

// Filtro de categoría
if (category) {
  query = query.eq('category', category);
}

// Filtro de precio mínimo
if (minPrice) {
  query = query.gte('base_price', parseFloat(minPrice));
}

// Filtro de precio máximo
if (maxPrice) {
  query = query.lte('base_price', parseFloat(maxPrice));
}

// Paginación
const { data, error, count } = await query
  .order('created_at', { ascending: false })
  .range(offset, offset + limit - 1);
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: grid-cols-1        /* < 768px */

/* Tablet */
md: grid-cols-2             /* 768px - 1280px */

/* Desktop */
xl: grid-cols-3             /* > 1280px */

/* Large Desktop */
2xl: grid-cols-4            /* > 1536px (opcional) */
```

---

## 🎯 Performance Tips

### 1. Debouncing de Búsqueda
```typescript
// Implementar en el futuro
import { useDebounce } from '@/hooks/useDebounce';

const debouncedSearch = useDebounce(searchTerm, 300);

useEffect(() => {
  // Usar debouncedSearch en vez de searchTerm
}, [debouncedSearch]);
```

### 2. Cache de Categorías
```typescript
// Las categorías cambian poco, se pueden cachear
useEffect(() => {
  const cached = localStorage.getItem('categories');
  if (cached) {
    setCategories(JSON.parse(cached));
  } else {
    loadCategories();
  }
}, []);
```

### 3. Virtualización de Grid
```typescript
// Para muchos productos (1000+)
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## ✅ Checklist de Verificación

- [x] API `/api/products/search` responde correctamente
- [x] Búsqueda funciona en nombre y descripción
- [x] Filtro de categorías funciona (simple y múltiple)
- [x] Filtro de precio funciona (min y max)
- [x] Paginación muestra números correctos
- [x] Botones prev/next se deshabilitan apropiadamente
- [x] Loading state muestra spinner
- [x] Empty state muestra mensaje
- [x] Responsive funciona en mobile/tablet/desktop
- [x] Sidebar mobile es colapsable
- [x] Limpiar filtros resetea todo
- [x] Auto-scroll al cambiar página
- [x] Estilos consistentes con ADELCA
- [x] Sin errores de linting
- [x] Documentación completa

---

## 🚀 Siguiente Nivel

Para llevar el sistema al siguiente nivel:

1. **Server Components** para mejor SEO
2. **URL Sync** (filtros en URL)
3. **Infinite Scroll** como alternativa
4. **Advanced Filters** (stock, ubicación, specs)
5. **Product Comparison** (comparar hasta 3)
6. **Wishlist/Favorites** con persistencia
7. **Export Results** (PDF, Excel, CSV)
8. **Analytics** (tracks de búsquedas populares)

---

**Sistema completo y funcional! 🎉**

Todo está documentado, probado y listo para usar.

