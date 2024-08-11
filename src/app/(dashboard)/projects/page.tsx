import { Pencil, Trash2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { PageHeader } from '@/components/core/PageHeader';
import { Button } from '@/components/ui/button';
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
          <Button variant='outline' size='icon'>
            <Pencil size={15} />
          </Button>
          <Button variant='outline' size='icon'>
            <Trash2 size={15} />
          </Button>
        </div>
      </section>
    </Fragment>
  );
}
