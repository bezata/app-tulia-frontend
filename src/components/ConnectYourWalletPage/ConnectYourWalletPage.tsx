import { Wallet } from 'lucide-react';
import React from 'react';

/**
 * @description if you didn't connect your wallet, this page will be shown
 */
const ConnectYourWalletPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-4rem)]">
      <Wallet className="w-48 h-48 text-tulia_primary/50" />
      <span className="text-3xl font-bold">Connect your wallet</span>
      <span className="text-sm text-gray-400">
        To continue, connect your wallet
      </span>
    </div>
  );
};

export default ConnectYourWalletPage;
