import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { product_id, quantity = 1 } = await request.json();

    if (!product_id) {
      return NextResponse.json(
        { error: 'Product ID es requerido' },
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
          { error: 'Error al crear carrito' },
          { status: 500 }
        );
      }

      cart = newCart;
    }

    // Check if product exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cart.id)
      .eq('product_id', product_id)
      .single();

    if (existingItem) {
      // Update quantity if item already exists
      const { data, error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: Number(existingItem.quantity) + quantity,
        })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating cart item:', error);
        return NextResponse.json(
          { error: 'Error al actualizar carrito' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        success: true,
        message: 'Cantidad actualizada',
        data 
      });
    } else {
      // Add new item to cart
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id,
          quantity,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json(
          { error: 'Error al agregar al carrito' },
          { status: 500 }
        );
      }

      return NextResponse.json({ 
        success: true,
        message: 'Producto agregado al carrito',
        data 
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

