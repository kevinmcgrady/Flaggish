import '@testing-library/jest-dom';

import { render,screen } from '@testing-library/react';
import { CodeBlock, dracula } from 'react-code-blocks';
import { describe, expect,it, vi } from 'vitest';

import { FeatureSection } from '@/components/site/FeatureSection';

vi.mock('react-code-blocks', () => {
  return {
    dracula: vi.fn(),
    CodeBlock: vi.fn(),
  };
});

const features: string[] = ['feature-1', 'feature-2', 'feature-3'];
const serverText = `# server component\n\nimport { getFlags } from '@flaggish/sdk';\n\nconst flags = await getFlags();`;
const clientText = `# client component\n\nimport { useGetFlags } from '@flaggish/sdk';\n\nconst {flags, hasError, isLoading} = useGetFlags();`;

describe('<FeatureSection />', () => {
  it('should display the fearures', () => {
    render(<FeatureSection features={features} />);

    const title = screen.getByText('Features');
    const feature1 = screen.getByText('feature-1');
    const feature2 = screen.getByText('feature-2');
    const feature3 = screen.getByText('feature-3');

    expect(title).toBeInTheDocument();
    expect(feature1).toBeInTheDocument();
    expect(feature2).toBeInTheDocument();
    expect(feature3).toBeInTheDocument();
  });

  it('should display the code blocks', () => {
    const codeblocks = vi.mocked(CodeBlock);

    render(<FeatureSection features={features} />);

    expect(codeblocks.mock.calls[0][0].text).toBe(serverText);
    expect(codeblocks.mock.calls[0][0].language).toBe('jsx');
    expect(codeblocks.mock.calls[0][0].showLineNumbers).toBe(true);
    expect(codeblocks.mock.calls[0][0].theme).toBe(dracula);

    expect(codeblocks.mock.calls[1][0].text).toBe(clientText);
    expect(codeblocks.mock.calls[1][0].language).toBe('jsx');
    expect(codeblocks.mock.calls[1][0].showLineNumbers).toBe(true);
    expect(codeblocks.mock.calls[1][0].theme).toBe(dracula);
  });
});
