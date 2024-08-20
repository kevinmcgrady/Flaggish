import type React from 'react';

import { WelcomeScreen } from '@/components/site/WelcomeScreen';
import { syncUser } from '@/queries/auth/syncUser';
import { getAllProjects } from '@/queries/projects/getAllProjects';

export default async function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await syncUser();

  const projects = await getAllProjects();
  const hasProjects = projects && projects.length > 0;

  return (
    <div className='flex flex-col bg-[#F8F9FD] flex-1'>
      <div className='mt-4'>
        {hasProjects ? (
          <section className='container px-0 flex flex-1 mb-4'>
            <main className='flex-1 w-full mx-4'>{children}</main>
          </section>
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}
