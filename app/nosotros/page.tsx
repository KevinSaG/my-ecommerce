import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/fondo1.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-adelca-primary hover:bg-adelca-primary-hover">
              Desde 1963
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Acería del Ecuador
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Más de 60 años liderando la industria siderúrgica ecuatoriana con calidad, 
              innovación y compromiso con el desarrollo del país.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/productos">
                <Button size="lg" className="bg-adelca-primary hover:bg-adelca-primary-hover">
                  Ver Productos
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="bg-white hover:bg-slate-100">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-adelca-primary mb-2">60+</div>
              <div className="text-slate-600">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-adelca-primary mb-2">2</div>
              <div className="text-slate-600">Plantas de Producción</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-adelca-primary mb-2">500+</div>
              <div className="text-slate-600">Productos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-adelca-primary mb-2">100%</div>
              <div className="text-slate-600">Calidad Garantizada</div>
            </div>
          </div>
        </div>
      </div>

      {/* Historia Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nuestra Historia</h2>
          <div className="w-20 h-1 bg-adelca-primary mb-8"></div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Fundada en 1963, ADELCA (Acería del Ecuador) ha sido pionera en la industria siderúrgica 
              del país. Desde nuestros inicios, hemos estado comprometidos con la producción de acero 
              de la más alta calidad, contribuyendo significativamente al desarrollo y modernización 
              de la infraestructura ecuatoriana.
            </p>
            
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Con más de seis décadas de experiencia, hemos consolidado nuestra posición como líderes 
              en la fabricación de productos siderúrgicos, siempre a la vanguardia de la tecnología 
              y con un firme compromiso con la calidad y la satisfacción de nuestros clientes.
            </p>

            <p className="text-slate-700 text-lg leading-relaxed">
              Contamos con dos plantas de producción estratégicamente ubicadas en Alóag (Pichincha) 
              y Milagro (Guayas), lo que nos permite atender eficientemente a todo el territorio nacional 
              y exportar a países vecinos.
            </p>
          </div>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-t-4 border-t-adelca-primary">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-adelca-primary rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Misión</h3>
                <p className="text-slate-700 leading-relaxed">
                  Producir y comercializar productos siderúrgicos de la más alta calidad, 
                  satisfaciendo las necesidades de nuestros clientes y contribuyendo al desarrollo 
                  sostenible del Ecuador, mediante la innovación continua, la excelencia operacional 
                  y el compromiso con nuestros colaboradores y la comunidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-600">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Nuestra Visión</h3>
                <p className="text-slate-700 leading-relaxed">
                  Ser la empresa líder en la industria siderúrgica de Ecuador y la región, 
                  reconocida por nuestra excelencia en calidad, innovación tecnológica, 
                  responsabilidad social y ambiental, siendo el socio estratégico preferido 
                  para el desarrollo de proyectos de construcción e infraestructura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            Nuestros Valores
          </h2>
          <div className="w-20 h-1 bg-adelca-primary mb-12 mx-auto"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-adelca-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Calidad</h3>
              <p className="text-slate-600">
                Compromiso inquebrantable con la excelencia en cada producto que fabricamos.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovación</h3>
              <p className="text-slate-600">
                Búsqueda constante de nuevas tecnologías y procesos para mejorar continuamente.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compromiso</h3>
              <p className="text-slate-600">
                Responsabilidad con nuestros clientes, empleados, comunidad y medio ambiente.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Integridad</h3>
              <p className="text-slate-600">
                Actuamos con transparencia, honestidad y ética en todas nuestras operaciones.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sostenibilidad</h3>
              <p className="text-slate-600">
                Producción responsable que preserva el medio ambiente para futuras generaciones.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excelencia</h3>
              <p className="text-slate-600">
                Búsqueda permanente de la perfección en procesos, productos y servicios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plantas Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
              Nuestras Plantas
            </h2>
            <div className="w-20 h-1 bg-adelca-primary mb-12 mx-auto"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-20 h-20 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-2xl font-bold">Planta Alóag</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-adelca-primary mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Ubicación</h4>
                      <p className="text-slate-600">Alóag, Pichincha, Ecuador</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-adelca-primary mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Especialización</h4>
                      <p className="text-slate-600">Producción de varillas corrugadas y perfiles estructurales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-20 h-20 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-2xl font-bold">Planta Milagro</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <svg className="w-6 h-6 text-adelca-primary mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Ubicación</h4>
                      <p className="text-slate-600">Milagro, Guayas, Ecuador</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-adelca-primary mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Especialización</h4>
                      <p className="text-slate-600">Alambrón, mallas electrosoldadas y productos derivados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-adelca-primary to-red-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para trabajar con nosotros?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a las miles de empresas que confían en ADELCA para sus proyectos de construcción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/productos">
              <Button size="lg" className="bg-white text-adelca-primary hover:bg-slate-100">
                Ver Productos
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-adelca-primary">
                Contáctanos
              </Button>
            </Link>
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

