'use client';

import { ColumnDef } from '@tanstack/react-table';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';
import PoolsViewModal from '../PoolsViewModal/PoolsViewModal';
import USDCIcon from '../../../public/USDCIcon';
import ArbIcon from '../../../public/ArbIcon';
import DaiIcon from '../../../public/DaiIcon';
import UniIcon from '../../../public/UniIcon';
import BorrowViewModal from '../PoolsViewModal/BorrowViewModal/BorrowViewModal';
import LendViewModal from '../PoolsViewModal/LendViewModal/LendViewModal';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

export enum PoolState {
  Active = 'Active',
  Pending = 'Pending',
  Closed = 'Closed',
  Defaulted = 'Defaulted',
}
export enum InterestModal {
  Simple = 'Simple',
  Compound = 'Compound',
  FlashLoan = 'Flash Loan',
  MarketBased = 'Market Based',
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IPoolsdata = {
  lending_id: string;
  wallet_address: string;
  coin: string;
  amount: number;
  created_at: string;
  type: number;
  state: PoolState;
  interest_modal: InterestModal;
  loan_state: PoolState;
};

export const columns: ColumnDef<IPoolsdata>[] = [
  {
    accessorKey: 'lending_id',
    header: 'Loan ID',
  },
  {
    accessorKey: 'wallet_address',
    header: 'Wallet Address',
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
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-transparent"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-gray-400 text-left ml-4">
          {new Date(row.original.created_at).toDateString()}
        </p>
      );
    },
  },
  {
    accessorKey: 'interest_modal',
    header: 'Interest Modal',
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
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return row.original.type === 1 ? (
        <BorrowViewModal row={row} />
      ) : (
        <LendViewModal row={row} />
      );
    },
  },
];
