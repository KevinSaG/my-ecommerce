"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CartIcon } from "@/components/CartIcon";
import { CartDrawer } from "@/components/CartDrawer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-adelca-primary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar - Contact info */}
        <div className="border-b border-white py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <a
                href="tel:+59323801321"
                className="flex items-center hover:text-black transition"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                (593 2) 380 1321
              </a>
              <a
                href="mailto:info@adelca.com"
                className="flex items-center hover:text-black transition"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@adelca.com
              </a>
            </div>
            <div className="hidden md:block">
              <span className="text-white">
                Desde 1963 - Calidad Garantizada
              </span>
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg flex items-center justify-center">
                <Image src="/images/logo-a.png" alt="adelca" width={25} height={25} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">adelca</h1>
                <p className="text-[9px] text-white">EL PROGRESO QUE NOS UNE</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Inicio
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/productos">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Productos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/categorias">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Categorías
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/nosotros">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Nosotros
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contacto">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Contacto
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/mis-ordenes">
                    <NavigationMenuLink
                      className={
                        navigationMenuTriggerStyle() +
                        " bg-transparent hover:bg-white hover:text-adelca-primary"
                      }
                    >
                      Mis Órdenes
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-white hover:text-adelca-primary hover:bg-white"
              >
                <svg
                  className="w-5 h-5"
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
              </Button>

              {/* Cart */}
              <div className="text-white hover:text-adelca-primary [&>button]:hover:bg-white">
                <CartIcon onClick={() => setIsCartOpen(true)} />
              </div>

              {/* User */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-adelca-primary hover:bg-white"
                asChild
              >
                <Link href="/signin">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Link>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-adelca-primary hover:bg-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-orange-400 transition font-medium"
              >
                Inicio
              </Link>
              <Link
                href="/productos"
                className="hover:text-orange-400 transition font-medium"
              >
                Productos
              </Link>
              <Link
                href="/categorias"
                className="hover:text-orange-400 transition font-medium"
              >
                Categorías
              </Link>
              <Link
                href="/nosotros"
                className="hover:text-orange-400 transition font-medium"
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="hover:text-orange-400 transition font-medium"
              >
                Contacto
              </Link>
              <Link
                href="/mis-ordenes"
                className="hover:text-orange-400 transition font-medium"
              >
                Mis Órdenes
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
}
