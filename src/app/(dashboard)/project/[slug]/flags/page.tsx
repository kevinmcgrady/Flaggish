import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { CreateFlagDialog } from '@/components/flags/CreateFlagDialog';
import { FlagsListForm } from '@/components/flags/FlagsListForm';
import { PageHeader } from '@/components/site/PageHeader';
import { getFlags } from '@/queries/flags/getFlags';
import { getProject } from '@/queries/projects/getProject';

type FlagsPageProps = {
  params: {
    slug: string;
  };
};

export default async function FlagsPage({ params }: FlagsPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }

  const flags = await getFlags(project.id);

  if (!flags) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader
        title={`Feature Flags for ${project.name}`}
        description='Toggle your feature flags below'
        ctaComponent={
          <CreateFlagDialog projectId={project.id} projectName={project.name} />
        }
      />
      <FlagsListForm flags={flags} />
    </Fragment>
  );
}
