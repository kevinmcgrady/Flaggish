'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { dashboardNavItems } from '@/config/dashboardNavItems';
import { cn } from '@/lib/utils';

type DashboardNavProps = {
  slug: string;
  variant?: 'mobile' | 'desktop';
};

export const DashboardNav = ({
  slug,
  variant = 'desktop',
}: DashboardNavProps) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn(`p-4 bg-white flex gap-4 rounded-xl`, {
        'flex-row': variant === 'mobile',
        'flex-col': variant === 'desktop',
      })}
    >
      {dashboardNavItems.map((item) => {
        const isActive = item.url(slug).includes(pathname);
        return (
          <Link
            key={item.text}
            className={buttonVariants({
              variant: isActive ? 'default' : 'secondary',
              size: variant === 'desktop' ? 'default' : 'sm',
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
