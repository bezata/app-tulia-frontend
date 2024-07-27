// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import ClientLayout from '@/app/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tulia Protocol - App',
  description:
    'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms. Create and manage your own lending pools, earn pre-loan interest, and customize your investment strategy.',
  metadataBase: new URL('https://app.tulia.finance'),
  keywords: [
    'Tulia Protocol',
    'DeFi',
    'decentralized finance',
    'peer-to-peer lending',
    'crypto lending',
    'lending pools',
    'customized interest rates',
    'blockchain',
    'cryptocurrency',
    'yield farming',
    'liquidity pools',
    'Arbitrum',
    'Ethereum',
    'smart contracts',
    'ERC-4626',
    'multi-model interest rates',
    'pre-loan interest',
    'investment strategy',
    'decentralized lending platform',
  ],
  openGraph: {
    title: 'Tulia Protocol - App',
    description:
      'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms.',
    url: 'https://app.tulia.finance',
    siteName: 'Tulia Protocol',
    images: [
      {
        url: 'https://app.tulia.finance/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tulia Protocol - App',
    description:
      'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms.',
    images: ['https://app.tulia.finance/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.ico',
    shortcut: '/logo.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
