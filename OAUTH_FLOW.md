# 🔐 Flujo de Autenticación OAuth (Google)

## 📋 Resumen

Este documento explica cómo funciona el flujo de autenticación con Google OAuth en la aplicación, tanto para **Sign In** como para **Sign Up**.

---

## 🔄 Flujo Completo

### **1. Sign In con Google (Login)**

```mermaid
graph TD
    A[Usuario en /signin] --> B[Click en "Continuar con Google"]
    B --> C[POST /api/auth/signin-google]
    C --> D[Supabase.auth.signInWithOAuth]
    D --> E[Redirect a Google OAuth]
    E --> F{Usuario autentica en Google}
    F -->|Éxito| G[Google redirige a /?code=xxx]
    F -->|Error| H[Google redirige a /?error=xxx]
    G --> I[AuthHandler detecta código]
    H --> J[AuthHandler detecta error]
    I --> K[Redirect a /auth/callback?code=xxx]
    J --> L[Redirect a /signin?error=xxx]
    K --> M[Exchange code por sesión]
    M -->|Éxito| N[Redirect a /dashboard]
    M -->|Error| O[Redirect a /signin?error=auth_error]
```

### **2. Sign Up con Google (Registro)**

```mermaid
graph TD
    A[Usuario en /signup] --> B[Click en "Continuar con Google"]
    B --> C[POST /api/auth/signin-google]
    C --> D[Supabase.auth.signInWithOAuth]
    D --> E[Redirect a Google OAuth]
    E --> F{Usuario autentica en Google}
    F -->|Éxito - Usuario Nuevo| G[Google crea cuenta]
    F -->|Éxito - Usuario Existente| H[Google inicia sesión]
    G --> I[Google redirige a /?code=xxx]
    H --> I
    I --> J[AuthHandler detecta código]
    J --> K[Redirect a /auth/callback?code=xxx]
    K --> L[Exchange code por sesión]
    L --> M[Crea usuario en Supabase si no existe]
    M --> N[Redirect a /dashboard]
```

---

## 📂 Archivos Involucrados

### **1. Frontend - Páginas de Auth**

#### `/app/signin/page.tsx`
```typescript
// Botón de Google Sign In
const handleGoogleSignIn = async () => {
  const result = await signInWithGoogle();
  // El servicio maneja la redirección a Google
};
```

#### `/app/signup/page.tsx`
```typescript
// Usa el mismo servicio que Sign In
const handleGoogleSignUp = async () => {
  const result = await signInWithGoogle();
  // Google OAuth maneja automáticamente si es registro o login
};
```

**Importante:** Ambas páginas usan el **mismo servicio** `signInWithGoogle()` porque Google OAuth determina automáticamente si el usuario es nuevo o existente.

### **2. Servicio de Autenticación**

#### `/services/authentication/authService.ts`
```typescript
export async function signInWithGoogle() {
  const response = await fetch('/api/auth/signin-google', {
    method: 'POST',
  });
  const result = await response.json();
  
  if (result.url) {
    window.location.href = result.url; // Redirect a Google
  }
  
  return result;
}
```

### **3. API Endpoints**

#### `/app/api/auth/signin-google/route.ts`
```typescript
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  
  return NextResponse.json({ url: data.url });
}
```

**Configuración:**
- `redirectTo`: URL donde Google debe redirigir después de autenticar
- `access_type: 'offline'`: Permite obtener refresh token
- `prompt: 'consent'`: Siempre muestra pantalla de consentimiento

### **4. OAuth Handler (Fallback)**

#### `/app/auth-handler.tsx`
```typescript
export default function AuthHandler() {
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  
  useEffect(() => {
    if (error) {
      // Maneja errores de OAuth
      router.replace(`/signin?error=${error}`);
    }
    
    if (code) {
      // Redirige al callback oficial
      router.replace(`/auth/callback?code=${code}`);
    }
  }, [code, error]);
}
```

**Por qué existe:**
- Google a veces redirige a `/` en lugar de `/auth/callback`
- Este componente detecta el código y lo redirige correctamente
- Funciona tanto para Sign In como Sign Up

### **5. Callback Route**

#### `/app/auth/callback/route.ts`
```typescript
export async function GET(request: NextRequest) {
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      return NextResponse.redirect('/signin?error=auth_error');
    }
    
    // Log si es usuario nuevo
    console.log('isNewUser:', data.user.created_at === data.user.last_sign_in_at);
  }
  
  return NextResponse.redirect('/dashboard');
}
```

**Funciones:**
1. Intercambia el código OAuth por una sesión de Supabase
2. Detecta si es un usuario nuevo (Sign Up) o existente (Sign In)
3. Redirige al dashboard en ambos casos

---

## 🔍 Diferencias: Sign In vs Sign Up con Google

### **Sign In (Login)**
- ✅ Usuario **debe existir** en la base de datos
- ✅ Google verifica credenciales
- ✅ Inicia sesión con cuenta existente

### **Sign Up (Registro)**
- ✅ Usuario **puede o no existir**
- ✅ Si no existe, Google **crea la cuenta automáticamente**
- ✅ Si ya existe, funciona como Sign In

### **¿Por qué usar el mismo servicio?**
```typescript
// NO es necesario tener dos servicios diferentes porque:
// Google OAuth maneja automáticamente:
// - Si el email existe → Sign In
// - Si el email NO existe → Sign Up (crea cuenta)
```

---

## 🛠️ Configuración Requerida

### **1. Google Cloud Console**
```
OAuth Client ID:
  - Authorized redirect URIs:
    ✅ https://[PROJECT].supabase.co/auth/v1/callback
    ✅ http://localhost:3000/auth/callback
    ✅ http://localhost:3000
```

### **2. Supabase Dashboard**
```
Authentication → Providers → Google:
  ✅ Enabled: ON
  ✅ Client ID: [tu-client-id]
  ✅ Client Secret: [tu-client-secret]

Authentication → URL Configuration:
  ✅ Site URL: http://localhost:3000
  ✅ Redirect URLs:
    - http://localhost:3000
    - http://localhost:3000/auth/callback
    - http://localhost:3000/**
```

### **3. Variables de Entorno**
```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## 🎯 Casos de Uso

### **Caso 1: Nuevo Usuario - Sign Up**
1. Usuario hace clic en "Continuar con Google" en `/signup`
2. Selecciona su cuenta de Google
3. Google crea nueva cuenta en Supabase Auth
4. Redirige a `/dashboard`
5. ✅ **Usuario registrado e iniciado sesión**

### **Caso 2: Usuario Existente - Sign In**
1. Usuario hace clic en "Continuar con Google" en `/signin`
2. Selecciona su cuenta de Google
3. Google valida credenciales
4. Inicia sesión con cuenta existente
5. Redirige a `/dashboard`
6. ✅ **Usuario autenticado**

### **Caso 3: Usuario Existente intenta Sign Up**
1. Usuario hace clic en "Continuar con Google" en `/signup`
2. Selecciona cuenta que **ya existe**
3. Google **NO crea cuenta nueva**, inicia sesión
4. Redirige a `/dashboard`
5. ✅ **Funciona como Sign In automáticamente**

### **Caso 4: Error en OAuth**
1. Usuario cancela en pantalla de Google
2. Google redirige con `?error=access_denied`
3. `AuthHandler` detecta el error
4. Redirige a `/signin?error=access_denied`
5. ❌ **Usuario ve mensaje de error**

---

## 🔒 Seguridad

### **Tokens y Sesiones**
```typescript
// Supabase maneja automáticamente:
✅ Access Token (JWT)
✅ Refresh Token (para renovar sesión)
✅ Cookies seguras (httpOnly)
✅ PKCE (Proof Key for Code Exchange)
```

### **Validaciones**
1. ✅ Código OAuth es de un solo uso
2. ✅ Expira en minutos si no se usa
3. ✅ Solo válido para el dominio configurado
4. ✅ Supabase valida la firma del token

---

## 🐛 Troubleshooting

### **Problema: Código llega a `/` en lugar de `/auth/callback`**
**Solución:** El `AuthHandler` en la página principal detecta esto y redirige automáticamente.

### **Problema: Error "redirect_uri_mismatch"**
**Solución:** Verifica que las Redirect URIs en Google Cloud Console incluyan:
```
https://[PROJECT].supabase.co/auth/v1/callback
```

### **Problema: Usuario creado en Auth pero no en tabla `users`**
**Solución:** Crear un Database Trigger o Function que cree el usuario en la tabla cuando se registra:
```sql
-- Ver: lib/supabase-schema.sql
-- Trigger: on_auth_user_created
```

### **Problema: Loop infinito de redirecciones**
**Solución:** 
1. Verifica que el middleware no esté bloqueando `/auth/callback`
2. Limpia cookies del navegador
3. Verifica que `NEXT_PUBLIC_API_BASE_URL` esté correcto

---

## ✅ Checklist

- [ ] Google OAuth configurado en Google Cloud Console
- [ ] Client ID y Secret en Supabase
- [ ] Redirect URIs correctas en ambos lados
- [ ] Variables de entorno configuradas
- [ ] AuthHandler incluido en página principal
- [ ] Callback route funcionando
- [ ] Probado Sign In con Google ✅
- [ ] Probado Sign Up con Google ✅
- [ ] Manejo de errores implementado
- [ ] Redirección al dashboard funcional

---

## 📚 Referencias

- [Supabase OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication](https://nextjs.org/docs/authentication)

---

**Última actualización:** Octubre 2025
