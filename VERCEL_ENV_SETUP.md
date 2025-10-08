# 🚀 Configuración de Variables de Entorno para Vercel

## 📋 Variables de Entorno Requeridas

### **1. Variables de Entorno en Vercel**

Ve a tu proyecto en Vercel Dashboard → Settings → Environment Variables y agrega:

```bash
# API Base URL
NEXT_PUBLIC_API_BASE_URL=https://tu-app.vercel.app

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui

# Optional: Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

### **2. Variables de Entorno Locales**

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Local Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
```

## 🔧 Configuración por Ambiente

### **Desarrollo Local**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### **Staging (Preview)**
```bash
NEXT_PUBLIC_API_BASE_URL=https://tu-app-git-branch.vercel.app
```

### **Producción**
```bash
NEXT_PUBLIC_API_BASE_URL=https://tu-app.vercel.app
```

## 📁 Estructura de Constantes

### **Archivo: `constants/api.ts`**
```typescript
// Base API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

// Product API endpoints
export const baseUrlProducts = `${API_BASE_URL}/api/products`;
export const baseUrlCategories = `${API_BASE_URL}/api/categories`;

// Specific product endpoints
export const productEndpoints = {
  search: `${baseUrlProducts}/search`,
  recent: `${baseUrlProducts}/recent`,
  viewed: `${baseUrlProducts}/viewed`,
  quoted: `${baseUrlProducts}/quoted`,
  featured: `${baseUrlProducts}/featured`,
  byCategory: `${baseUrlProducts}/by-category`,
  byId: (id: string) => `${baseUrlProducts}/${id}`,
} as const;
```

## 🎯 Beneficios de esta Configuración

### **1. Flexibilidad por Ambiente**
- ✅ **Local:** `http://localhost:3001`
- ✅ **Staging:** `https://preview.vercel.app`
- ✅ **Producción:** `https://app.vercel.app`

### **2. Centralización de URLs**
- ✅ Todas las URLs en un solo archivo
- ✅ Fácil mantenimiento
- ✅ TypeScript autocompletado

### **3. Escalabilidad**
- ✅ Fácil agregar nuevos endpoints
- ✅ Soporte para múltiples APIs
- ✅ Configuración por ambiente

## 🚀 Cómo Usar

### **1. En Servicios**
```typescript
import { productEndpoints } from '@/constants/api';

// Usar endpoint específico
const response = await fetch(productEndpoints.search);
```

### **2. En Componentes**
```typescript
import { apiEndpoints } from '@/constants/api';

// Acceso a todos los endpoints
const productsUrl = apiEndpoints.products.search;
```

### **3. URLs Dinámicas**
```typescript
import { productEndpoints } from '@/constants/api';

// Para IDs dinámicos
const productUrl = productEndpoints.byId('product-123');
```

## 🔍 Verificación

### **1. Verificar Variables Locales**
```bash
# En terminal
echo $NEXT_PUBLIC_API_BASE_URL
```

### **2. Verificar en Vercel**
- Ve a Vercel Dashboard
- Settings → Environment Variables
- Verifica que todas las variables estén configuradas

### **3. Test de URLs**
```typescript
// En cualquier componente
console.log('API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
console.log('Product Endpoints:', productEndpoints);
```

## 📝 Ejemplo de Configuración Completa

### **Vercel Environment Variables:**
```bash
# Production
NEXT_PUBLIC_API_BASE_URL=https://adelca-ecommerce.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Preview (opcional)
NEXT_PUBLIC_API_BASE_URL=https://adelca-ecommerce-git-main.vercel.app
```

### **Local .env.local:**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ⚠️ Notas Importantes

### **1. Variables Públicas**
- `NEXT_PUBLIC_*` son accesibles en el cliente
- Usar solo para URLs y configuraciones públicas
- **NUNCA** poner API keys secretas

### **2. Variables Secretas**
- Para API keys secretas usar variables sin `NEXT_PUBLIC_`
- Accesibles solo en el servidor
- Ejemplo: `SUPABASE_SERVICE_ROLE_KEY`

### **3. Deployment**
- Reiniciar aplicación después de cambiar variables
- Verificar que todas las variables estén configuradas
- Test en preview antes de producción

## 🎉 Resultado Final

Con esta configuración tendrás:

- ✅ **URLs flexibles** por ambiente
- ✅ **Configuración centralizada** en constants/api.ts
- ✅ **Fácil deployment** en Vercel
- ✅ **TypeScript support** completo
- ✅ **Escalabilidad** para futuras APIs

**¡Tu aplicación estará lista para cualquier ambiente! 🚀**
