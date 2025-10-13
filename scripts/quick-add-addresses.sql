-- =====================================================
-- Script rápido para agregar direcciones y actualizar órdenes
-- Este script funciona automáticamente sin necesidad de IDs manuales
-- =====================================================

-- Paso 1: Crear dirección de ejemplo para usuarios sin dirección
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
SELECT DISTINCT 
  o.user_id,
  'Dirección Principal' as label,
  'Av. Ejemplo 123 y Calle Principal' as street,
  'Quito' as city,
  'Pichincha' as province,
  '170150' as postal_code,
  'Ecuador' as country,
  '0999999999' as phone,
  true as is_default
FROM orders o
WHERE o.user_id IS NOT NULL
AND o.user_id NOT IN (
  SELECT user_id FROM addresses WHERE user_id IS NOT NULL
);

-- Paso 2: Actualizar órdenes sin shipping_address_id usando la dirección del usuario
UPDATE orders o
SET shipping_address_id = (
  SELECT a.id 
  FROM addresses a 
  WHERE a.user_id = o.user_id 
  AND a.is_default = true
  LIMIT 1
)
WHERE o.shipping_address_id IS NULL
AND o.user_id IS NOT NULL;

-- Paso 3: Verificar resultados
SELECT 
  'Órdenes totales' as descripcion,
  COUNT(*) as cantidad
FROM orders
UNION ALL
SELECT 
  'Órdenes con dirección',
  COUNT(*) 
FROM orders 
WHERE shipping_address_id IS NOT NULL
UNION ALL
SELECT 
  'Direcciones creadas',
  COUNT(*) 
FROM addresses;
