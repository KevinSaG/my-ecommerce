import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado', data: [] },
        { status: 401 }
      );
    }

    // First, find or create user's cart
    let { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select('id')
        .single();

      if (createError) {
        console.error('Error creating cart:', createError);
        return NextResponse.json(
          { error: 'Error al crear carrito', data: [] },
          { status: 500 }
        );
      }

      cart = newCart;
    }

    // Get cart items from database
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products:products(
          id,
          name,
          sku,
          base_price,
          category,
          description,
          inventory:product_inventory(
            plant_location,
            quantity_available
          )
        )
      `)
      .eq('cart_id', cart.id);

    if (error) {
      console.error('Error fetching cart:', error);
      return NextResponse.json(
        { error: 'Error al obtener carrito', data: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      data: cartItems || [] 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', data: [] },
      { status: 500 }
    );
  }
}

