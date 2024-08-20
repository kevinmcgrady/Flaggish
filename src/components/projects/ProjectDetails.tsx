import { Project } from '@prisma/client';

import { UpdateProjectDetails } from '@/components/projects/UpdateProjectDetails';

type ProjectDetailsProps = {
  project: Project;
};

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <section
      key={project.id}
      className={
        'p-4 rounded-xl mt-4 flex justify-between items-center bg-white'
      }
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
      <UpdateProjectDetails project={project} />
    </section>
  );
};
