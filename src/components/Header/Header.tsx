"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import IHeader from "./IHeader";
import ConnectButtonCustom from '@/components/ui/connectbutton';

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
    slug: '/aave',
  },
  {
    title: 'Docs',
    slug: 'https://www.linkedin.com/company/tulias/',
    target: '_blank',
  },
];

const Header = () => {
  return (
    <div className="w-full px-8 min-h-[5rem] py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center basis-1/12">
          {/* <Link href="/"> */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="cursor-pointer flex-shrink-0"
          />
          {/* </Link> */}
        </div>
        <div className="basis-9/12">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationMenuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    href={item.slug}
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
        <div className="basis-2/12 flex justify-end">
          <ConnectButtonCustom />
        </div>
      </div>
    </div>
  );
};

export default Header;
