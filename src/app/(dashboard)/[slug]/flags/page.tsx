import { Enviroment } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { CreateFlagDialog } from '@/components/flags/CreateFlagDialog';
import { FlagsListForm } from '@/components/flags/FlagsListForm';
import { PageHeader } from '@/components/site/PageHeader';
import { getFlags } from '@/queries/flags/getFlags';
import { getProject } from '@/queries/projects/getProject';

type FlagsPageProps = {
  searchParams: { [key: string]: string };
  params: {
    slug: string;
  };
};

const envMap: Record<string, Enviroment> = {
  production: Enviroment.PRODUCTION,
  development: Enviroment.DEVELOPMENT,
};

export default async function FlagsPage({
  searchParams,
  params,
}: FlagsPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }

  const enviroment = envMap[searchParams.env];

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
      <FlagsListForm slug={params.slug} flags={flags} enviroment={enviroment} />
    </Fragment>
  );
}
