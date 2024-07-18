'use client';

import * as React from 'react';

import {
  arbitrumSepolia,
  holesky,
  optimismSepolia,
  polygonAmoy,
  baseSepolia,
  bscTestnet,
  avalancheFuji,
  mainnet,
  polygon,
  bsc,
  arbitrum,
  optimism,
} from 'wagmi/chains';
import { createClient } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { siweConfig } from '../configs/siweConfig';
import { Chain } from 'wagmi/chains';

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const projectId = `${process.env.NEXT_PUBLIC_PROJECT_ID}`;
export const chains: Chain[] = [
  arbitrumSepolia,
  holesky,
  optimismSepolia,
  polygonAmoy,
  baseSepolia,
  bscTestnet,
  avalancheFuji,
  mainnet,
  polygon,
  bsc,
  arbitrum,
  optimism
] as const;

const metadata = {
  name: 'Tulia',
  description: 'Decentralized Personalized Lending Protocol',
  url: 'https://airdrop.tulia.finance',
  icons: ['https://i.ibb.co/wCBw94b/logo2-1.png'],
};

export const wagmiConfig = createConfig({
  chains: [chains[0], ...chains.slice(1)],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  ssr: false,
});
 
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  siweConfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  allowUnsupportedChain: true,

});

if (!projectId) throw new Error('Project ID is not defined');

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
