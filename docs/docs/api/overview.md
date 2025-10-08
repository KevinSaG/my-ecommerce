---
sidebar_position: 1
title: API Overview
---

# API Reference

Documentación completa de todas las API Routes del proyecto ADELCA E-Commerce.

## 🌐 Base URL

```
http://localhost:3000/api
```

En producción:
```
https://your-domain.com/api
```

## 🔑 Autenticación

Todas las API routes protegidas requieren autenticación mediante **Supabase Auth**:

```typescript
const { data: { user }, error } = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
}
```

Las cookies de sesión se envían automáticamente con cada request.

## 📋 Categorías de APIs

### Authentication
Gestión de autenticación de usuarios:
- `POST /api/auth/signin-email` - Login con email/password
- `POST /api/auth/signup-otp` - Registro con OTP
- `POST /api/auth/verify-otp` - Verificar código OTP
- `POST /api/auth/signin-google` - Login con Google
- `POST /api/auth/signout` - Cerrar sesión
- `GET /api/auth/session` - Obtener sesión actual

### Products
Catálogo de productos:
- `GET /api/products/search` - Buscar productos
- `GET /api/products/recent` - Productos recientes
- `GET /api/products/viewed` - Más vistos
- `GET /api/products/quoted` - Más cotizados
- `GET /api/products/featured` - Destacados
- `GET /api/products/by-category` - Por categoría
- `GET /api/products/[id]` - Detalle de producto

### Categories
Categorías de productos:
- `GET /api/categories` - Listar categorías

### Cart
Carrito de compras:
- `GET /api/cart` - Ver carrito
- `POST /api/cart/add` - Agregar producto
- `PATCH /api/cart/update` - Actualizar cantidad
- `DELETE /api/cart/remove` - Eliminar producto
- `DELETE /api/cart/clear` - Vaciar carrito
- `GET /api/cart/count` - Contar items

### Orders
Gestión de órdenes:
- `POST /api/orders/create` - Crear orden
- `GET /api/orders/my-orders` - Mis órdenes
- `GET /api/orders/[id]` - Detalle de orden

### Dashboard
Datos del dashboard (protegidas por rol):
- `GET /api/dashboard/stats` - Estadísticas
- `GET /api/dashboard/profile` - Perfil de usuario

## 🔒 Niveles de Protección

### Públicas
No requieren autenticación:
- `GET /api/products/*`
- `GET /api/categories`

### Autenticadas
Requieren usuario autenticado:
- `/api/cart/*`
- `/api/orders/*`
- `/api/dashboard/*`

### Por Rol
Requieren rol específico:
- `Admin`: `/api/dashboard/users/*`
- `Admin`, `Sales Rep`: `/api/dashboard/reports/*`

## 📦 Estructura de Respuestas

### Respuesta Exitosa

```json
{
  "success": true,
  "data": { ... },
  "message": "Mensaje opcional"
}
```

### Respuesta de Error

```json
{
  "error": "Descripción del error",
  "details": "Detalles adicionales (opcional)"
}
```

### Códigos HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Request exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error interno |

## 🛠️ Constantes de API

Todos los endpoints están definidos en `constants/api.ts`:

```typescript
import { apiEndpoints } from '@/constants/api';

// Usar endpoints
const response = await fetch(apiEndpoints.products.search);
const response = await fetch(apiEndpoints.cart.add);
const response = await fetch(apiEndpoints.orders.create);
```

## 📊 Rate Limiting

Actualmente no hay rate limiting implementado. En producción se recomienda:

- **Usuarios autenticados**: 100 requests/minuto
- **Usuarios anónimos**: 20 requests/minuto

## 🔐 Seguridad

Todas las APIs implementan:

1. **Autenticación** via Supabase Auth
2. **Row Level Security (RLS)** en la base de datos
3. **Validación** de entrada
4. **TypeScript** para type safety
5. **CORS** configurado adecuadamente

## 📚 Próximos Pasos

Explora la documentación detallada de cada categoría:

- [Authentication APIs](/docs/api/auth/signin)
- [Products APIs](/docs/api/products/list)
- [Cart APIs](/docs/api/cart/list)
- [Orders APIs](/docs/api/orders/create)
- [Dashboard APIs](/docs/api/dashboard/stats)

