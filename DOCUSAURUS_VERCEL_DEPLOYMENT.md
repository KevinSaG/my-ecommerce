# Guía de Despliegue de Docusaurus en Vercel

Esta guía te ayudará a desplegar tu documentación de Docusaurus en Vercel de manera eficiente.

## Opción 1: Despliegue desde la carpeta `docs` (Recomendado)

### 1. Preparar el proyecto

Ya tienes todo configurado:
- ✅ `docs/vercel.json` creado
- ✅ `docs/docusaurus.config.ts` configurado
- ✅ `docs/package.json` con scripts de build

### 2. Desplegar en Vercel

#### Método A: Desde la interfaz web de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en "New Project"
3. Conecta tu repositorio de GitHub
4. **IMPORTANTE**: En la configuración del proyecto:
   - **Root Directory**: Selecciona `docs`
   - **Framework Preset**: Selecciona "Docusaurus"
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

#### Método B: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar a la carpeta docs
cd docs

# Desplegar
vercel

# Seguir las instrucciones en pantalla
```

### 3. Variables de entorno (si las necesitas)

Si tu documentación requiere variables de entorno, agrégalas en:
- Vercel Dashboard → Project Settings → Environment Variables

### 4. Configuración de dominio personalizado

1. En Vercel Dashboard → Project Settings → Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel

## Opción 2: Despliegue como subdirectorio del proyecto principal

Si quieres que la documentación esté disponible en una ruta como `/docs` de tu sitio principal:

### 1. Modificar el vercel.json principal

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build && cd docs && npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install && cd docs && npm install",
  "outputDirectory": ".next",
  "routes": [
    {
      "src": "/docs/(.*)",
      "dest": "/docs/build/$1"
    }
  ]
}
```

### 2. Actualizar la configuración de Docusaurus

En `docs/docusaurus.config.ts`:

```typescript
baseUrl: '/docs/',
```

## Comandos útiles

### Desarrollo local
```bash
cd docs
npm run start
```

### Build local
```bash
cd docs
npm run build
```

### Servir build local
```bash
cd docs
npm run serve
```

## Troubleshooting

### Error: "Cannot find module"
- Asegúrate de que `docs/package.json` tenga todas las dependencias necesarias
- Ejecuta `npm install` en la carpeta `docs`

### Error: "Build failed"
- Verifica que la configuración de Docusaurus sea correcta
- Revisa los logs de build en Vercel Dashboard

### Páginas no encontradas (404)
- Verifica que `baseUrl` esté configurado correctamente
- Asegúrate de que las rutas en `sidebars.ts` sean correctas

### Problemas con assets/estáticos
- Verifica que los archivos estén en `docs/static/`
- Asegúrate de que las rutas en el código usen rutas relativas

## Configuración avanzada

### Personalización del build

Puedes agregar scripts personalizados en `docs/package.json`:

```json
{
  "scripts": {
    "build": "docusaurus build",
    "build:prod": "NODE_ENV=production docusaurus build",
    "deploy": "vercel --prod"
  }
}
```

### Optimizaciones

1. **Compresión**: Vercel maneja automáticamente la compresión gzip
2. **CDN**: Los assets se sirven desde el CDN global de Vercel
3. **Caching**: Configura headers de cache en `vercel.json`

## Monitoreo y Analytics

### Vercel Analytics
- Activa Vercel Analytics en Project Settings
- Obtén métricas de rendimiento y uso

### Google Analytics
Agrega en `docs/docusaurus.config.ts`:

```typescript
themeConfig: {
  gtag: {
    trackingID: 'GA_TRACKING_ID',
    anonymizeIP: true,
  },
}
```

## Conclusión

Con esta configuración, tu documentación de Docusaurus estará disponible en:
- **URL**: `https://adelca-ecommerce-docs.vercel.app`
- **Actualizaciones automáticas**: Cada push a `main` desplegará automáticamente
- **Rendimiento optimizado**: CDN global y compresión automática

¡Tu documentación estará lista para ser utilizada por tu equipo y usuarios!
