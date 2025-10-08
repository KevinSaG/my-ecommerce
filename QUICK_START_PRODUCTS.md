# 🚀 Guía Rápida - Página de Productos

## Inicio Rápido

### 1️⃣ Ejecutar el Proyecto

```bash
npm run dev
```

### 2️⃣ Abrir en el Navegador

```
http://localhost:3000/productos
```

¡Listo! La página de productos está funcionando.

---

## 📋 Características Disponibles

### ✅ Búsqueda
- Campo de búsqueda en el sidebar
- Busca en **nombre** y **descripción** de productos
- Resultados en tiempo real

**Prueba:**
1. Escribe "varilla" en el buscador
2. Los resultados se filtran automáticamente

---

### ✅ Filtrar por Categorías
- Lista de checkboxes en sidebar
- Puedes seleccionar **múltiples categorías**
- Click para activar/desactivar

**Prueba:**
1. Marca "Varillas Corrugadas"
2. Marca también "Alambre"
3. Ve los productos de ambas categorías

---

### ✅ Filtrar por Precio
- Slider de rango con dos controles
- Ajusta **precio mínimo** y **máximo**
- Rango: $0 - $1000

**Prueba:**
1. Arrastra el control izquierdo a $50
2. Arrastra el control derecho a $200
3. Solo verás productos en ese rango

---

### ✅ Paginación
- 12 productos por página
- Botones "Anterior" y "Siguiente"
- Números de página clickeables
- Auto-scroll al cambiar página

**Prueba:**
1. Click en "Siguiente" o en "2"
2. Navega entre páginas
3. Observa el auto-scroll

---

### ✅ Limpiar Filtros
- Botón en el sidebar
- Resetea todo a valores por defecto
- Vuelve a la página 1

**Prueba:**
1. Aplica varios filtros
2. Click en "Limpiar Filtros"
3. Todo vuelve al inicio

---

## 📱 Diseño Responsivo

### Desktop (> 1024px)
- Sidebar fijo a la izquierda
- Grid de **3 columnas**
- Todos los filtros visibles

### Tablet (768px - 1024px)
- Grid de **2 columnas**
- Sidebar colapsable

### Mobile (< 768px)
- Grid de **1 columna**
- Sidebar como modal
- Botón "Filtros" para abrir

**Prueba:**
1. Redimensiona la ventana del navegador
2. Observa cómo se adapta el layout
3. En móvil, usa el botón "Filtros"

---

## 🎯 Endpoints API

Todas estas funcionalidades usan la API:

```
GET /api/products/search
```

**Parámetros opcionales:**
- `search` - Término de búsqueda
- `category` - Slug de categoría
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo
- `page` - Número de página
- `limit` - Productos por página

**Ejemplo manual:**
```
http://localhost:3000/api/products/search?search=varilla&page=1&limit=12
```

---

## 🔧 Personalización Rápida

### Cambiar productos por página

`app/productos/page.tsx`:
```typescript
const result = await searchProducts({
  ...filters,
  limit: 24 // Cambia de 12 a 24
});
```

### Cambiar rango de precio

`app/productos/page.tsx`:
```typescript
const [priceRange, setPriceRange] = useState<number[]>([0, 2000]); // Era 1000
```

Y en el Slider:
```typescript
<Slider
  min={0}
  max={2000} // Era 1000
  step={10}
  ...
/>
```

### Cambiar grid de columnas

`app/productos/page.tsx`:
```typescript
// Busca esta línea:
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

// Cambiar a 4 columnas en desktop:
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
```

---

## 🐛 Troubleshooting

### No veo productos
**Solución:**
1. Verifica que hay productos en Supabase
2. Verifica que `is_active = true`
3. Revisa la consola del navegador (F12)

### Los filtros no funcionan
**Solución:**
1. Abre la consola del navegador
2. Busca errores en Network tab
3. Verifica conexión a Supabase

### Error 500 en API
**Solución:**
1. Verifica variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Reinicia el servidor: `npm run dev`

### Sidebar no se ve en mobile
**Solución:**
1. Click en botón "Filtros" (arriba izquierda)
2. El sidebar debe aparecer

---

## 📚 Archivos Importantes

```
app/
├── api/products/search/route.ts    # API de búsqueda
├── productos/page.tsx              # Página principal

components/
├── Pagination.tsx                  # Componente paginación
└── ui/
    ├── input.tsx                   # Input de búsqueda
    ├── checkbox.tsx                # Checkboxes de categorías
    └── slider.tsx                  # Slider de precio

services/public/products/
└── getData.ts                      # Función searchProducts()
```

---

## ✨ Próximos Pasos

1. **Agrega más datos** a Supabase para probar paginación
2. **Personaliza** los colores y estilos a tu gusto
3. **Implementa** ordenamiento (por precio, nombre, etc.)
4. **Agrega** más filtros según tus necesidades

---

## 💡 Tips Útiles

### Tip 1: Ver la respuesta de la API
Abre la consola del navegador y en la pestaña Network, filtra por "search" para ver las peticiones a la API.

### Tip 2: Probar la API directamente
Abre en el navegador:
```
http://localhost:3000/api/products/search?limit=5
```

### Tip 3: Debugging
Agrega console.logs en `page.tsx`:
```typescript
useEffect(() => {
  console.log('Filtros aplicados:', filters);
  console.log('Productos:', products);
}, [filters, products]);
```

### Tip 4: Cambiar estilos
Todos los colores usan clases de Tailwind. Busca `adelca-primary` para cambiar el color principal.

---

## 🎉 ¡Disfruta!

La página está **completamente funcional** y lista para usar.

**Documentación completa en:**
- `PRODUCTS_PAGE_DOCUMENTATION.md`
- `PRODUCTS_IMPLEMENTATION_SUMMARY.md`
- `API_ROUTES_DOCUMENTATION.md`

**¿Preguntas?** Revisa la documentación o inspecciona el código! 🚀

