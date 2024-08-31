import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type React from 'react';

import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
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
        <body className={cn(poppins.className, 'min-h-screen flex flex-col')}>
          <NextTopLoader
            showSpinner={false}
            color='#847DF9'
            easing='ease'
            initialPosition={0.08}
          />
          <Header />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </body>
      </ClerkProvider>
    </html>
  );
}
