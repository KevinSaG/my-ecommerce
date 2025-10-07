import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category_type: string;
}

interface CategoryGridProps {
  categories: Category[];
}

const categoryIcons: Record<string, string> = {
  rebar: '🔩',
  wire: '🧵',
  mesh: '📐',
  profiles: '🏗️',
  sheets: '📄',
  tubes: '⚙️',
  angles: '📐',
  channels: '〰️',
  beams: '🏛️',
  accessories: '🔧',
};

const categoryColors: Record<string, string> = {
  rebar: 'from-orange-500 to-red-600',
  wire: 'from-blue-500 to-cyan-600',
  mesh: 'from-purple-500 to-pink-600',
  profiles: 'from-green-500 to-emerald-600',
  sheets: 'from-yellow-500 to-orange-600',
  tubes: 'from-indigo-500 to-blue-600',
  angles: 'from-pink-500 to-rose-600',
  channels: 'from-teal-500 to-cyan-600',
  beams: 'from-amber-500 to-orange-600',
  accessories: 'from-slate-500 to-gray-600',
};

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Nuestras Categorías
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de productos siderúrgicos de alta calidad
          </p>
          <div className="w-20 h-1 bg-adelca-primary mx-auto mt-4"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/productos?category=${category.category_type}`}
              className="group"
            >
              <Card className="relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    categoryColors[category.category_type] || 'from-slate-500 to-gray-600'
                  } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <CardContent className="relative p-8 text-center">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category.category_type] || '📦'}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-adelca-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Description */}
                  {category.description && (
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  {/* Arrow */}
                  <div className="mt-4 flex items-center justify-center text-adelca-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-semibold mr-2">Ver productos</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </CardContent>

                {/* Decorative element */}
                <div
                  className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${
                    categoryColors[category.category_type] || 'from-slate-500 to-gray-600'
                  } rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-adelca-primary hover:bg-adelca-primary-hover text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl" asChild>
            <Link href="/categorias">
              Ver Todas las Categorías
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

