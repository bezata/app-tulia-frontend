'use client';

import * as React from 'react';

import { arbitrumSepolia, mainnet, polygonMumbai } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { emailConnector } from '@web3modal/wagmi';

export const projectId = '324e2728ed801218ac607add76f0283e';
export const chains = [mainnet, arbitrumSepolia, polygonMumbai] as const;

const metadata = {
  name: 'Tulia',
  description: 'Decentralized Personalized Lending Protocol',
  url: 'https://app.tulia.finance',
  icons: ['https://i.ibb.co/wCBw94b/logo2-1.png'],
};

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrumSepolia, polygonMumbai],
  transports: {
    [mainnet.id]: http(),
    [arbitrumSepolia.id]: http(),
    [polygonMumbai.id]: http('https://polygon-mumbai-bor-rpc.publicnode.com'),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    emailConnector({ chains, options: { projectId } }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
});

createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
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
