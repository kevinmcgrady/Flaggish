import Image from 'next/image';

import { CreateProject } from '@/components/projects/CreateProject';

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
        <p className='mt-2 mb-8 text-muted-foreground'>
          The feature flag manager for NextJs
        </p>
        <CreateProject />
      </div>
    </section>
  );
};
