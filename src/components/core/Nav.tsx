import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { urls } from '@/core/urls';
import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export const Nav = () => {
  return (
    <nav className='bg-white'>
      <div className='container flex items-center justify-between p-4'>
        <Link href={urls.home.root}>
          <Image
            src='/images/logo.png'
            alt='Flaggy logo'
            height={30}
            width={30}
          />
        </Link>

        <div>
          <Link className={buttonVariants({ variant: 'link' })} href='/'>
            Documentation
          </Link>
          <Link
            className={buttonVariants({ variant: 'link' })}
            href={urls.home.pricing}
          >
            Pricing
          </Link>
          <Link
            className={buttonVariants({ variant: 'link' })}
            href={urls.home.features}
          >
            Features
          </Link>
        </div>

        <div className='flex'>
          <Link
            href={urls.dashboard.root}
            className={cn(buttonVariants({ size: 'sm' }), 'mr-4')}
          >
            Dashboard
          </Link>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
