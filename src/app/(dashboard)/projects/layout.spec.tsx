import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { beforeEach,describe, expect, it, vi } from 'vitest';

import { syncUser } from '@/actions/auth/syncUser';
import { getAllProjects } from '@/actions/projects/getAllProjects';
import { WelcomeScreen } from '@/components/site/WelcomeScreen';
import { ProjectWithFlags } from '@/types/ProjectWithFlags';

import ProjectsLayout from './layout';

beforeEach(() => {
  vi.resetAllMocks();
});

vi.mock('@/actions/auth/syncUser');
vi.mock('@/actions/projects/getAllProjects');
vi.mock('@/components/site/WelcomeScreen');

const projects: ProjectWithFlags[] = [
  {
    id: '',
    clientApiKey: '',
    description: '',
    isActive: true,
    name: '',
    secretApiKey: '',
    slug: '',
    userId: '',
    flags: [
      {
        description: '',
        enviroment: 'DEVELOPMENT',
        id: '',
        isToggled: true,
        name: '',
        projectId: '',
        slug: '',
      },
    ],
  },
];
describe('<ProjectsLayout />', () => {
  it('should call the syncUser method', async () => {
    const children = <div />;
    const component = await ProjectsLayout({ children });

    render(component);
    expect(syncUser).toBeCalledTimes(1);
  });

  it('should display the welcome screen if no projects', async () => {
    const dbMock = vi.mocked(getAllProjects).mockResolvedValue([]);
    const children = <div data-testid='children' />;
    const component = await ProjectsLayout({ children });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(syncUser).toBeCalledTimes(1);
    expect(WelcomeScreen).toBeCalledTimes(1);
    expect(screen.queryByTestId('children')).not.toBeInTheDocument();
  });

  it('should render the children if there are projects', async () => {
    const dbMock = vi.mocked(getAllProjects).mockResolvedValue(projects);
    const children = <div data-testid='children' />;
    const component = await ProjectsLayout({ children });

    render(component);

    expect(dbMock).toBeCalledTimes(1);
    expect(syncUser).toBeCalledTimes(1);
    expect(WelcomeScreen).toBeCalledTimes(0);
    expect(screen.queryByTestId('children')).toBeInTheDocument();
  });
});
