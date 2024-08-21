import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { CreateProject } from '@/components/projects/CreateProject';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { PageHeader } from '@/components/site/PageHeader';
import { getAllProjects } from '@/queries/projects/getAllProjects';

export default async function ProjectsDetailsPage() {
  const projects = await getAllProjects();

  if (!projects || projects.length === 0) {
    return notFound();
  }

  const isAdditionalProject = projects.length >= 1;

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
      <ProjectGrid projects={projects} />
    </Fragment>
  );
}
