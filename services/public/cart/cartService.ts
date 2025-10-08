import { cartEndpoints } from '@/constants/api';

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  selected_plant?: string;
  notes?: string;
  products?: any;
}

/**
 * Get all cart items
 */
export async function getCartItems() {
  try {
    const response = await fetch(cartEndpoints.list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      // Si no está autenticado, retornar carrito vacío
      if (response.status === 401) {
        return { success: true, data: [] };
      }
      throw new Error(result.error || 'Error al obtener carrito');
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al obtener carrito',
      data: [],
    };
  }
}

/**
 * Add item to cart
 */
export async function addToCart(product_id: string, quantity: number = 1) {
  try {
    const response = await fetch(cartEndpoints.add, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_id, quantity }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al agregar al carrito');
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al agregar al carrito',
    };
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cart_item_id: string, quantity: number) {
  try {
    const response = await fetch(cartEndpoints.update, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart_item_id, quantity }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al actualizar cantidad');
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar cantidad',
    };
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cart_item_id: string) {
  try {
    const response = await fetch(cartEndpoints.remove, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart_item_id }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al eliminar producto');
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al eliminar producto',
    };
  }
}

/**
 * Clear entire cart
 */
export async function clearCart() {
  try {
    const response = await fetch(cartEndpoints.clear, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al limpiar carrito');
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al limpiar carrito',
    };
  }
}

/**
 * Get cart items count
 */
export async function getCartCount() {
  try {
    const response = await fetch(cartEndpoints.count, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error al contar items');
    }

    return {
      success: true,
      count: result.count || 0,
    };
  } catch (error) {
    console.error('Error getting cart count:', error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : 'Error al contar items',
    };
  }
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => {
    const price = item.products?.base_price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.12; // 12% IVA en Ecuador
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

