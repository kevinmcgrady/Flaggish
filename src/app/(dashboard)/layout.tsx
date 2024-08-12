import type React from 'react';

import { LeftSidebar } from '@/components/dashboard/LeftSidebar';
import { WelcomeScreen } from '@/components/site/WelcomeScreen';
import { syncUser } from '@/queries/auth/syncUser';
import { getProject } from '@/queries/projects/getProject';

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await syncUser();

  const projects = await getProject();
  const hasProject = projects;

  return (
    <div className='min-h-screen flex flex-col bg-[#F8F9FD]'>
      <div className='mt-4'>
        {hasProject ? (
          <section className='container px-0 flex flex-1 mb-4'>
            <LeftSidebar />
            <main className='flex-1 w-full mx-4'>{children}</main>
          </section>
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}
