'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useAccount } from 'wagmi';
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
  const { open } = useWeb3Modal();
  const account = useAccount();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (account.status === 'connected') {
      setConnected(true);
    }
    if (account.status === 'disconnected') {
      setConnected(false);
    }
  }, [account?.status]);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', padding: 12 }}
    >
      {!connected ? (
        <Button
          variant={'outline'}
          className="hover:bg-violet-500/30 text-white"
          onClick={() => open({ view: 'Connect' })}
        >
          Connect Wallet
        </Button>
      ) : (
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
          <w3m-account-button />
        </div>
      )}
    </div>
  );
};

export default CustomConnectButton;
