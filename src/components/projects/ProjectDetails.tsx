import { Project } from '@prisma/client';

import { ActivateProjectButton } from '@/components/projects/ActivateProjectButton';
import { DeleteProject } from '@/components/projects/DeleteProject';
import { UpdateProjectDetails } from '@/components/projects/UpdateProjectDetails';
import { cn } from '@/lib/utils';

type ProjectDetailsProps = {
  project: Project;
};

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div>
      <section
        key={project.id}
        className={cn('p-4 rounded-xl mt-4 flex justify-between items-center', {
          'bg-white': project.isActive,
          'bg-gray-50': !project.isActive,
          border: !project.isActive,
        })}
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
        {project.isActive ? (
          <div className='flex gap-2'>
            <UpdateProjectDetails project={project} />
            <DeleteProject project={project} />
          </div>
        ) : (
          <div className='flex gap-2'>
            <ActivateProjectButton project={project} />
            <DeleteProject project={project} />
          </div>
        )}
      </section>
    </div>
  );
};
