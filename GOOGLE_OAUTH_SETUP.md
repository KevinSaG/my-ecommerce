# 🔐 Configuración de Google OAuth en Supabase

## ❌ Error Actual
```
"Unsupported provider: provider is not enabled"
```

Este error indica que Google OAuth no está habilitado en tu proyecto de Supabase.

## ✅ Solución: Configuración Paso a Paso

### **Paso 1: Configurar Google Cloud Console**

#### 1.1 Crear un Proyecto en Google Cloud
1. Ve a: https://console.cloud.google.com/
2. En el selector de proyectos (arriba), haz clic en **"New Project"**
3. Nombre del proyecto: `My-Ecommerce` (o el que prefieras)
4. Haz clic en **"Create"**
5. Espera a que se cree y selecciónalo

#### 1.2 Habilitar Google+ API (opcional pero recomendado)
1. En el menú de navegación, ve a **"APIs & Services"** → **"Library"**
2. Busca **"Google+ API"**
3. Haz clic en **"Enable"**

#### 1.3 Configurar Pantalla de Consentimiento OAuth
1. En el menú de navegación, ve a **"APIs & Services"** → **"OAuth consent screen"**
2. Selecciona **"External"** como tipo de usuario
3. Haz clic en **"Create"**

**Configuración de la Pantalla:**
```
App name: My E-commerce
User support email: [tu-email@example.com]
App logo: (opcional)
Application home page: http://localhost:3000
Application privacy policy link: (opcional por ahora)
Application terms of service link: (opcional por ahora)
Authorized domains: 
  - localhost
  - supabase.co
  - [tu-dominio.com] (si tienes)
Developer contact information: [tu-email@example.com]
```

4. Haz clic en **"Save and Continue"**

**Scopes (Ámbitos):**
5. No agregues scopes adicionales por ahora
6. Haz clic en **"Save and Continue"**

**Test Users:**
7. Agrega tu email como test user
8. Haz clic en **"Add Users"** → ingresa tu email → **"Add"**
9. Haz clic en **"Save and Continue"**
10. Revisa y haz clic en **"Back to Dashboard"**

#### 1.4 Crear Credenciales OAuth 2.0
1. En el menú de navegación, ve a **"APIs & Services"** → **"Credentials"**
2. Haz clic en **"+ Create Credentials"** → **"OAuth client ID"**

**Configuración del Cliente:**
```
Application type: Web application
Name: My E-commerce Web Client

Authorized JavaScript origins:
  - http://localhost:3000
  - https://keaodzizpnrbtitzpenn.supabase.co
  - [tu URL de producción si tienes]

Authorized redirect URIs:
  - https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
  - http://localhost:3000/auth/callback
```

3. Haz clic en **"Create"**
4. **IMPORTANTE:** Copia el **Client ID** y **Client Secret** que aparecen
   - Client ID: algo como `123456789-abc123def456.apps.googleusercontent.com`
   - Client Secret: algo como `GOCSPX-abcdef123456`
5. Guárdalos en un lugar seguro

---

### **Paso 2: Configurar Supabase**

#### 2.1 Habilitar Google Provider
1. Ve a tu proyecto en: https://supabase.com/dashboard
2. En el menú lateral, haz clic en **"Authentication"**
3. Haz clic en **"Providers"**
4. Busca **"Google"** en la lista
5. Haz clic en el toggle para **habilitarlo** (debe ponerse verde)

#### 2.2 Configurar Credenciales
En el formulario de configuración de Google:

```
Enabled: ✅ ON
Client ID (for OAuth): [pega tu Client ID de Google]
Client Secret (for OAuth): [pega tu Client Secret de Google]
Redirect URL: https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
```

6. Haz clic en **"Save"** al final

#### 2.3 Verificar la URL de Callback
La URL de callback que Supabase muestra debe ser exactamente:
```
https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
```

Esta misma URL debe estar en las **Authorized redirect URIs** de Google Cloud Console.

---

### **Paso 3: Verificar Variables de Entorno**

Asegúrate de que tu archivo `.env.local` tenga:

```env
NEXT_PUBLIC_SUPABASE_URL=https://keaodzizpnrbtitzpenn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**NOTA:** Para producción, cambia `NEXT_PUBLIC_API_BASE_URL` a tu dominio real.

---

### **Paso 4: Reiniciar la Aplicación**

1. Detén el servidor de desarrollo (Ctrl+C)
2. Reinicia: `npm run dev`
3. Limpia la caché del navegador (Ctrl+Shift+R)

---

### **Paso 5: Probar Google Sign-In**

1. Ve a: http://localhost:3000/signin
2. Haz clic en el botón **"Continuar con Google"**
3. Deberías ser redirigido a la pantalla de Google para seleccionar cuenta
4. Selecciona tu cuenta de prueba
5. Acepta los permisos
6. Serás redirigido de vuelta a tu aplicación

---

## 🐛 Troubleshooting

### **Error: "redirect_uri_mismatch"**
**Problema:** La URL de redirección no coincide

**Solución:**
1. Verifica que en Google Cloud Console → Credentials tengas:
   ```
   https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
   ```
2. Debe ser EXACTAMENTE igual (sin espacios, mismas mayúsculas/minúsculas)

### **Error: "Access blocked: This app's request is invalid"**
**Problema:** Falta configurar la pantalla de consentimiento

**Solución:**
1. Completa todos los campos obligatorios en OAuth Consent Screen
2. Agrega tu email como test user
3. Guarda los cambios

### **Error: "Unsupported provider: provider is not enabled"**
**Problema:** Google no está habilitado en Supabase

**Solución:**
1. Verifica que el toggle de Google en Supabase esté **ON** (verde)
2. Guarda los cambios
3. Espera 1-2 minutos para que se propague
4. Reinicia tu aplicación

### **Error: "The redirect URI in the request does not match"**
**Problema:** Diferencia entre desarrollo y producción

**Solución:**
Para desarrollo local, asegúrate de tener ambas URLs:
```
http://localhost:3000/auth/callback
https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
```

---

## ✅ Checklist de Verificación

- [ ] Proyecto creado en Google Cloud Console
- [ ] Pantalla de consentimiento OAuth configurada
- [ ] Email agregado como test user
- [ ] Cliente OAuth 2.0 creado
- [ ] Client ID y Client Secret copiados
- [ ] Authorized redirect URIs configuradas correctamente
- [ ] Google provider habilitado en Supabase
- [ ] Client ID pegado en Supabase
- [ ] Client Secret pegado en Supabase
- [ ] Cambios guardados en Supabase
- [ ] Variables de entorno verificadas
- [ ] Aplicación reiniciada
- [ ] Caché del navegador limpiada
- [ ] Google Sign-In probado exitosamente

---

## 📝 URLs Importantes

**Google Cloud Console:**
- Dashboard: https://console.cloud.google.com/
- OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent
- Credentials: https://console.cloud.google.com/apis/credentials

**Supabase:**
- Dashboard: https://supabase.com/dashboard
- Authentication Providers: https://supabase.com/dashboard/project/keaodzizpnrbtitzpenn/auth/providers

**Tu Aplicación:**
- Local: http://localhost:3000/signin
- Callback: http://localhost:3000/auth/callback

---

## 🔒 Seguridad

### **Producción:**
Cuando despliegues a producción:

1. **Actualiza las URLs en Google Cloud Console:**
   ```
   Authorized JavaScript origins:
     - https://tu-dominio.com
   
   Authorized redirect URIs:
     - https://keaodzizpnrbtitzpenn.supabase.co/auth/v1/callback
     - https://tu-dominio.com/auth/callback
   ```

2. **Actualiza la variable de entorno:**
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://tu-dominio.com
   ```

3. **Publica el OAuth Consent Screen:**
   - En Google Cloud Console, ve a OAuth Consent Screen
   - Haz clic en **"Publish App"** cuando estés listo para producción
   - Esto permitirá que cualquier usuario con cuenta de Google pueda registrarse

### **Buenas Prácticas:**
- ✅ Nunca expongas el Client Secret en el código frontend
- ✅ Usa variables de entorno para configuración sensible
- ✅ Mantén actualizadas las URLs de redirección
- ✅ Revisa regularmente los permisos solicitados

---

## 📧 Soporte

Si sigues teniendo problemas:

1. Verifica los logs en Supabase Dashboard → Logs → Auth Logs
2. Revisa la consola del navegador para errores
3. Verifica que las credenciales de Google no hayan expirado
4. Contacta al soporte de Supabase si el problema persiste

---

**Última actualización:** Octubre 2025
