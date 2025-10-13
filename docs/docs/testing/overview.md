# Testing

## 📋 Resumen

El proyecto utiliza **Jest** y **React Testing Library** para garantizar la calidad del código y prevenir regresiones.

## 🧪 Tipos de Tests

### Unit Tests
Prueban funciones y componentes individuales de forma aislada.

**Ubicación**: `__tests__/`

### Integration Tests  
Prueban la interacción entre múltiples componentes.

**Ubicación**: `__tests__/integration/`

### E2E Tests (Futuro)
Prueban flujos completos de usuario.

## 🚀 Ejecutar Tests

### Todos los tests
```bash
npm test
```

### Watch mode (desarrollo)
```bash
npm run test:watch
```

### Con coverage
```bash
npm run test:coverage
```

## 📁 Estructura de Tests

```
__tests__/
├── components/
│   ├── AuthHandler.test.tsx
│   └── ...
├── services/
│   ├── products.test.ts
│   ├── orders.test.ts
│   └── ...
├── integration/
│   └── ...
└── utils/
    └── ...
```

## 📝 Ejemplos de Tests

### Test de Servicio

```typescript
import { getDashboardProducts } from '@/services/dashboard/products/getProducts'

describe('Product Services', () => {
  it('should fetch products successfully', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [
          { id: '1', name: 'Product 1' }
        ]
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
import { render, screen } from '@testing-library/react'
import AuthHandler from '@/app/auth-handler'

describe('AuthHandler', () => {
  it('should redirect with OAuth code', async () => {
    const mockReplace = jest.fn()
    
    render(<AuthHandler />)

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled()
    })
  })
})
```

## 🎯 Cobertura de Tests

Objetivo mínimo de cobertura: **80%**

Ver reporte completo:
```bash
npm run test:coverage
```

## 🛠️ Configuración

### jest.config.js
```javascript
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  }
}
```

### jest.setup.js
```javascript
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn()
  })
}))
```

## ✅ Best Practices

1. **Arrange-Act-Assert**: Organiza tus tests en estas 3 secciones
2. **Tests descriptivos**: Usa nombres claros que describan qué se está probando
3. **Mocks apropiados**: Mock solo lo necesario, no todo
4. **Tests independientes**: Cada test debe poder ejecutarse solo
5. **Cleanup**: Limpia mocks y estados entre tests

## 📊 Coverage Goals

| Área | Meta | Estado |
|------|------|--------|
| Services | 90% | ✅ |
| Components | 80% | 🔄 |
| Utils | 95% | ✅ |
| API Routes | 70% | 📝 |

## 🔗 Enlaces Útiles

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

