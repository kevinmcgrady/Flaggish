import { Check } from 'lucide-react';

export const FeatureSection = () => {
  return (
    <section id='features' className='bg-zinc-900 py-32'>
      <div className='container'>
        <h3 className='text-white text-5xl font-semibold'>Features</h3>
        <p className='font-light text-white mt-2 text-lg'>The fun stuff!</p>

        <ul className='mt-8 space-y-4'>
          <li className='flex items-center gap-4'>
            <Check className='text-emerald-400' size={25} />
            <p className='text-slate-300 flex'>
              Create and manage feature flags
            </p>
          </li>
          <li className='flex items-center gap-4'>
            <Check className='text-emerald-400' size={25} />
            <p className='text-slate-300 flex'>
              Create flags for productions and development
            </p>
          </li>
          <li className='flex items-center gap-4'>
            <Check className='text-emerald-400' size={25} />
            <p className='text-slate-300 flex'>Typescript ready</p>
          </li>
          <li className='flex items-center gap-4'>
            <Check className='text-emerald-400' size={25} />
            <p className='text-slate-300 flex'>
              Helper functions for server and client components
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
