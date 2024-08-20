import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';

type AuthNavProps = {
  className?: string;
};

export const AuthNav = async ({ className }: AuthNavProps) => {
  return (
    <div className={cn(className)}>
      <SignedIn>
        <Link
          href={urls.projects.root}
          className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
        >
          Projects
        </Link>
      </SignedIn>
      <SignedOut>
        <Link
          href={urls.auth.signIn}
          className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
        >
          Sign in
        </Link>
      </SignedOut>
      <UserButton />
    </div>
  );
};
