'use client';

import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/configs/providersConfig';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import StructuredData from '@/components/StructuredData/StructuredData';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <StoreProvider>
        <Providers>
          <MainLayout>
            {children}
            <GoogleAnalytics gaId="G-MK95TFT1EJ" />
            <StructuredData />
          </MainLayout>
          <Toaster />
        </Providers>
      </StoreProvider>
    </SessionProvider>
  );
}
