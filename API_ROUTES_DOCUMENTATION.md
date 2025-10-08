# Documentación de API Routes

## Descripción General

Los servicios de Supabase han sido migrados a **API Routes de Next.js** para mejorar la seguridad, centralizar la lógica del servidor y facilitar el mantenimiento.

## Estructura de API Routes

```
app/api/
├── products/
│   ├── recent/route.ts          # Productos recientes
│   ├── viewed/route.ts          # Productos más vistos
│   ├── quoted/route.ts          # Productos más cotizados
│   ├── featured/route.ts        # Productos destacados
│   └── by-category/route.ts     # Productos por categoría
└── categories/route.ts          # Categorías
```

## Endpoints Disponibles

### 1. Productos Recientes
**Endpoint:** `GET /api/products/recent`

**Query Parameters:**
- `limit` (opcional): Número de productos a retornar. Default: `8`

**Ejemplo:**
```javascript
const response = await fetch('/api/products/recent?limit=10');
const { data } = await response.json();
```

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Producto",
      "description": "Descripción",
      "inventory": [
        {
          "plant_location": "Planta A",
          "quantity_available": "100"
        }
      ]
    }
  ]
}
```

---

### 2. Productos Más Vistos
**Endpoint:** `GET /api/products/viewed`

**Query Parameters:**
- `limit` (opcional): Número de productos a retornar. Default: `8`

**Ejemplo:**
```javascript
const response = await fetch('/api/products/viewed?limit=10');
const { data } = await response.json();
```

---

### 3. Productos Más Cotizados
**Endpoint:** `GET /api/products/quoted`

**Query Parameters:**
- `limit` (opcional): Número de productos a retornar. Default: `8`

**Ejemplo:**
```javascript
const response = await fetch('/api/products/quoted?limit=10');
const { data } = await response.json();
```

---

### 4. Productos Destacados
**Endpoint:** `GET /api/products/featured`

**Query Parameters:**
- `limit` (opcional): Número de productos a retornar. Default: `4`

**Ejemplo:**
```javascript
const response = await fetch('/api/products/featured?limit=6');
const { data } = await response.json();
```

---

### 5. Productos por Categoría
**Endpoint:** `GET /api/products/by-category`

**Query Parameters:**
- `slug` (requerido): Slug de la categoría
- `limit` (opcional): Número de productos a retornar. Default: `12`

**Ejemplo:**
```javascript
const response = await fetch('/api/products/by-category?slug=rebar&limit=20');
const { data } = await response.json();
```

**Respuesta de Error:**
```json
{
  "error": "El slug de la categoría es requerido"
}
```

---

### 6. Categorías
**Endpoint:** `GET /api/categories`

**Query Parameters:** Ninguno

**Ejemplo:**
```javascript
const response = await fetch('/api/categories');
const { data } = await response.json();
```

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Categoría",
      "slug": "categoria",
      "is_active": true,
      "sort_order": 1
    }
  ]
}
```

---

## Servicios Actualizados

Los servicios en `services/public/products/getData.ts` ahora utilizan las API routes en lugar de llamadas directas a Supabase:

### Funciones Disponibles

```typescript
// Obtener productos recientes
const products = await getRecentProducts(8);

// Obtener productos más vistos
const viewed = await getMostViewedProducts(8);

// Obtener productos más cotizados
const quoted = await getMostQuotedProducts(8);

// Obtener productos destacados
const featured = await getFeaturedProducts(4);

// Obtener categorías
const categories = await getCategories();

// Obtener productos por categoría
const categoryProducts = await getProductsByCategory('rebar', 12);

// Funciones de utilidad (sin cambios)
const totalStock = getTotalStock(inventory);
const formattedPrice = formatPrice(price);
const categoryName = getCategoryName('rebar');
```

## Ventajas de Esta Arquitectura

### 1. **Seguridad Mejorada**
- Las credenciales de Supabase solo se exponen en el servidor
- Validación centralizada de parámetros
- Control de acceso más granular

### 2. **Caché y Rendimiento**
- Las API routes pueden implementar caché estratégico
- Reducción de llamadas directas al cliente de Supabase

### 3. **Mantenibilidad**
- Lógica de negocio centralizada
- Fácil de testear
- Cambios en Supabase solo afectan las API routes

### 4. **Escalabilidad**
- Fácil agregar rate limiting
- Posibilidad de agregar middleware personalizado
- Logs centralizados

## Configuración de Caché

Actualmente, todas las rutas usan `cache: 'no-store'` para obtener datos frescos. Puedes ajustar esto según tus necesidades:

```typescript
// Sin caché (actual)
cache: 'no-store'

// Con revalidación
next: { revalidate: 3600 } // Revalidar cada hora

// Caché completo
cache: 'force-cache'
```

## Manejo de Errores

Todas las API routes siguen un patrón consistente de manejo de errores:

```json
{
  "error": "Mensaje de error descriptivo"
}
```

Con códigos de estado HTTP apropiados:
- `200`: Éxito
- `400`: Error de validación
- `500`: Error interno del servidor

## Próximos Pasos

1. **Agregar autenticación**: Validar tokens en las API routes
2. **Rate Limiting**: Limitar número de peticiones por usuario/IP
3. **Paginación**: Implementar cursor-based pagination
4. **Filtros**: Agregar más opciones de filtrado
5. **Búsqueda**: Endpoint para búsqueda de productos
6. **Analytics**: Tracking de productos más vistos

## Ejemplo de Uso en Componentes

### Server Component
```typescript
import { getRecentProducts } from '@/services/public/products/getData';

export default async function HomePage() {
  const products = await getRecentProducts(8);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Client Component
```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products/recent?limit=10')
      .then(res => res.json())
      .then(({ data }) => setProducts(data));
  }, []);
  
  return <div>{/* Renderizar productos */}</div>;
}
```

## Notas Importantes

- Todas las rutas usan el cliente de servidor de Supabase (`@/lib/supabase/server`)
- Los servicios en `getData.ts` ahora son compatibles tanto con Server Components como Client Components
- El manejo de errores es consistente en todas las rutas
- Todos los endpoints retornan datos en el formato `{ data: [...] }` o `{ error: "..." }`

