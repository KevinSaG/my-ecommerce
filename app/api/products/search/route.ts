import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;
    
    // Filter parameters
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const supabase = await createClient();
    
    // Build query
    let query = supabase
      .from('products')
      .select(`
        *,
        inventory:product_inventory(
          plant_location,
          quantity_available
        )
      `, { count: 'exact' })
      .eq('is_active', true);

    // Apply search filter (searches in name and description)
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply category filter
    if (category) {
      query = query.eq('category', category);
    }

    // Apply price filters
    if (minPrice) {
      query = query.gte('base_price', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('base_price', parseFloat(maxPrice));
    }

    // Apply pagination and ordering
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Error al obtener productos' },
        { status: 500 }
      );
    }

    // Calculate pagination metadata
    const totalPages = count ? Math.ceil(count / limit) : 0;

    return NextResponse.json({
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

