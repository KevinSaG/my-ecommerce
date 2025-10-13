# 🚀 Quick Start - Testing & Documentation

## ⚡ Comandos Rápidos

### Testing

```bash
# Ejecutar todos los tests
npm test

# Watch mode (re-ejecuta al guardar cambios)
npm run test:watch

# Ver reporte de coverage
npm run test:coverage
```

### Documentación

```bash
# Iniciar Docusaurus (puerto 3001)
npm run docs

# Build de documentación
npm run docs:build

# Servir documentación compilada
npm run docs:serve
```

---

## 📊 Estado Actual

### ✅ Tests Implementados (12 tests, todos pasando)

#### Services Tests
- ✅ Products: Fetch, create, error handling
- ✅ Orders: Fetch list, fetch by ID, error handling

#### Component Tests
- ✅ AuthHandler: OAuth redirects, error handling, loading states

### 📚 Documentación Disponible

#### API Documentation
- ✅ **Authentication** - `/docs/docs/api/auth/overview.md`
  - Sign Up/In, Google OAuth, roles, middleware
  
- ✅ **Products** - `/docs/docs/api/products/overview.md`
  - CRUD operations, filtering, validation
  
- ✅ **Orders** - `/docs/docs/api/orders/overview.md`
  - Order management, shipping, payment

#### Guides
- ✅ **Testing** - `/docs/docs/testing/overview.md`
  - Setup, examples, best practices
  
- ✅ **Deployment** - `/docs/docs/guides/deployment/vercel.md`
  - Vercel deployment, env vars, optimization

---

## 📁 Estructura de Archivos

```
my-ecommerce/
├── __tests__/                    # Tests unitarios
│   ├── components/
│   │   └── AuthHandler.test.tsx
│   ├── services/
│   │   ├── products.test.ts
│   │   └── orders.test.ts
│   └── README.md                 # Guía de testing
│
├── docs/                         # Docusaurus
│   ├── docs/
│   │   ├── api/                  # API docs
│   │   ├── testing/              # Testing guide
│   │   └── guides/               # Deployment guides
│   └── docusaurus.config.ts
│
├── jest.config.js                # Config de Jest
├── jest.setup.js                 # Setup de tests
└── package.json                  # Scripts agregados
```

---

## 🎯 Primeros Pasos

### 1. Ver la Documentación

```bash
# Iniciar Docusaurus
npm run docs

# Abrir navegador
http://localhost:3001
```

**Explora:**
- 📖 Intro → Visión general del proyecto
- 🔐 API → Auth → Autenticación completa
- 📦 API → Products → Gestión de productos
- 🛒 API → Orders → Sistema de órdenes
- 🧪 Testing → Guía de testing
- 🚀 Guides → Deployment → Deploy a Vercel

### 2. Ejecutar Tests

```bash
# Ver todos los tests
npm test

# Output esperado:
# Test Suites: 3 passed, 3 total
# Tests:       12 passed, 12 total
```

### 3. Ver Coverage

```bash
npm run test:coverage

# Se generará reporte en:
# coverage/lcov-report/index.html
```

---

## 🧪 Crear Nuevos Tests

### Test de Service

```typescript
// __tests__/services/myService.test.ts
import { myFunction } from '@/services/myService'

describe('My Service', () => {
  it('should work correctly', async () => {
    // Arrange
    const mockData = { ... }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockData })
    })

    // Act
    const result = await myFunction()

    // Assert
    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockData)
  })
})
```

### Test de Component

```typescript
// __tests__/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

---

## 📝 Agregar Documentación

### 1. Crear archivo markdown

```bash
# Ejemplo: Nueva guía
touch docs/docs/guides/my-guide.md
```

### 2. Escribir contenido

```markdown
# Mi Nueva Guía

## Descripción
...

## Pasos
1. Paso 1
2. Paso 2

## Ejemplos
\```typescript
const example = 'code'
\```
```

### 3. Actualizar sidebar

```typescript
// docs/sidebars.ts
guidesSidebar: [
  'guides/getting-started',
  'guides/my-guide',  // ← Agregar aquí
]
```

### 4. Ver en navegador

```bash
npm run docs
# → http://localhost:3001
```

---

## 🔍 Recursos

### Testing
- **Guía completa**: `__tests__/README.md`
- **Config Jest**: `jest.config.js`
- **Setup**: `jest.setup.js`

### Documentación
- **Intro**: `docs/docs/intro.md`
- **API Docs**: `docs/docs/api/`
- **Guías**: `docs/docs/guides/`
- **Testing**: `docs/docs/testing/`

### Resumen
- **Completo**: `TESTING_AND_DOCS_SUMMARY.md`
- **Quick Start**: Este archivo

---

## 💡 Tips

### Testing
- Ejecuta `npm run test:watch` mientras desarrollas
- Mantén coverage > 80%
- Usa Arrange-Act-Assert pattern
- Mock solo dependencias externas

### Documentación
- Usa ejemplos de código claros
- Incluye casos de uso comunes
- Mantén URLs relativas para links internos
- Build docs antes de commitear

---

## ✅ Checklist

### Antes de Commitear
- [ ] Tests pasan: `npm test`
- [ ] Build funciona: `npm run build`
- [ ] Docs buildan: `cd docs && npm run build`
- [ ] Linter OK: `npm run lint`

### Antes de Deploy
- [ ] Coverage > 80%
- [ ] Todos los tests pasan
- [ ] Docs actualizadas
- [ ] README actualizado
- [ ] Variables de entorno configuradas

---

## 🆘 Troubleshooting

### Tests fallan

```bash
# Limpiar cache
npm run test -- --clearCache

# Re-instalar
rm -rf node_modules
npm install
```

### Docs no buildan

```bash
# Verificar broken links
cd docs
npm run build

# Ver warnings y fix links
```

### Mock no funciona

```javascript
// Asegúrate de limpiar antes
beforeEach(() => {
  jest.clearAllMocks()
})
```

---

## 📞 Soporte

- **Testing Issues**: Ver `__tests__/README.md`
- **Docs Issues**: Ver `docs/README.md`
- **General**: Ver `TESTING_AND_DOCS_SUMMARY.md`

---

**Happy Testing & Documenting! 🎉**

**Última actualización**: 13 de Octubre de 2025

