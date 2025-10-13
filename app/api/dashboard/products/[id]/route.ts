import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/dashboard/products/[id]
 * Obtener un producto por ID
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

    // Verificar rol directamente en la tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error al verificar rol de usuario',
          debug: {
            userId: user.id,
            userEmail: user.email,
            error: userError?.message,
          },
        },
        { status: 403 }
      );
    }

    if (!['admin', 'sales_rep'].includes(userData.role)) {
      return NextResponse.json(
        {
          success: false,
          error: 'No autorizado. Se requiere rol de admin o sales_rep',
          debug: {
            userId: user.id,
            userEmail: user.email,
            userRole: userData.role,
          },
        },
        { status: 403 }
      );
    }

    // Obtener producto
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error in GET /api/dashboard/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/dashboard/products/[id]
 * Actualizar un producto (admin only)
 */
export async function PATCH(
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

    // Verificar rol directamente en la tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error al verificar rol de usuario',
          debug: {
            userId: user.id,
            userEmail: user.email,
            error: userError?.message,
          },
        },
        { status: 403 }
      );
    }

    if (userData.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'No autorizado. Se requiere rol de admin',
          debug: {
            userId: user.id,
            userEmail: user.email,
            userRole: userData.role,
          },
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Si se está actualizando el SKU, verificar que no exista
    if (body.sku) {
      const { data: existingProduct } = await supabase
        .from('products')
        .select('id')
        .eq('sku', body.sku)
        .neq('id', id)
        .single();

      if (existingProduct) {
        return NextResponse.json(
          { success: false, error: 'El SKU ya existe en otro producto' },
          { status: 400 }
        );
      }
    }

    // Preparar datos para actualizar
    const updateData: Record<string, any> = {};
    
    const allowedFields = [
      'sku', 'name', 'description', 'category', 'diameter', 'length',
      'width', 'thickness', 'weight_per_unit', 'grade', 'technical_standards',
      'base_price', 'price_per_kg', 'currency', 'is_active', 'requires_quote',
      'min_order_quantity', 'stock_unit', 'images', 'technical_sheet_url',
      'slug', 'meta_title', 'meta_description'
    ];

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: 'No hay datos para actualizar' },
        { status: 400 }
      );
    }

    // Actualizar producto
    const { data: product, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json(
        { success: false, error: 'Error al actualizar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Producto actualizado exitosamente',
    });
  } catch (error) {
    console.error('Error in PATCH /api/dashboard/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/dashboard/products/[id]
 * Eliminar un producto (admin only)
 */
export async function DELETE(
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

    // Verificar rol directamente en la tabla users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Error al verificar rol de usuario',
          debug: {
            userId: user.id,
            userEmail: user.email,
            error: userError?.message,
          },
        },
        { status: 403 }
      );
    }

    if (userData.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'No autorizado. Se requiere rol de admin',
          debug: {
            userId: user.id,
            userEmail: user.email,
            userRole: userData.role,
          },
        },
        { status: 403 }
      );
    }

    // Verificar si el producto existe
    const { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('id', id)
      .single();

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Verificar si el producto tiene órdenes asociadas
    const { count: orderCount } = await supabase
      .from('order_items')
      .select('id', { count: 'exact', head: true })
      .eq('product_id', id);

    if (orderCount && orderCount > 0) {
      // En lugar de eliminar, desactivar el producto
      const { data: updatedProduct, error: updateError } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        return NextResponse.json(
          { success: false, error: 'Error al desactivar producto' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: updatedProduct,
        message: 'Producto desactivado (tiene órdenes asociadas)',
      });
    }

    // Eliminar producto si no tiene órdenes
    const { error: deleteError } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting product:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Error al eliminar producto' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Producto eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error in DELETE /api/dashboard/products/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

