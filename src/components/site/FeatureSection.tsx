'use client';

import { Check } from 'lucide-react';
import { CodeBlock, dracula } from 'react-code-blocks';

type FeatureSectionsProps = {
  features: string[];
};

export const FeatureSection = ({ features }: FeatureSectionsProps) => {
  const serverText = `# server component\n\nimport { getFlags } from '@flaggish/sdk';\n\nconst flags = await getFlags();`;
  const clientText = `# client component\n\nimport { useGetFlags } from '@flaggish/sdk';\n\nconst {flags, hasError, isLoading} = useGetFlags();`;

  return (
    <section id='features' className='bg-zinc-900 py-32'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 space-y-8 md:space-y-0'>
          <div>
            <h3 className='text-white text-5xl font-semibold'>Features</h3>
            <ul className='mt-8 space-y-4'>
              {features.map((feature) => (
                <li key={feature} className='flex items-center gap-4'>
                  <Check className='text-emerald-400' size={25} />
                  <p className='text-slate-300 flex'>{feature}</p>
                </li>
              ))}
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
