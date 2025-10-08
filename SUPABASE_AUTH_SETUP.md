# 🔐 Configuración de Autenticación con Supabase

## 📋 Resumen

Sistema completo de autenticación integrado con Supabase, incluyendo triggers automáticos para crear usuarios y perfiles.

## 🏗️ Arquitectura de Base de Datos

### Esquema de Auth (Supabase)

#### `auth.users` (Tabla de Supabase)
```sql
- id: UUID (PK)
- email: VARCHAR
- encrypted_password: VARCHAR
- email_confirmed_at: TIMESTAMPTZ
- last_sign_in_at: TIMESTAMPTZ
- raw_user_meta_data: JSONB  -- Datos personalizados (nombre, apellido, etc.)
- phone: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Esquema Público (Custom)

#### `public.users`
```sql
- id: UUID (PK) → FK a auth.users.id
- email: TEXT (unique)
- phone: TEXT
- role: user_role (admin, sales_rep, customer, distributor, guest)
- is_active: BOOLEAN
- last_login: TIMESTAMPTZ
- email_verified: BOOLEAN
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### `public.user_profiles`
```sql
- id: UUID (PK)
- user_id: UUID (FK a public.users.id, unique)
- first_name: TEXT
- last_name: TEXT
- company_name: TEXT
- tax_id: TEXT
- customer_type: customer_type
- credit_limit: NUMERIC
- credit_used: NUMERIC
- discount_percentage: NUMERIC
- preferred_plant: plant_location
- avatar_url: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

## 🔄 Triggers Automáticos

### 1. Trigger: `on_auth_user_created`

**Cuándo se ejecuta:** Después de insertar en `auth.users`

**Qué hace:**
1. Crea registro en `public.users` con:
   - Mismo ID que `auth.users`
   - Email del usuario
   - Phone del usuario
   - Role por defecto: 'customer'
   - email_verified según confirmación

2. Crea registro en `public.user_profiles` con:
   - Datos de `raw_user_meta_data` (first_name, last_name, company_name)
   - Valores por defecto para campos opcionales
   - **Nota:** El teléfono se guarda en `public.users`, no en `user_profiles`

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 2. Trigger: `on_auth_user_login`

**Cuándo se ejecuta:** Después de actualizar `last_sign_in_at` en `auth.users`

**Qué hace:**
- Actualiza `last_login` en `public.users`
- Actualiza `email_verified` si el email fue confirmado
- Actualiza `updated_at`

```sql
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at)
  EXECUTE FUNCTION public.handle_user_login();
```

## 🔑 Métodos de Autenticación

### 1. Sign In con Email + Password

**Endpoint:** `POST /api/auth/signin-email`

**Flujo:**
```
Usuario ingresa email + password
    ↓
API llama a supabase.auth.signInWithPassword()
    ↓
Supabase valida credenciales
    ↓
Trigger actualiza last_login en public.users
    ↓
Retorna sesión y usuario
```

**Request:**
```json
{
  "email": "usuario@email.com",
  "password": "contraseña123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "user": { ... }
}
```

### 2. Sign Up con OTP (One-Time Password)

**Endpoint:** `POST /api/auth/signup-otp`

**Flujo - Paso 1: Enviar OTP:**
```
Usuario llena formulario
    ↓
API llama a supabase.auth.signInWithOtp()
    ↓
Supabase envía email con código de 6 dígitos
    ↓
Guarda metadata en raw_user_meta_data
```

**Request:**
```json
{
  "email": "nuevo@email.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "companyName": "Mi Empresa S.A.",
  "phone": "+593991234567"
}
```

**Flujo - Paso 2: Verificar OTP:**
```
Usuario ingresa código de 6 dígitos
    ↓
API llama a supabase.auth.verifyOtp()
    ↓
Supabase valida código
    ↓
Crea usuario en auth.users
    ↓
Trigger crea registros en public.users y public.user_profiles
    ↓
Retorna sesión
```

**Endpoint:** `POST /api/auth/verify-otp`

**Request:**
```json
{
  "email": "nuevo@email.com",
  "token": "123456"
}
```

### 3. Google OAuth

**Endpoint:** `POST /api/auth/signin-google`

**Flujo:**
```
Usuario click "Continuar con Google"
    ↓
API genera URL de OAuth
    ↓
Redirect a Google
    ↓
Usuario autoriza
    ↓
Callback a /auth/callback
    ↓
Supabase crea sesión
    ↓
Trigger crea registros si es nuevo usuario
    ↓
Redirect a home
```

## 📡 APIs Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/auth/signin-email` | POST | Login con email + password |
| `/api/auth/signup-otp` | POST | Enviar OTP para registro |
| `/api/auth/verify-otp` | POST | Verificar código OTP |
| `/api/auth/signin-google` | POST | Iniciar OAuth Google |
| `/api/auth/signout` | POST | Cerrar sesión |
| `/api/auth/session` | GET | Obtener sesión actual |
| `/auth/callback` | GET | Callback OAuth |

## 🎯 Flujos de Usuario

### Flujo 1: Registro Nuevo (OTP)

```
1. Usuario va a /signup
2. Llena formulario (email, nombre, apellido, empresa, teléfono)
3. Acepta términos y condiciones
4. Click "Continuar"
   → POST /api/auth/signup-otp
   → Supabase envía email con código
5. Ingresa código de 6 dígitos
6. Click "Verificar y Registrarme"
   → POST /api/auth/verify-otp
   → Supabase valida código
   → Trigger crea usuario en public.users
   → Trigger crea perfil en public.user_profiles
7. Redirect a home (autenticado)
```

### Flujo 2: Login Existente (Email + Password)

```
1. Usuario va a /signin
2. Ingresa email + password
3. Click "Iniciar Sesión"
   → POST /api/auth/signin-email
   → Supabase valida credenciales
   → Trigger actualiza last_login
4. Redirect a home (autenticado)
```

### Flujo 3: OAuth Google

```
1. Usuario click "Continuar con Google" (en /signin o /signup)
2. POST /api/auth/signin-google
   → Genera URL de OAuth
3. Redirect a Google
4. Usuario autoriza aplicación
5. Google redirect a /auth/callback
6. Callback procesa código
   → Si es nuevo usuario:
     - Trigger crea en public.users
     - Trigger crea en public.user_profiles
   → Si es usuario existente:
     - Trigger actualiza last_login
7. Redirect a home (autenticado)
```

## 🔒 Seguridad

### Row Level Security (RLS)

#### `public.users` - Políticas:
```sql
-- Ver solo su propio registro
CREATE POLICY "Users can view own record"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Actualizar solo su propio registro
CREATE POLICY "Users can update own record"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);
```

#### `public.user_profiles` - Políticas:
```sql
-- Ver solo su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Actualizar solo su propio perfil
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = user_id);
```

### Metadata de Usuario

Los datos adicionales se guardan en `auth.users.raw_user_meta_data`:

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "company_name": "Mi Empresa S.A.",
  "phone": "+593991234567"
}
```

Estos datos son:
- ✅ Accesibles por triggers
- ✅ Copiados a `public.user_profiles` automáticamente
- ✅ Disponibles en el objeto user del cliente

## 🧪 Cómo Probar

### 1. Registro con OTP

```bash
# Terminal 1: Iniciar desarrollo
npm run dev

# Navegador:
1. Ir a http://localhost:3000/signup
2. Llenar formulario con email real
3. Revisar email (bandeja de entrada o spam)
4. Copiar código de 6 dígitos
5. Ingresar código
6. Verificar que se crea en:
   - auth.users
   - public.users  
   - public.user_profiles
```

### 2. Login con Email + Password

**Nota:** Primero debes establecer una contraseña. El registro con OTP no crea contraseña automáticamente.

**Opción A:** Usar recuperación de contraseña
**Opción B:** Usar panel de Supabase para establecer contraseña

```bash
# Navegador:
1. Ir a http://localhost:3000/signin
2. Ingresar email + password
3. Verificar que actualiza last_login
```

### 3. Google OAuth

```bash
# Supabase Dashboard:
1. Authentication → Providers
2. Habilitar Google
3. Configurar Client ID y Secret
4. Guardar Redirect URL

# Navegador:
1. Ir a http://localhost:3000/signin
2. Click "Continuar con Google"
3. Autorizar aplicación
4. Verificar creación/actualización de usuario
```

## ⚙️ Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## 🚀 Despliegue en Producción

### Vercel

1. **Variables de entorno:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_API_BASE_URL=https://tu-dominio.vercel.app
```

2. **Configurar Redirect URLs en Supabase:**
```
https://tu-dominio.vercel.app/auth/callback
https://tu-dominio.vercel.app/**
```

3. **Configurar Email Templates:**
- Authentication → Email Templates
- Personalizar plantillas de OTP
- Configurar sender email

## 📊 Monitoreo

### Verificar que triggers funcionan:

```sql
-- Contar usuarios en auth vs public
SELECT 
  (SELECT COUNT(*) FROM auth.users) as auth_users,
  (SELECT COUNT(*) FROM public.users) as public_users,
  (SELECT COUNT(*) FROM public.user_profiles) as profiles;

-- Deberían ser iguales
```

### Ver últimos registros:

```sql
-- Últimos usuarios registrados
SELECT 
  u.id,
  u.email,
  up.first_name,
  up.last_name,
  up.company_name,
  u.created_at
FROM public.users u
JOIN public.user_profiles up ON up.user_id = u.id
ORDER BY u.created_at DESC
LIMIT 10;
```

## ✅ Checklist de Implementación

- [x] Tabla `public.users` conectada a `auth.users`
- [x] Tabla `public.user_profiles` creada
- [x] Trigger para crear usuario automáticamente
- [x] Trigger para crear perfil automáticamente
- [x] Trigger para actualizar last_login
- [x] API signin con email + password
- [x] API signup con OTP
- [x] API verify OTP
- [x] API Google OAuth
- [x] API signout
- [x] API get session
- [x] Callback OAuth configurado
- [x] Páginas /signin y /signup creadas
- [x] Servicios de autenticación
- [x] Constantes de API
- [x] RLS políticas configuradas
- [x] Metadata de usuario guardada

## 🎉 Resultado Final

**Sistema de autenticación completo con:**
- ✅ 3 métodos de autenticación (Email/Password, OTP, Google)
- ✅ Triggers automáticos para crear usuarios y perfiles
- ✅ Metadata personalizada guardada correctamente
- ✅ Seguridad con RLS
- ✅ UI/UX moderna con shadcn/ui
- ✅ Integración completa con Supabase
- ✅ Listo para producción

**¡La autenticación está 100% funcional y lista para usar! 🚀**

