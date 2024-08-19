import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { CreateProject } from '@/components/projects/CreateProject';
import { DeleteProject } from '@/components/projects/DeleteProject';
import { UpdateProjectDetails } from '@/components/projects/UpdateProjectDetails';
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

      {projects.map((project) => (
        <section
          key={project.id}
          className='p-4 rounded-xl bg-white mt-4 flex justify-between'
        >
          <div>
            <p className='font-semibold mb-2'>
              Name:{' '}
              <span className='font-normal text-muted-foreground'>
                {project.name}
              </span>
            </p>
            <p className='text-md font-semibold'>
              Description:{' '}
              <span className='font-normal text-muted-foreground'>
                {project.description}
              </span>
            </p>
          </div>
          <div className='flex gap-2'>
            <UpdateProjectDetails project={project} />
            <DeleteProject project={project} />
          </div>
        </section>
      ))}
    </Fragment>
  );
}
