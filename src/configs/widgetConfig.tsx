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
import { useConnectModal } from '@rainbow-me/rainbowkit';

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
  const { config, onSuccess, className } = props;

  const walletConfig = useWidgetWalletConfig();

  const widgetConfig: WidgetConfig = useMemo(
    () => ({
      integrator: 'Tulia',
      walletConfig,
      variant: 'expandable',
      subvariant: 'default',
      hiddenUI: [HiddenUI.Appearance, HiddenUI.PoweredBy, HiddenUI.WalletMenu],
      containerStyle: {
        borderRadius: '16px',
        display: 'flex',
        maxWidth: 392,
        boxShadow: '14px 22px 48px rgba(125, 44, 197, 0.06)',
        backgroundColor: 'rgba(125, 44, 197, 0.06)',
      },

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
      },

      ...config,
    }),
    [config, walletConfig]
  );

  const widgetEvents = useWidgetEvents();

  useEffect(() => {
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      (route: { fromToken: Token; toToken: Token }) => {
        if (
          (!config?.toChain || route.toToken.chainId === config.toChain) &&
          (!config?.toToken ||
            route.toToken.address.toLowerCase() ===
              config.toToken.toLowerCase())
        ) {
          onSuccess?.();
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
      {isMounted && <LiFiWidget integrator="Tulia" config={widgetConfig} />}
    </div>
  );
};

const useWidgetWalletConfig = () => {
  const { openConnectModal } = useConnectModal();

  const walletConfig: WidgetWalletConfig = useMemo(
    () => ({
      onConnect: async () => {
        openConnectModal?.();
      },
    }),
    [openConnectModal]
  );

  return walletConfig;
};