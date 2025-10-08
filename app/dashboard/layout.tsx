'use client';

import { RoleBasedDashboard } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleBasedDashboard>
      {children}
    </RoleBasedDashboard>
  );
}

