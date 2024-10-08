import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { AuthNav } from '@/components/site/AuthNav';
import { MobileNav } from '@/components/site/MobileNav';
import { Navigation } from '@/components/site/Navigation';
import { urls } from '@/config/urls';

export const Header = () => {
  return (
    <header className='sticky top-0 z-10 bg-white shadow-md'>
      <div className='container flex items-center justify-between p-4'>
        <Link href={urls.home.root}>
          <Image
            role='img'
            src='/images/logo.png'
            alt='Flaggish logo'
            height={30}
            width={30}
          />
        </Link>
        <Navigation className='hidden lg:flex' />
        <AuthNav className='hidden lg:flex' />
        <div className='flex lg:hidden gap-4'>
          <UserButton />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
