import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/config/navItems';
import { cn } from '@/lib/utils';

type NavigationProps = {
  className?: string;
};

export const Navigation = ({ className }: NavigationProps) => {
  return (
    <nav className={cn(className)}>
      {navItems.map((item) => (
        <Link
          key={item.text}
          className={buttonVariants({ variant: 'link' })}
          href={item.url}
        >
          {item.text}
        </Link>
      ))}
    </nav>
  );
};
