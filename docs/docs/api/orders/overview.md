# Orders API

## Descripción

La API de órdenes gestiona el ciclo completo de pedidos, desde la creación hasta el seguimiento.

## Endpoints

### Customer Dashboard

#### GET `/api/dashboard/orders`

Obtiene las órdenes del cliente autenticado.

**Autenticación**: Requerida (Customer)

**Query Parameters**:
```typescript
{
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  status?: string;
  paymentStatus?: string;
}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "order_number": "ORD-20250001",
      "status": "pending",
      "payment_status": "pending",
      "total": 1500.00,
      "created_at": "2025-10-13T10:00:00Z",
      "order_items": [
        {
          "id": "uuid",
          "quantity": 10,
          "unit_price": 150.00,
          "subtotal": 1500.00,
          "products": {
            "name": "Varilla 12mm",
            "sku": "VAR-12MM"
          }
        }
      ]
    }
  ],
  "pagination": { ... }
}
```

#### GET `/api/dashboard/orders/[id]`

Obtiene detalle de una orden específica.

**Autenticación**: Requerida (Customer - solo sus órdenes)

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "order_number": "ORD-20250001",
    "status": "pending",
    "payment_status": "pending",
    "shipping_method": "delivery_quito",
    "total": 1500.00,
    "shipping_addresses": {
      "label": "Oficina Principal",
      "street": "Av. Amazonas 123",
      "city": "Quito",
      "province": "Pichincha",
      "postal_code": "170150",
      "country": "Ecuador",
      "phone": "0999999999"
    },
    "order_items": [...]
  }
}
```

### Public API

#### POST `/api/orders/create`

Crea una nueva orden desde el carrito.

**Autenticación**: Requerida

**Body**:
```json
{
  "shipping_method": "delivery_quito",
  "payment_method": "transfer",
  "shipping_address_id": "uuid",
  "notes": "Entregar en horario de oficina"
}
```

## Estados de Orden

### Order Status
- `pending`: Pendiente
- `processing`: En proceso
- `shipped`: Enviado
- `delivered`: Entregado
- `cancelled`: Cancelado

### Payment Status
- `pending`: Pago pendiente
- `paid`: Pagado
- `failed`: Pago fallido
- `refunded`: Reembolsado

## Métodos de Envío

- `pickup_quito`: Retiro en Quito (Aloag)
- `pickup_milagro`: Retiro en Milagro
- `delivery_quito`: Envío a Quito
- `delivery_guayaquil`: Envío a Guayaquil
- `delivery_other`: Envío a otras ciudades

## Métodos de Pago

- `transfer`: Transferencia bancaria
- `cash`: Efectivo
- `credit`: Crédito (aprobación requerida)

## Ejemplos de Uso

### Crear Orden

```typescript
const order = await fetch('/api/orders/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    shipping_method: 'delivery_quito',
    payment_method: 'transfer',
    shipping_address_id: 'uuid-address',
    notes: 'Entregar de 9am a 5pm'
  })
})
```

### Listar Órdenes de Cliente

```typescript
import { getDashboardOrders } from '@/services/dashboard/orders'

const orders = await getDashboardOrders({
  page: 1,
  status: 'pending'
})
```

## Validaciones

- El carrito debe tener items
- La dirección de envío es requerida para delivery
- El stock debe estar disponible
- El método de pago debe ser válido

## Flujo de Orden

1. **Crear orden**: Cliente crea orden desde carrito
2. **Verificar stock**: Sistema valida disponibilidad
3. **Generar número**: Se asigna número de orden único
4. **Crear items**: Se crean los items de la orden
5. **Limpiar carrito**: Se vacía el carrito del cliente
6. **Notificar**: Se envía confirmación al cliente

## Manejo de Direcciones

Si no se proporciona `shipping_address_id`:

1. Busca dirección por defecto del usuario
2. Si no existe, busca cualquier dirección
3. Si se proporciona `shipping_address`, crea nueva dirección
4. Para pickup, la dirección es opcional

```typescript
// Crear orden con nueva dirección
{
  shipping_method: 'delivery_quito',
  shipping_address: {
    label: 'Nueva Oficina',
    street: 'Av. 6 de Diciembre',
    city: 'Quito',
    province: 'Pichincha',
    postal_code: '170150',
    country: 'Ecuador',
    phone: '0999999999',
    is_default: false
  }
}
```

## Errores Comunes

| Código | Mensaje | Solución |
|--------|---------|----------|
| 401 | No autenticado | Iniciar sesión |
| 400 | Carrito vacío | Agregar productos al carrito |
| 400 | Stock insuficiente | Reducir cantidad |
| 404 | Orden no encontrada | Verificar ID |
| 403 | Acceso denegado | Solo puede ver sus órdenes |

