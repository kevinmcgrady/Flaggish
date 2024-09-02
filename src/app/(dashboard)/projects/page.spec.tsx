import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { getAllProjects } from '@/actions/projects/getAllProjects';
import { CreateProject } from '@/components/projects/CreateProject';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { PageHeader } from '@/components/site/PageHeader';
import { ProjectWithFlags } from '@/types/ProjectWithFlags';

import ProjectsPage from './page';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('next/navigation');
vi.mock('@/actions/projects/getAllProjects');

vi.mock('@/components/projects/CreateProject');
vi.mock('@/components/projects/ProjectGrid');
vi.mock('@/components/site/PageHeader');

const projects: ProjectWithFlags[] = [
  {
    id: 'project-id',
    description: 'project-description',
    clientApiKey: 'client-key',
    isActive: true,
    name: 'project-name',
    secretApiKey: 'secret-key',
    slug: 'project-slug',
    userId: 'user-id',
    flags: [
      {
        id: 'flag-id',
        description: 'flag-description',
        enviroment: 'DEVELOPMENT',
        isToggled: true,
        name: 'flag-name',
        projectId: 'project-id',
        slug: 'flag-slug',
      },
    ],
  },
];

describe('<ProjectsPage />', () => {
  it('should return notfound if projects are null', async () => {
    const dbMock = vi.mocked(getAllProjects).mockResolvedValue(null);
    const notFoundMock = vi.mocked(notFound);

    const conponent = await ProjectsPage();

    render(conponent);
    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).toBeCalledTimes(1);
  });

  it('should return notfound projects if projects is empty array', async () => {
    const dbMock = vi.mocked(getAllProjects).mockResolvedValue([]);
    const notFoundMock = vi.mocked(notFound);

    const conponent = await ProjectsPage();

    render(conponent);
    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).toBeCalledTimes(1);
  });

  it('should return the page content', async () => {
    const dbMock = vi.mocked(getAllProjects).mockResolvedValue(projects);
    const notFoundMock = vi.mocked(notFound);

    const conponent = await ProjectsPage();

    render(conponent);

    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).not.toBeCalled();

    expect(PageHeader).toBeCalledTimes(1);
    expect(PageHeader).toBeCalledWith(
      {
        description: 'Manage your projects',
        title: 'Projects',
        ctaComponent: (
          <CreateProject isAdditionalProject={true} variant='icon' />
        ),
      },
      {},
    );

    expect(ProjectGrid).toBeCalledTimes(1);
    expect(ProjectGrid).toBeCalledWith(
      {
        projects,
      },
      {},
    );
  });
});
