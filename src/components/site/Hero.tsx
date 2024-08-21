'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { Clipboard } from '@/components/ui/clipboard';

export const Hero = () => {
  return (
    <header className='bg-hero-pattern h-[calc(100vh-72px)] bg-no-repeat bg-[100%,80%] bg-bottom'>
      <div className='bg-emerald-200 p-2'>
        <p className='text-center font-medium'>Currently in development 🎉</p>
      </div>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Image
          className='pt-20 mx-auto'
          src='/images/logo.png'
          alt='Flaggish'
          width={50}
          height={50}
        />
      </motion.div>

      <motion.h2
        transition={{ delay: 0.2 }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-center text-5xl md:text-7xl font-semibold mt-4'
      >
        When feature flags <br /> meet NextJs
      </motion.h2>
      <motion.p
        transition={{ delay: 0.4 }}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='text-center mt-4 text-xl font-light'
      >
        Flaggish is a feature flag manager for NextJs
      </motion.p>
      <motion.div
        transition={{ delay: 0.6 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Clipboard />
      </motion.div>
    </header>
  );
};
