import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { ApiKeyInput } from '@/components/dashboard/ApiKeyInput';
import { PageHeader } from '@/components/site/PageHeader';
import { getProject } from '@/queries/projects/getProject';
import { ApiKeyType } from '@/types/ApiKeyType';

export default async function ApiKeysPage() {
  const project = await getProject();

  if (!project) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader
        title='API Keys'
        description='Generate API keys to access feature flags'
      />
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
