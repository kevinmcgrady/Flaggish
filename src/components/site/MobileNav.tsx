import { Menu } from 'lucide-react';
import Link from 'next/link';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navItems } from '@/config/navItems';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '../ui/button';

export const MobileNav = () => {
  return (
    <div className='flex md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className='flex flex-col items-start mt-8 space-y-4'>
            {navItems.map((item) => (
              <SheetClose key={item.text} asChild>
                <Link
                  className={cn(
                    buttonVariants({ variant: 'secondary' }),
                    'w-full',
                  )}
                  href={item.url}
                >
                  {item.text}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
