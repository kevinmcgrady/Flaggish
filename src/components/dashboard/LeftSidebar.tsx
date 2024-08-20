import { DashboardNav } from '@/components/dashboard/DashboardNav';

type LeftSidebarProps = {
  slug: string;
};

export const LeftSidebar = ({ slug }: LeftSidebarProps) => {
  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <DashboardNav slug={slug} />
    </aside>
  );
};
