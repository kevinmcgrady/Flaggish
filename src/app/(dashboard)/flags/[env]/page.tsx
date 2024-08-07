import { Enviroment } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

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
      <section className='bg-white p-4 rounded-xl flex justify-between'>
        <div>
          <h3 className='font-semibold text-2xl'>
            Feature Flags for {project.name}
          </h3>
          <p className='font-light text-muted-foreground'>
            Toggle your feature flags below
          </p>
        </div>

        <CreateFlagDialog projectId={project.id} projectName={project.name} />
      </section>

      <section className='mt-4'>
        <FlagsListForm flags={flags} enviroment={enviroment} />
      </section>
    </Fragment>
  );
}
