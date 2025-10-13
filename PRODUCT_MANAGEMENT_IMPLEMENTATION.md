# Gestión de Productos - Dashboard Admin

## Resumen de Implementación

Se ha implementado un sistema completo de gestión de productos para el dashboard del administrador, utilizando TanStack Table y shadcn/ui.

## 📁 Estructura de Archivos Creados

### 1. **API Endpoints** (`app/api/dashboard/products/`)

#### `route.ts` - Lista y Creación
- **GET** `/api/dashboard/products` - Lista productos con paginación y filtros
  - Parámetros: `page`, `limit`, `search`, `sortBy`, `sortOrder`, `category`, `is_active`
  - Control de acceso: admin y sales_rep
  - Respuesta paginada con metadatos

- **POST** `/api/dashboard/products` - Crear nuevo producto
  - Solo admin
  - Validación de SKU único
  - Campos completos según esquema de base de datos

#### `[id]/route.ts` - Operaciones por ID
- **GET** `/api/dashboard/products/[id]` - Obtener producto por ID
- **PATCH** `/api/dashboard/products/[id]` - Actualizar producto
  - Solo admin
  - Actualización parcial de campos permitidos
- **DELETE** `/api/dashboard/products/[id]` - Eliminar producto
  - Solo admin
  - Si tiene órdenes, desactiva en lugar de eliminar

### 2. **Servicios** (`services/dashboard/products/`)

#### Archivos creados:
- `getProducts.ts` - Obtener lista de productos (ya existía)
- `getProductById.ts` - Obtener producto específico ✨ NUEVO
- `createProduct.ts` - Crear nuevo producto ✨ NUEVO
- `updateProduct.ts` - Actualizar producto ✨ NUEVO
- `deleteProduct.ts` - Eliminar producto ✨ NUEVO
- `index.ts` - Exportación central ✨ ACTUALIZADO

Todos los servicios usan las constantes de `constants/api.ts`

### 3. **Constantes Actualizadas** (`constants/api.ts`)

```typescript
products: {
  list: `${baseUrlDashboard}/products`,
  byId: (id: string) => `${baseUrlDashboard}/products/${id}`,
  create: `${baseUrlDashboard}/products`,
  update: (id: string) => `${baseUrlDashboard}/products/${id}`,
  delete: (id: string) => `${baseUrlDashboard}/products/${id}`,
}
```

### 4. **Páginas del Dashboard**

#### `app/dashboard/productos/page.tsx` - Lista de Productos ✨ NUEVO
Características:
- ✅ Tabla con TanStack Table
- ✅ Paginación del lado del servidor
- ✅ Búsqueda por nombre/SKU
- ✅ Filtros por categoría y estado
- ✅ Ordenamiento por columnas
- ✅ Acciones: Editar y Eliminar
- ✅ Modal de confirmación para eliminar
- ✅ Botón para crear nuevo producto
- ✅ Estados de carga

#### `app/dashboard/productos/[id]/page.tsx` - Editar Producto ✨ NUEVO
Características:
- ✅ Formulario completo con react-hook-form + zod
- ✅ Validación de campos
- ✅ Secciones organizadas:
  - Información Básica (SKU, nombre, categoría, descripción)
  - Especificaciones Técnicas (dimensiones, peso, grado)
  - Precios e Inventario (precios, cantidad mínima, stock)
  - SEO y Metadata (slug, meta tags)
- ✅ Checkbox para estado activo/inactivo
- ✅ Checkbox para requiere cotización
- ✅ Estados de carga
- ✅ Notificaciones con sonner

#### `app/dashboard/productos/nuevo/page.tsx` - Crear Producto ✨ NUEVO
Características:
- ✅ Mismo formulario que edición
- ✅ Valores por defecto apropiados
- ✅ Validación completa
- ✅ Redirección automática después de crear

### 5. **Componentes UI** (shadcn)

Componentes instalados/utilizados:
- ✅ `table` - Para la tabla de datos
- ✅ `dialog` - Para modales de confirmación
- ✅ `form` - Para formularios con validación
- ✅ `select` - Para dropdowns
- ✅ `sonner` - Para notificaciones toast
- ✅ `input`, `textarea`, `checkbox` - Inputs de formulario
- ✅ `badge` - Para mostrar estados
- ✅ `card` - Para organizar contenido

### 6. **Layout Principal** (`app/layout.tsx`) ✨ ACTUALIZADO

Se agregó el componente `<Toaster />` de sonner para las notificaciones globales.

## 🎨 Características Implementadas

### Tabla de Productos
- **Columnas**:
  - SKU (ordenable)
  - Nombre (ordenable, truncado)
  - Categoría (con badge)
  - Precio (ordenable, formateado como USD)
  - Estado (badge: Activo/Inactivo)
  - Acciones (Editar/Eliminar)

- **Filtros**:
  - Búsqueda por texto (nombre/SKU)
  - Filtro por categoría
  - Filtro por estado (activo/inactivo)
  - Selector de items por página (10, 20, 50, 100)

- **Paginación**:
  - Navegación por páginas
  - Indicador de página actual
  - Contador de resultados

### Formulario de Producto

#### Validaciones:
- SKU: requerido, único
- Nombre: requerido
- Categoría: requerida
- Precios: números positivos
- Peso: número positivo
- Cantidad mínima: número entero positivo

#### Campos Organizados:

**Información Básica:**
- SKU
- Categoría
- Nombre
- Descripción

**Especificaciones Técnicas:**
- Diámetro (mm)
- Longitud (m)
- Ancho (mm)
- Espesor (mm)
- Peso por unidad (kg)
- Grado del acero

**Precios e Inventario:**
- Precio base (USD)
- Precio por kg (USD)
- Cantidad mínima de pedido
- Unidad de stock (unidad, kg, ton, metro)
- Producto activo (checkbox)
- Requiere cotización (checkbox)

**SEO y Metadata:**
- Slug (URL)
- Meta title
- Meta description

## 🔐 Seguridad

### Control de Acceso
- **Admin**: Acceso completo (crear, editar, eliminar)
- **Sales Rep**: Solo lectura (ver productos)
- Verificación en cada endpoint
- Validación de sesión de Supabase

### Validaciones
- SKU único al crear/editar
- Protección contra eliminación si tiene órdenes
- Desactivación automática en lugar de eliminación cuando tiene dependencias

## 🚀 Uso

### Acceder a la Gestión de Productos
1. Iniciar sesión como administrador
2. Navegar a `/dashboard/productos`

### Crear Nuevo Producto
1. Click en "Nuevo Producto"
2. Llenar formulario
3. Click en "Crear Producto"

### Editar Producto
1. Click en el ícono de editar (lápiz) en la tabla
2. Modificar campos deseados
3. Click en "Guardar Cambios"

### Eliminar Producto
1. Click en el ícono de eliminar (papelera) en la tabla
2. Confirmar en el modal
3. Si tiene órdenes, se desactivará en lugar de eliminarse

### Buscar y Filtrar
- Usar el campo de búsqueda para buscar por nombre o SKU
- Seleccionar categoría en el dropdown
- Filtrar por estado (activo/inactivo)
- Ajustar items por página

## 📦 Dependencias Instaladas

```json
{
  "@tanstack/react-table": "^8.x.x",
  "react-hook-form": "^7.65.0",
  "@hookform/resolvers": "^5.2.2",
  "zod": "^4.1.12"
}
```

## 🎯 Categorías de Productos Soportadas

- Varillas (rebar)
- Alambre (wire)
- Malla (mesh)
- Perfiles (profiles)
- Planchas (sheets)
- Tubos (tubes)
- Ángulos (angles)
- Canales (channels)
- Vigas (beams)
- Accesorios (accessories)

## 🔄 Flujo de Datos

1. **Cliente** → Página de productos
2. **Página** → Servicio (ej: `getDashboardProducts()`)
3. **Servicio** → API Endpoint (usando constantes de `constants/api.ts`)
4. **API** → Supabase (validación + query)
5. **Supabase** → API (datos)
6. **API** → Servicio (respuesta formateada)
7. **Servicio** → Página (actualiza estado)
8. **Página** → Cliente (render)

## ✅ Testing Sugerido

1. **Crear Producto**
   - [ ] Crear producto con todos los campos
   - [ ] Crear producto con campos mínimos
   - [ ] Validar SKU duplicado

2. **Editar Producto**
   - [ ] Editar campos básicos
   - [ ] Editar especificaciones técnicas
   - [ ] Cambiar estado activo/inactivo
   - [ ] Validar SKU duplicado en edición

3. **Eliminar Producto**
   - [ ] Eliminar producto sin órdenes
   - [ ] Intentar eliminar producto con órdenes (debe desactivar)

4. **Búsqueda y Filtros**
   - [ ] Buscar por nombre
   - [ ] Buscar por SKU
   - [ ] Filtrar por categoría
   - [ ] Filtrar por estado
   - [ ] Combinar filtros

5. **Paginación**
   - [ ] Navegar entre páginas
   - [ ] Cambiar items por página
   - [ ] Verificar contador de resultados

## 🐛 Notas de Depuración

- Todos los errores se registran en la consola
- Las notificaciones toast muestran mensajes de éxito/error
- Los estados de carga previenen acciones duplicadas
- La validación en frontend y backend asegura consistencia

## 📝 Próximas Mejoras Sugeridas

1. **Imágenes de Producto**
   - Upload de imágenes
   - Galería de imágenes
   - Preview de imágenes

2. **Importación/Exportación**
   - Importar productos desde CSV/Excel
   - Exportar catálogo a PDF
   - Exportar a Excel

3. **Gestión de Inventario**
   - Control de stock por planta
   - Alertas de stock bajo
   - Historial de cambios

4. **Auditoría**
   - Log de cambios
   - Quién y cuándo modificó

5. **Productos Relacionados**
   - Sugerencias de productos relacionados
   - Productos complementarios

---

**Implementado por:** AI Assistant
**Fecha:** Octubre 2024
**Stack:** Next.js 14, TanStack Table, shadcn/ui, Supabase

