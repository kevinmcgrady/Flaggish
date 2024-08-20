import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { CreateProject } from '@/components/projects/CreateProject';
import { ProjectSelect } from '@/components/projects/ProjectSelect';
import { PageHeader } from '@/components/site/PageHeader';
import { getAllProjects } from '@/queries/projects/getAllProjects';

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const isAdditionalProject = !!projects && projects.length >= 1;

  if (!projects || projects.length === 0) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader
        title='Projects'
        description='Manage your projects'
        ctaComponent={
          <CreateProject
            variant='icon'
            isAdditionalProject={isAdditionalProject}
          />
        }
      />
      <ProjectSelect projects={projects} />
    </Fragment>
  );
}
