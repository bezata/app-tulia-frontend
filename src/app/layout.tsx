'use client';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';
import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/configs/providersConfig';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

const defaultSEO = {
  title: 'Tulia Protocol - App',
  description:
    'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms. Create and manage your own lending pools, earn pre-loan interest, and customize your investment strategy. Dive into our secure, user-driven ecosystem, and leverage cutting-edge features like ERC-4626 compliance and multi-model interest rates. Join Tulia on testnet today and transform how you lend and earn.',
  url: 'https://app.tulia.finance',
  image: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{defaultSEO.title}</title>
        <meta name="description" content={defaultSEO.description} />
        <meta property="og:title" content={defaultSEO.title} />
        <meta property="og:description" content={defaultSEO.description} />
        <meta property="og:url" content={defaultSEO.url} />
        <meta property="og:image" content={defaultSEO.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/logo.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: defaultSEO.title,
              url: defaultSEO.url,
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <StoreProvider>
            <Providers>
              <MainLayout>
                {children}
                <GoogleAnalytics gaId="G-MK95TFT1EJ" />
              </MainLayout>
              <Toaster />
            </Providers>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
