import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/core/urls';
import { cn } from '@/lib/utils';

type AuthNavProps = {
  className?: string;
};

export const AuthNav = ({ className }: AuthNavProps) => {
  return (
    <div className={cn(className)}>
      <Link
        href={urls.dashboard.projects}
        className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
      >
        Dashboard
      </Link>
      <UserButton />
    </div>
  );
};
