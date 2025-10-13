# Products API

## Descripción

La API de productos gestiona el catálogo completo de productos, incluyendo operaciones CRUD, filtrado, búsqueda y paginación.

## Endpoints

### Dashboard (Admin/Sales Rep)

#### GET `/api/dashboard/products`

Obtiene lista paginada de productos para gestión.

**Autenticación**: Requerida (Admin o Sales Rep)

**Query Parameters**:
```typescript
{
  page?: number;        // Página actual (default: 1)
  limit?: number;       // Items por página (default: 10)
  sortBy?: string;      // Campo de ordenamiento (default: 'created_at')
  sortOrder?: 'asc' | 'desc';  // Orden (default: 'desc')
  search?: string;      // Búsqueda por nombre o SKU
  category?: string;    // Filtrar por categoría
  status?: string;      // Filtrar por estado
}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Varilla corrugada 12mm",
      "sku": "VAR-12MM-6M",
      "category": "rebar",
      "base_price": 15.50,
      "status": "active",
      "stock_quito": 500,
      "stock_milagro": 300
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### POST `/api/dashboard/products`

Crea un nuevo producto.

**Autenticación**: Requerida (Admin o Sales Rep)

**Body**:
```json
{
  "name": "Varilla corrugada 12mm",
  "sku": "VAR-12MM-6M",
  "category": "rebar",
  "base_price": 15.50,
  "description": "Varilla corrugada de 12mm x 6m",
  "requires_quote": false,
  "stock_quito": 500,
  "stock_milagro": 300
}
```

#### PATCH `/api/dashboard/products/[id]`

Actualiza un producto existente.

**Autenticación**: Requerida (Admin o Sales Rep)

**Body**: Campos opcionales a actualizar

#### DELETE `/api/dashboard/products/[id]`

Elimina un producto.

**Autenticación**: Requerida (Admin o Sales Rep)

### Public API

#### GET `/api/products`

Lista pública de productos para el catálogo.

**Autenticación**: No requerida

#### GET `/api/products/[id]`

Detalle de un producto específico.

**Autenticación**: No requerida

## Categorías

- `rebar`: Varillas
- `wire`: Alambre
- `mesh`: Malla
- `profiles`: Perfiles
- `other`: Otros

## Estados

- `active`: Producto activo
- `inactive`: Producto inactivo
- `out_of_stock`: Sin stock

## Ejemplos de Uso

### Crear Producto

```typescript
import { createProduct } from '@/services/dashboard/products'

const newProduct = await createProduct({
  name: 'Varilla corrugada 12mm',
  sku: 'VAR-12MM-6M',
  category: 'rebar',
  base_price: 15.50,
  stock_quito: 500
})
```

### Listar Productos

```typescript
import { getDashboardProducts } from '@/services/dashboard/products'

const products = await getDashboardProducts({
  page: 1,
  limit: 10,
  category: 'rebar',
  search: 'varilla'
})
```

## Validaciones

- `sku`: Debe ser único
- `base_price`: Debe ser mayor a 0
- `category`: Debe ser una categoría válida
- `stock_*`: No puede ser negativo

## Errores Comunes

| Código | Mensaje | Solución |
|--------|---------|----------|
| 401 | No autenticado | Verificar token de sesión |
| 403 | No autorizado | Verificar rol de usuario |
| 400 | SKU duplicado | Usar un SKU único |
| 404 | Producto no encontrado | Verificar ID del producto |

