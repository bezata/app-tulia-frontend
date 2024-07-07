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
import { parseEther, parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import { BulkMinterABI } from '@/lens/abi/BulkMinter';

const CustomConnectButton = () => {
  const { open } = useWeb3Modal();
  const account = useAccount();
  const { writeContract, data: mintAllHash } = useWriteContract();
  const [connected, setConnected] = useState(false);

  const handleGetTestTokens = () => {
    const tokenGweiAmount = parseEther('100');
    const mintAmount = Array(6).fill(tokenGweiAmount);

    writeContract({
      abi: BulkMinterABI,
      address: '0x351a05e30621Ffda54199B083C6c5c53C81153D1' as any,
      functionName: 'mintAll',
      args: [mintAmount],
    });

    return mintAllHash;
  };

  const navigationMenuItems: IHeader.INavigation[] = [
    {
      title: 'Get Test Tokens',
      onClick: handleGetTestTokens,
      type: 'function',
    },
    {
      title: 'My Pools',
      slug: '/mypools',
      type: 'link',
    },
  ];

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
                  {item.type === 'link' ? (
                    <Link
                      href={item.slug!}
                      target={item?.target}
                      className={`${navigationMenuTriggerStyle()} duration-500 flex`}
                    >
                      {item.title}
                    </Link>
                  ) : item.type === 'function' ? (
                    <button
                      onClick={item.onClick}
                      className={`${navigationMenuTriggerStyle()} duration-500 flex`}
                    >
                      {item.title}
                    </button>
                  ) : null}
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
