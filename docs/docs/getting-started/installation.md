---
sidebar_position: 1
title: Instalación
---

# Instalación

Esta guía te ayudará a configurar el proyecto ADELCA E-Commerce en tu máquina local.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.0 o superior ([Descargar](https://nodejs.org/))
- **npm** o **yarn** (incluido con Node.js)
- **Git** ([Descargar](https://git-scm.com/))
- Una cuenta de **Supabase** ([Registrarse](https://supabase.com/))

## 🚀 Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/your-org/my-ecommerce.git
cd my-ecommerce
```

### 2. Instalar Dependencias

```bash
npm install
```

O si prefieres yarn:

```bash
yarn install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### 4. Configurar Supabase

#### Crear Proyecto en Supabase

1. Ve a [Supabase](https://supabase.com/)
2. Crea un nuevo proyecto
3. Copia la URL y las API keys

#### Ejecutar Migraciones

El proyecto incluye el esquema completo de la base de datos en `lib/supabase-schema.sql`.

1. Ve al **SQL Editor** en Supabase
2. Copia y pega el contenido de `lib/supabase-schema.sql`
3. Ejecuta la query

Esto creará:
- ✅ Todas las tablas (users, products, orders, cart, etc.)
- ✅ Tipos ENUM
- ✅ Políticas RLS
- ✅ Triggers y funciones
- ✅ Índices

### 5. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## ✅ Verificar la Instalación

### Prueba 1: Página de Inicio
Visita [http://localhost:3000](http://localhost:3000) y verifica que la página carga correctamente.

### Prueba 2: Autenticación
1. Ve a `/signup`
2. Crea una cuenta con email OTP
3. Verifica que recibes el código por email

### Prueba 3: Productos
1. Ve a `/productos`
2. Verifica que se cargan los productos

### Prueba 4: Dashboard
1. Inicia sesión
2. Ve a `/dashboard`
3. Verifica que carga el dashboard

## 🔧 Solución de Problemas

### Error: "Cannot connect to Supabase"

**Solución:**
- Verifica que las credenciales en `.env.local` sean correctas
- Asegúrate de que el proyecto Supabase esté activo
- Revisa que hayas ejecutado todas las migraciones

### Error: "Module not found"

**Solución:**
```bash
rm -rf node_modules
npm install
```

### Error: "Port 3000 already in use"

**Solución:**
```bash
# Cambia el puerto en package.json o usa:
npm run dev -- -p 3001
```

## 📦 Instalación para Producción

Para preparar el proyecto para producción:

```bash
# Build
npm run build

# Iniciar en modo producción
npm run start
```

## 📚 Siguiente Paso

- [Configuración del Entorno](/docs/getting-started/environment-setup) - Configuración detallada
- [Inicio Rápido](/docs/getting-started/quick-start) - Tutorial rápido

