import { notFound } from 'next/navigation';
import type React from 'react';

import { LeftSidebar } from '@/components/dashboard/LeftSidebar';
import { getProject } from '@/queries/projects/getProject';

type DashboardLayoutProps = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  const project = await getProject(params.slug);

  if (!project || !project.isActive) {
    return notFound();
  }

  return (
    <div className='flex flex-col bg-[#F8F9FD] flex-1'>
      <div className='mt-4'>
        <section className='container px-0 flex flex-1 mb-4'>
          <LeftSidebar slug={params.slug} />
          <main className='flex-1 w-full mx-4'>{children}</main>
        </section>
      </div>
    </div>
  );
}
