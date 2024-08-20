'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { dashboardNavItems } from '@/config/dashboardNavItems';

type DashboardNavProps = {
  slug: string;
};

export const DashboardNav = ({ slug }: DashboardNavProps) => {
  const pathname = usePathname();

  return (
    <nav className='p-4 bg-white flex flex-col gap-y-4 rounded-xl'>
      {dashboardNavItems.map((item) => {
        const isActive = item.url(slug).includes(pathname);
        return (
          <Link
            key={item.text}
            className={buttonVariants({
              variant: isActive ? 'default' : 'secondary',
            })}
            href={item.url(slug)}
          >
            {item.text}
          </Link>
        );
      })}
    </nav>
  );
};
