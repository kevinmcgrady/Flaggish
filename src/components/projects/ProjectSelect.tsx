'use client';

import { Project } from '@prisma/client';
import { Fragment, useState } from 'react';

import { ProjectDetails } from '@/components/projects/ProjectDetails';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ProjectSelectProps = {
  projects: Project[];
};

export const ProjectSelect = ({ projects }: ProjectSelectProps) => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  const handleSelectActiveProject = (slug: string) => {
    const project = projects.find((project) => project.slug === slug);

    if (!project) return;

    setActiveProject(project);
  };

  return (
    <Fragment>
      <div className='p-4 rounded-xl bg-white mt-4'>
        <Select
          defaultValue={activeProject.slug}
          onValueChange={handleSelectActiveProject}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {projects.map((project) => (
                <SelectItem key={project.slug} value={project.slug}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ProjectDetails project={activeProject} />
    </Fragment>
  );
};
