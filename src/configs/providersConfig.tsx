'use client';

import * as React from 'react';

import { arbitrumSepolia, mainnet, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { siweConfig } from '../configs/siweConfig';

export const projectId = `${process.env.NEXT_PUBLIC_PROJECT_ID}`;
export const chains = [mainnet, arbitrumSepolia, polygon] as const;

const metadata = {
  name: 'Tulia',
  description: 'Decentralized Personalized Lending Protocol',
  url: 'https://airdrop.tulia.finance',
  icons: ['https://i.ibb.co/wCBw94b/logo2-1.png'],
};

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrumSepolia],
  transports: {
    [mainnet.id]: http(),
    [arbitrumSepolia.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
});

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  siweConfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  allowUnsupportedChain: true,
  defaultChain: arbitrumSepolia,
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
