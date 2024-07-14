'use client';

import { TuliaSwap } from '@/configs/widgetConfig';
import Head from 'next/head';

export default function Home() {
  return (
    <>
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
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-12rem)]">
        <div className="pt-8 sm:pt-22">
          <TuliaSwap />
        </div>
      </div>
    </>
  );
}
