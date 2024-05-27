'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import IHeader from '../Header/IHeader';
const navigationMenuItems: IHeader.INavigation[] = [
  {
    title: 'Mypools',
    slug: '/mypools',
  },
];
const CustomConnectButton = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton.Custom>
        {({ account, chain, mounted }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <Button
                      variant={'outline'}
                      className="hover:bg-violet-500/30"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button
                      variant={'outline'}
                      className="hover:bg-violet-500/30"
                      onClick={openChainModal}
                      type="button"
                    >
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 9 }}>
                    <NavigationMenu>
                      <NavigationMenuList>
                        {navigationMenuItems.map((item, index) => (
                          <NavigationMenuItem key={index}>
                            <Link
                              href={item.slug}
                              target={item?.target}
                              className={`${navigationMenuTriggerStyle()} duration-500 flex`}
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                    <Button
                      variant={'outline'}
                      className="hover:bg-violet-500/30"
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button
                      variant={'outline'}
                      className="hover:bg-violet-500/30"
                      onClick={openAccountModal}
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default CustomConnectButton;
