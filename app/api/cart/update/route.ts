import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const { cart_item_id, quantity } = await request.json();

    if (!cart_item_id || quantity === undefined) {
      return NextResponse.json(
        { error: 'Cart item ID y quantity son requeridos' },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'La cantidad debe ser mayor a 0' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
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

    // Update cart item
    const { data, error } = await supabase
      .from('cart_items')
      .update({ 
        quantity,
      })
      .eq('id', cart_item_id)
      .eq('cart_id', cart.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating cart item:', error);
      return NextResponse.json(
        { error: 'Error al actualizar cantidad' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Cantidad actualizada',
      data 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

