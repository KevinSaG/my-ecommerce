import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // Sidebar principal de documentación
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Primeros Pasos',
      items: [
        'getting-started/installation',
        // TODO: Crear estos archivos
        // 'getting-started/environment-setup',
        // 'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Arquitectura',
      items: [
        'architecture/overview',
        // TODO: Crear estos archivos
        // 'architecture/folder-structure',
        // 'architecture/data-flow',
        // 'architecture/rbac',
        // 'architecture/security',
      ],
    },
    {
      type: 'category',
      label: 'Características',
      items: [
        'features/checkout',
        // TODO: Crear estos archivos
        // 'features/authentication',
        // 'features/products',
        // 'features/cart',
        // 'features/orders',
        // 'features/dashboard',
      ],
    },
    // TODO: Descomentar cuando se creen los archivos
    // {
    //   type: 'category',
    //   label: 'Base de Datos',
    //   items: [
    //     'database/schema',
    //     'database/rls-policies',
    //     'database/migrations',
    //   ],
    // },
    // 'roadmap',
    // 'faq',
  ],

  // Sidebar de API
  apiSidebar: [
    'api/overview',
    // TODO: Descomentar cuando se creen los archivos
    // {
    //   type: 'category',
    //   label: 'Authentication',
    //   items: [
    //     'api/auth/signin',
    //     'api/auth/signup',
    //     'api/auth/signout',
    //     'api/auth/session',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Products',
    //   items: [
    //     'api/products/list',
    //     'api/products/search',
    //     'api/products/by-id',
    //     'api/products/by-category',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Cart',
    //   items: [
    //     'api/cart/list',
    //     'api/cart/add',
    //     'api/cart/update',
    //     'api/cart/remove',
    //     'api/cart/clear',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Orders',
    //   items: [
    //     'api/orders/create',
    //     'api/orders/list',
    //     'api/orders/by-id',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Dashboard',
    //   items: [
    //     'api/dashboard/stats',
    //     'api/dashboard/profile',
    //   ],
    // },
  ],

  // Sidebar de guías
  guidesSidebar: [
    'guides/getting-started',
    // TODO: Descomentar cuando se creen los archivos
    // {
    //   type: 'category',
    //   label: 'Desarrollo',
    //   items: [
    //     'guides/creating-pages',
    //     'guides/creating-apis',
    //     'guides/creating-services',
    //     'guides/using-hooks',
    //   ],
    // },
    // {
    //   type: 'category',
    //   label: 'Despliegue',
    //   items: [
    //     'guides/deployment/vercel',
    //     'guides/deployment/supabase',
    //     'guides/deployment/environment-variables',
    //   ],
    // },
    // 'guides/code-examples',
    // 'guides/best-practices',
    // 'guides/troubleshooting',
  ],
};

export default sidebars;
