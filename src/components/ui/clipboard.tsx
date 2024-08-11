'use client';

import { Copy } from 'lucide-react';

import { useToast } from './use-toast';

export const Clipboard = () => {
  const { toast } = useToast();
  const command = 'npm i @flaggish/sdk';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(command);
    toast({
      title: 'Coppied!',
      description: 'Enjoy 🥳',
    });
  };
  return (
    <div className='flex justify-center mt-8'>
      <button
        onClick={handleCopyToClipboard}
        type='button'
        className='relative py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-lg hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
      >
        $ {command}
        <span className='border-s ps-3.5 dark:border-neutral-700'>
          <Copy size={15} />
        </span>
      </button>
    </div>
  );
};
