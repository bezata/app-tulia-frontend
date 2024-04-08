'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ILendingData = {
  lending_id: string;
  wallet_address: string;
  coin: string;
  amount: number;
  created_at: string;
  type: 'lend';
};

export const columns: ColumnDef<ILendingData>[] = [
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
          <span>{row.original.coin}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'created_at',
    header: 'Date',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <Button
          size="sm"
          variant={'outline'}
          className="hover:bg-tulia_primary/30"
          onClick={() => {
            alert(`You clicked on row ${row.original.lending_id}`);
          }}
        >
          View
        </Button>
      );
    },
  },
];
