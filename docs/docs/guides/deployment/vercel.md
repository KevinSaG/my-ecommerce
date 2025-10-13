# Deployment a Vercel

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Cuenta en [Supabase](https://supabase.com)
- Repositorio de Git (GitHub, GitLab, Bitbucket)
- Proyecto configurado localmente

## 🚀 Pasos de Deployment

### 1. Preparar el Proyecto

Asegúrate de que tu proyecto funciona correctamente en local:

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Build de producción
npm run build

# Verificar build
npm start
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` con todas las variables necesarias:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# API
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com

# Optional: Analytics, etc
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Conectar con Vercel

#### Opción A: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de Git
4. Selecciona el framework: **Next.js**
5. Configura las variables de entorno
6. Click en "Deploy"

#### Opción B: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### 4. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_BASE_URL
```

**Importante**: Configura las variables para los 3 ambientes:
- ✅ Production
- ✅ Preview
- ✅ Development

### 5. Configurar Dominio Personalizado

1. Settings → Domains
2. Agrega tu dominio
3. Configura DNS:

```
Type: CNAME
Name: www (o @)
Value: cname.vercel-dns.com
```

4. Espera la propagación (puede tardar hasta 48h)

### 6. Configurar Supabase para Producción

#### Actualizar Redirect URLs

1. Ve a Supabase Dashboard
2. Authentication → URL Configuration
3. Agrega tus URLs de producción:

**Site URL**:
```
https://yourdomain.com
```

**Redirect URLs**:
```
https://yourdomain.com/auth/callback
https://yourdomain.com/*
```

#### Configurar OAuth (Google)

1. Google Cloud Console
2. APIs & Services → Credentials
3. Editar OAuth 2.0 Client
4. Agregar URIs autorizadas:

**Authorized JavaScript origins**:
```
https://yourdomain.com
```

**Authorized redirect URIs**:
```
https://[PROJECT_ID].supabase.co/auth/v1/callback
```

### 7. Optimizaciones de Producción

#### next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Optimizaciones de imagen
  images: {
    domains: [
      '[PROJECT_ID].supabase.co',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Optimizaciones de build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

#### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "github": {
    "silent": true
  }
}
```

### 8. Configurar CI/CD

#### GitHub Actions (opcional)

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
```

### 9. Monitoreo y Analytics

#### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 10. Rollback en Caso de Errores

#### Desde Dashboard
1. Deployments
2. Click en deployment anterior
3. Click en "⋯" → "Promote to Production"

#### Desde CLI
```bash
vercel rollback
```

## ✅ Checklist de Deployment

- [ ] Tests pasan localmente
- [ ] Build funciona sin errores
- [ ] Variables de entorno configuradas
- [ ] Dominio configurado
- [ ] SSL/HTTPS habilitado
- [ ] Redirect URLs de Supabase actualizadas
- [ ] Google OAuth configurado (si aplica)
- [ ] Analytics configurado (opcional)
- [ ] Monitoreo activo

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Limpiar cache y reinstalar
rm -rf node_modules .next
npm install
npm run build
```

### Error: "Authentication redirect failed"
- Verificar Redirect URLs en Supabase
- Verificar NEXT_PUBLIC_SUPABASE_URL
- Verificar OAuth credentials

### Error: "Build failed"
- Revisar logs en Vercel Dashboard
- Verificar que todas las dependencias estén en package.json
- Verificar TypeScript errors

### Lentitud en Build
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next",
      "config": {
        "maxLambdaSize": "50mb"
      }
    }
  ]
}
```

## 📊 Métricas de Rendimiento

Después del deployment, monitorea:

- **Core Web Vitals**
  - LCP (Largest Contentful Paint) < 2.5s
  - FID (First Input Delay) < 100ms
  - CLS (Cumulative Layout Shift) < 0.1

- **Build Time** < 3 minutos
- **Function Duration** < 10s
- **Edge Network** latencia < 50ms

## 🔗 URLs Útiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deploy Docs](https://nextjs.org/docs/deployment)
- [Supabase Dashboard](https://app.supabase.com)

## 🎉 Post-Deployment

Una vez deployado:

1. ✅ Verificar que el sitio carga correctamente
2. ✅ Probar login/registro
3. ✅ Probar flujo de compra completo
4. ✅ Verificar que las imágenes cargan
5. ✅ Probar en diferentes navegadores
6. ✅ Probar en mobile
7. ✅ Configurar monitoreo de errores (Sentry, etc)

## 💡 Tips Adicionales

1. **Preview Deployments**: Cada PR crea un preview deployment automático
2. **Environment Variables**: Usa secrets para datos sensibles
3. **Edge Functions**: Considera usar para mejor performance
4. **Image Optimization**: Vercel optimiza imágenes automáticamente
5. **Automatic HTTPS**: Vercel provee SSL gratis

---

¿Problemas? Consulta la [documentación oficial de Vercel](https://vercel.com/docs) o abre un issue en el repositorio.

