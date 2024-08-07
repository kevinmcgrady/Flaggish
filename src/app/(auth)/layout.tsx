import type React from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex items-center justify-center h-screen bg-[#F8F9FD]'>
      {children}
    </main>
  );
}
