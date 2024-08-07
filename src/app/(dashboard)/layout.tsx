import type React from 'react';

import { Nav } from '@/components/core/Nav';
import { LeftSidebar } from '@/components/dashboard/LeftSidebar';
import { syncUser } from '@/queries/auth/syncUser';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await syncUser();

  return (
    <div className='min-h-screen flex flex-col'>
      <Nav />
      <section className='container px-0 md:px-8 flex flex-1 mb-4'>
        <LeftSidebar />
        <main className='flex-1 w-full mx-4'>{children}</main>
      </section>
    </div>
  );
}
