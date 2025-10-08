'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { 
  searchProducts, 
  getCategories, 
  getCategoryName,
  formatPrice,
  getTotalStock,
  type ProductFilters 
} from '@/services/public/products/getData';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load categories on mount
  useEffect(() => {
    async function loadCategories() {
      const cats = await getCategories();
      setCategories(cats);
    }
    loadCategories();
  }, []);

  // Load products when filters change
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      
      const filters: ProductFilters = {
        page: currentPage,
        limit: 12,
      };

      if (searchTerm) {
        filters.search = searchTerm;
      }

      if (selectedCategories.length > 0) {
        // For now, we'll filter by the first selected category
        // You can enhance the API to support multiple categories
        filters.category = selectedCategories[0];
      }

      if (priceRange[0] > 0) {
        filters.minPrice = priceRange[0];
      }

      if (priceRange[1] < 1000) {
        filters.maxPrice = priceRange[1];
      }

      const result = await searchProducts(filters);
      setProducts(result.data);
      setPagination(result.pagination);
      setLoading(false);
    }

    loadProducts();
  }, [searchTerm, selectedCategories, priceRange, currentPage]);

  const handleCategoryToggle = (categorySlug: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categorySlug)) {
        return prev.filter(c => c !== categorySlug);
      } else {
        return [...prev, categorySlug];
      }
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setCurrentPage(1); // Reset to first page when price changes
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Catálogo de Productos</h1>
          <p className="text-slate-300 text-lg">
            Explora nuestra amplia gama de productos siderúrgicos de la más alta calidad
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className={`
            lg:w-80 
            ${isSidebarOpen ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              {/* Mobile close button */}
              <div className="lg:hidden flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <Label htmlFor="search" className="text-sm font-semibold mb-2 block">
                  Buscar Producto
                </Label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Categorías</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => handleCategoryToggle(category.slug)}
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3">Rango de Precio</h3>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Limpiar Filtros
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filtros
              </Button>
              <p className="text-sm text-slate-600">
                {pagination.total} productos encontrados
              </p>
            </div>

            {/* Results Info */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-slate-600">
                Mostrando {products.length} de {pagination.total} productos
              </p>
              <p className="text-sm text-slate-500">
                Página {pagination.page} de {pagination.totalPages}
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-adelca-primary"></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
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
                  No se encontraron productos
                </h3>
                <p className="text-slate-600 mb-6">
                  Intenta ajustar los filtros o realiza una nueva búsqueda
                </p>
                <Button onClick={clearFilters} className="bg-adelca-primary hover:bg-adelca-primary-hover">
                  Limpiar Filtros
                </Button>
              </div>
            )}

            {/* Products Grid */}
            {!loading && products.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card key={product.id} className="hover:shadow-xl transition-shadow duration-300 group">
                      <CardHeader className="p-0">
                        {/* Image placeholder */}
                        <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden rounded-t-lg">
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-red-500/10"></div>
                          <svg
                            className="w-24 h-24 text-slate-300 group-hover:text-adelca-primary transition-colors"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                            <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                            <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                          </svg>
                          <Badge className="absolute top-4 right-4 bg-adelca-primary hover:bg-adelca-primary-hover">
                            {getTotalStock(product.inventory)} und
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 pb-4">
                        <Badge variant="secondary" className="mb-2 text-adelca-primary bg-red-50">
                          {getCategoryName(product.category)}
                        </Badge>
                        <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-adelca-primary transition">
                          {product.name}
                        </CardTitle>
                        <p className="text-sm text-slate-600 mb-1">SKU: {product.sku}</p>
                        {product.description && (
                          <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-slate-900">
                              {formatPrice(product.base_price)}
                            </p>
                            <p className="text-xs text-slate-500">Precio base</p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full bg-adelca-primary hover:bg-adelca-primary-hover" asChild>
                          <Link href={`/productos/${product.id}`}>
                            Ver Detalles
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
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

