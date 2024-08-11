import Image from 'next/image';
import Link from 'next/link';

import { MobileNav } from '@/components/site/MobileNav';
import { Navigation } from '@/components/site/Navigation';
import { urls } from '@/core/urls';

import { AuthNav } from './AuthNav';

export const Header = () => {
  return (
    <header className='sticky top-0 z-10 bg-white'>
      <div className='container flex items-center justify-between p-4'>
        <Link href={urls.home.root}>
          <Image
            src='/images/logo.png'
            alt='Flaggish logo'
            height={30}
            width={30}
          />
        </Link>
        <Navigation className='hidden md:flex' />
        <AuthNav className='hidden md:flex' />
        <MobileNav />
      </div>
    </header>
  );
};
