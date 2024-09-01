import '@testing-library/jest-dom';

import { Project } from '@prisma/client';
import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { beforeEach, describe, expect, it,vi } from 'vitest';

import { getProject } from '@/actions/projects/getProject';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { PageHeader } from '@/components/site/PageHeader';

import ProjectDetailsPage from './page';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('next/navigation');
vi.mock('@/actions/projects/getProject');
vi.mock('@/components/projects/ProjectDetails');
vi.mock('@/components/site/PageHeader');

const project: Project = {
  id: 'project-id',
  name: 'project-name',
  description: 'project-description',
  clientApiKey: 'client-key',
  secretApiKey: 'secret-key',
  isActive: true,
  slug: 'project-slug',
  userId: 'user-id',
};

describe('<ProjectDetailsPage />', () => {
  it('should return not found if no project', async () => {
    const dbMock = vi.mocked(getProject).mockResolvedValue(null);
    const notFoundMock = vi.mocked(notFound);

    const component = await ProjectDetailsPage({ params: { slug: 'slug' } });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(dbMock).toBeCalledWith('slug');
    expect(notFoundMock).toBeCalledTimes(1);
  });

  it('should return the page header and project details component', async () => {
    const dbMock = vi.mocked(getProject).mockResolvedValue(project);
    const notFoundMock = vi.mocked(notFound);
    const pageHeaderMock = vi.mocked(PageHeader);
    const projectDetailsMock = vi.mocked(ProjectDetails);

    const component = await ProjectDetailsPage({ params: { slug: 'slug' } });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).not.toBeCalled();
    expect(pageHeaderMock).toBeCalledTimes(1);
    expect(pageHeaderMock).toBeCalledWith(
      {
        description: 'Manage your project',
        title: 'Project Details',
      },
      {},
    );
    expect(projectDetailsMock).toBeCalledTimes(1);
    expect(projectDetailsMock).toHaveBeenCalledWith({ project }, {});
  });
});
