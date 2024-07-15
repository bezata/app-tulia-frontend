'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
import { Providers } from '@/configs/providersConfig';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

const defaultSEO = {
  title: 'Tulia Protocol - App',
  description:
    'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms. Create and manage your own lending pools, earn pre-loan interest, and customize your investment strategy. Dive into our secure, user-driven ecosystem, and leverage cutting-edge features like ERC-4626 compliance and multi-model interest rates. Join Tulia on testnet today and transform how you lend and earn.',
  url: 'https://app.tulia.finance',
  image: '/logo.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const { title, description, url, image } = defaultSEO;
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', url);
    document
      .querySelector('meta[property="og:image"]')
      ?.setAttribute('content', image);
    document
      .querySelector('meta[name="twitter:card"]')
      ?.setAttribute('content', 'summary_large_image');

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: title,
      url: url,
    };

    // Narrowing the type of the script element
    let script = document.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(ldJson);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="description" content={defaultSEO.description} />
        <meta property="og:title" content={defaultSEO.title} />
        <meta property="og:description" content={defaultSEO.description} />
        <meta property="og:url" content={defaultSEO.url} />
        <meta property="og:image" content={defaultSEO.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
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
