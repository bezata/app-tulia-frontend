import { Wallet } from 'lucide-react';
import React from 'react';
import Metamask from '../../../public/Metamask.svg';
import Image from 'next/image';

/**
 * @description if you didn't connect your wallet, this page will be shown
 */
const ConnectYourWalletPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)]">
      <Image className="w-48 h-48" src={Metamask} alt="Metamask Logo" />
      <span className="text-3xl font-bold">Connect your wallet</span>
      <span className="text-sm text-gray-400">to continue</span>
    </div>
  );
};

export default ConnectYourWalletPage;
