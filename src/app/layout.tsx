'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/configs/providersConfig';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <StoreProvider>
            <Providers>
              <MainLayout>{children}</MainLayout>
              <Toaster />
            </Providers>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
