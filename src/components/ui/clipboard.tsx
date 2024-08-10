import { ClipboardCheck } from 'lucide-react';

export const Clipboard = () => {
  return (
    <div className='flex justify-center mt-8'>
      <button
        type='button'
        className='relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-lg hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
      >
        $ npm i flaggy-helpers
        <span className='border-s ps-3.5 dark:border-neutral-700'>
          <ClipboardCheck />
        </span>
      </button>
    </div>
  );
};
