# ✅ Solución: RLS Policies para Orders

## 🔴 Problema Original

```json
{
  "error": "Error al crear orden: new row violates row-level security policy for table \"orders\""
}
```

**Causa**: La tabla `orders` tenía RLS (Row Level Security) habilitado pero **sin políticas** que permitieran a los usuarios crear órdenes.

---

## ✅ Solución Aplicada

He creado las siguientes políticas RLS en Supabase:

### 1. **Tabla `orders`**

#### Política 1: Crear Órdenes
```sql
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```
✅ Permite a usuarios autenticados crear órdenes donde `user_id` = su ID

#### Política 2: Ver Órdenes
```sql
CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
```
✅ Permite a usuarios ver solo sus propias órdenes

#### Política 3: Actualizar Órdenes
```sql
CREATE POLICY "Users can update their own orders"
ON orders
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```
✅ Permite a usuarios actualizar solo sus propias órdenes (para cancelaciones, etc.)

---

### 2. **Tabla `order_items`**

#### Política 1: Crear Items
```sql
CREATE POLICY "Users can create order items for their orders"
ON order_items
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
```
✅ Permite crear items solo para órdenes propias

#### Política 2: Ver Items
```sql
CREATE POLICY "Users can view their order items"
ON order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
```
✅ Permite ver items solo de órdenes propias

---

## 🎯 Resultado

Ahora los usuarios **SÍ pueden**:
- ✅ Crear órdenes desde el checkout
- ✅ Ver sus propias órdenes en `/mis-ordenes`
- ✅ Ver detalles de sus órdenes
- ✅ Actualizar/cancelar sus órdenes (futuro)

Los usuarios **NO pueden**:
- ❌ Ver órdenes de otros usuarios
- ❌ Crear órdenes en nombre de otros usuarios
- ❌ Modificar órdenes de otros usuarios

---

## 🧪 Cómo Probar

1. **Asegúrate de estar autenticado** (iniciado sesión)
2. **Agrega productos al carrito**
3. **Ve a `/checkout`**
4. **Completa el formulario**:
   - Selecciona método de entrega
   - Selecciona método de pago
   - Agrega notas (opcional)
5. **Click "Confirmar Pedido"**
6. **Deberías ver** `/orden-exitosa` con tu número de orden
7. **Ve a `/mis-ordenes`** para ver tu historial

---

## 📊 Seguridad Implementada

### Nivel de Usuario
- Solo usuarios autenticados pueden crear órdenes
- Cada usuario solo ve sus propias órdenes
- No se puede acceder a datos de otros usuarios

### Nivel de Datos
- `auth.uid()` verifica la identidad del usuario
- Las políticas se aplican automáticamente en todas las queries
- No se puede bypassear desde el frontend

### Integridad Referencial
- Los `order_items` están vinculados a `orders`
- Solo se pueden crear items para órdenes propias
- Las queries JOIN funcionan correctamente con RLS

---

## 🔐 Políticas RLS Activas

```
orders:
├── INSERT: "Users can create their own orders"
├── SELECT: "Users can view their own orders"
└── UPDATE: "Users can update their own orders"

order_items:
├── INSERT: "Users can create order items for their orders"
└── SELECT: "Users can view their order items"
```

---

## 🎊 Estado Actual

**✅ RESUELTO** - El checkout ahora funciona correctamente con RLS habilitado.

**Migración aplicada**: `add_orders_rls_policies`

**Fecha**: Octubre 2024

