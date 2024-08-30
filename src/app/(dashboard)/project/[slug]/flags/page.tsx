import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { getFlags } from '@/actions/flags/getFlags';
import { getProject } from '@/actions/projects/getProject';
import { CreateFlagDialog } from '@/components/flags/CreateFlagDialog';
import { FlagsListForm } from '@/components/flags/FlagsListForm';
import { PageHeader } from '@/components/site/PageHeader';

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
