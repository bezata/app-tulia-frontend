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
import Image from 'next/image';
import { formatEther } from 'viem';
import { useGetLoanState, useGetFlashPoolLoanState } from '@/lens/lens';
import React from 'react';

export enum PoolState {
  Active = 'Active',
  Pending = 'Pending',
  Funded = 'Funded',
  Closed = 'Closed',
  Defaulted = 'Defaulted',
  Repaid = 'Repaid',
}
export enum InterestModal {
  Simple = 'Simple',
  Compound = 'Compound',
  FlashLoan = 'Flash Loan',
  MarketBased = 'Market Based',
}

export type IPoolsdata = {
  lending_id: string;
  wallet_address: string;
  Token: string;
  borrowTokenName: string;
  amount: number;
  loan_state: string;
  interestRate: bigint;
  numericValue: number | undefined;
  interest_modal: InterestModal;
  pool_state: PoolState;
  repaymentPeriod: bigint;
  loanToken: string;
  borrowToken: string;
  pool: string;
  repaymentCurrencyAddress: string;
  loanCurrencyAddress: string;
  type: number;
  borrower: string;
  vault: string;
  poolType: number;
};

const LoanStateCell: React.FC<{ pool: string; poolType: number }> = ({
  pool,
  poolType,
}) => {
  const loanState = useGetLoanState(pool);
  const flashLoanState = useGetFlashPoolLoanState(pool);

  let displayState = '';

  if (poolType === 1) {
    switch (flashLoanState) {
      case 1:
        displayState = 'Active';
        break;
      case 2:
        displayState = 'Closed';
        break;
      default:
        displayState = 'Uninitialized';
    }
  } else {
    switch (loanState) {
      case 1:
        displayState = 'Active';
        break;
      case 0:
        displayState = 'Pending';
        break;
      case 2:
        displayState = 'Funded';
        break;
      case 6:
        displayState = 'Closed';
        break;
      case 4:
        displayState = 'Defaulted';
        break;
      case 5:
        displayState = 'Repaid';
        break;
      default:
        displayState = 'Pending';
    }
  }

  return <span>{displayState}</span>;
};

export default LoanStateCell;

export const columns: ColumnDef<IPoolsdata>[] = [
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
        <div className="flex items-center ">
          <div>
            <span>{row.original.wallet_address}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'loanToken',
    header: 'Loan Token',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {row.original.loanToken === 'ETH' && (
            <EthIcon width={24} height={24} />
          )}
          {row.original.loanToken === 'BTC' && (
            <BtcIcon width={24} height={24} />
          )}
          {row.original.loanToken === 'USDC' && (
            <USDCIcon width={24} height={24} />
          )}
          {row.original.loanToken === 'ARB' && (
            <ArbIcon width={24} height={24} />
          )}
          {row.original.loanToken === 'DAI' && (
            <DaiIcon width={24} height={24} />
          )}
          {row.original.loanToken === 'UNI' && (
            <UniIcon width={24} height={24} />
          )}
          <span>{row.original.loanToken}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'borrowToken',
    header: 'Borrow Token',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {row.original.borrowToken === 'ETH' && (
            <EthIcon width={24} height={24} />
          )}
          {row.original.borrowToken === 'BTC' && (
            <BtcIcon width={24} height={24} />
          )}
          {row.original.borrowToken === 'USDC' && (
            <USDCIcon width={24} height={24} />
          )}
          {row.original.borrowToken === 'ARB' && (
            <ArbIcon width={24} height={24} />
          )}
          {row.original.borrowToken === 'DAI' && (
            <DaiIcon width={24} height={24} />
          )}
          {row.original.borrowToken === 'UNI' && (
            <UniIcon width={24} height={24} />
          )}
          <span>{row.original.borrowToken}</span>
        </div>
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
          <div className="px-3  ml-9">
            <span>{`${String(row.original.interestRate)} %`}</span>
          </div>
          <div className="flex px-3  ml-4 ">
            <span className="text-purple-400 flex  px-1 items-center min-w-16 w-16 border text-xs border-white/[0.2] bg-transparent  rounded-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="flex"
              />
              {`${String(row.original.numericValue)}%`}
            </span>
          </div>
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
          {formatEther(BigInt(row.original.amount))} {row.original.Token}
        </p>
      );
    },
  },
  {
    accessorKey: 'repaymentPeriod',
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
      // If poolType is 1, directly return "Flash Loan"
      if (row.original.poolType === 1) {
        return (
          <div className="flex items-center ml-12">
            <span>-</span>
          </div>
        );
      }

      // Calculate the repayment period in days if poolType is not 1
      const repaymentPeriodInDays =
        Number(row.original.repaymentPeriod) / 86400;
      let displayRepaymentPeriod = repaymentPeriodInDays.toFixed(2);

      if (displayRepaymentPeriod.endsWith('.00')) {
        displayRepaymentPeriod = repaymentPeriodInDays.toFixed(0);
      } else if (displayRepaymentPeriod.endsWith('0')) {
        displayRepaymentPeriod = repaymentPeriodInDays.toFixed(1);
      }

      return (
        <div className="flex items-center ml-12">
          <span>
            {displayRepaymentPeriod} day
            {displayRepaymentPeriod !== '1' ? 's' : ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'interest_modal',
    header: 'Interest Modal',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.poolType === 1 ? 'Flash Loan' : 'Simple'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'loan_state',
    header: 'Loan State',
    cell: ({ row }) => {
      return (
        <div className="flex items-center ">
          <LoanStateCell
            pool={row.original.pool}
            poolType={row.original.poolType}
          />
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
