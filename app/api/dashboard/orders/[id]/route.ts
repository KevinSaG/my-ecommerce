import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/dashboard/orders/[id]
 * Obtener detalles de una orden específica (solo del usuario autenticado)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Obtener orden con todos sus detalles
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          id,
          product_id,
          quantity,
          unit_price,
          discount_percentage,
          subtotal,
          weight_total,
          plant_location,
          products(
            id,
            sku,
            name,
            description,
            category,
            weight_per_unit,
            stock_unit
          )
        ),
        shipping_addresses:addresses!shipping_address_id(
          id,
          label,
          street,
          city,
          province,
          postal_code,
          country,
          phone
        )
      `)
      .eq('id', id)
      .eq('user_id', user.id) // Solo permitir ver órdenes propias
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Orden no encontrada' },
          { status: 404 }
        );
      }
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { success: false, error: 'Error al obtener orden' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error in GET /api/dashboard/orders/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
