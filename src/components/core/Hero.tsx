import Image from 'next/image';

import { Clipboard } from '@/components/ui/clipboard';

export const Hero = () => {
  return (
    <header className='bg-hero-pattern h-[calc(100vh-72px)] bg-no-repeat bg-[100%,80%] bg-bottom'>
      <Image
        className='pt-20 mx-auto'
        src='/images/logo.png'
        alt='Flaggish'
        width={50}
        height={50}
      />
      <h2 className='text-center text-6xl md:text-7xl font-semibold mt-4'>
        When feature flags <br /> meet NextJs
      </h2>
      <p className='text-center mt-4 text-xl font-light'>
        Flaggish is a feature flag manager for NextJs
      </p>
      <Clipboard />
    </header>
  );
};
