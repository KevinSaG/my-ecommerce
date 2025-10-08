import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID del producto es requerido' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Get product with all related data
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        inventory:product_inventory(
          plant_location,
          quantity_available
        ),
        reviews:product_reviews(
          id,
          rating,
          comment,
          created_at,
          user_id
        )
      `)
      .eq('id', id)
      .eq('is_active', true)
      .single();


    if (error) {
      console.error('Error fetching product:', error);
      
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Producto no encontrado' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Error al obtener el producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

