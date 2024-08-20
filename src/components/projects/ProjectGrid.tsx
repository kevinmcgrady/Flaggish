import { FlagTriangleRight } from 'lucide-react';
import Link from 'next/link';

import { ActivateProjectButton } from '@/components/projects/ActivateProjectButton';
import { DeleteProject } from '@/components/projects/DeleteProject';
import { Separator } from '@/components/ui/separator';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';
import { ProjectWithFlags } from '@/types/ProjectWithFlags';

type ProjectGridProps = {
  projects: ProjectWithFlags[];
};

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-4'>
      {projects.map((project) => (
        <div
          key={project.id}
          className={cn('p-4 rounded-xl', {
            'bg-slate-100': !project.isActive,
            'bg-white': project.isActive,
            'hover:border': project.isActive,
            border: !project.isActive,
          })}
        >
          {project.isActive ? (
            <Link href={urls.dashboard.projectDetails(project.slug)}>
              <h2 className='text-xl font-semibold mb-2 hover:underline'>
                {project.name}
              </h2>
            </Link>
          ) : (
            <h2 className='text-xl font-semibold mb-2'>{project.name}</h2>
          )}

          <p className='text-muted-foreground mb-4'>{project.description}</p>
          <Separator />
          <div className='flex mt-4 items-center justify-between'>
            <div className='flex'>
              <FlagTriangleRight className='text-muted-foreground' size={20} />
              <p className='font-semibold'>{project.flags.length}</p>
            </div>
            <div className='flex gap-4'>
              {!project.isActive && <ActivateProjectButton project={project} />}
              <DeleteProject project={project} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
