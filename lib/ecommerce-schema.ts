/**
 * E-Commerce Schema for Adelca (Acería del Ecuador)
 * Steel products e-commerce platform
 * 
 * Designed for B2B and B2C sales of steel products
 */

// ==================== ENUMS ====================

export enum UserRole {
  ADMIN = 'admin',
  SALES_REP = 'sales_rep',
  CUSTOMER = 'customer',
  DISTRIBUTOR = 'distributor',
  GUEST = 'guest'
}

export enum CustomerType {
  RETAIL = 'retail',           // Cliente minorista
  WHOLESALE = 'wholesale',     // Cliente mayorista
  CONSTRUCTION = 'construction', // Constructoras
  HARDWARE_STORE = 'hardware_store', // Ferreterías
  INDUSTRIAL = 'industrial',   // Industria
  GOVERNMENT = 'government'    // Entidades gubernamentales
}

export enum ProductCategory {
  REBAR = 'rebar',                    // Varillas corrugadas
  WIRE = 'wire',                      // Alambre
  MESH = 'mesh',                      // Malla electrosoldada
  PROFILES = 'profiles',              // Perfiles estructurales
  SHEETS = 'sheets',                  // Planchas
  TUBES = 'tubes',                    // Tubos
  ANGLES = 'angles',                  // Ángulos
  CHANNELS = 'channels',              // Canales
  BEAMS = 'beams',                    // Vigas
  ACCESSORIES = 'accessories'         // Accesorios
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially_paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CASH = 'cash',
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  CREDIT_LINE = 'credit_line',        // Línea de crédito empresarial
  CHECK = 'check'
}

export enum ShippingMethod {
  PICKUP_QUITO = 'pickup_quito',      // Retiro en Alóag
  PICKUP_MILAGRO = 'pickup_milagro',  // Retiro en Milagro
  DELIVERY = 'delivery',              // Entrega a domicilio
  FREIGHT = 'freight'                 // Transporte de carga
}

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
  CONVERTED_TO_ORDER = 'converted_to_order'
}

export enum PlantLocation {
  ALOAG = 'aloag',           // Planta Alóag (Quito)
  MILAGRO = 'milagro',       // Planta Milagro (Guayas)
  DURAN = 'duran'            // Desguace Durán
}

// ==================== TYPES ====================

export interface Timestamp {
  created_at: Date;
  updated_at: Date;
}

// ==================== USER ENTITIES ====================

export interface User extends Timestamp {
  id: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
  last_login?: Date;
  email_verified: boolean;
  profile_id?: string;
}

export interface UserProfile extends Timestamp {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  company_name?: string;
  tax_id?: string;              // RUC/Cédula
  customer_type: CustomerType;
  credit_limit?: number;        // Límite de crédito para clientes corporativos
  credit_used?: number;
  discount_percentage?: number; // Descuento por volumen
  preferred_plant?: PlantLocation;
  avatar_url?: string;
}

export interface Address extends Timestamp {
  id: string;
  user_id: string;
  label: string;                // ej: "Oficina", "Obra Centro Histórico"
  street: string;
  city: string;
  province: string;
  postal_code?: string;
  country: string;
  phone: string;
  is_default: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ==================== PRODUCT ENTITIES ====================

export interface Product extends Timestamp {
  id: string;
  sku: string;                  // Código único del producto
  name: string;
  description: string;
  category: ProductCategory;
  
  // Especificaciones técnicas
  diameter?: number;            // Diámetro en mm (para varillas, alambres)
  length?: number;              // Longitud en metros
  width?: number;               // Ancho en mm
  thickness?: number;           // Espesor en mm
  weight_per_unit: number;      // Peso en kg por unidad
  grade?: string;               // Grado del acero (ej: A36, A706)
  
  // Normas técnicas
  technical_standards?: string[]; // ej: ["ASTM A615", "NTE INEN 2167"]
  
  // Precio
  base_price: number;           // Precio base por unidad
  price_per_kg?: number;        // Precio por kilogramo
  currency: string;             // USD
  
  // Inventario y disponibilidad
  is_active: boolean;
  requires_quote: boolean;      // Algunos productos requieren cotización
  min_order_quantity: number;
  stock_unit: string;           // 'unit', 'kg', 'ton', 'meter'
  
  // Imágenes y archivos
  images: string[];
  technical_sheet_url?: string; // Ficha técnica PDF
  
  // SEO
  slug: string;
  meta_title?: string;
  meta_description?: string;
}

export interface ProductInventory extends Timestamp {
  id: string;
  product_id: string;
  plant_location: PlantLocation;
  quantity_available: number;
  quantity_reserved: number;    // Cantidad reservada en órdenes pendientes
  reorder_point: number;        // Punto de reorden
  last_restocked_at?: Date;
}

export interface ProductPrice extends Timestamp {
  id: string;
  product_id: string;
  customer_type: CustomerType;
  min_quantity: number;
  max_quantity?: number;
  unit_price: number;
  discount_percentage: number;
  valid_from: Date;
  valid_until?: Date;
}

// ==================== QUOTE ENTITIES ====================

export interface Quote extends Timestamp {
  id: string;
  quote_number: string;
  user_id: string;
  sales_rep_id?: string;
  status: QuoteStatus;
  
  // Validez
  valid_until: Date;
  
  // Totales
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  
  // Notas
  customer_notes?: string;
  internal_notes?: string;
  
  // Conversión
  converted_to_order_id?: string;
  converted_at?: Date;
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  subtotal: number;
  notes?: string;
  plant_location: PlantLocation; // De dónde se despachará
}

// ==================== ORDER ENTITIES ====================

export interface Order extends Timestamp {
  id: string;
  order_number: string;
  user_id: string;
  quote_id?: string;            // Si se generó desde una cotización
  
  // Estado
  status: OrderStatus;
  payment_status: PaymentStatus;
  
  // Totales
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  shipping_cost: number;
  total: number;
  
  // Pago
  payment_method: PaymentMethod;
  paid_amount: number;
  
  // Envío
  shipping_method: ShippingMethod;
  shipping_address_id?: string;
  pickup_location?: PlantLocation;
  estimated_delivery_date?: Date;
  actual_delivery_date?: Date;
  
  // Tracking
  tracking_number?: string;
  
  // Notas
  customer_notes?: string;
  internal_notes?: string;
  
  // Facturación
  invoice_number?: string;
  invoice_url?: string;
  
  // Cancelación
  cancelled_at?: Date;
  cancellation_reason?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  subtotal: number;
  weight_total: number;         // Peso total del item
  plant_location: PlantLocation; // De dónde se despacha
}

// ==================== CART ENTITIES ====================

export interface Cart extends Timestamp {
  id: string;
  user_id: string;
  session_id?: string;          // Para carritos de invitados
  expires_at?: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  selected_plant?: PlantLocation; // Planta seleccionada para retiro/envío
  notes?: string;
}

// ==================== REVIEW ENTITIES ====================

export interface ProductReview extends Timestamp {
  id: string;
  product_id: string;
  user_id: string;
  order_id?: string;            // Verificar compra real
  rating: number;               // 1-5
  title: string;
  comment: string;
  verified_purchase: boolean;
  is_approved: boolean;
  helpful_count: number;
  images?: string[];
}

// ==================== WISHLIST ENTITIES ====================

export interface Wishlist extends Timestamp {
  id: string;
  user_id: string;
  name: string;
  is_default: boolean;
  is_public: boolean;
}

export interface WishlistItem {
  id: string;
  wishlist_id: string;
  product_id: string;
  added_at: Date;
  notes?: string;
}

// ==================== CATEGORY ENTITIES ====================

export interface Category extends Timestamp {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;           // Para subcategorías
  category_type: ProductCategory;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
}

// ==================== SHIPPING ENTITIES ====================

export interface ShippingZone extends Timestamp {
  id: string;
  name: string;
  provinces: string[];
  base_cost: number;
  cost_per_kg: number;
  cost_per_km?: number;
  min_order_amount?: number;    // Pedido mínimo para envío
  estimated_days: number;
  is_active: boolean;
}

export interface ShippingRate {
  id: string;
  shipping_zone_id: string;
  min_weight: number;
  max_weight?: number;
  rate: number;
}

// ==================== PAYMENT ENTITIES ====================

export interface Payment extends Timestamp {
  id: string;
  order_id: string;
  payment_method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transaction_id?: string;
  payment_date?: Date;
  receipt_url?: string;
  notes?: string;
}

// ==================== NOTIFICATION ENTITIES ====================

export interface Notification extends Timestamp {
  id: string;
  user_id: string;
  type: string;                 // 'order_update', 'quote_ready', 'payment_received'
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  read_at?: Date;
}

// ==================== PROMOTION ENTITIES ====================

export interface Promotion extends Timestamp {
  id: string;
  code: string;
  name: string;
  description: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping';
  discount_value: number;
  min_purchase_amount?: number;
  max_discount_amount?: number;
  valid_from: Date;
  valid_until: Date;
  usage_limit?: number;
  usage_count: number;
  customer_types?: CustomerType[]; // Tipos de cliente elegibles
  is_active: boolean;
}

export interface PromotionUsage {
  id: string;
  promotion_id: string;
  user_id: string;
  order_id: string;
  discount_applied: number;
  used_at: Date;
}

// ==================== ACTIVITY LOG ====================

export interface ActivityLog extends Timestamp {
  id: string;
  user_id?: string;
  action: string;               // 'order_created', 'product_viewed', 'quote_requested'
  entity_type: string;          // 'order', 'product', 'quote'
  entity_id: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

// ==================== CONTACT/SUPPORT ====================

export interface ContactMessage extends Timestamp {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  assigned_to?: string;
  response?: string;
  responded_at?: Date;
}

// ==================== HELPER TYPES ====================

export interface PaginationParams {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

export interface SearchFilters {
  category?: ProductCategory;
  min_price?: number;
  max_price?: number;
  diameter?: number;
  grade?: string;
  plant_location?: PlantLocation;
  in_stock?: boolean;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface OrderSummary {
  order: Order;
  items: (OrderItem & { product: Product })[];
  shipping_address?: Address;
  user: UserProfile;
}

export interface DashboardStats {
  total_orders: number;
  pending_orders: number;
  total_revenue: number;
  total_customers: number;
  low_stock_products: number;
  pending_quotes: number;
}

