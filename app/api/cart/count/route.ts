import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ 
        success: true,
        count: 0 
      });
    }

    // Get user's cart
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!cart) {
      return NextResponse.json({ 
        success: true,
        count: 0
      });
    }

    // Get cart items count
    const { count, error } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .eq('cart_id', cart.id);

    if (error) {
      console.error('Error getting cart count:', error);
      return NextResponse.json(
        { error: 'Error al contar items', count: 0 },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      count: count || 0
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', count: 0 },
      { status: 500 }
    );
  }
}

