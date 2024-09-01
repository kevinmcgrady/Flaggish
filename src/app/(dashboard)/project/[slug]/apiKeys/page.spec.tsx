import '@testing-library/jest-dom';

import { Project } from '@prisma/client';
import { render } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { getProject } from '@/actions/projects/getProject';
import { ApiKeyInput } from '@/components/dashboard/ApiKeyInput';
import { PageHeader } from '@/components/site/PageHeader';
import { ApiKeyType } from '@/types/ApiKeyType';

import ApiKeyPage from './page';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('next/navigation', () => {
  return {
    notFound: vi.fn(),
  };
});

vi.mock('@/actions/projects/getProject', () => {
  return {
    getProject: vi.fn(),
  };
});

vi.mock('@/components/dashboard/ApiKeyInput', () => {
  return {
    ApiKeyInput: vi.fn((props) => <div {...props} />),
  };
});

vi.mock('@/components/site/PageHeader', () => {
  return {
    PageHeader: vi.fn((props) => <div {...props} />),
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

describe('<ApiKKeysPage />', () => {
  it('should call notFound if no project is returned', async () => {
    const dbMock = vi.mocked(getProject).mockResolvedValue(null);
    const notFoundMock = vi.mocked(notFound);

    const component = await ApiKeyPage({ params: { slug: 'slug' } });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).toBeCalledTimes(1);
  });

  it('should display the api and header component if project exists', async () => {
    const dbMock = vi.mocked(getProject).mockResolvedValue(project);
    const notFoundMock = vi.mocked(notFound);
    const headerMock = vi.mocked(PageHeader);
    const apiComponentMock = vi.mocked(ApiKeyInput);
    const component = await ApiKeyPage({ params: { slug: 'slug' } });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(notFoundMock).not.toHaveBeenCalled();

    expect(headerMock).toHaveBeenCalled();
    expect(headerMock).toHaveBeenCalledWith(
      {
        description: 'Generate API keys to access feature flags',
        title: 'API Keys for project-name',
      },
      {},
    );

    expect(apiComponentMock).toHaveBeenCalledTimes(2);
    expect(apiComponentMock.mock.calls[0][0]).toStrictEqual({
      apiKey: 'client-key',
      label: 'Client Key',
      type: ApiKeyType.client,
      projectId: 'project-id',
    });
    expect(apiComponentMock.mock.calls[1][0]).toStrictEqual({
      apiKey: 'secret-key',
      label: 'Secret Key',
      type: ApiKeyType.secret,
      projectId: 'project-id',
    });
  });
});
