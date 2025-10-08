import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { 
  getAllCategories,
  getCategoryIcon,
  getCategoryColor 
} from '@/services/public/categories/getData';

export default async function CategoriasPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestras Categorías
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl">
            Explora nuestra amplia gama de productos siderúrgicos organizados por categoría. 
            Calidad garantizada desde 1963.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-adelca-primary to-red-700 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Total de Categorías</p>
                  <p className="text-4xl font-bold">{categories.length}</p>
                </div>
                <div className="text-5xl opacity-20">📦</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Productos Disponibles</p>
                  <p className="text-4xl font-bold">500+</p>
                </div>
                <div className="text-5xl opacity-20">🏗️</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Plantas de Producción</p>
                  <p className="text-4xl font-bold">2</p>
                </div>
                <div className="text-5xl opacity-20">🏭</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Todas las Categorías
          </h2>
          <div className="w-20 h-1 bg-adelca-primary mb-8"></div>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No hay categorías disponibles
            </h3>
            <p className="text-slate-600">
              Las categorías se mostrarán aquí una vez que estén disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/productos?category=${category.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-adelca-primary">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-xl ${getCategoryColor(category.category_type)} flex items-center justify-center text-3xl border-2 group-hover:scale-110 transition-transform duration-300`}>
                        {getCategoryIcon(category.category_type)}
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-800"
                      >
                        Activo
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-adelca-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    {category.description && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {category.description}
                      </p>
                    )}
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        Ver productos
                      </span>
                      <svg
                        className="w-5 h-5 text-adelca-primary group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-adelca-primary to-red-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo de expertos está listo para ayudarte a encontrar el producto perfecto para tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-adelca-primary rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contáctanos
              </Link>
              <a
                href="tel:+59323801321"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-adelca-primary transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (593 2) 380 1321
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-12">
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

