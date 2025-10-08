import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  getProductById,
  getProductsByCategory,
  formatPrice, 
  getTotalStock, 
  getCategoryName 
} from '@/services/public/products/getData';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  
  // Get product using service
  const product = await getProductById(id);

  console.log('product', product);

  if (!product) {
    notFound();
  }

  // Get related products using service (excluding current product)
  const relatedProducts = await getProductsByCategory(product.category, 4, id);
console.log('relatedProducts', relatedProducts);
  // Calculate average rating
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length
    : 0;

  const totalStock = getTotalStock(product.inventory);

  console.log('product', product);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-adelca-primary">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-adelca-primary">
              Productos
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-red-500/10"></div>
                <svg
                  className="w-48 h-48 text-slate-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                  <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                  <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                </svg>
                {totalStock > 0 ? (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                    En Stock
                  </Badge>
                ) : (
                  <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">
                    Agotado
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 text-adelca-primary bg-red-50">
                {getCategoryName(product.category)}
              </Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                {product.name}
              </h1>
              <p className="text-slate-600">SKU: {product.sku}</p>
              
              {/* Rating */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(averageRating)
                            ? 'text-yellow-400'
                            : 'text-slate-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">
                    {averageRating.toFixed(1)} ({product.reviews.length} reseñas)
                  </span>
                </div>
              )}
            </div>

            <Separator />

            {/* Price */}
            <div>
              <p className="text-sm text-slate-600 mb-1">Precio Base</p>
              <p className="text-5xl font-bold text-adelca-primary">
                {formatPrice(product.base_price)}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                * Precio sujeto a variación según cantidad y ubicación
              </p>
            </div>

            <Separator />

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  Descripción
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Stock Info */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Disponibilidad
              </h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-adelca-primary hover:bg-adelca-primary-hover text-lg px-4 py-1">
                  {totalStock} unidades disponibles
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-adelca-primary hover:bg-adelca-primary-hover text-lg px-8 py-6 h-auto flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Solicitar Cotización
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Inventory by Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-adelca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Inventario por Planta
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.inventory && product.inventory.length > 0 ? (
                <div className="space-y-3">
                  {product.inventory.map((inv: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{inv.plant_location}</p>
                        <p className="text-xs text-slate-500">{inv.unit_of_measure || 'unidades'}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {parseFloat(inv.quantity_available).toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No hay inventario disponible</p>
              )}
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-adelca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.specifications && product.specifications.length > 0 ? (
                <div className="space-y-2">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600">{spec.spec_key}</span>
                      <span className="text-sm font-medium text-slate-900">
                        {spec.spec_value} {spec.unit}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No hay especificaciones disponibles</p>
              )}
            </CardContent>
          </Card>

          {/* Product Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-adelca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Información del Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Categoría</p>
                  <p className="text-sm font-medium">{getCategoryName(product.category)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">SKU</p>
                  <p className="text-sm font-medium font-mono">{product.sku}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Stock Total</p>
                  <p className="text-sm font-medium">{totalStock} unidades</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Estado</p>
                  <Badge variant={totalStock > 0 ? 'default' : 'secondary'} className={totalStock > 0 ? 'bg-green-500' : 'bg-red-500'}>
                    {totalStock > 0 ? 'Disponible' : 'Agotado'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg className="w-5 h-5 text-adelca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Reseñas de Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.reviews.slice(0, 5).map((review: any) => (
                  <div key={review.id} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400' : 'text-slate-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-slate-500">
                        {new Date(review.created_at).toLocaleDateString('es-EC')}
                      </span>
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Productos Relacionados</h2>
                <div className="w-20 h-1 bg-adelca-primary mt-2"></div>
              </div>
              <Link href="/productos" className="text-adelca-primary hover:text-adelca-primary-hover">
                Ver más →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <Link key={relatedProduct.id} href={`/productos/${relatedProduct.id}`}>
                  <Card className="hover:shadow-xl transition-shadow duration-300 group h-full">
                    <CardHeader className="p-0">
                      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-red-500/10"></div>
                        <svg
                          className="w-20 h-20 text-slate-300 group-hover:text-adelca-primary transition-colors"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                          <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                          <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                        </svg>
                        <Badge className="absolute top-2 right-2 bg-adelca-primary hover:bg-adelca-primary-hover text-xs">
                          {getTotalStock(relatedProduct.inventory)} und
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs text-adelca-primary bg-red-50">
                        {getCategoryName(relatedProduct.category)}
                      </Badge>
                      <CardTitle className="text-sm mb-2 line-clamp-2 group-hover:text-adelca-primary transition">
                        {relatedProduct.name}
                      </CardTitle>
                      <p className="text-lg font-bold text-slate-900">
                        {formatPrice(relatedProduct.base_price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
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

