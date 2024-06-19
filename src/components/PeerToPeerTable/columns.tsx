'use client';

import { ColumnDef } from '@tanstack/react-table';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';
import LendingViewModal from '../LendingViewModal/LendingViewModal';
import USDCIcon from '../../../public/USDCIcon';
import ArbIcon from '../../../public/ArbIcon';
import DaiIcon from '../../../public/DaiIcon';
import UniIcon from '../../../public/UniIcon';
import { Button } from '../ui/button';
import Image from 'next/image';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ILendingData = {
  lending_id: string;
  wallet_address: string;
  coin: string;
  amount: number;
  loan_state: number;
  interestRate: string;
  numericValue: string;
  repayment_period: string;
};

export const columns: ColumnDef<ILendingData>[] = [
  {
    accessorKey: 'lending_id',
    header: 'Loan ID',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <div>
            <span>{row.original.lending_id}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'wallet_address',
    header: 'Wallet Address',
    cell: ({ row }) => {
      return (
        <div className="flex items-center ml-4">
          <div>
            <span>{row.original.wallet_address}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'coin',
    header: 'Coin',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.original.coin === 'ETH' && <EthIcon width={24} height={24} />}
          {row.original.coin === 'BTC' && <BtcIcon width={24} height={24} />}
          {row.original.coin === 'TUL' && <BtcIcon width={24} height={24} />}
          {row.original.coin === 'USDC' && <USDCIcon width={24} height={24} />}
          {row.original.coin === 'ARB' && <ArbIcon width={24} height={24} />}
          {row.original.coin === 'DAI' && <DaiIcon width={24} height={24} />}
          {row.original.coin === 'UNI' && <UniIcon width={24} height={24} />}
          <span>{row.original.coin}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-gray-400 text-left ml-4">
          {row.original.amount} {row.original.coin}
        </p>
      );
    },
  },
  {
    accessorKey: 'interestRate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Interest Rate
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2  ">
          <div className="px-3  ml-4">
            <span>{row.original.interestRate}</span>
          </div>
          <div className="flex px-3  ml-4 ">
            <span className=" flex  px-1 items-center min-w-16 w-16 border text-xs border-white/[0.2] bg-transparent  rounded-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="flex"
              />
              {row.original.numericValue}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'loan_state',
    header: 'Loan State',
    cell: ({ row }) => {
      return (
        <div className="flex items-center ml-4">
          <div>
            <span>{row.original.loan_state}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'repayment_period',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Repayment Period
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center ml-4">
          <div>
            <span>{row.original.repayment_period}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <LendingViewModal row={row} />;
    },
  },
];
