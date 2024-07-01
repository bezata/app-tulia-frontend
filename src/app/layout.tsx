// /app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/configs/providersConfig';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Tulia Protocol - App</title>
        <meta
          name="description"
          content="Join the Tulia Protocol and revolutionize your crypto lending experience. Earn more, get rich, and change the DeFi ecosystem!"
        />
        <meta property="og:title" content="Tulia Protocol - App" />
        <meta
          property="og:description"
          content="Join the Tulia Protocol and revolutionize your crypto lending experience. Earn more, get rich, and change the DeFi ecosystem!"
        />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TuliaProtocol" />
        <meta name="twitter:title" content="Tulia Protocol - App" />
        <meta
          name="twitter:description"
          content="Join the Tulia Protocol and revolutionize your crypto lending experience. Earn more, get rich, and change the DeFi ecosystem!"
        />
        <meta name="twitter:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
