import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { getProject } from '@/actions/projects/getProject';
import { ApiKeyInput } from '@/components/dashboard/ApiKeyInput';
import { PageHeader } from '@/components/site/PageHeader';
import { ApiKeyType } from '@/types/ApiKeyType';

type ApiKeysPageProps = {
  params: {
    slug: string;
  };
};

export default async function ApiKeysPage({ params }: ApiKeysPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader
        title={`API Keys for ${project.name}`}
        description='Generate API keys to access feature flags'
      />
      <ApiKeyInput
        apiKey={project.clientApiKey}
        label='Client Key'
        type={ApiKeyType.client}
        projectId={project.id}
      />
      <ApiKeyInput
        apiKey={project.secretApiKey}
        label='Secret Key'
        type={ApiKeyType.secret}
        projectId={project.id}
      />
    </Fragment>
  );
}
