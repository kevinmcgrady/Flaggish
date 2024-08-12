import Image from 'next/image';
import Link from 'next/link';

import { CreateProject } from '@/components/projects/CreateProject';
import { buttonVariants } from '@/components/ui/button';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';

export const WelcomeScreen = () => {
  return (
    <section className='container'>
      <div className='p-8 bg-white rounded-xl text-center max-w-2xl mx-auto'>
        <Image
          className='mx-auto'
          src='/images/logo.png'
          alt='Flaggish logo'
          width={50}
          height={50}
        />
        <h2 className='text-2xl font-semibold mt-8'>Welcome to Flaggish</h2>
        <p className='mt-2 text-muted-foreground'>
          The feature flag manager for NextJs
        </p>
      </div>
      <div className='p-8 bg-white rounded-xl max-w-2xl mx-auto mt-4'>
        <h2 className='text-2xl font-semibold'>To Get Started 🎉</h2>
        <p className='text-muted-foreground mt-4'>
          1. Create your first project
        </p>
        <div className='mt-4'>
          <CreateProject />
        </div>
      </div>
      <div className='p-8 bg-white rounded-xl max-w-2xl mx-auto mt-4'>
        <p className='text-muted-foreground mt-2'>
          2. Install the SDK and follow the{' '}
          <Link
            target='_blank'
            className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
            href={urls.home.docs}
          >
            install guide
          </Link>
        </p>
      </div>
    </section>
  );
};
