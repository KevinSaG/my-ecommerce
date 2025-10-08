---
sidebar_position: 1
title: Inicio Rápido
---

# Guía de Inicio Rápido

Esta guía te llevará desde cero hasta tener una página funcional en el proyecto ADELCA E-Commerce.

## 🎯 Objetivo

Crearemos una página simple que muestre productos usando la arquitectura del proyecto.

## 📋 Prerequisitos

- Proyecto instalado y funcionando
- Editor de código (VS Code recomendado)
- Conocimientos básicos de React y Next.js

## 🚀 Pasos

### 1. Crear una Nueva Página

Las páginas en Next.js App Router se crean en la carpeta `app/`.

```bash
# Crear carpeta para la nueva ruta
mkdir app/mi-pagina

# Crear el archivo de la página
touch app/mi-pagina/page.tsx
```

### 2. Crear el Componente de la Página

```tsx
// app/mi-pagina/page.tsx
export default function MiPagina() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Mi Nueva Página</h1>
      <p>¡Hola desde mi página!</p>
    </div>
  );
}
```

### 3. Agregar al Navbar (Opcional)

```tsx
// components/Navbar.tsx
<NavigationMenuItem>
  <Link href="/mi-pagina">
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      Mi Página
    </NavigationMenuLink>
  </Link>
</NavigationMenuItem>
```

### 4. Ver la Página

Visita [http://localhost:3000/mi-pagina](http://localhost:3000/mi-pagina)

## 📦 Fetching de Datos

### Usando Services

1. **Crear un Service** (si no existe):

```typescript
// services/public/miDominio/getData.ts
import { apiEndpoints } from '@/constants/api';

export async function getMisDatos() {
  const response = await fetch(apiEndpoints.miApi);
  const result = await response.json();
  return result;
}
```

2. **Usar en el Componente**:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { getMisDatos } from '@/services/public/miDominio/getData';

export default function MiPagina() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const result = await getMisDatos();
      if (result.success) {
        setDatos(result.data);
      }
    };
    fetchDatos();
  }, []);

  return (
    <div>
      {datos.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## 🎨 Usando Componentes UI

El proyecto usa **shadcn/ui**. Ejemplo con un Card:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MiPagina() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Mi Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenido del card</p>
          <Button className="mt-4">Click Aquí</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## 🔒 Proteger una Página

Para páginas que requieren autenticación:

```tsx
// app/mi-pagina-protegida/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function PaginaProtegida() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/signin');
  }

  return (
    <div>
      <h1>Bienvenido, {user.email}!</h1>
    </div>
  );
}
```

## 📝 Buenas Prácticas

### ✅ DO

- Usa TypeScript para todo
- Sigue el flujo: Frontend → Services → APIs → Supabase
- Usa componentes de shadcn/ui
- Valida datos de entrada
- Maneja errores apropiadamente
- Usa loading states

### ❌ DON'T

- No hagas llamadas directas a Supabase desde componentes
- No hardcodees URLs de API
- No ignores errores
- No mezcles lógica de negocio en componentes UI

## 🔄 Flujo Completo: Crear una Feature

### 1. Crear API Route

```typescript
// app/api/mi-feature/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('mi_tabla')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
```

### 2. Agregar Endpoint a Constantes

```typescript
// constants/api.ts
export const miFeatureEndpoints = {
  list: `${API_BASE_URL}/api/mi-feature`,
} as const;
```

### 3. Crear Service

```typescript
// services/public/miFeature/getData.ts
import { miFeatureEndpoints } from '@/constants/api';

export async function getMiFeature() {
  const response = await fetch(miFeatureEndpoints.list);
  return response.json();
}
```

### 4. Crear Página

```tsx
// app/mi-feature/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getMiFeature } from '@/services/public/miFeature/getData';

export default function MiFeaturePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getMiFeature().then(result => {
      if (result.success) {
        setData(result.data);
      }
    });
  }, []);

  return <div>{/* UI aquí */}</div>;
}
```

## 📚 Siguiente Paso

- [Crear APIs](/docs/guides/creating-apis) - Guía detallada de APIs
- [Crear Services](/docs/guides/creating-services) - Guía detallada de Services
- [Usando Hooks](/docs/guides/using-hooks) - Custom Hooks
- [Ejemplos de Código](/docs/guides/code-examples) - Más ejemplos

## 🆘 ¿Problemas?

Consulta la sección de [Troubleshooting](/docs/guides/troubleshooting) o revisa el [FAQ](/docs/faq).

