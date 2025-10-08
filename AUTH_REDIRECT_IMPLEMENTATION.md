# 🔐 Redirección Automática al Dashboard - Implementación

## ✅ Resumen

Se ha implementado **redirección automática al dashboard** cuando un usuario autenticado intenta acceder a las páginas de login o registro.

---

## 🎯 Problema

Antes, si un usuario ya estaba autenticado y visitaba `/signin` o `/signup`, veía las páginas de login/registro, lo cual no tiene sentido si ya tiene sesión activa.

## ✅ Solución

Se agregó lógica en ambas páginas para:
1. ✅ Verificar si el usuario está autenticado usando `useAuth`
2. ✅ Mostrar un loading mientras se verifica
3. ✅ Redirigir automáticamente al dashboard si está autenticado
4. ✅ Mostrar la página solo si NO está autenticado

---

## 📝 Implementación

### 1. **Página de Sign In** (`app/signin/page.tsx`)

```tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SignInPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  // ... estados del formulario ...

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Mostrar loading mientras se verifica auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-adelca-primary" />
      </div>
    );
  }

  // No renderizar si está autenticado (se redirigirá)
  if (user) {
    return null;
  }

  // Renderizar el formulario de login
  return (
    // ... formulario de login ...
  );
}
```

### 2. **Página de Sign Up** (`app/signup/page.tsx`)

```tsx
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SignUpPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  // ... estados del formulario ...

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  // Mostrar loading mientras se verifica auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-adelca-primary" />
      </div>
    );
  }

  // No renderizar si está autenticado (se redirigirá)
  if (user) {
    return null;
  }

  // Renderizar el formulario de registro
  return (
    // ... formulario de registro ...
  );
}
```

---

## 🔄 Flujo de Redirección

### Escenario 1: Usuario NO Autenticado

```
1. Usuario visita /signin
   ↓
2. useAuth verifica sesión
   ↓
3. No hay sesión (user = null)
   ↓
4. Se muestra el formulario de login
```

### Escenario 2: Usuario Autenticado

```
1. Usuario visita /signin
   ↓
2. useAuth verifica sesión
   ↓
3. Hay sesión (user existe)
   ↓
4. useEffect detecta user
   ↓
5. router.push("/dashboard")
   ↓
6. Usuario es redirigido al dashboard
```

### Escenario 3: Verificando Sesión

```
1. Usuario visita /signin
   ↓
2. useAuth está verificando (isLoading = true)
   ↓
3. Se muestra un spinner de loading
   ↓
4. Cuando termina la verificación:
   - Si hay user → redirige a dashboard
   - Si no hay user → muestra formulario
```

---

## 🎨 Estados de la UI

### 1. **Loading (Verificando Auth)**

```tsx
if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-adelca-primary" />
    </div>
  );
}
```

**Cuándo**: Mientras `useAuth` está consultando la API de sesión

### 2. **Authenticated (Redirigiendo)**

```tsx
if (user) {
  return null;
}
```

**Cuándo**: Usuario está autenticado, se está redirigiendo al dashboard

### 3. **Not Authenticated (Formulario)**

```tsx
return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    {/* Formulario de login/registro */}
  </div>
);
```

**Cuándo**: Usuario NO está autenticado, se muestra el formulario

---

## 🔧 Hook Utilizado

### `useAuth` (`hooks/useAuth.ts`)

```tsx
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
```

**Características**:
- ✅ Consulta la API de sesión al montar el componente
- ✅ Maneja estados de loading
- ✅ Retorna `user`, `isLoading`, e `isAuthenticated`

---

## 🌐 Rutas Afectadas

| Ruta | Comportamiento |
|------|----------------|
| `/signin` | Redirige a `/dashboard` si autenticado |
| `/signup` | Redirige a `/dashboard` si autenticado |
| `/dashboard` | Protegida (ya implementado en layout) |

---

## 💡 Beneficios

### 1. **Mejor UX**
- No se muestra el login a usuarios autenticados
- Redirección automática y transparente
- Loading state mientras se verifica

### 2. **Seguridad**
- Evita confusión con múltiples sesiones
- Previene re-autenticación innecesaria

### 3. **Consistencia**
- Misma lógica en ambas páginas (signin/signup)
- Usa el mismo hook `useAuth` en toda la app

---

## 🧪 Cómo Probar

### Test 1: Usuario NO Autenticado

```
1. Asegúrate de no tener sesión activa (logout)
2. Ve a /signin
3. ✅ Debe mostrar el formulario de login
```

### Test 2: Usuario Autenticado

```
1. Inicia sesión
2. Ve a /dashboard
3. Luego visita /signin
4. ✅ Debe redirigirte automáticamente a /dashboard
```

### Test 3: Loading State

```
1. Abre /signin con Network throttling (slow 3G)
2. ✅ Debe mostrar un spinner mientras verifica la sesión
3. Luego muestra formulario o redirige según corresponda
```

---

## 🔄 Flujo Completo

```
Usuario → /signin
    ↓
useAuth inicia
    ↓
    ├─ isLoading = true
    │    ↓
    │  Muestra Spinner
    │
    ↓
Consulta /api/auth/session
    ↓
    ├─ user existe
    │    ↓
    │  useEffect detecta user
    │    ↓
    │  router.push("/dashboard")
    │    ↓
    │  Usuario en Dashboard ✓
    │
    └─ user = null
         ↓
       Muestra Formulario
         ↓
       Usuario completa login
         ↓
       router.push("/dashboard")
         ↓
       Usuario en Dashboard ✓
```

---

## 📊 Antes vs Después

### ❌ Antes

```
Usuario autenticado → /signin
    ↓
Ve el formulario de login ✗
Puede intentar loguearse de nuevo ✗
Confusión ✗
```

### ✅ Después

```
Usuario autenticado → /signin
    ↓
Verifica sesión (spinner)
    ↓
Detecta que ya está autenticado
    ↓
Redirige automáticamente a /dashboard ✓
UX limpia ✓
```

---

## 🎯 Archivos Modificados

- ✅ `app/signin/page.tsx` - Agregado useAuth y lógica de redirección
- ✅ `app/signup/page.tsx` - Agregado useAuth y lógica de redirección
- ✅ Usa `hooks/useAuth.ts` (ya existente)

---

## 🚀 Estado

**✅ IMPLEMENTADO Y FUNCIONANDO**

Ahora las páginas de login y registro redirigen automáticamente al dashboard si el usuario ya está autenticado.

---

**Fecha**: Octubre 2024  
**Implementado por**: Sistema de Autenticación

