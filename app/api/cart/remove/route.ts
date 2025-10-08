import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const { cart_item_id } = await request.json();

    if (!cart_item_id) {
      return NextResponse.json(
        { error: 'Cart item ID es requerido' },
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

    // Remove cart item
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cart_item_id)
      .eq('cart_id', cart.id);

    if (error) {
      console.error('Error removing cart item:', error);
      return NextResponse.json(
        { error: 'Error al eliminar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Producto eliminado del carrito'
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

