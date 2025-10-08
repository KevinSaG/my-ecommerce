---
sidebar_position: 1
title: Introducción
---

# ADELCA E-Commerce Documentation

Bienvenido a la documentación oficial de **ADELCA E-Commerce**, una plataforma de comercio electrónico B2B desarrollada con Next.js, TypeScript y Supabase.

## 🎯 Visión General

ADELCA E-Commerce es una aplicación web completa diseñada para facilitar las ventas B2B de productos de acero, ofreciendo:

- 🛒 **Catálogo de Productos** con búsqueda y filtros avanzados
- 🔐 **Autenticación Segura** con email/password, OTP y Google Sign-In
- 🛍️ **Carrito de Compras** persistente con gestión de cantidades
- 💳 **Sistema de Checkout** con múltiples métodos de pago y envío
- 📦 **Gestión de Órdenes** con seguimiento y historial
- 📊 **Dashboard por Roles** (Admin, Sales Rep, Customer, Distributor)
- 🔒 **Control de Acceso** basado en roles (RBAC)

## 🏗️ Tecnologías

### Frontend
- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **shadcn/ui** - Componentes UI

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Supabase** - Base de datos PostgreSQL y autenticación
- **Row Level Security (RLS)** - Seguridad a nivel de datos

### Arquitectura
- **Frontend → Services → APIs → Supabase** - Flujo de datos claro
- **Modular** - Organización por dominios
- **Escalable** - Fácil de mantener y extender

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/your-org/my-ecommerce.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar el servidor de desarrollo
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📚 Siguiente Paso

- [Instalación](/docs/getting-started/installation) - Configuración del proyecto
- [Arquitectura](/docs/architecture/overview) - Entender la estructura del proyecto
- [API Reference](/docs/api/overview) - Documentación de las APIs
- [Guías](/docs/guides/getting-started) - Tutoriales paso a paso

## 🤝 Contribuir

Este proyecto sigue las mejores prácticas de desarrollo:

- Clean Code
- Arquitectura modular
- Documentación completa
- TypeScript estricto
- Seguridad first

## 📄 Licencia

Copyright © 2024 ADELCA E-Commerce
