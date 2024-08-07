import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { ApiKeyInput } from '@/components/dashboard/ApiKeyInput';
import { getProject } from '@/queries/projects/getProject';
import { ApiKeyType } from '@/types/ApiKeyType';

export default async function ApiKeysPage() {
  const project = await getProject();

  if (!project) {
    return notFound();
  }

  return (
    <Fragment>
      <section className='bg-white p-4 rounded-xl'>
        <h3 className='font-semibold text-2xl'>API Keys</h3>
        <p className='font-light text-muted-foreground'>
          Generate API keys to access feature flags
        </p>
      </section>

      <ApiKeyInput
        defaultApiKey={project.clientApiKey}
        label='Client Key'
        type={ApiKeyType.client}
      />
      <ApiKeyInput
        defaultApiKey={project.secretApiKey}
        label='Secret Key'
        type={ApiKeyType.secret}
      />
    </Fragment>
  );
}
