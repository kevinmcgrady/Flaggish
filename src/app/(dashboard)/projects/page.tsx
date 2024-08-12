import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { DeleteProject } from '@/components/projects/DeleteProject';
import { UpdateProjectDetails } from '@/components/projects/UpdateProjectDetails';
import { PageHeader } from '@/components/site/PageHeader';
import { getProject } from '@/queries/projects/getProject';

export default async function ProjectsPage() {
  const project = await getProject();

  if (!project) {
    return notFound();
  }

  return (
    <Fragment>
      <PageHeader title='Projects' description='Manage your projects' />

      <section className='p-4 rounded-xl bg-white mt-4 flex justify-between'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Details</h2>
          <p className='font-semibold mb-2'>
            Name:{' '}
            <span className='font-normal text-muted-foreground'>
              {project.name}
            </span>
          </p>
          <p className='text-md font-semibold mb-4'>
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
    </Fragment>
  );
}
