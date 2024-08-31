import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/config/navItems';
import { cn } from '@/lib/utils';

type NavigationProps = {
  className?: string;
};

export const Navigation = ({ className }: NavigationProps) => {
  return (
    <nav role='navigation' className={cn(className)}>
      {navItems.map((item) => (
        <Link
          target={item.newTab ? '_blank' : '_self'}
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
