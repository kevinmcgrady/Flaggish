import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type React from 'react';

import { Footer } from '@/components/core/Footer';
import { Nav } from '@/components/core/Nav';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Flaggy',
  description: 'Flaggy is an online feature flag manager',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className={cn(poppins.className)}>
          <Nav />
          {children}
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
