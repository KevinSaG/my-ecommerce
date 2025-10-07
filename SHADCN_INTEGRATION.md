# 🎨 Integración de shadcn/ui - Adelca E-Commerce

## ✅ Actualización Completa con shadcn/ui

Se ha migrado toda la interfaz de usuario para usar **shadcn/ui**, una colección de componentes reutilizables construidos con **Radix UI** y **Tailwind CSS**.

---

## 📦 Componentes shadcn/ui Instalados

### Componentes Base:
- ✅ **Button** - Botones con variantes (default, outline, ghost, link)
- ✅ **Card** - Tarjetas con CardHeader, CardContent, CardFooter, CardTitle
- ✅ **Badge** - Etiquetas con variantes (default, secondary, destructive)
- ✅ **Carousel** - Carruseles avanzados (instalado para futuro uso)
- ✅ **NavigationMenu** - Menús de navegación accesibles
- ✅ **Separator** - Separadores visuales

---

## 🔄 Componentes Actualizados

### 1. **Navbar** (`components/Navbar.tsx`)

#### Antes:
```tsx
<button className="hover:text-orange-400">...</button>
<Link className="bg-orange-500 hover:bg-orange-600">...</Link>
```

#### Después (con shadcn/ui):
```tsx
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';

<Button variant="ghost" size="icon">...</Button>
<NavigationMenu>
  <NavigationMenuItem>...</NavigationMenuItem>
</NavigationMenu>
<Badge variant="destructive">0</Badge>
```

**Mejoras:**
- ✅ Botones consistentes con variantes `ghost` y `icon`
- ✅ NavigationMenu accesible (ARIA compliant)
- ✅ Badge para contador del carrito
- ✅ Mejor estados de hover y focus

---

### 2. **HeroBanner** (`components/HeroBanner.tsx`)

#### Antes:
```tsx
<Link className="bg-orange-500 hover:bg-orange-600 px-8 py-4">
  {slide.cta}
</Link>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
  ...
</div>
```

#### Después (con shadcn/ui):
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

<Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
  <Link href={slide.link}>{slide.cta}</Link>
</Button>

<Card className="bg-white/10 backdrop-blur-sm border-white/20">
  ...
</Card>
```

**Mejoras:**
- ✅ Botones con tamaños consistentes (`size="lg"`)
- ✅ Cards reutilizables para features
- ✅ Patrón `asChild` para composición correcta
- ✅ Mejor accesibilidad

---

### 3. **ProductCarousel** (`components/ProductCarousel.tsx`)

#### Antes:
```tsx
<div className="bg-white rounded-xl shadow-md hover:shadow-xl">
  <div className="p-6">
    <span className="text-orange-500">...</span>
    <h3>...</h3>
  </div>
  <Link className="block w-full bg-orange-500">Ver Detalles</Link>
</div>
```

#### Después (con shadcn/ui):
```tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

<Card className="flex-shrink-0 w-72 hover:shadow-xl">
  <CardHeader className="p-0">
    <Badge className="absolute top-4 right-4">
      {getTotalStock(product.inventory)} und
    </Badge>
  </CardHeader>
  <CardContent className="p-6 pb-4">
    <Badge variant="secondary">{product.category}</Badge>
    <CardTitle>{product.name}</CardTitle>
  </CardContent>
  <CardFooter className="p-6 pt-0">
    <Button className="w-full" asChild>
      <Link href={`/productos/${product.id}`}>Ver Detalles</Link>
    </Button>
  </CardFooter>
</Card>
```

**Mejoras:**
- ✅ Estructura semántica con Card, CardHeader, CardContent, CardFooter
- ✅ Badges para categoría y stock
- ✅ Botones de navegación (scroll) con `variant="outline"`
- ✅ CardTitle para títulos consistentes
- ✅ Mejor separación de concerns

---

### 4. **CategoryGrid** (`components/CategoryGrid.tsx`)

#### Antes:
```tsx
<Link className="group relative bg-white rounded-2xl shadow-md">
  <div className="relative p-8 text-center">
    <h3>...</h3>
  </div>
</Link>
```

#### Después (con shadcn/ui):
```tsx
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

<Link className="group">
  <Card className="relative hover:shadow-2xl">
    <CardContent className="relative p-8 text-center">
      <h3>...</h3>
    </CardContent>
  </Card>
</Link>

<Button size="lg" className="bg-orange-500" asChild>
  <Link href="/categorias">Ver Todas las Categorías</Link>
</Button>
```

**Mejoras:**
- ✅ Cards consistentes para categorías
- ✅ Botón "Ver Todas" con shadcn Button
- ✅ Mejor estructura semántica
- ✅ Transiciones suaves mantenidas

---

### 5. **Home Page** (`app/page.tsx`)

#### Antes:
```tsx
<a href="/contacto" className="bg-orange-500 hover:bg-orange-600 px-8 py-4">
  Solicitar Cotización
</a>
<div className="border-t border-slate-800 mt-8 pt-8">
  ...
</div>
```

#### Después (con shadcn/ui):
```tsx
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

<Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
  <Link href="/contacto">Solicitar Cotización</Link>
</Button>

<Separator className="mt-8 bg-slate-800" />
```

**Mejoras:**
- ✅ CTAs con Button component
- ✅ Separator para divisores semánticos
- ✅ Consistencia en toda la página

---

## 🎯 Beneficios de shadcn/ui

### 1. **Accesibilidad (A11y)**
- ✅ Componentes construidos sobre **Radix UI**
- ✅ ARIA labels automáticos
- ✅ Navegación por teclado
- ✅ Screen reader friendly
- ✅ Focus management

### 2. **Personalización**
- ✅ Código fuente en tu proyecto (`components/ui/`)
- ✅ 100% customizable
- ✅ CSS variables para temas
- ✅ Tailwind CSS integrado

### 3. **Consistencia**
- ✅ Design system unificado
- ✅ Variantes predefinidas (default, outline, ghost, etc.)
- ✅ Tamaños consistentes (sm, md, lg)
- ✅ Colores y espaciado uniformes

### 4. **Developer Experience**
- ✅ TypeScript completo
- ✅ IntelliSense en IDE
- ✅ Props tipados
- ✅ Composable con `asChild`

### 5. **Performance**
- ✅ Tree-shaking automático
- ✅ Solo importas lo que usas
- ✅ Bundle size optimizado
- ✅ Sin runtime overhead

---

## 📊 Comparación de Bundle Size

### Antes (sin shadcn/ui):
```
Route (app)                  Size  First Load JS
┌ ƒ /                     7.63 kB      110 kB
```

### Después (con shadcn/ui):
```
Route (app)                  Size  First Load JS
┌ ƒ /                    27.1 kB      129 kB
```

**Incremento:** +19 kB (razonable por componentes accesibles y robustos)

---

## 🎨 Configuración de shadcn/ui

### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### CSS Variables (app/globals.css)
shadcn/ui agregó variables CSS automáticamente:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... */
  }
}
```

---

## 🔧 Utilidades Agregadas

### `lib/utils.ts`
shadcn/ui agregó función `cn()` para merge de clases:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Uso:**
```tsx
<Button className={cn("bg-orange-500", isActive && "bg-orange-600")}>
  Click me
</Button>
```

---

## 📁 Estructura de Archivos Actualizada

```
components/
├── ui/                       # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── carousel.tsx
│   ├── navigation-menu.tsx
│   └── separator.tsx
├── Navbar.tsx               # Usa shadcn/ui
├── HeroBanner.tsx           # Usa shadcn/ui
├── ProductCarousel.tsx      # Usa shadcn/ui
└── CategoryGrid.tsx         # Usa shadcn/ui

lib/
├── utils.ts                 # Utilidades shadcn/ui
├── supabase/
└── ...

app/
├── globals.css              # Con CSS variables shadcn/ui
└── page.tsx                 # Usa shadcn/ui
```

---

## 🚀 Comandos Útiles

### Agregar nuevos componentes:
```bash
npx shadcn@latest add [component-name]
```

### Ejemplos:
```bash
# Agregar dialog
npx shadcn@latest add dialog

# Agregar form components
npx shadcn@latest add input textarea select

# Agregar dropdown menu
npx shadcn@latest add dropdown-menu

# Ver todos los componentes disponibles
npx shadcn@latest add
```

---

## 🎨 Paleta de Colores Adelca con shadcn/ui

### Colores Personalizados (mantenidos):
```css
/* Orange (Adelca accent) */
.bg-orange-500 { background-color: #f97316; }
.bg-orange-600 { background-color: #ea580c; }

/* Slate (Adelca primary) */
.bg-slate-800 { background-color: #1e293b; }
.bg-slate-900 { background-color: #0f172a; }
```

### Uso con shadcn/ui:
```tsx
// Botón primario Adelca
<Button className="bg-orange-500 hover:bg-orange-600">
  Click me
</Button>

// Botón con variante outline
<Button variant="outline">
  Secondary
</Button>

// Badge con colores Adelca
<Badge className="bg-orange-500">New</Badge>
```

---

## ✅ Checklist de Migración

- [x] shadcn/ui instalado y configurado
- [x] Button component en Navbar
- [x] Button component en HeroBanner
- [x] Card component en ProductCarousel
- [x] Badge component en ProductCarousel
- [x] Card component en CategoryGrid
- [x] NavigationMenu en Navbar
- [x] Separator en Footer
- [x] Button component en Home page CTAs
- [x] Build exitoso sin errores
- [x] TypeScript sin errores
- [x] Estilos Adelca mantenidos

---

## 🔮 Próximos Pasos Sugeridos

### Componentes adicionales a integrar:

1. **Dialog** - Para modales y confirmaciones
   ```bash
   npx shadcn@latest add dialog
   ```

2. **Form** - Para formularios de contacto y cotización
   ```bash
   npx shadcn@latest add form input textarea select
   ```

3. **Dropdown Menu** - Para menú de usuario
   ```bash
   npx shadcn@latest add dropdown-menu
   ```

4. **Toast** - Para notificaciones
   ```bash
   npx shadcn@latest add toast
   ```

5. **Tabs** - Para categorías de productos
   ```bash
   npx shadcn@latest add tabs
   ```

6. **Sheet** - Para menú mobile mejorado
   ```bash
   npx shadcn@latest add sheet
   ```

7. **Skeleton** - Para loading states
   ```bash
   npx shadcn@latest add skeleton
   ```

8. **Accordion** - Para FAQs
   ```bash
   npx shadcn@latest add accordion
   ```

---

## 📚 Recursos

- **Documentación oficial:** https://ui.shadcn.com
- **Componentes disponibles:** https://ui.shadcn.com/docs/components
- **Temas:** https://ui.shadcn.com/themes
- **Ejemplos:** https://ui.shadcn.com/examples

---

## 🎉 Resumen

✅ **Migración completa a shadcn/ui**
✅ **6 componentes shadcn/ui instalados**
✅ **4 componentes personalizados actualizados**
✅ **Accesibilidad mejorada**
✅ **Consistencia visual**
✅ **Developer experience mejorada**
✅ **Build exitoso: 129 kB First Load JS**
✅ **Identidad de marca Adelca preservada**

**La aplicación ahora usa un design system moderno, accesible y totalmente personalizable!** 🚀

