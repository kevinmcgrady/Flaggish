import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { urls } from '@/core/urls';

export const Nav = () => {
  return (
    <nav className='bg-white mb-4'>
      <div className='container flex items-center justify-between p-4'>
        <Link href={urls.home}>
          <Image
            src='/images/logo.png'
            alt='Flaggy logo'
            height={30}
            width={30}
          />
        </Link>

        <UserButton />
      </div>
    </nav>
  );
};
