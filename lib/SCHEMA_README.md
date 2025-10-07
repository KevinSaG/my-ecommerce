# Adelca E-Commerce Schema Documentation

## 📋 Overview

Este schema está diseñado específicamente para **Adelca** (Acería del Ecuador), adaptado a las necesidades de un e-commerce de productos siderúrgicos (acero) con operaciones B2B y B2C.

## 🏗️ Características Principales

### 1. **Multi-Planta**
- Soporte para múltiples ubicaciones (Alóag, Milagro, Durán)
- Inventario independiente por planta
- Selección de punto de retiro o despacho

### 2. **Tipos de Cliente**
- **Retail**: Clientes minoristas
- **Wholesale**: Mayoristas
- **Construction**: Constructoras
- **Hardware Store**: Ferreterías
- **Industrial**: Clientes industriales
- **Government**: Entidades gubernamentales

### 3. **Sistema de Cotizaciones**
- Cotizaciones para pedidos grandes
- Conversión de cotización a orden
- Precios diferenciados por tipo de cliente y volumen

### 4. **Productos Especializados**
Categorías específicas para productos de acero:
- Varillas corrugadas (rebar)
- Alambre (wire)
- Malla electrosoldada (mesh)
- Perfiles estructurales (profiles)
- Planchas (sheets)
- Tubos (tubes)
- Ángulos (angles)
- Canales (channels)
- Vigas (beams)
- Accesorios (accessories)

### 5. **Especificaciones Técnicas**
- Diámetro, longitud, ancho, espesor
- Peso por unidad
- Grado del acero (A36, A706, etc.)
- Normas técnicas (ASTM, INEN)
- Fichas técnicas descargables

## 📁 Estructura de Archivos

```
lib/
├── ecommerce-schema.ts      # TypeScript types e interfaces
├── supabase-schema.sql      # SQL schema para Supabase/PostgreSQL
└── SCHEMA_README.md         # Esta documentación
```

## 🚀 Implementación en Supabase

### Paso 1: Crear la Base de Datos

1. Ve a tu proyecto de Supabase
2. Abre el **SQL Editor**
3. Copia el contenido de `supabase-schema.sql`
4. Ejecuta el script

### Paso 2: Configurar Row Level Security (RLS)

El schema incluye políticas RLS básicas. Personaliza según tus necesidades:

```sql
-- Ejemplo: Permitir a los usuarios ver solo sus propias órdenes
CREATE POLICY "Users can view own orders" 
ON orders FOR SELECT 
USING (auth.uid() = user_id);
```

### Paso 3: Poblar Datos Iniciales

```sql
-- Ejemplo: Crear categorías
INSERT INTO categories (name, slug, category_type, is_active, sort_order) VALUES
  ('Varillas Corrugadas', 'varillas-corrugadas', 'rebar', true, 1),
  ('Alambre Galvanizado', 'alambre-galvanizado', 'wire', true, 2),
  ('Mallas Electrosoldadas', 'mallas-electrosoldadas', 'mesh', true, 3);

-- Ejemplo: Crear producto
INSERT INTO products (
  sku, name, description, category, 
  diameter, length, weight_per_unit, grade,
  base_price, stock_unit, slug
) VALUES (
  'VAR-12MM-12M',
  'Varilla Corrugada 12mm x 12m',
  'Varilla de acero corrugado grado 60, ideal para construcción',
  'rebar',
  12.0, 12.0, 8.5, 'A706',
  15.50, 'unit', 'varilla-corrugada-12mm-12m'
);
```

## 💻 Uso con TypeScript

### Ejemplo 1: Crear un Producto

```typescript
import { Product, ProductCategory } from '@/lib/ecommerce-schema';
import { createClient } from '@/lib/supabase/server';

async function createProduct(productData: Partial<Product>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .insert({
      sku: 'VAR-10MM-12M',
      name: 'Varilla 10mm x 12m',
      category: 'rebar' as ProductCategory,
      diameter: 10,
      length: 12,
      weight_per_unit: 5.92,
      base_price: 12.50,
      slug: 'varilla-10mm-12m',
      ...productData
    })
    .select()
    .single();
    
  return { data, error };
}
```

### Ejemplo 2: Obtener Productos con Inventario

```typescript
import { Product, ProductInventory, PlantLocation } from '@/lib/ecommerce-schema';

async function getProductsWithStock(plant: PlantLocation) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory!inner(
        quantity_available,
        plant_location
      )
    `)
    .eq('inventory.plant_location', plant)
    .gt('inventory.quantity_available', 0)
    .eq('is_active', true);
    
  return { data, error };
}
```

### Ejemplo 3: Crear una Orden

```typescript
import { Order, OrderItem, OrderStatus } from '@/lib/ecommerce-schema';

async function createOrder(
  userId: string,
  items: Array<{ product_id: string; quantity: number; unit_price: number }>
) {
  const supabase = await createClient();
  
  // Calcular totales
  const subtotal = items.reduce((sum, item) => 
    sum + (item.quantity * item.unit_price), 0
  );
  const taxAmount = subtotal * 0.15; // IVA 15%
  const total = subtotal + taxAmount;
  
  // Crear orden
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: await generateOrderNumber(),
      user_id: userId,
      status: 'pending' as OrderStatus,
      subtotal,
      tax_amount: taxAmount,
      total,
    })
    .select()
    .single();
    
  if (orderError || !order) return { error: orderError };
  
  // Crear items de la orden
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    subtotal: item.quantity * item.unit_price,
    plant_location: 'aloag' as PlantLocation
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
    
  return { data: order, error: itemsError };
}
```

### Ejemplo 4: Sistema de Cotizaciones

```typescript
import { Quote, QuoteStatus } from '@/lib/ecommerce-schema';

async function createQuote(userId: string, items: any[]) {
  const supabase = await createClient();
  
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 15); // Válida por 15 días
  
  const { data: quote, error } = await supabase
    .from('quotes')
    .insert({
      quote_number: await generateQuoteNumber(),
      user_id: userId,
      status: 'draft' as QuoteStatus,
      valid_until: validUntil.toISOString(),
      // ... otros campos
    })
    .select()
    .single();
    
  // Agregar items a la cotización
  // ...
  
  return { data: quote, error };
}

async function convertQuoteToOrder(quoteId: string) {
  const supabase = await createClient();
  
  // Obtener cotización con items
  const { data: quote } = await supabase
    .from('quotes')
    .select('*, items:quote_items(*)')
    .eq('id', quoteId)
    .single();
    
  if (!quote) return { error: 'Quote not found' };
  
  // Crear orden desde cotización
  const order = await createOrder(quote.user_id, quote.items);
  
  // Actualizar cotización
  await supabase
    .from('quotes')
    .update({
      status: 'converted_to_order',
      converted_to_order_id: order.data?.id,
      converted_at: new Date().toISOString()
    })
    .eq('id', quoteId);
    
  return order;
}
```

### Ejemplo 5: Precios Diferenciados

```typescript
async function getProductPrice(
  productId: string,
  customerType: CustomerType,
  quantity: number
) {
  const supabase = await createClient();
  
  // Buscar precio específico para el tipo de cliente y cantidad
  const { data: priceRule } = await supabase
    .from('product_prices')
    .select('*')
    .eq('product_id', productId)
    .eq('customer_type', customerType)
    .lte('min_quantity', quantity)
    .or(`max_quantity.gte.${quantity},max_quantity.is.null`)
    .order('min_quantity', { ascending: false })
    .limit(1)
    .single();
    
  if (priceRule) {
    return {
      unit_price: priceRule.unit_price,
      discount: priceRule.discount_percentage
    };
  }
  
  // Fallback al precio base
  const { data: product } = await supabase
    .from('products')
    .select('base_price')
    .eq('id', productId)
    .single();
    
  return {
    unit_price: product?.base_price || 0,
    discount: 0
  };
}
```

## 📊 Consultas Comunes

### Dashboard de Ventas

```typescript
async function getSalesDashboard(startDate: Date, endDate: Date) {
  const supabase = await createClient();
  
  const { data: stats } = await supabase
    .rpc('get_sales_stats', {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    });
    
  return stats;
}
```

### Productos Más Vendidos

```sql
SELECT 
  p.name,
  p.sku,
  SUM(oi.quantity) as total_sold,
  SUM(oi.subtotal) as total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
  AND o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY p.id, p.name, p.sku
ORDER BY total_sold DESC
LIMIT 10;
```

### Inventario Bajo

```sql
SELECT 
  p.name,
  p.sku,
  pi.plant_location,
  pi.quantity_available,
  pi.reorder_point
FROM products p
JOIN product_inventory pi ON p.id = pi.product_id
WHERE pi.quantity_available <= pi.reorder_point
ORDER BY pi.quantity_available ASC;
```

## 🔒 Seguridad

### Row Level Security (RLS)

Todas las tablas sensibles tienen RLS habilitado. Asegúrate de:

1. Configurar políticas apropiadas
2. Usar `auth.uid()` para identificar usuarios
3. Validar roles y permisos

### Validaciones

- Precios y cantidades: siempre positivos
- Emails: formato válido
- Estados: solo valores permitidos (enums)
- Relaciones: integridad referencial

## 🛠️ Extensiones Recomendadas

```sql
-- Para búsqueda full-text
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Para cálculos geográficos (envíos)
CREATE EXTENSION IF NOT EXISTS postgis;
```

## 📈 Escalabilidad

### Índices Adicionales (según crecimiento)

```sql
-- Para búsqueda de productos
CREATE INDEX idx_products_fulltext ON products 
USING gin(to_tsvector('spanish', name || ' ' || description));

-- Para reportes de ventas
CREATE INDEX idx_orders_date_status ON orders(created_at, status) 
WHERE status = 'delivered';
```

### Particionamiento (para grandes volúmenes)

```sql
-- Particionar orders por mes
CREATE TABLE orders_2024_01 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

## 🤝 Contribuir

Para agregar nuevas features al schema:

1. Actualiza `ecommerce-schema.ts` con los nuevos tipos
2. Actualiza `supabase-schema.sql` con las nuevas tablas
3. Documenta los cambios en este README
4. Crea migraciones para cambios en producción

## 📞 Soporte

Para preguntas sobre el schema:
- Revisa la documentación de Supabase
- Consulta los ejemplos de uso
- Revisa las políticas RLS configuradas

