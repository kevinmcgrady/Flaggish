'use client';

import { Check } from 'lucide-react';
import { CodeBlock, dracula } from 'react-code-blocks';

export const FeatureSection = () => {
  const serverText = `# server component\n\nimport { getFlags } from 'flaggy-helpers';\n\nconst flags = await getFlags({clientApiKey: "", secretApiKey: ""});`;
  const clientText = `# client component\n\nimport { useGetFlags } from 'flaggy-helpers';\n\nconst {flags, hasError, isLoading} = useGetFlags({clientApiKey: '', secretApiKey: ''});`;

  return (
    <section id='features' className='bg-zinc-900 py-32'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 space-y-8 md:space-y-0'>
          <div>
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

          <div className='space-y-8'>
            <CodeBlock
              text={serverText}
              language='jsx'
              showLineNumbers={true}
              theme={dracula}
            />
            <CodeBlock
              text={clientText}
              language='jsx'
              showLineNumbers={true}
              theme={dracula}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
