import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Example products data - in a real app, this would come from Supabase
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 399.99,
    description: 'Advanced fitness tracking and health monitoring',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    description: 'Ergonomic aluminum laptop stand',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 159.99,
    description: 'RGB backlit mechanical gaming keyboard',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 79.99,
    description: 'Precision wireless mouse with programmable buttons',
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 89.99,
    description: 'Multi-port USB-C hub with 4K HDMI output',
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Our Products
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

