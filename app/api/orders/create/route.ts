import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      shipping_method,
      shipping_address_id,
      shipping_address,
      pickup_location,
      payment_method,
      customer_notes,
    } = body;

    // Validate required fields
    if (!shipping_method || !payment_method) {
      return NextResponse.json(
        { error: 'Método de envío y pago son requeridos' },
        { status: 400 }
      );
    }

    // Handle shipping address
    let finalShippingAddressId = shipping_address_id;

    // Si se requiere envío y no hay dirección, crearla o usar una existente
    if (shipping_method !== 'pickup_quito' && shipping_method !== 'pickup_milagro' && !finalShippingAddressId) {
      // Si se envió datos de dirección, crear nueva
      if (shipping_address) {
        const { data: newAddress, error: addressError } = await supabase
          .from('addresses')
          .insert({
            user_id: user.id,
            label: shipping_address.label || 'Nueva Dirección',
            street: shipping_address.street || 'Dirección sin especificar',
            city: shipping_address.city || 'Ciudad',
            province: shipping_address.province || 'Provincia',
            postal_code: shipping_address.postal_code || '000000',
            country: shipping_address.country || 'Ecuador',
            phone: shipping_address.phone || '0999999999',
            is_default: shipping_address.is_default || false,
          })
          .select()
          .single();

        if (!addressError && newAddress) {
          finalShippingAddressId = newAddress.id;
        }
      } else {
        // Buscar dirección por defecto del usuario
        const { data: defaultAddress } = await supabase
          .from('addresses')
          .select('id')
          .eq('user_id', user.id)
          .eq('is_default', true)
          .single();

        if (defaultAddress) {
          finalShippingAddressId = defaultAddress.id;
        } else {
          // Buscar cualquier dirección del usuario
          const { data: anyAddress } = await supabase
            .from('addresses')
            .select('id')
            .eq('user_id', user.id)
            .limit(1)
            .single();

          if (anyAddress) {
            finalShippingAddressId = anyAddress.id;
          }
        }
      }
    }

    // Get user's cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!cart) {
      return NextResponse.json(
        { error: 'Carrito no encontrado' },
        { status: 404 }
      );
    }

    // Get cart items with product details
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (id, name, base_price, sku)
      `)
      .eq('cart_id', cart.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Carrito vacío' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
      const product = item.products as any;
      return sum + (product.base_price * item.quantity);
    }, 0);

    const tax_amount = subtotal * 0.15; // 15% IVA (ajustar según necesidad)
    const shipping_cost = shipping_method === 'pickup_quito' || shipping_method === 'pickup_milagro' ? 0 : 10; // Ejemplo
    const total = subtotal + tax_amount + shipping_cost;

    // Generate order number
    const order_number = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number,
        user_id: user.id,
        status: 'pending',
        payment_status: 'pending',
        subtotal,
        tax_amount,
        discount_amount: 0,
        shipping_cost,
        total,
        payment_method,
        shipping_method,
        shipping_address_id: finalShippingAddressId || null,
        pickup_location: pickup_location || null,
        customer_notes: customer_notes || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Error al crear orden' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = cartItems.map(item => {
      const product = item.products as any;
      return {
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: product.base_price,
        discount_percentage: 0,
        subtotal: product.base_price * item.quantity,
        plant_location: 'aloag', // Default plant
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback: delete order
      await supabase.from('orders').delete().eq('id', order.id);
      return NextResponse.json(
        { error: 'Error al crear items de orden' },
        { status: 500 }
      );
    }

    // Clear cart
    await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Orden creada exitosamente',
    });
  } catch (error) {
    console.error('Error in create order API:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

