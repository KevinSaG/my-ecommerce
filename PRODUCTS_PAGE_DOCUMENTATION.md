# Documentación de la Página de Productos

## Descripción General

Se ha creado una página completa de catálogo de productos con funcionalidades avanzadas de búsqueda, filtrado y paginación, manteniendo el look and feel de ADELCA.

## Estructura de Archivos

### API Routes
```
app/api/products/search/route.ts
```
- Endpoint para búsqueda avanzada de productos
- Soporta paginación
- Filtros por nombre/descripción, categoría y rango de precio

### Servicios
```
services/public/products/getData.ts
```
- Nueva función: `searchProducts(filters)`
- Interfaces: `ProductFilters`, `PaginationMeta`, `ProductSearchResponse`

### Componentes
```
components/
├── Pagination.tsx           # Componente de paginación
├── ui/
│   ├── input.tsx           # Input para búsqueda
│   ├── checkbox.tsx        # Checkbox para filtros
│   ├── slider.tsx          # Slider de rango de precio
│   └── label.tsx           # Labels para formularios
```

### Página Principal
```
app/productos/page.tsx
```

## Características Principales

### 1. **Búsqueda Inteligente**
- Búsqueda en tiempo real
- Busca coincidencias en:
  - Nombre del producto
  - Descripción del producto
- No requiere coincidencia exacta (case-insensitive)

```typescript
// Ejemplo de uso
const filters = {
  search: 'varilla'
};
const result = await searchProducts(filters);
```

### 2. **Filtros Múltiples**

#### Filtro por Categorías
- Selección múltiple de categorías
- Checkboxes interactivos
- Actualización automática de resultados

#### Filtro por Rango de Precio
- Slider de doble control
- Rango: $0 - $1000
- Paso de $10
- Actualización en tiempo real

```typescript
const filters = {
  category: 'rebar',
  minPrice: 50,
  maxPrice: 500
};
```

### 3. **Paginación Avanzada**

#### Características:
- 12 productos por página (configurable)
- Botones Previous/Next
- Números de página con ellipsis (...)
- Scroll automático al cambiar página
- Información de resultados

#### Componente Pagination
```typescript
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => handlePageChange(page)}
/>
```

### 4. **Diseño Responsivo**

#### Desktop (lg+)
- Sidebar fijo a la izquierda
- Grid de 3 columnas
- Todos los filtros visibles

#### Tablet (md)
- Grid de 2 columnas
- Sidebar colapsable

#### Mobile (sm)
- Grid de 1 columna
- Sidebar como modal
- Botón toggle para filtros

### 5. **Estados de la UI**

#### Loading State
- Spinner animado mientras carga

#### Empty State
- Mensaje amigable cuando no hay resultados
- Botón para limpiar filtros
- Icono ilustrativo

#### Error Handling
- Manejo de errores en API
- Fallbacks en servicios
- Estados por defecto seguros

## API Endpoint

### GET `/api/products/search`

**Query Parameters:**

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `search` | string | No | - | Búsqueda en nombre y descripción |
| `category` | string | No | - | Slug de la categoría |
| `minPrice` | number | No | 0 | Precio mínimo |
| `maxPrice` | number | No | - | Precio máximo |
| `page` | number | No | 1 | Número de página |
| `limit` | number | No | 12 | Productos por página |

**Respuesta Exitosa (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Varilla Corrugada 12mm",
      "sku": "VAR-12MM-001",
      "description": "Varilla corrugada de alta resistencia",
      "category": "rebar",
      "base_price": 15.50,
      "is_active": true,
      "inventory": [
        {
          "plant_location": "Alóag",
          "quantity_available": "1000"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Respuesta de Error (500):**

```json
{
  "error": "Error al obtener productos"
}
```

## Uso en el Cliente

### Función searchProducts

```typescript
import { searchProducts, type ProductFilters } from '@/services/public/products/getData';

// Búsqueda simple
const result = await searchProducts({ search: 'varilla' });

// Filtros combinados
const result = await searchProducts({
  search: 'corrugada',
  category: 'rebar',
  minPrice: 10,
  maxPrice: 100,
  page: 2,
  limit: 20
});

// Acceder a los datos
console.log(result.data); // Array de productos
console.log(result.pagination); // Metadata de paginación
```

### Ejemplo Completo en Componente

```typescript
'use client';

import { useState, useEffect } from 'react';
import { searchProducts } from '@/services/public/products/getData';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function load() {
      const result = await searchProducts(filters);
      setProducts(result.data);
    }
    load();
  }, [filters]);

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Estilos y Look & Feel

### Paleta de Colores
- **Primary:** `#E30613` (Adelca Red)
- **Background:** `slate-50`
- **Cards:** `white` con `shadow-md`
- **Text:** `slate-900`, `slate-600`, `slate-400`

### Animaciones
- Hover en cards: `hover:shadow-xl`
- Transiciones suaves: `transition-shadow duration-300`
- Loading spinner animado
- Scroll suave al cambiar página

### Componentes Reutilizables
Todos los componentes mantienen consistencia con:
- Botones con `bg-adelca-primary`
- Badges para categorías y stock
- Cards con hover effects
- Iconos SVG inline

## Mejoras Futuras

### Funcionalidades Pendientes
1. **Ordenamiento**: Por precio, nombre, fecha, popularidad
2. **Vista de Lista**: Opción de cambiar entre grid y lista
3. **Comparador**: Seleccionar productos para comparar
4. **Wishlist**: Guardar productos favoritos
5. **Filtros Avanzados**:
   - Por rango de stock
   - Por ubicación de planta
   - Por características técnicas
6. **Export**: Exportar resultados a PDF/Excel
7. **Vista Rápida**: Modal con detalles sin cambiar página

### Optimizaciones
1. **Debouncing**: En el campo de búsqueda
2. **Cache**: Cachear resultados de búsquedas frecuentes
3. **Lazy Loading**: Cargar imágenes según scroll
4. **Infinite Scroll**: Opción alternativa a paginación
5. **Server-Side Rendering**: Para mejor SEO
6. **Filtros en URL**: Compartir búsquedas específicas

## Accesibilidad

✅ Implementado:
- Labels en todos los inputs
- Botones con aria-labels
- Contraste de colores adecuado
- Navegación por teclado en filtros

📝 Por implementar:
- Skip links
- ARIA live regions para resultados
- Anuncios de cambios para lectores de pantalla
- Focus management en modales

## SEO

### Metadata Recomendada
```typescript
export const metadata = {
  title: 'Catálogo de Productos - ADELCA',
  description: 'Explora nuestro catálogo de productos siderúrgicos de alta calidad',
  keywords: 'acero, varillas, perfiles, construcción, Ecuador',
};
```

### URL Structure
- Lista: `/productos`
- Con filtros: `/productos?search=varilla&category=rebar&page=2`
- Detalle: `/productos/[id]`

## Testing

### Tests Recomendados

```typescript
// Búsqueda
- Búsqueda con resultados
- Búsqueda sin resultados
- Búsqueda con caracteres especiales

// Filtros
- Aplicar un filtro
- Aplicar múltiples filtros
- Limpiar filtros
- Combinación de filtros y búsqueda

// Paginación
- Navegar a siguiente página
- Navegar a página anterior
- Ir a página específica
- Comportamiento en última página

// Responsive
- Sidebar en mobile
- Grid en diferentes tamaños
- Touch gestures en móvil
```

## Troubleshooting

### La búsqueda no muestra resultados
1. Verificar que hay productos en la base de datos
2. Verificar que los productos tienen `is_active = true`
3. Revisar la consola del navegador
4. Verificar conexión a Supabase

### Los filtros no funcionan
1. Verificar que las categorías existen en la BD
2. Revisar el formato del slug de categoría
3. Verificar permisos RLS en Supabase

### Error de paginación
1. Verificar el parámetro `count` en la query de Supabase
2. Asegurar que el limit y offset son correctos
3. Revisar logs del servidor

## Performance

### Métricas Objetivo
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Productos por página:** 12 (óptimo para balance carga/UX)

### Optimizaciones Aplicadas
- `cache: 'no-store'` para datos frescos
- Componentes client-side para interactividad
- Lazy loading de componentes pesados
- Minimización de re-renders con useEffect dependencies

## Soporte

Para preguntas o issues:
- Revisar esta documentación
- Consultar `API_ROUTES_DOCUMENTATION.md`
- Verificar esquema en `lib/ecommerce-schema.ts`

---

**Última actualización:** 2025-01-08
**Versión:** 1.0.0

