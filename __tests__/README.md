# Testing Guide

## 📋 Descripción

Este directorio contiene todos los tests unitarios y de integración para el proyecto My E-commerce.

## 🧪 Stack de Testing

- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes React
- **Jest DOM**: Matchers adicionales para DOM
- **TypeScript**: Tests tipados

## 📁 Estructura

```
__tests__/
├── components/          # Tests de componentes React
│   └── AuthHandler.test.tsx
├── services/           # Tests de servicios (API calls)
│   ├── products.test.ts
│   └── orders.test.ts
├── integration/        # Tests de integración (futuro)
└── utils/             # Tests de utilidades (futuro)
```

## 🚀 Comandos

### Ejecutar todos los tests
```bash
npm test
```

### Modo watch (desarrollo)
```bash
npm run test:watch
```

### Con coverage
```bash
npm run test:coverage
```

### Test específico
```bash
npm test -- AuthHandler
```

## 📝 Convenciones

### Nomenclatura
- Archivos: `*.test.ts` o `*.test.tsx`
- Tests: Descripción clara del comportamiento esperado
- Mocks: Prefijo `mock` (ej: `mockReplace`, `mockResponse`)

### Estructura de Test
```typescript
describe('Nombre del módulo', () => {
  beforeEach(() => {
    // Setup antes de cada test
    jest.clearAllMocks()
  })

  it('should [comportamiento esperado]', async () => {
    // Arrange (preparar)
    const mockData = { ... }

    // Act (actuar)
    const result = await someFunction(mockData)

    // Assert (verificar)
    expect(result).toBe(expected)
  })
})
```

## 🎯 Ejemplos

### Test de Servicio

```typescript
import { getDashboardProducts } from '@/services/dashboard/products/getProducts'

describe('Product Services', () => {
  it('should fetch products successfully', async () => {
    // Mock de fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [{ id: '1', name: 'Product 1' }]
      })
    })

    const result = await getDashboardProducts()

    expect(result.success).toBe(true)
    expect(result.data).toHaveLength(1)
  })
})
```

### Test de Componente

```typescript
import { render, waitFor } from '@testing-library/react'
import AuthHandler from '@/app/auth-handler'

describe('AuthHandler', () => {
  it('should redirect with OAuth code', async () => {
    const { useSearchParams } = require('next/navigation')
    useSearchParams.mockReturnValue(
      new URLSearchParams('code=abc123')
    )

    render(<AuthHandler />)

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        '/auth/callback?code=abc123'
      )
    })
  })
})
```

## 🔧 Configuración

### jest.config.js
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### jest.setup.js
```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ ... }),
  useSearchParams: jest.fn(),
  usePathname: () => '',
}))
```

## ✅ Best Practices

### 1. Tests Independientes
Cada test debe poder ejecutarse solo sin depender de otros.

```typescript
// ❌ Malo
let sharedData
it('test 1', () => { sharedData = ... })
it('test 2', () => { use sharedData })

// ✅ Bueno
it('test 1', () => { const data = ... })
it('test 2', () => { const data = ... })
```

### 2. Limpiar Mocks
Siempre limpiar mocks entre tests.

```typescript
beforeEach(() => {
  jest.clearAllMocks()
})
```

### 3. Tests Descriptivos
Usa nombres que describan el comportamiento.

```typescript
// ❌ Malo
it('works', () => { ... })

// ✅ Bueno
it('should fetch products successfully', () => { ... })
it('should handle network errors gracefully', () => { ... })
```

### 4. Arrange-Act-Assert
Organiza tus tests en 3 secciones claras.

```typescript
it('should update product', async () => {
  // Arrange: preparar datos y mocks
  const mockProduct = { id: '1', name: 'Test' }
  global.fetch = jest.fn().mockResolvedValue(...)

  // Act: ejecutar la función
  const result = await updateProduct(mockProduct)

  // Assert: verificar resultados
  expect(result.success).toBe(true)
})
```

### 5. Mock Solo lo Necesario
No mockees todo, solo lo que no puedes controlar.

```typescript
// ✅ Bueno: mock de dependencias externas
jest.mock('next/navigation')
global.fetch = jest.fn()

// ❌ Malo: mock de tu propia lógica
jest.mock('@/services/myService')
```

## 📊 Coverage

### Objetivos
- **Services**: 90%+ coverage
- **Components**: 80%+ coverage
- **Utils**: 95%+ coverage
- **API Routes**: 70%+ coverage

### Ver Coverage
```bash
npm run test:coverage
```

Output:
```
--------------------|---------|----------|---------|---------|
File               | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files          |   85.2  |   78.5   |   82.1  |   85.8  |
 services/         |   92.1  |   85.2   |   88.9  |   92.5  |
 components/       |   78.3  |   72.1   |   75.5  |   78.9  |
--------------------|---------|----------|---------|---------|
```

## 🐛 Debugging Tests

### VS Code
Agregar a `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Console Logs
```typescript
it('test with debug', () => {
  console.log('Debug value:', someValue)
  expect(someValue).toBe(expected)
})
```

## 🔗 Recursos

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing](https://nextjs.org/docs/testing)

## 📋 Checklist para Nuevos Tests

- [ ] Archivo `.test.ts` o `.test.tsx` creado
- [ ] Imports correctos
- [ ] Describe block con nombre descriptivo
- [ ] beforeEach con cleanup de mocks
- [ ] Tests con nombres descriptivos
- [ ] Arrange-Act-Assert pattern
- [ ] Coverage > 80%
- [ ] Todos los tests pasan ✅

## 🚦 CI/CD

### GitHub Actions (ejemplo)
```yaml
- name: Run tests
  run: npm test

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## 📝 Notas

- Tests se ejecutan en ambiente `jsdom`
- Next.js router está mockeado automáticamente
- Fetch está disponible globalmente
- Environment variables están definidas en `jest.setup.js`

