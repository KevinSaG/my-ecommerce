'use client';

import { RoleBasedDashboard } from '@/components/dashboard';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleBasedDashboard>
      {children}
      <Toaster />
    </RoleBasedDashboard>
  );
}

