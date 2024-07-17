import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { ExternalLink, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useChainId } from 'wagmi';

interface TransactionProcessModalProps {
  hash: `0x${string}` | undefined;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

const blockExplorers: { [key: number]: string } = {
  421614: 'https://sepolia.arbiscan.io/tx/',
  17000: 'https://holesky.etherscan.io/tx/',
  43113: 'https://testnet.snowtrace.io/tx/',
  80002: 'https://www.oklink.com/tr/amoy/tx/',
  11155420: 'https://sepolia-optimism.etherscan.io/tx/',
  84532: 'https://sepolia.basescan.org/tx/',
  97: 'https://testnet.bscscan.com/tx/',
};

const TransactionProcessModal: React.FC<TransactionProcessModalProps> = ({
  hash,
  setOpen,
  open,
}: TransactionProcessModalProps) => {
  const chainID = useChainId();
  const explorerURL = blockExplorers[chainID] || 'https://etherscan.io/tx/';

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent withoutClose={true}>
          <DialogHeader>
            <DialogTitle>Transaction Process</DialogTitle>
            <DialogDescription>
              Please wait while we process your transaction.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center pt-8">
            <p className="text-gray-400 text-center flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-loader-2 animate-spin stroke-primary/50"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
              Transaction is being processed
            </p>
            <Link
              href={`${explorerURL}${hash}`}
              target="_blank"
              className="mt-4 flex items-center gap-2"
            >
              <p className="text-blue-400 hover:underline transition-all underline-offset-2 text-center py-4 flex items-center gap-2">
                View on Block Explorer <ExternalLink size={16} />
              </p>
              <p className="text-gray-400 text-sm">{hash?.slice(0, 20)}</p>
            </Link>
            <Link href="/mypools" className="w-full">
              <Button className="capitalize tulia_main_button mt-4 w-full">
                Go to My Pools <Send size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TransactionProcessModal;
