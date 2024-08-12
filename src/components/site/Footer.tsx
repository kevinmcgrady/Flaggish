import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { navItems } from '@/config/navItems';
import { cn } from '@/lib/utils';

export const Footer = () => {
  return (
    <footer className='bg-zinc-900 text-center p-8'>
      <div>
        {navItems.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className={cn(buttonVariants({ variant: 'link' }), 'text-white')}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </footer>
  );
};
