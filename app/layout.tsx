import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My E-Commerce Store",
  description: "A modern e-commerce store built with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

