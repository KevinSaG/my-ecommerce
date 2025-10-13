import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/dashboard/products
 * Lista todos los productos con paginación y filtros (admin/sales_rep)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar autenticación
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    // Verificar rol directamente en la tabla users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        {
          success: false,
          error: "Error al verificar rol de usuario",
          debug: {
            userId: user.id,
            userEmail: user.email,
            error: userError?.message,
          },
        },
        { status: 403 }
      );
    }

    if (!["admin", "sales_rep"].includes(userData.role)) {
      return NextResponse.json(
        {
          success: false,
          error: "No autorizado. Se requiere rol de admin o sales_rep",
          debug: {
            userId: user.id,
            userEmail: user.email,
            userRole: userData.role,
          },
        },
        { status: 403 }
      );
    }

    // Obtener parámetros de búsqueda
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = (searchParams.get("sortOrder") || "desc") as
      | "asc"
      | "desc";
    const category = searchParams.get("category") || "";
    const isActive = searchParams.get("is_active");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Construir query
    let query = supabase.from("products").select("*", { count: "exact" });

    // Aplicar filtros
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,sku.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (isActive !== null && isActive !== undefined && isActive !== "") {
      query = query.eq("is_active", isActive === "true");
    }

    // Ordenar y paginar
    query = query
      .order(sortBy, { ascending: sortOrder === "asc" })
      .range(from, to);

    const { data: products, error, count } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { success: false, error: "Error al obtener productos" },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      success: true,
      data: products || [],
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
    console.error("Error in GET /api/dashboard/products:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/dashboard/products
 * Crear un nuevo producto (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verificar autenticación
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    // Verificar rol (solo admin)
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();
    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validaciones básicas
    if (!body.sku || !body.name || !body.category) {
      return NextResponse.json(
        { success: false, error: "SKU, nombre y categoría son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el SKU ya existe
    const { data: existingProduct } = await supabase
      .from("products")
      .select("id")
      .eq("sku", body.sku)
      .single();

    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: "El SKU ya existe" },
        { status: 400 }
      );
    }

    // Crear producto
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        sku: body.sku,
        name: body.name,
        description: body.description || "",
        category: body.category,
        diameter: body.diameter || null,
        length: body.length || null,
        width: body.width || null,
        thickness: body.thickness || null,
        weight_per_unit: body.weight_per_unit || 0,
        grade: body.grade || null,
        technical_standards: body.technical_standards || [],
        base_price: body.base_price || 0,
        price_per_kg: body.price_per_kg || null,
        currency: body.currency || "USD",
        is_active: body.is_active !== undefined ? body.is_active : true,
        requires_quote: body.requires_quote || false,
        min_order_quantity: body.min_order_quantity || 1,
        stock_unit: body.stock_unit || "unit",
        images: body.images || [],
        technical_sheet_url: body.technical_sheet_url || null,
        slug: body.slug || body.sku.toLowerCase(),
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { success: false, error: "Error al crear producto" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: "Producto creado exitosamente",
    });
  } catch (error) {
    console.error("Error in POST /api/dashboard/products:", error);
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
