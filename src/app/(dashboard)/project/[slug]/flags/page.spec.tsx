import '@testing-library/jest-dom';

import { Flag, Project } from '@prisma/client';
import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getFlags } from '@/actions/flags/getFlags';
import { getProject } from '@/actions/projects/getProject';
import { FlagsListForm } from '@/components/flags/FlagsListForm';
import { PageHeader } from '@/components/site/PageHeader';

import FlagsPage from './page';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('next/navigation');
vi.mock('@/actions/flags/getFlags');
vi.mock('@/actions/projects/getProject');

vi.mock('@/components/site/PageHeader', () => {
  return {
    PageHeader: vi.fn((props) => <div {...props} />),
  };
});

vi.mock('@/components/flags/FlagsListForm', () => {
  return {
    FlagsListForm: vi.fn((props) => <div {...props} />),
  };
});

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

const flags: Flag[] = [
  {
    id: 'flag-id',
    name: 'flag-name',
    description: 'flag-description',
    enviroment: 'DEVELOPMENT',
    isToggled: true,
    projectId: 'project-id',
    slug: 'slug',
  },
];

describe('<FlagsPage />', () => {
  it('should return not found if no project', async () => {
    const getProjectMock = vi.mocked(getProject).mockResolvedValue(null);
    const notFoundMock = vi.mocked(notFound);
    const component = await FlagsPage({ params: { slug: 'slug' } });

    render(component);

    expect(getProjectMock).toHaveBeenCalledTimes(1);
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('should return not found if no flags', async () => {
    const getProjectMock = vi.mocked(getProject).mockResolvedValue(project);
    const getFlagsMock = vi.mocked(getFlags).mockResolvedValue(null);
    const notFoundMock = vi.mocked(notFound);
    const component = await FlagsPage({ params: { slug: 'slug' } });

    render(component);

    expect(getProjectMock).toHaveBeenCalledTimes(1);
    expect(getFlagsMock).toHaveBeenCalledTimes(1);
    expect(notFoundMock).toHaveBeenCalledTimes(1);
  });

  it('should return the page header and flags list', async () => {
    const getProjectMock = vi.mocked(getProject).mockResolvedValue(project);
    const getFlagsMock = vi.mocked(getFlags).mockResolvedValue(flags);
    const notFoundMock = vi.mocked(notFound);
    const headerMock = vi.mocked(PageHeader);
    const flagListMock = vi.mocked(FlagsListForm);

    const component = await FlagsPage({ params: { slug: 'slug' } });

    render(component);

    expect(getProjectMock).toHaveBeenCalledTimes(1);
    expect(getFlagsMock).toHaveBeenCalledTimes(1);
    expect(notFoundMock).toHaveBeenCalledTimes(0);

    expect(headerMock).toBeCalledTimes(1);
    expect(flagListMock).toBeCalledTimes(1);
    expect(flagListMock).toBeCalledWith({ flags: flags }, {});
  });
});
