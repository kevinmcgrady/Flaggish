import { Project } from '@prisma/client';

import { DashboardNav } from '@/components/dashboard/DashboardNav';

type LeftSidebarProps = {
  activeProject: Project;
};

export const LeftSidebar = ({ activeProject }: LeftSidebarProps) => {
  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <DashboardNav slug={activeProject.slug} />
    </aside>
  );
};
