# Introducción

Bienvenido a la documentación de **My E-commerce** - Una plataforma moderna de comercio electrónico para productos industriales construida con Next.js 15, Supabase y TypeScript.

## 🚀 Características Principales

- ✅ **Autenticación Completa**: Email/Password y Google OAuth
- ✅ **Dashboard por Roles**: Admin, Sales Rep, y Customer
- ✅ **Gestión de Productos**: CRUD completo con TanStack Table
- ✅ **Gestión de Órdenes**: Visualización y seguimiento de pedidos
- ✅ **Carrito de Compras**: Sistema completo con persistencia
- ✅ **Sistema de Cotizaciones**: Para productos que requieren cotización
- ✅ **Multi-planta**: Soporte para múltiples ubicaciones (Aloag, Milagro)

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **UI**: Shadcn/ui + Tailwind CSS
- **Estado**: React Hooks + Context API
- **Formularios**: React Hook Form + Zod
- **Tablas**: TanStack Table v8

### Backend
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage (para imágenes)
- **API**: Next.js API Routes

### Testing
- **Framework**: Jest
- **Testing Library**: React Testing Library
- **Coverage**: Jest Coverage

## 📚 Estructura de la Documentación

<div className="button-group">
  <a href="./getting-started/installation" className="button button--primary">
    Instalación
  </a>
  <a href="./architecture/overview" className="button button--secondary">
    Arquitectura
  </a>
  <a href="./api/overview" className="button button--secondary">
    API Reference
  </a>
</div>

## 🎯 Casos de Uso

### Para Clientes (Customers)
- Navegar catálogo de productos
- Agregar productos al carrito
- Crear órdenes de compra
- Ver historial de órdenes
- Solicitar cotizaciones

### Para Administradores (Admin)
- Gestionar productos (crear, editar, eliminar)
- Ver estadísticas del dashboard
- Gestionar inventario
- Procesar órdenes

### Para Representantes de Ventas (Sales Rep)
- Ver productos y stock
- Crear cotizaciones para clientes
- Ver órdenes asignadas

## 🚦 Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone [repository-url]

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Ejecutar en desarrollo
npm run dev

# 5. Ejecutar tests
npm test
```

## 📖 Siguientes Pasos

1. [Instalación y Configuración](./getting-started/installation)
2. [Arquitectura del Sistema](./architecture/overview)
3. [Guía de API](./api/overview)
4. [Base de Datos](./database/overview)
5. [Deployment](./guides/deployment/vercel)

## 🤝 Contribuir

Para contribuir al proyecto, por favor lee nuestra [guía de contribución](./guides/contributing).

## 📝 Licencia

Este proyecto está licenciado bajo [MIT License](./LICENSE).
