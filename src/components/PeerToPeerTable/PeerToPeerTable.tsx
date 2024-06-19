'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import { useAccount } from 'wagmi';
import { Wallet } from 'lucide-react';
import React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PeerToPeerTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sort, setSort] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSort,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sort,
    },
  });

  const account = useAccount();

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader className="bg-tulia_primary">
          {account.status === 'disconnected' && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-12 text-center">
                Please connect your wallet to continue.
              </TableCell>
            </TableRow>
          )}
          {account.status === 'connected' &&
            table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {account.status === 'disconnected' && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-48 text-center flex flex-col justify-center items-center"
              >
                <Wallet className="w-48 h-48 text-tulia_primary/50" />
                <span className="text-3xl font-bold">Connect your wallet</span>
                <span className="text-sm text-gray-400">
                  To continue, connect your wallet
                </span>
              </TableCell>
            </TableRow>
          )}
          {account.status === 'connected' &&
            (table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`${row.original as { type: 'lend' | null }} hover:bg-tulia_primary/30 transition-colors ease-in-out duration-200`}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
