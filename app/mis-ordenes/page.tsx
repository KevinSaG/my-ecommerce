"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Esta ruta está deprecada.
 * Redirige a /dashboard/ordenes
 */
export default function MyOrdersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/ordenes');
  }, [router]);

  return null;
}

