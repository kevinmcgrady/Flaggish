import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';

type AuthNavProps = {
  className?: string;
};

export const AuthNav = async ({ className }: AuthNavProps) => {
  const isLoggedIn = await currentUser();
  return (
    <div className={cn(className)}>
      <Link
        href={urls.dashboard.projects}
        className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
      >
        {isLoggedIn ? 'Dashboard' : 'Log in'}
      </Link>
      <UserButton />
    </div>
  );
};
