import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { PageHeader } from '@/components/site/PageHeader';
import { getProject } from '@/queries/projects/getProject';

type ProjectsDetailsPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProjectsDetailsPage({
  params,
}: ProjectsDetailsPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader title='Project Details' description='Manage your project' />
      <ProjectDetails project={project} />
    </Fragment>
  );
}
