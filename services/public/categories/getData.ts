import { categoryEndpoints } from '@/constants/api';

/**
 * Get all active categories
 */
export async function getAllCategories() {
  try {
    const response = await fetch(categoryEndpoints.list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching categories');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  try {
    const categories = await getAllCategories();
    return categories.find((cat: any) => cat.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

/**
 * Get categories with product count
 */
export async function getCategoriesWithProductCount() {
  try {
    const response = await fetch(`${categoryEndpoints.list}?includeCount=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Error fetching categories with count');
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories with count:', error);
    return [];
  }
}

/**
 * Get category icon based on category type
 */
export function getCategoryIcon(categoryType: string): string {
  const icons: Record<string, string> = {
    rebar: '🏗️',
    wire: '🔗',
    mesh: '🕸️',
    profiles: '📐',
    sheets: '📄',
    tubes: '🔧',
    angles: '📏',
    channels: '⚙️',
    beams: '🏛️',
    accessories: '🔩',
  };
  
  return icons[categoryType] || '📦';
}

/**
 * Get category color based on category type
 */
export function getCategoryColor(categoryType: string): string {
  const colors: Record<string, string> = {
    rebar: 'bg-red-100 text-red-800 border-red-200',
    wire: 'bg-blue-100 text-blue-800 border-blue-200',
    mesh: 'bg-green-100 text-green-800 border-green-200',
    profiles: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    sheets: 'bg-purple-100 text-purple-800 border-purple-200',
    tubes: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    angles: 'bg-pink-100 text-pink-800 border-pink-200',
    channels: 'bg-orange-100 text-orange-800 border-orange-200',
    beams: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    accessories: 'bg-gray-100 text-gray-800 border-gray-200',
  };
  
  return colors[categoryType] || 'bg-gray-100 text-gray-800 border-gray-200';
}

