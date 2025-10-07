/**
 * Constants for Adelca E-Commerce
 */

import { PlantLocation, ProductCategory } from './ecommerce-schema';

// ==================== COMPANY INFO ====================

export const COMPANY_INFO = {
  name: 'Adelca',
  fullName: 'Acería del Ecuador C.A.',
  phone: '(593 2) 380 1321',
  email: 'info@adelca.com',
  website: 'https://www.adelca.com',
  taxId: '1790016919001', // RUC de ejemplo
  foundedYear: 1963,
} as const;

// ==================== PLANTS ====================

export const PLANTS = {
  aloag: {
    id: 'aloag' as PlantLocation,
    name: 'Planta Alóag',
    address: 'Panamericana Sur km 30, Alóag, Pichincha',
    city: 'Quito',
    province: 'Pichincha',
    phone: '(593 2) 380 1321',
    coordinates: { lat: -0.5167, lng: -78.5833 },
    workingHours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-13:00',
  },
  milagro: {
    id: 'milagro' as PlantLocation,
    name: 'Planta Milagro',
    address: 'Km 1.5 vía Milagro-Naranjito, Milagro, Guayas',
    city: 'Milagro',
    province: 'Guayas',
    phone: '(593 4) 297 0340',
    coordinates: { lat: -2.1333, lng: -79.6 },
    workingHours: 'Lun-Vie: 8:00-17:00, Sáb: 8:00-13:00',
  },
  duran: {
    id: 'duran' as PlantLocation,
    name: 'Desguace Naval Durán',
    address: 'Durán, Guayas',
    city: 'Durán',
    province: 'Guayas',
    phone: '(593 4) 297 0340',
    coordinates: { lat: -2.1833, lng: -79.8333 },
    workingHours: 'Lun-Vie: 8:00-17:00',
  },
} as const;

// ==================== TAX ====================

export const TAX = {
  IVA: 0.15, // 15% IVA Ecuador
  IVA_PERCENTAGE: 15,
} as const;

// ==================== PRODUCT CATEGORIES ====================

export const PRODUCT_CATEGORIES_INFO = {
  rebar: {
    id: 'rebar' as ProductCategory,
    name: 'Varillas Corrugadas',
    description: 'Varillas de acero corrugado para construcción',
    icon: '🔩',
    standards: ['ASTM A615', 'NTE INEN 2167'],
  },
  wire: {
    id: 'wire' as ProductCategory,
    name: 'Alambre',
    description: 'Alambre galvanizado y negro',
    icon: '🧵',
    standards: ['ASTM A641', 'NTE INEN 2426'],
  },
  mesh: {
    id: 'mesh' as ProductCategory,
    name: 'Malla Electrosoldada',
    description: 'Malla electrosoldada para losas y pisos',
    icon: '📐',
    standards: ['ASTM A185', 'NTE INEN 2310'],
  },
  profiles: {
    id: 'profiles' as ProductCategory,
    name: 'Perfiles Estructurales',
    description: 'Perfiles de acero para estructura',
    icon: '🏗️',
    standards: ['ASTM A36', 'ASTM A572'],
  },
  sheets: {
    id: 'sheets' as ProductCategory,
    name: 'Planchas',
    description: 'Planchas de acero',
    icon: '📄',
    standards: ['ASTM A36'],
  },
  tubes: {
    id: 'tubes' as ProductCategory,
    name: 'Tubos',
    description: 'Tubos de acero estructurales',
    icon: '⚙️',
    standards: ['ASTM A500'],
  },
  angles: {
    id: 'angles' as ProductCategory,
    name: 'Ángulos',
    description: 'Ángulos de acero',
    icon: '📐',
    standards: ['ASTM A36'],
  },
  channels: {
    id: 'channels' as ProductCategory,
    name: 'Canales',
    description: 'Canales de acero',
    icon: '〰️',
    standards: ['ASTM A36'],
  },
  beams: {
    id: 'beams' as ProductCategory,
    name: 'Vigas',
    description: 'Vigas de acero tipo I',
    icon: '🏛️',
    standards: ['ASTM A992'],
  },
  accessories: {
    id: 'accessories' as ProductCategory,
    name: 'Accesorios',
    description: 'Accesorios y herramientas',
    icon: '🔧',
    standards: [],
  },
} as const;

// ==================== STEEL GRADES ====================

export const STEEL_GRADES = {
  A36: {
    code: 'A36',
    name: 'ASTM A36',
    description: 'Acero estructural de uso general',
    yieldStrength: '250 MPa',
    tensileStrength: '400-550 MPa',
  },
  A615: {
    code: 'A615',
    name: 'ASTM A615',
    description: 'Varillas de acero para refuerzo de concreto',
    grades: ['Grado 40', 'Grado 60', 'Grado 75'],
  },
  A706: {
    code: 'A706',
    name: 'ASTM A706',
    description: 'Varillas de baja aleación para refuerzo de concreto',
    yieldStrength: '420 MPa',
    tensileStrength: '550 MPa',
  },
  A572: {
    code: 'A572',
    name: 'ASTM A572',
    description: 'Acero estructural de alta resistencia',
    grades: ['Grado 42', 'Grado 50', 'Grado 60'],
  },
  A992: {
    code: 'A992',
    name: 'ASTM A992',
    description: 'Perfiles estructurales de acero',
    yieldStrength: '345-450 MPa',
    tensileStrength: '450 MPa min',
  },
} as const;

// ==================== ORDER SETTINGS ====================

export const ORDER_SETTINGS = {
  MIN_ORDER_AMOUNT: 50, // USD
  FREE_SHIPPING_THRESHOLD: 1000, // USD
  QUOTE_VALIDITY_DAYS: 15,
  ORDER_NUMBER_PREFIX: 'ORD',
  QUOTE_NUMBER_PREFIX: 'QUO',
  MAX_ITEMS_PER_ORDER: 50,
  DEFAULT_CURRENCY: 'USD',
} as const;

// ==================== SHIPPING ====================

export const SHIPPING_ZONES = {
  pichincha: {
    name: 'Pichincha',
    provinces: ['Pichincha'],
    baseCost: 15,
    costPerKg: 0.05,
    estimatedDays: 1,
  },
  guayas: {
    name: 'Guayas',
    provinces: ['Guayas'],
    baseCost: 20,
    costPerKg: 0.06,
    estimatedDays: 2,
  },
  azuay: {
    name: 'Azuay',
    provinces: ['Azuay', 'Cañar'],
    baseCost: 25,
    costPerKg: 0.07,
    estimatedDays: 2,
  },
  sierra: {
    name: 'Sierra Centro y Norte',
    provinces: ['Imbabura', 'Chimborazo', 'Tungurahua', 'Cotopaxi'],
    baseCost: 30,
    costPerKg: 0.08,
    estimatedDays: 3,
  },
  costa: {
    name: 'Costa',
    provinces: ['El Oro', 'Manabí', 'Esmeraldas', 'Los Ríos', 'Santa Elena'],
    baseCost: 35,
    costPerKg: 0.09,
    estimatedDays: 3,
  },
  oriente: {
    name: 'Oriente',
    provinces: ['Sucumbíos', 'Napo', 'Pastaza', 'Morona Santiago', 'Zamora Chinchipe'],
    baseCost: 50,
    costPerKg: 0.12,
    estimatedDays: 5,
  },
} as const;

// ==================== PAYMENT METHODS ====================

export const PAYMENT_METHODS_INFO = {
  cash: {
    id: 'cash',
    name: 'Efectivo',
    description: 'Pago en efectivo al retirar',
    icon: '💵',
    available: true,
  },
  bank_transfer: {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria',
    description: 'Transferencia a cuenta bancaria',
    icon: '🏦',
    available: true,
    bankAccounts: [
      {
        bank: 'Banco Pichincha',
        accountType: 'Corriente',
        accountNumber: '3456789012',
        holder: 'Acería del Ecuador C.A.',
      },
      {
        bank: 'Banco del Pacífico',
        accountType: 'Corriente',
        accountNumber: '7890123456',
        holder: 'Acería del Ecuador C.A.',
      },
    ],
  },
  credit_card: {
    id: 'credit_card',
    name: 'Tarjeta de Crédito/Débito',
    description: 'Pago con tarjeta',
    icon: '💳',
    available: true,
    acceptedCards: ['Visa', 'Mastercard', 'American Express', 'Diners Club'],
  },
  credit_line: {
    id: 'credit_line',
    name: 'Línea de Crédito',
    description: 'Crédito empresarial',
    icon: '📊',
    available: true,
    requiresApproval: true,
  },
  check: {
    id: 'check',
    name: 'Cheque',
    description: 'Pago con cheque certificado',
    icon: '📝',
    available: true,
  },
} as const;

// ==================== CUSTOMER TYPES ====================

export const CUSTOMER_TYPES_INFO = {
  retail: {
    id: 'retail',
    name: 'Cliente Minorista',
    description: 'Compras al por menor',
    minOrderAmount: 0,
    creditAvailable: false,
    defaultDiscount: 0,
  },
  wholesale: {
    id: 'wholesale',
    name: 'Cliente Mayorista',
    description: 'Compras al por mayor',
    minOrderAmount: 500,
    creditAvailable: true,
    defaultDiscount: 5,
  },
  construction: {
    id: 'construction',
    name: 'Constructora',
    description: 'Empresas constructoras',
    minOrderAmount: 1000,
    creditAvailable: true,
    defaultDiscount: 10,
  },
  hardware_store: {
    id: 'hardware_store',
    name: 'Ferretería',
    description: 'Ferreterías y distribuidores',
    minOrderAmount: 500,
    creditAvailable: true,
    defaultDiscount: 8,
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial',
    description: 'Empresas industriales',
    minOrderAmount: 2000,
    creditAvailable: true,
    defaultDiscount: 12,
  },
  government: {
    id: 'government',
    name: 'Gobierno',
    description: 'Entidades gubernamentales',
    minOrderAmount: 1000,
    creditAvailable: true,
    defaultDiscount: 0,
  },
} as const;

// ==================== UNITS ====================

export const UNITS = {
  unit: { symbol: 'und', name: 'Unidad' },
  kg: { symbol: 'kg', name: 'Kilogramo' },
  ton: { symbol: 't', name: 'Tonelada' },
  meter: { symbol: 'm', name: 'Metro' },
  piece: { symbol: 'pza', name: 'Pieza' },
} as const;

// ==================== STATUS LABELS ====================

export const ORDER_STATUS_LABELS = {
  pending: { label: 'Pendiente', color: 'yellow', icon: '⏳' },
  confirmed: { label: 'Confirmado', color: 'blue', icon: '✅' },
  processing: { label: 'En Proceso', color: 'purple', icon: '⚙️' },
  ready_for_pickup: { label: 'Listo para Retiro', color: 'green', icon: '📦' },
  in_transit: { label: 'En Tránsito', color: 'blue', icon: '🚚' },
  delivered: { label: 'Entregado', color: 'green', icon: '✅' },
  cancelled: { label: 'Cancelado', color: 'red', icon: '❌' },
  refunded: { label: 'Reembolsado', color: 'gray', icon: '💰' },
} as const;

export const PAYMENT_STATUS_LABELS = {
  pending: { label: 'Pendiente', color: 'yellow' },
  paid: { label: 'Pagado', color: 'green' },
  partially_paid: { label: 'Pago Parcial', color: 'orange' },
  failed: { label: 'Fallido', color: 'red' },
  refunded: { label: 'Reembolsado', color: 'gray' },
} as const;

export const QUOTE_STATUS_LABELS = {
  draft: { label: 'Borrador', color: 'gray' },
  sent: { label: 'Enviado', color: 'blue' },
  viewed: { label: 'Visto', color: 'purple' },
  accepted: { label: 'Aceptado', color: 'green' },
  rejected: { label: 'Rechazado', color: 'red' },
  expired: { label: 'Expirado', color: 'gray' },
  converted_to_order: { label: 'Convertido a Orden', color: 'green' },
} as const;

// ==================== NOTIFICATIONS ====================

export const NOTIFICATION_TYPES = {
  ORDER_CREATED: 'order_created',
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_READY: 'order_ready',
  ORDER_DELIVERED: 'order_delivered',
  PAYMENT_RECEIVED: 'payment_received',
  QUOTE_READY: 'quote_ready',
  QUOTE_EXPIRING: 'quote_expiring',
  LOW_STOCK: 'low_stock',
} as const;

// ==================== REGEX PATTERNS ====================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_EC: /^(\+593|0)[0-9]{9}$/,
  RUC: /^[0-9]{13}$/,
  CEDULA: /^[0-9]{10}$/,
  POSTAL_CODE_EC: /^[0-9]{6}$/,
} as const;

// ==================== PAGINATION ====================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// ==================== ECUADORIAN PROVINCES ====================

export const ECUADOR_PROVINCES = [
  'Azuay',
  'Bolívar',
  'Cañar',
  'Carchi',
  'Chimborazo',
  'Cotopaxi',
  'El Oro',
  'Esmeraldas',
  'Galápagos',
  'Guayas',
  'Imbabura',
  'Loja',
  'Los Ríos',
  'Manabí',
  'Morona Santiago',
  'Napo',
  'Orellana',
  'Pastaza',
  'Pichincha',
  'Santa Elena',
  'Santo Domingo de los Tsáchilas',
  'Sucumbíos',
  'Tungurahua',
  'Zamora Chinchipe',
] as const;

