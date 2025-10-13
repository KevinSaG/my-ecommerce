-- =====================================================
-- Script para agregar direcciones de ejemplo y actualizar órdenes
-- Ejecutar en el SQL Editor de Supabase
-- =====================================================

-- 1. Primero, obtener los IDs de usuarios existentes
-- Necesitarás reemplazar USER_ID_1, USER_ID_2, etc. con IDs reales de tu base de datos

-- Ejemplo de consulta para obtener usuarios:
-- SELECT id, email FROM users LIMIT 5;

-- 2. Insertar direcciones de ejemplo
-- IMPORTANTE: Reemplaza 'USER_ID_AQUI' con el ID real del usuario

-- Dirección 1 - Quito Centro
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
VALUES (
  'USER_ID_AQUI', -- Reemplazar con ID real
  'Casa - Quito Centro',
  'Av. 10 de Agosto N35-123 y Naciones Unidas',
  'Quito',
  'Pichincha',
  '170135',
  'Ecuador',
  '0991234567',
  true
);

-- Dirección 2 - Guayaquil Norte
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
VALUES (
  'USER_ID_AQUI', -- Reemplazar con ID real
  'Oficina - Guayaquil',
  'Av. Francisco de Orellana y Av. Juan Tanca Marengo',
  'Guayaquil',
  'Guayas',
  '090150',
  'Ecuador',
  '0987654321',
  false
);

-- Dirección 3 - Cuenca Centro
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
VALUES (
  'USER_ID_AQUI', -- Reemplazar con ID real
  'Casa - Cuenca',
  'Calle Larga 4-56 y Benigno Malo',
  'Cuenca',
  'Azuay',
  '010150',
  'Ecuador',
  '0995432109',
  false
);

-- Dirección 4 - Quito Sur
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
VALUES (
  'USER_ID_AQUI', -- Reemplazar con ID real
  'Casa - Quito Sur',
  'Av. Maldonado S24-234 y Moraspungo',
  'Quito',
  'Pichincha',
  '170143',
  'Ecuador',
  '0993216549',
  false
);

-- Dirección 5 - Ambato
INSERT INTO addresses (user_id, label, street, city, province, postal_code, country, phone, is_default)
VALUES (
  'USER_ID_AQUI', -- Reemplazar con ID real
  'Bodega - Ambato',
  'Av. Cevallos 12-45 y Castillo',
  'Ambato',
  'Tungurahua',
  '180150',
  'Ecuador',
  '0998765432',
  false
);

-- 3. Actualizar órdenes existentes con shipping_address_id
-- Primero, obtener el ID de una dirección (ejemplo: la primera dirección por defecto)
-- SELECT id FROM addresses WHERE is_default = true LIMIT 1;

-- Actualizar todas las órdenes que no tienen shipping_address_id
-- IMPORTANTE: Reemplaza 'ADDRESS_ID_AQUI' con un ID real de dirección
UPDATE orders 
SET shipping_address_id = 'ADDRESS_ID_AQUI'
WHERE shipping_address_id IS NULL;

-- 4. Verificar las actualizaciones
SELECT 
  o.id,
  o.order_number,
  o.shipping_address_id,
  a.street_address,
  a.city
FROM orders o
LEFT JOIN addresses a ON o.shipping_address_id = a.id
LIMIT 10;

-- =====================================================
-- Script automatizado (ejecutar después de tener usuarios reales)
-- =====================================================

-- Este script crea una dirección de ejemplo para cada usuario que no tiene una
-- y actualiza las órdenes sin dirección

DO $$
DECLARE
  v_user_id UUID;
  v_address_id UUID;
  v_user_cursor CURSOR FOR 
    SELECT DISTINCT user_id 
    FROM orders 
    WHERE user_id IS NOT NULL 
    AND user_id NOT IN (SELECT DISTINCT user_id FROM addresses WHERE user_id IS NOT NULL);
BEGIN
  -- Para cada usuario sin dirección
  FOR v_user IN v_user_cursor LOOP
    -- Crear dirección de ejemplo
    INSERT INTO addresses (
      user_id, 
      label, 
      street, 
      city, 
      province, 
      postal_code, 
      country, 
      phone,
      is_default
    )
    VALUES (
      v_user.user_id,
      'Dirección Principal',
      'Dirección de envío ejemplo',
      'Quito',
      'Pichincha',
      '170150',
      'Ecuador',
      '0999999999',
      true
    )
    RETURNING id INTO v_address_id;
    
    -- Actualizar órdenes de ese usuario sin dirección
    UPDATE orders 
    SET shipping_address_id = v_address_id
    WHERE user_id = v_user.user_id 
    AND shipping_address_id IS NULL;
    
    RAISE NOTICE 'Dirección creada para usuario % con ID %', v_user.user_id, v_address_id;
  END LOOP;
END $$;

-- 5. Reporte final
SELECT 
  COUNT(*) as total_orders,
  COUNT(shipping_address_id) as orders_with_address,
  COUNT(*) - COUNT(shipping_address_id) as orders_without_address
FROM orders;

SELECT 
  COUNT(*) as total_addresses,
  COUNT(CASE WHEN is_default = true THEN 1 END) as default_addresses,
  COUNT(CASE WHEN is_default = false THEN 1 END) as other_addresses
FROM addresses;
