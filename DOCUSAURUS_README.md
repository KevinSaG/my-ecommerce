# 📚 Documentación ADELCA E-Commerce

Documentación completa del proyecto creada con Docusaurus.

## 🚀 Iniciar la Documentación

### Desarrollo

```bash
cd docs
npm start
```

La documentación estará disponible en [http://localhost:3000](http://localhost:3000)

### Build para Producción

```bash
cd docs
npm run build
```

Los archivos estáticos se generarán en `docs/build/`

### Servir Build Localmente

```bash
cd docs
npm run serve
```

## 📁 Estructura de la Documentación

```
docs/
├── docs/                          # Documentación principal
│   ├── intro.md                  # Introducción
│   ├── getting-started/          # Primeros pasos
│   │   ├── installation.md       # Instalación
│   │   ├── environment-setup.md  # Configuración
│   │   └── quick-start.md        # Inicio rápido
│   ├── architecture/             # Arquitectura
│   │   ├── overview.md           # Visión general
│   │   ├── folder-structure.md   # Estructura
│   │   ├── data-flow.md          # Flujo de datos
│   │   ├── rbac.md               # Control de roles
│   │   └── security.md           # Seguridad
│   ├── features/                 # Características
│   │   ├── authentication.md     # Autenticación
│   │   ├── products.md           # Productos
│   │   ├── cart.md               # Carrito
│   │   ├── checkout.md           # Checkout
│   │   ├── orders.md             # Órdenes
│   │   └── dashboard.md          # Dashboard
│   ├── database/                 # Base de datos
│   │   ├── schema.md             # Esquema
│   │   ├── rls-policies.md       # Políticas RLS
│   │   └── migrations.md         # Migraciones
│   ├── api/                      # API Reference
│   │   ├── overview.md           # Overview
│   │   ├── auth/                 # Auth APIs
│   │   ├── products/             # Products APIs
│   │   ├── cart/                 # Cart APIs
│   │   ├── orders/               # Orders APIs
│   │   └── dashboard/            # Dashboard APIs
│   ├── guides/                   # Guías
│   │   ├── getting-started.md    # Empezar
│   │   ├── creating-pages.md     # Crear páginas
│   │   ├── creating-apis.md      # Crear APIs
│   │   ├── creating-services.md  # Crear servicios
│   │   ├── using-hooks.md        # Usar hooks
│   │   ├── deployment/           # Despliegue
│   │   │   ├── vercel.md
│   │   │   ├── supabase.md
│   │   │   └── environment-variables.md
│   │   ├── code-examples.md      # Ejemplos
│   │   ├── best-practices.md     # Mejores prácticas
│   │   └── troubleshooting.md    # Solución de problemas
│   ├── roadmap.md                # Roadmap
│   └── faq.md                    # FAQ
├── blog/                          # Changelog/Blog
├── src/                           # Código fuente de Docusaurus
├── static/                        # Archivos estáticos
├── docusaurus.config.ts           # Configuración
└── sidebars.ts                    # Navegación
```

## 🎨 Características

### ✅ Implementado

- ✅ Configuración inicial de Docusaurus
- ✅ Estructura de navegación (sidebars)
- ✅ Página de introducción
- ✅ Documentación de instalación
- ✅ Documentación de arquitectura
- ✅ Documentación de features (Checkout)
- ✅ API Reference (Overview)
- ✅ Idioma en Español
- ✅ Tema claro/oscuro

### 🚧 Por Completar

- [ ] Documentación completa de todas las APIs
- [ ] Guías paso a paso
- [ ] Ejemplos de código interactivos
- [ ] Screenshots de la aplicación
- [ ] Video tutoriales
- [ ] Documentación de base de datos
- [ ] FAQ completo
- [ ] Roadmap detallado

## 📝 Cómo Contribuir

### Agregar una Nueva Página

1. Crea un archivo `.md` en `docs/docs/[categoria]/`
2. Agrega el frontmatter:

```md
---
sidebar_position: 1
title: Título de la Página
---

# Título de la Página

Contenido aquí...
```

3. Actualiza `sidebars.ts` si es necesario

### Agregar una Nueva Categoría

1. Crea una carpeta en `docs/docs/`
2. Agrega archivos `.md` dentro
3. Actualiza `sidebars.ts`:

```typescript
{
  type: 'category',
  label: 'Nueva Categoría',
  items: [
    'categoria/archivo1',
    'categoria/archivo2',
  ],
}
```

## 🎨 Personalización

### Colores y Temas

Edita `docs/src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #C41E3A;  /* Color de ADELCA */
  /* Más colores... */
}
```

### Logo

Reemplaza los archivos en `docs/static/img/`:
- `logo.svg` - Logo principal
- `favicon.ico` - Favicon

## 📦 Despliegue

### Vercel

```bash
# En la raíz del proyecto
vercel --prod
```

### GitHub Pages

```bash
cd docs
npm run deploy
```

### Build Manual

```bash
cd docs
npm run build
# Los archivos estarán en docs/build/
```

## 🔗 Enlaces

- **Documentación**: http://localhost:3000 (desarrollo)
- **Proyecto Principal**: http://localhost:3000 (Next.js app)
- **Supabase**: https://supabase.com/dashboard

## 📄 Licencia

Copyright © 2024 ADELCA E-Commerce

---

**¡La documentación está en construcción! Ayuda a completarla.** 🚀

