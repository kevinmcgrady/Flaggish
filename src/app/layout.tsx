import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import type React from 'react';

import { Footer } from '@/components/core/Footer';
import { Header } from '@/components/core/Header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Flaggish',
  description: 'Flaggish is an online feature flag manager',
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
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
