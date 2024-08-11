import { Enviroment } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { PageHeader } from '@/components/core/PageHeader';
import { CreateFlagDialog } from '@/components/flags/CreateFlagDialog';
import { FlagsListForm } from '@/components/flags/FlagsListForm';
import { getFlags } from '@/queries/flags/getFlags';
import { getProject } from '@/queries/projects/getProject';

type FlagsPageProps = {
  params: {
    env: string;
  };
};

const envMap: Record<string, Enviroment> = {
  production: Enviroment.PRODUCTION,
  development: Enviroment.DEVELOPMENT,
};

export default async function FlagsPage({ params }: FlagsPageProps) {
  const project = await getProject();

  if (!project) {
    return notFound();
  }

  const enviroment = envMap[params.env];

  if (!enviroment) {
    return notFound();
  }

  const flags = await getFlags(project.id, enviroment);

  return (
    <Fragment>
      <PageHeader
        title={`Feature Flags for ${project.name}`}
        description='Toggle your feature flags below'
        ctaComponent={
          <CreateFlagDialog projectId={project.id} projectName={project.name} />
        }
      />
      <FlagsListForm flags={flags} enviroment={enviroment} />
    </Fragment>
  );
}
