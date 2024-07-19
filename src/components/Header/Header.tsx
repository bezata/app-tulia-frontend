'use client';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import Image from 'next/image';
import IHeader from './IHeader';
import CustomConnectButton from '@/components/ConnectButton/ConnectButton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import { MenuIcon } from 'lucide-react';
// import SocialAuth from '../ConnectButton/SocialAuth';

const navigationMenuItems: IHeader.INavigation[] = [
  {
    title: 'Swap',
    slug: '/',
  },
  {
    title: 'Open Market Lending',
    slug: '/peer-to-peer',
  },
  {
    title: 'Decentralized Lending',
    slug: '/tulialend',
  },
  {
    title: 'Docs',
    slug: 'https://www.linkedin.com/company/tulias/',
    target: '_blank',
  },
  {
    title: 'Airdrop',
    slug: 'https://airdrop.tulia.finance/',
    target: '_blank',
  },
];

const Header = () => {
  return (
    <div className="w-full px-8 min-h-[5rem] py-2 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center basis-1/12">
          {/* <Link href="/"> */}
          <Drawer>
            <DrawerTrigger className="lg:hidden block">
              <MenuIcon size={24} />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="mx-auto">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="cursor-pointer flex-shrink-0"
                  />
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  Tulia - Discover our planet with a new perspective
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="w-full items-center">
                <NavigationMenu orientation="vertical">
                  <NavigationMenuList className="flex flex-col items-center justify-center w-full gap-2 -mt-6">
                    {navigationMenuItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <Link
                          href={item.slug || ''}
                          target={item?.target}
                          className={`${navigationMenuTriggerStyle()} duration-500 px-5 `}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Image
            src="/logo.png"
            alt="Logo"
            width={64}
            height={64}
            className="cursor-pointer flex-shrink-0 hidden lg:block"
          />
          {/* </Link> */}
        </div>
        <div className="basis-10/12 lg:hidden flex items-center justify-left flex-1">
          <Link href="https://tulia.finance/" target="_blank">
            <Image
              src="/logo.png"
              alt="Tulia"
              width={64}
              height={64}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="basis-10/12 hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationMenuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    href={item.slug || ''}
                    target={item?.target}
                    className={`${navigationMenuTriggerStyle()} duration-500 px-5`}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="basis-1/12 flex justify-end">
          <CustomConnectButton />
          {/* Will be used on testnet */}
          {/* <SocialAuth /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
