import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categorySlug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit') || '12');

    if (!categorySlug) {
      return NextResponse.json(
        { error: 'El slug de la categoría es requerido' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        inventory:product_inventory(
          plant_location,
          quantity_available
        )
      `)
      .eq('is_active', true)
      .limit(limit);

    if (error) {
      console.error('Error fetching products by category:', error);
      return NextResponse.json(
        { error: 'Error al obtener productos por categoría' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

