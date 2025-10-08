import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    // Get product count
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // Get order count for this user
    const { count: orderCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Get cart count for this user
    const { data: carts } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user.id)
      .single();

    let cartCount = 0;
    if (carts) {
      const { count } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact', head: true })
        .eq('cart_id', carts.id);
      cartCount = count || 0;
    }

    return NextResponse.json({
      success: true,
      data: {
        productCount: productCount || 0,
        orderCount: orderCount || 0,
        cartCount: cartCount,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}

