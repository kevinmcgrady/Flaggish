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
        href={urls.projects.root}
        className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
      >
        {isLoggedIn ? 'Projects' : 'Log in'}
      </Link>
      <UserButton />
    </div>
  );
};
