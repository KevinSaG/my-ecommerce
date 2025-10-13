# 🏭 Adelca E-Commerce Platform

Plataforma de e-commerce moderna para **Adelca** (Acería del Ecuador), construida con Next.js 15, TypeScript, Tailwind CSS, shadcn/ui y Supabase.

## ✨ Características Principales

- 🎨 **shadcn/ui** - Componentes UI accesibles y personalizables (Radix UI + Tailwind)
- 🔐 **Supabase Auth** - Autenticación completa con RLS (Row Level Security)
- 🗄️ **PostgreSQL** - Base de datos robusta con schema e-commerce completo
- 🎯 **TypeScript** - Type safety en toda la aplicación
- 📱 **Responsive Design** - Diseño adaptativo mobile-first
- ⚡ **Next.js 15** - Server Components y App Router
- 🎨 **Tailwind CSS** - Utility-first styling
- 🌐 **Identidad Adelca** - Colores y branding corporativo

---

## 🚀 Getting Started

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Supabase

### Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**

Crear archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

3. **Aplicar migraciones de base de datos:**

Ejecutar el SQL en `lib/supabase-schema.sql` en tu Supabase project.

4. **Ejecutar servidor de desarrollo:**
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### 📦 Agregar componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

Ejemplo:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add form input
npx shadcn@latest add dropdown-menu
```

---

## 📁 Estructura del Proyecto

```
my-ecommerce/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home page (con shadcn/ui)
│   ├── login/               # Página de login
│   ├── dashboard/           # Dashboard protegido
│   └── globals.css          # Estilos globales + shadcn/ui
├── components/              # Componentes React
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── carousel.tsx
│   │   └── separator.tsx
│   ├── Navbar.tsx           # Navegación principal
│   ├── HeroBanner.tsx       # Banner hero con slides
│   ├── ProductCarousel.tsx  # Carrusel de productos
│   └── CategoryGrid.tsx     # Grid de categorías
├── lib/                     # Utilidades y configuración
│   ├── supabase/            # Cliente Supabase
│   ├── utils.ts             # Utilidades shadcn/ui
│   ├── supabase-schema.sql  # Schema de base de datos
│   └── constants.ts         # Constantes de la app
├── services/                # Servicios de datos
│   └── public/
│       └── products/
│           └── getData.ts   # Funciones para productos
└── public/                  # Archivos estáticos
```

---

## 🎨 Componentes Disponibles

### shadcn/ui Components
- ✅ **Button** - Variantes: default, outline, ghost, link
- ✅ **Card** - Con Header, Content, Footer, Title
- ✅ **Badge** - Variantes: default, secondary, destructive
- ✅ **NavigationMenu** - Menú de navegación accesible
- ✅ **Separator** - Divisores semánticos
- ✅ **Carousel** - Para implementación futura

### Componentes Personalizados
- ✅ **Navbar** - Navegación con menú responsive y carrito
- ✅ **HeroBanner** - Slides automáticos con CTAs y features
- ✅ **ProductCarousel** - Carrusel horizontal de productos con scroll
- ✅ **CategoryGrid** - Grid responsive de categorías con iconos

---

## 📚 Documentación

### Documentación Interactiva (Docusaurus)
```bash
npm run docs
```
Visita [http://localhost:3001](http://localhost:3001) para ver la documentación completa.

### Documentación Markdown
- **[HOME_PAGE_SUMMARY.md](./HOME_PAGE_SUMMARY.md)** - Documentación completa de la home page
- **[SHADCN_INTEGRATION.md](./SHADCN_INTEGRATION.md)** - Guía de integración shadcn/ui
- **[lib/SCHEMA_README.md](./lib/SCHEMA_README.md)** - Documentación del schema de base de datos
- **[lib/AUTH_README.md](./lib/AUTH_README.md)** - Guía de autenticación
- **[SEED_DATA_SUMMARY.md](./SEED_DATA_SUMMARY.md)** - Datos de prueba insertados
- **[__tests__/README.md](./__tests__/README.md)** - Guía de testing

### Guías Técnicas
- **API Documentation** - Ver `docs/docs/api/`
- **Testing Guide** - Ver `docs/docs/testing/`
- **Deployment Guide** - Ver `docs/docs/guides/deployment/`

---

## 🎯 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 15.5.4 | Framework React con App Router |
| **TypeScript** | 5.7.3 | Tipado estático |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |
| **shadcn/ui** | latest | Componentes UI accesibles |
| **Radix UI** | latest | Primitivos UI sin estilos |
| **Supabase** | 2.46.2 | Base de datos y Auth |
| **React** | 19.0.0 | Biblioteca UI |

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (http://localhost:3000)
npm run build            # Build de producción
npm run start            # Servidor de producción
npm run lint             # Linter ESLint

# Testing
npm test                 # Ejecutar tests
npm run test:watch       # Tests en watch mode
npm run test:coverage    # Coverage report

# Documentación
npm run docs             # Iniciar Docusaurus
npm run docs:build       # Build de documentación
npm run docs:serve       # Servir docs en producción
```

---

## 🎨 Paleta de Colores Adelca

```css
/* Colores Primarios */
--slate-900: #0f172a;  /* Navbar, Footer, Backgrounds oscuros */
--slate-800: #1e293b;  /* Gradientes, Secciones alternadas */

/* Colores de Acento */
--orange-500: #f97316; /* CTAs principales, Links activos */
--orange-600: #ea580c; /* Hover states, Estados activos */

/* Colores Secundarios */
--slate-100: #f1f5f9;  /* Backgrounds claros, Cards */
--slate-600: #475569;  /* Textos secundarios */
--white: #ffffff;      /* Textos en fondos oscuros */
```

### Uso en componentes:

```tsx
// Botón primario Adelca
<Button className="bg-orange-500 hover:bg-orange-600">
  Comprar Ahora
</Button>

// Badge con acento
<Badge className="bg-orange-500">Nuevo</Badge>

// Navbar gradient
<nav className="bg-gradient-to-r from-slate-800 to-slate-900">
```

---

## 🗄️ Base de Datos

### Schema Principal

El schema incluye:
- ✅ **users & user_profiles** - Gestión de usuarios
- ✅ **products & product_inventory** - Catálogo multi-planta
- ✅ **orders & order_items** - Sistema de pedidos
- ✅ **quotes & quote_items** - Sistema de cotizaciones B2B
- ✅ **carts** - Carritos de compra
- ✅ **categories** - Categorías de productos
- ✅ **reviews** - Sistema de reseñas
- ✅ **payments** - Gestión de pagos
- ✅ **notifications** - Sistema de notificaciones
- ✅ **promotions** - Promociones y descuentos

### Características especiales:
- 🔒 Row Level Security (RLS) implementado
- 🏭 Multi-plant inventory (Alóag, Milagro)
- 💰 Pricing B2B/B2C diferenciado
- 📊 Activity logging
- 🔄 Triggers automáticos

Ver [lib/SCHEMA_README.md](./lib/SCHEMA_README.md) para detalles completos.

---

## 🔐 Autenticación

### Usuario Admin Predeterminado:


### Funciones disponibles:
- ✅ `signUp()` - Registro de usuarios
- ✅ `signIn()` - Inicio de sesión
- ✅ `signOut()` - Cerrar sesión
- ✅ `getUser()` - Obtener usuario actual
- ✅ `getUserProfile()` - Obtener perfil completo

Ver [lib/AUTH_README.md](./lib/AUTH_README.md) para más detalles.

---

## 🚢 Deploy en Vercel

1. **Push a Git:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Importar en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio
   - Vercel detectará Next.js automáticamente

3. **Configurar variables de entorno:**
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. **Deploy!** 🚀

Ver [documentación de deployment](https://nextjs.org/docs/app/building-your-application/deploying) para más opciones.

---

## 📊 Performance

### Build Stats:
```
Route (app)                  Size  First Load JS
┌ ƒ /                    27.1 kB       129 kB
├ ○ /_not-found           992 B        103 kB
├ ƒ /dashboard            123 B        102 kB
└ ○ /login              49.2 kB        151 kB

✓ Compiled successfully in 4.1s
```

### Optimizaciones:
- ✅ Server Components (RSC)
- ✅ Automatic code splitting
- ✅ Tree shaking
- ✅ Image optimization (Next.js)
- ✅ CSS purging (Tailwind)

---

## 🛠️ Desarrollo

### Agregar nuevas páginas:

```tsx
// app/productos/page.tsx
export default function ProductosPage() {
  return <div>Productos</div>
}
```

### Agregar nuevos componentes shadcn/ui:

```bash
# Ver componentes disponibles
npx shadcn@latest add

# Agregar componente específico
npx shadcn@latest add dialog

# Agregar múltiples
npx shadcn@latest add form input textarea select
```

### Usar componentes:

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function MyPage() {
  return (
    <Card>
      <CardHeader>Título</CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

---

## 🧪 Testing

El proyecto incluye tests unitarios con **Jest** y **React Testing Library**.

```bash
# Ejecutar todos los tests
npm test

# Watch mode (desarrollo)
npm run test:watch

# Coverage report
npm run test:coverage
```

### Tests Disponibles:
- ✅ **Services** - Tests de servicios (API calls)
- ✅ **Components** - Tests de componentes React
- ✅ **Integration** - Tests de integración (en desarrollo)

Ver [__tests__/README.md](./__tests__/README.md) para guía completa de testing.

---

## 🤝 Contribuir

Este es un proyecto privado de Adelca. Para contribuir:

1. Crear una rama: `git checkout -b feature/nueva-feature`
2. Commit cambios: `git commit -m 'Add nueva feature'`
3. Push a la rama: `git push origin feature/nueva-feature`
4. Abrir Pull Request

---

## 📝 Licencia

Este proyecto es privado y pertenece a **Adelca - Acería del Ecuador**.

---

## 👥 Equipo

Desarrollado para **Adelca - Acería del Ecuador**
- 🏭 Fundada en 1963
- 🌱 Comprometidos con la sostenibilidad
- 🔧 Líderes en productos siderúrgicos en Ecuador

---

## 📞 Contacto

- **Web:** [adelca.com](https://www.adelca.com)
- **Tel:** (593 2) 380 1321
- **Email:** info@adelca.com
- **Plantas:**
  - 📍 Alóag, Pichincha
  - 📍 Milagro, Guayas

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

---

**¿Necesitas ayuda?** Revisa la documentación en los archivos `*_SUMMARY.md` y `*_README.md` del proyecto.

---

**🎉 ¡Página de inicio completamente funcional, accesible y lista para producción con shadcn/ui!**
