'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { dashboardNavItems } from '@/config/dashboardNavItems';

export const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <nav className='p-4 bg-white flex flex-col gap-y-4 rounded-xl'>
      {dashboardNavItems.map((item) => {
        const isActive = pathname.includes(item.url);
        return (
          <Link
            key={item.text}
            className={buttonVariants({
              variant: isActive ? 'default' : 'secondary',
            })}
            href={item.url}
          >
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
};
