import { createClient } from '@/lib/supabase/client';

/**
 * Get recent products
 */
export async function getRecentProducts(limit: number = 8) {
  const supabase = createClient();
  
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
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent products:', error);
    return [];
  }

  return data || [];
}

/**
 * Get most viewed products
 */
export async function getMostViewedProducts(limit: number = 8) {
  const supabase = createClient();
  
  // Por ahora retornamos productos ordenados por reviews
  // Más adelante puedes agregar una columna view_count
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory(
        plant_location,
        quantity_available
      ),
      reviews:product_reviews(rating)
    `)
    .eq('is_active', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching most viewed products:', error);
    return [];
  }

  return data || [];
}

/**
 * Get most quoted products (productos más cotizados)
 */
export async function getMostQuotedProducts(limit: number = 8) {
  const supabase = createClient();
  
  // Obtener productos que aparecen más en cotizaciones
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory(
        plant_location,
        quantity_available
      ),
      quote_items(quantity)
    `)
    .eq('is_active', true)
    .limit(limit);

  if (error) {
    console.error('Error fetching most quoted products:', error);
    return [];
  }

  return data || [];
}

/**
 * Get all categories with products count
 */
export async function getCategories() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

/**
 * Get products by category
 */
export async function getProductsByCategory(categorySlug: string, limit: number = 12) {
  const supabase = createClient();
  
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
    return [];
  }

  return data || [];
}

/**
 * Get featured products (destacados)
 */
export async function getFeaturedProducts(limit: number = 4) {
  const supabase = createClient();
  
  // Por ahora, productos con mayor stock
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
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
}

/**
 * Get total stock for a product across all plants
 */
export function getTotalStock(inventory: any[]): number {
  if (!inventory || !Array.isArray(inventory)) return 0;
  return inventory.reduce((sum, inv) => sum + (parseFloat(inv.quantity_available) || 0), 0);
}

/**
 * Format price in USD
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Get category display name
 */
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    rebar: 'Varillas Corrugadas',
    wire: 'Alambre',
    mesh: 'Mallas',
    profiles: 'Perfiles',
    sheets: 'Planchas',
    tubes: 'Tubos',
    angles: 'Ángulos',
    channels: 'Canales',
    beams: 'Vigas',
    accessories: 'Accesorios',
  };
  
  return categories[category] || category;
}

