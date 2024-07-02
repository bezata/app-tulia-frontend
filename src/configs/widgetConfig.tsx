'use client';
import {
  LiFiWidget,
  useWidgetEvents,
  WidgetConfig,
  WidgetEvent,
  WidgetWalletConfig,
  HiddenUI,
} from '@lifi/widget';
import { useEffect, useMemo, useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

interface Token {
  chainId: number;
  address: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
}

export interface SwapWidgetProps {
  config?: Omit<
    WidgetConfig,
    | 'integrator'
    | 'chains'
    | 'tokens'
    | 'walletConfig'
    | 'variant'
    | 'subvariant'
    | 'containerStyle'
  >;
  onSuccess?: () => void;
  className?: string;
}

export const TuliaSwap = (props: SwapWidgetProps) => {
  const { data: session } = useSession();
  const { config, onSuccess, className } = props;
  const account = useAccount();
  const walletConfig = useWidgetWalletConfig();

  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: 'tuliaprotocol',
      align: 'center',
      walletConfig,
      variant: 'wide',
      subvariant: 'default',
      hiddenUI: [HiddenUI.Appearance, HiddenUI.PoweredBy, HiddenUI.WalletMenu],
      fee: 0.002,
      components: {
        MuiAppBar: { root: { backgroundColor: 'rgba(125, 44, 197, 0.06)' } },
        MuiButton: { root: { borderRadius: 30 } },
        MuiCard: { root: { borderRadius: 16 } },
        MuiInputCard: { root: { borderRadius: 16 } },
        MuiTabs: { root: { borderRadius: 16 } },
      },
      appearance: 'dark',
      theme: {
        palette: {
          primary: { main: 'rgb(24,3,73)' }, //BUTTONS
          secondary: { main: 'rgba(125, 44, 197, 0.06)' },
          background: {
            paper: '#66000000', // INSIDE THE BOXES
            default: '#66000000', // OUTSIDE THE BOXES
          },
          grey: { 800: '#180349' },
        },
        shape: {},
        typography: {},
        container: {
          borderRadius: '16px',
          display: 'flex',
          maxWidth: 400,
          boxShadow: '14px 22px 48px rgba(125, 44, 197, 0.06)',
          backgroundColor: 'rgba(125, 44, 197, 0.06)',
        },
      },

      ...config,
    }),
    [config, walletConfig]
  );

  const widgetEvents = useWidgetEvents();

  const storeTransaction = async (route: { fromAmountUSD: string }) => {
    try {
      const response = await fetch('/api/store-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account?.address,
          fromAmountUSD: route.fromAmountUSD,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to store transaction');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  useEffect(() => {
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      (route: {
        fromToken: Token;
        toToken: Token;
        fromAmountUSD: string;
        toAmountUSD: string;
      }) => {
        if (
          (!config?.toChain || route.toToken.chainId === config.toChain) &&
          (!config?.toToken ||
            route.toToken.address.toLowerCase() ===
              config.toToken.toLowerCase())
        ) {
          onSuccess?.();
          storeTransaction(route);
        }
      }
    );

    return () => widgetEvents.all.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetEvents]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className={className}>
      {isMounted && (
        <LiFiWidget integrator="tuliaprotocol" config={widgetConfig} />
      )}
    </div>
  );
};

const useWidgetWalletConfig = () => {
  const { open } = useWeb3Modal();

  const walletConfig: WidgetWalletConfig = useMemo(
    () => ({
      onConnect: async () => {
        open?.();
      },
    }),
    [open]
  );

  return walletConfig;
};
