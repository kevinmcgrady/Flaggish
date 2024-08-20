import { DashboardNav } from '@/components/dashboard/DashboardNav';

export const LeftSidebar = () => {
  return (
    <aside className='w-[310px] relative hidden xl:flex xl:flex-col rounded-xl'>
      <DashboardNav />
    </aside>
  );
};
