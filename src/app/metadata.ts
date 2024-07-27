// app/metadata.ts
import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: 'Tulia Protocol - App',
  description: 'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms. Create and manage your own lending pools, earn pre-loan interest, and customize your investment strategy.',
  metadataBase: new URL('https://app.tulia.finance'),
  openGraph: {
    title: 'Tulia Protocol - App',
    description: 'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms.',
    url: 'https://app.tulia.finance',
    siteName: 'Tulia Protocol',
    images: [
      {
        url: 'https://app.tulia.finance/og-image.jpg', // Replace with your actual OG image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tulia Protocol - App',
    description: 'Experience the future of DeFi with Tulia Protocol — a unique peer-to-peer lending platform where you control the terms.',
    images: ['https://app.tulia.finance/twitter-image.jpg'], // Replace with your actual Twitter image
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
};