# 🚀 Guía de Deployment en Vercel - Adelca E-Commerce

## 📋 Prerrequisitos

### ✅ Checklist Pre-Deployment:

- [x] **Build exitoso** - `npm run build` funciona sin errores
- [x] **Variables de entorno** - Supabase configurado
- [x] **Imágenes optimizadas** - Logo y fondos en `/public/images/`
- [x] **Base de datos** - Schema aplicado en Supabase
- [x] **Datos de prueba** - Seed data insertado

---

## 🚀 Opción 1: Deployment desde GitHub (Recomendado)

### Paso 1: Subir a GitHub

```bash
# Inicializar git si no existe
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Adelca E-Commerce with shadcn/ui"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/adelca-ecommerce.git

# Push al repositorio
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. **Ir a [vercel.com](https://vercel.com)**
2. **Iniciar sesión** con GitHub
3. **"New Project"** → Importar repositorio
4. **Configurar variables de entorno:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```
5. **Deploy!** 🚀

---

## 🚀 Opción 2: Deployment con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Login y Deploy

```bash
# Login en Vercel
vercel login

# Deploy desde el directorio del proyecto
vercel

# Seguir las instrucciones:
# - Set up and deploy? Y
# - Which scope? (tu cuenta)
# - Link to existing project? N
# - Project name? adelca-ecommerce
# - Directory? ./
# - Override settings? N
```

### Paso 3: Configurar Variables de Entorno

```bash
# Agregar variables de entorno
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Redeploy con las nuevas variables
vercel --prod
```

---

## 🚀 Opción 3: Deployment Manual (Drag & Drop)

### Paso 1: Preparar Build

```bash
# Crear build de producción
npm run build

# Crear archivo .vercelignore si es necesario
echo "node_modules" > .vercelignore
echo ".env.local" >> .vercelignore
echo ".git" >> .vercelignore
```

### Paso 2: Subir a Vercel

1. **Ir a [vercel.com](https://vercel.com)**
2. **"New Project"** → "Browse all templates"
3. **"Upload"** → Seleccionar carpeta del proyecto
4. **Configurar variables de entorno**
5. **Deploy!**

---

## ⚙️ Configuración de Variables de Entorno

### Variables Requeridas:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Cómo obtenerlas:

1. **Ir a tu proyecto Supabase**
2. **Settings** → **API**
3. **Copiar:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🔧 Configuración Adicional

### 1. **Dominio Personalizado (Opcional)**

```bash
# En Vercel Dashboard:
# Settings → Domains → Add Domain
# Ejemplo: adelca-ecommerce.vercel.app
```

### 2. **Configurar Supabase para Producción**

En tu proyecto Supabase:

1. **Authentication** → **URL Configuration**
2. **Site URL:** `https://tu-dominio.vercel.app`
3. **Redirect URLs:** 
   ```
   https://tu-dominio.vercel.app/auth/callback
   https://tu-dominio.vercel.app/dashboard
   ```

### 3. **Optimizaciones de Performance**

```json
// vercel.json (ya incluido)
{
  "framework": "nextjs",
  "functions": {
    "app/**/*.tsx": {
      "runtime": "nodejs18.x"
    }
  }
}
```

---

## 📊 Monitoreo Post-Deployment

### 1. **Verificar Deployment**

```bash
# Ver logs en tiempo real
vercel logs

# Ver estado del deployment
vercel ls
```

### 2. **Testing de Funcionalidades**

- ✅ **Home page** carga correctamente
- ✅ **Navegación** funciona
- ✅ **Hero banner** con imágenes
- ✅ **Carruseles** de productos
- ✅ **Grid de categorías**
- ✅ **Footer** con enlaces
- ✅ **Responsive design**

### 3. **Performance Check**

```bash
# Lighthouse audit
# En Chrome DevTools → Lighthouse
# Verificar:
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 90
# - SEO: > 90
```

---

## 🐛 Troubleshooting Común

### Error: "Missing script: dev"

```bash
# Verificar package.json
cat package.json

# Si falta el script, agregar:
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### Error: "Environment variables not found"

```bash
# Verificar variables en Vercel Dashboard
# Settings → Environment Variables
# Asegurar que estén configuradas para:
# - Production
# - Preview
# - Development
```

### Error: "Build failed"

```bash
# Verificar logs
vercel logs

# Revisar:
# - TypeScript errors
# - Missing dependencies
# - Import errors
```

### Error: "Images not loading"

```bash
# Verificar que las imágenes estén en /public/
# Ejemplo: /public/images/logo-a.png
# Usar: /images/logo-a.png en el código
```

---

## 📈 Optimizaciones Post-Deployment

### 1. **Analytics (Opcional)**

```bash
# Agregar Vercel Analytics
npm install @vercel/analytics

# En app/layout.tsx
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

### 2. **Speed Insights (Opcional)**

```bash
# Agregar Speed Insights
npm install @vercel/speed-insights

# En app/layout.tsx
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

### 3. **SEO Optimization**

```tsx
// En app/layout.tsx
export const metadata = {
  title: 'Adelca - Acería del Ecuador | Productos Siderúrgicos',
  description: 'Líderes en fabricación de productos siderúrgicos en Ecuador desde 1963. Varillas, perfiles, tubos y más.',
  keywords: 'acero, siderúrgica, Ecuador, varillas, construcción',
  openGraph: {
    title: 'Adelca - Acería del Ecuador',
    description: 'Productos siderúrgicos de alta calidad',
    images: ['/images/logo-a.png'],
  },
}
```

---

## 🎯 Checklist Final

### ✅ Pre-Deployment:
- [x] Build exitoso (`npm run build`)
- [x] Variables de entorno configuradas
- [x] Imágenes en `/public/images/`
- [x] Base de datos Supabase configurada
- [x] Código subido a GitHub (opcional)

### ✅ Post-Deployment:
- [ ] URL de producción funcionando
- [ ] Todas las páginas cargan correctamente
- [ ] Navegación funciona
- [ ] Imágenes se muestran
- [ ] Responsive design en mobile
- [ ] Performance optimizada
- [ ] Variables de entorno configuradas en Vercel

---

## 🚀 Comandos Rápidos

```bash
# Build y verificar
npm run build

# Deploy con Vercel CLI
vercel

# Ver logs
vercel logs

# Redeploy
vercel --prod

# Ver deployments
vercel ls
```

---

## 📞 Soporte

Si encuentras problemas:

1. **Verificar logs:** `vercel logs`
2. **Revisar variables de entorno** en Vercel Dashboard
3. **Verificar build local:** `npm run build`
4. **Consultar documentación:** [Vercel Docs](https://vercel.com/docs)

---

**🎉 ¡Tu aplicación Adelca E-Commerce estará disponible en una URL como:**
**`https://adelca-ecommerce.vercel.app`**

**¡Listo para producción!** 🚀
