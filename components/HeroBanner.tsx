"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const slides = [
  {
    title: "Calidad en Acero desde 1963",
    subtitle: "Líderes en fabricación de productos siderúrgicos en Ecuador",
    description: "Innovación, sostenibilidad y compromiso con la excelencia",
    cta: "Ver Productos",
    link: "/productos",
    image: "/images/fondo1.jpg",
  },
  {
    title: "Varillas Corrugadas de Alta Resistencia",
    subtitle: "Cumplimos con normas ASTM e INEN",
    description: "Ideales para construcción y obras civiles",
    cta: "Explorar Varillas",
    link: "/productos?category=rebar",
    image: "/images/fondo1.jpg",
  },
  {
    title: "Soluciones para la Industria",
    subtitle: "Perfiles, tubos y accesorios estructurales",
    description: "Productos de acero para proyectos industriales",
    cta: "Conocer Más",
    link: "/categorias",
    image: "/images/fondo1.jpg",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Imagen de fondo */}
          <div
            className="w-full h-full flex items-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                {/* Content */}
                <div className="text-white space-y-6">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-2xl md:text-3xl text-white font-semibold animate-fade-in-up animation-delay-200">
                    {slide.subtitle}
                  </p>
                  <p className="text-lg md:text-xl text-slate-300 animate-fade-in-up animation-delay-400">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
                    <Button
                      size="lg"
                      className="bg-adelca-primary hover:bg-adelca-primary-hover text-lg px-8 py-6 h-auto"
                      asChild
                    >
                      <Link href={slide.link}>{slide.cta}</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6 h-auto border-2 border-white text-black hover:bg-white "
                      asChild
                    >
                      <Link href="/contacto" >Contactar</Link>
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-adelca-primary p-3 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Normas Internacionales
                        </h3>
                        <p className="text-sm text-slate-300">ASTM e INEN</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-adelca-primary p-3 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Envíos Nacionales
                        </h3>
                        <p className="text-sm text-slate-300">Todo Ecuador</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-adelca-primary p-3 rounded-lg">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Calidad Certificada
                        </h3>
                        <p className="text-sm text-slate-300">Desde 1963</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-adelca-primary w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={() =>
          goToSlide((currentSlide - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
