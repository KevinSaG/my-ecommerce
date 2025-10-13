import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ProductCarousel from '@/components/ProductCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import AuthHandler from './auth-handler';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  const supabase = await createClient();

  // Get recent products
  const { data: recentProducts } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory(plant_location, quantity_available)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8);

  // Get most quoted products (simulamos con productos con más stock)
  const { data: quotedProducts } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory(plant_location, quantity_available)
    `)
    .eq('is_active', true)
    .limit(8);

  // Get most viewed (simulamos con productos aleatorios)
  const { data: viewedProducts } = await supabase
    .from('products')
    .select(`
      *,
      inventory:product_inventory(plant_location, quantity_available)
    `)
    .eq('is_active', true)
    .limit(8);

  // Get categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <AuthHandler />
      </Suspense>
      <Navbar />
      <HeroBanner />
      
      {/* Recent Products */}
      <ProductCarousel 
        title="Productos Recientes" 
        products={recentProducts || []} 
      />

      {/* Categories Grid */}
      <CategoryGrid categories={categories || []} />

      {/* Most Quoted Products */}
      <div className="bg-slate-50">
        <ProductCarousel 
          title="Más Cotizados" 
          products={quotedProducts || []} 
        />
      </div>

      {/* Most Viewed Products */}
      <ProductCarousel 
        title="Más Vistos" 
        products={viewedProducts || []} 
      />

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Necesitas una Cotización?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte con tu proyecto. Obtén precios especiales para pedidos al por mayor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-adelca-primary hover:bg-adelca-primary-hover text-lg px-8 py-6 h-auto shadow-lg" asChild>
              <Link href="/contacto">
                Solicitar Cotización
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-slate-100 text-slate-900 text-lg px-8 py-6 h-auto shadow-lg" asChild>
              <a href="tel:+59323801321">
                Llamar Ahora
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ADELCA</h3>
              <p className="text-slate-400">
                Acería del Ecuador - Líderes en fabricación de productos siderúrgicos desde 1963.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/productos" className="hover:text-adelca-primary">Productos</Link></li>
                <li><Link href="/categorias" className="hover:text-adelca-primary">Categorías</Link></li>
                <li><Link href="/nosotros" className="hover:text-adelca-primary">Nosotros</Link></li>
                <li><Link href="/contacto" className="hover:text-adelca-primary">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400">
                <li>📞 (593 2) 380 1321</li>
                <li>📧 info@adelca.com</li>
                <li>📍 Alóag, Pichincha</li>
                <li>📍 Milagro, Guayas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-adelca-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-adelca-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <Separator className="mt-8 bg-slate-800" />
          <div className="mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Adelca. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

