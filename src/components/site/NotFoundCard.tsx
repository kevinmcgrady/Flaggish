import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/config/urls';

export const NotFoundCard = () => {
  return (
    <div className='flex-1 container bg-[#F8F9FD]'>
      <section className='p-8 bg-white rounded-xl text-center max-w-xl shadow space-y-4 mt-8 mx-auto'>
        <Image
          className='mx-auto'
          src='/images/alert.png'
          alt='alert'
          width={100}
          height={100}
        />
        <h2 className='font-semibold text-3xl'>Oops, are you lost?</h2>
        <p className='text-muted-foreground'>Get back on track!</p>
        <Link className={buttonVariants()} href={urls.projects.root}>
          Projects
        </Link>
      </section>
    </div>
  );
};
