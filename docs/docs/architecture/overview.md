---
sidebar_position: 1
title: Visión General
---

# Arquitectura del Sistema

## 🎯 Visión General

ADELCA E-Commerce sigue una arquitectura de capas bien definida que separa las responsabilidades y facilita el mantenimiento del código.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Estado**: React Hooks + Context API

### Backend
- **API**: Next.js API Routes (Serverless)
- **Base de Datos**: PostgreSQL (Supabase)
- **Autenticación**: Supabase Auth
- **ORM**: Supabase Client

### Deployment
- **Frontend**: Vercel
- **Backend/DB**: Supabase
- **Storage**: Supabase Storage

## Arquitectura de Capas

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

## Flujo de Datos

### Flujo Típico de una Request

1. **Usuario** hace una acción en el UI
2. **Componente** llama a una función del **Service Layer**
3. **Service** hace una petición HTTP a una **API Route**
4. **API Route** valida la autenticación y autorización
5. **API Route** interactúa con **Supabase**
6. **Supabase** aplica políticas RLS y ejecuta la query
7. **API Route** devuelve la respuesta
8. **Service** transforma los datos si es necesario
9. **Componente** actualiza el UI

### Ejemplo Práctico

```typescript
// 1. Usuario hace click en "Agregar al Carrito"
<AddToCartButton onClick={() => handleAddToCart(product)} />

// 2. Componente llama al service
const handleAddToCart = async (product) => {
  const result = await addToCart(product.id, 1);
}

// 3. Service hace la petición
export async function addToCart(productId, quantity) {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
}

// 4. API Route procesa
export async function POST(request) {
  const { user } = await supabase.auth.getUser();
  // ... validaciones ...
  const result = await supabase.from('cart_items').insert({ ... });
  return NextResponse.json(result);
}
```

## Principios de Diseño

### 1. Separation of Concerns (SoC)
Cada capa tiene una responsabilidad específica:
- **Components**: UI y lógica de presentación
- **Services**: Lógica de negocio y transformación de datos
- **APIs**: Autenticación, autorización y acceso a datos
- **Database**: Persistencia y reglas de negocio a nivel de datos

### 2. Single Source of Truth
- Las **API Routes** son la única fuente de acceso a Supabase desde el frontend
- Las **constantes de API** centralizan todos los endpoints
- Los **tipos TypeScript** definen contratos claros

### 3. Security First
- **Row Level Security (RLS)** en todas las tablas
- **Validación** en múltiples capas
- **Autenticación** verificada en cada API route
- **Tipos ENUM** para valores predefinidos

### 4. Modularidad
- Código organizado por **dominios** (products, orders, cart, etc.)
- **Barrel exports** para imports limpios
- **Hooks reutilizables** para lógica común
- **Componentes** pequeños y enfocados

## Ventajas de esta Arquitectura

✅ **Mantenibilidad**: Código organizado y fácil de entender
✅ **Escalabilidad**: Fácil agregar nuevas features
✅ **Testabilidad**: Cada capa se puede testear independientemente
✅ **Seguridad**: Múltiples capas de validación y protección
✅ **Performance**: API Routes optimizadas y caching estratégico
✅ **Developer Experience**: TypeScript + ESLint + Prettier

## Próximos Pasos

- [Estructura de Carpetas](/docs/architecture/folder-structure) - Organización del código
- [Flujo de Datos](/docs/architecture/data-flow) - Flujo detallado de requests
- [RBAC](/docs/architecture/rbac) - Control de acceso basado en roles
- [Seguridad](/docs/architecture/security) - Prácticas de seguridad

