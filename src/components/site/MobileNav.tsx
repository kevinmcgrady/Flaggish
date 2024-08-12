'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { dashboardNavItems } from '@/config/dashboardNavItems';
import { navItems } from '@/config/navItems';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <div className='flex flex-col items-start mt-8 space-y-4'>
          <h2 className='font-semibold'>Site</h2>
          {navItems.map((item) => {
            return (
              <SheetClose key={item.text} asChild>
                <Link
                  target={item.newTab ? '_blank' : '_self'}
                  className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
                  href={item.url}
                >
                  {item.text}
                </Link>
              </SheetClose>
            );
          })}

          <Separator />

          <SignedIn>
            <h2 className='font-semibold'>Dashboard</h2>
            {dashboardNavItems.map((item) => {
              return (
                <SheetClose key={item.url} asChild>
                  <Link
                    className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
                    href={item.url}
                  >
                    {item.text}
                  </Link>
                </SheetClose>
              );
            })}
          </SignedIn>

          <SignedOut>
            <SheetClose asChild>
              <Link
                className={cn(buttonVariants(), 'w-full')}
                href={urls.auth.signIn}
              >
                Sign in
              </Link>
            </SheetClose>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
