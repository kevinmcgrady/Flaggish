'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navItems } from '@/config/navItems';
import { urls } from '@/config/urls';
import { cn } from '@/lib/utils';

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button data-testid='mobile-trigger' variant='ghost' size='icon'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='top'>
        <div
          data-testid='nav-content'
          className='flex flex-col items-start mt-8 space-y-4'
        >
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
            <SheetClose asChild>
              <Link
                className={cn(buttonVariants(), 'w-full')}
                href={urls.projects.root}
              >
                Projects
              </Link>
            </SheetClose>
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
