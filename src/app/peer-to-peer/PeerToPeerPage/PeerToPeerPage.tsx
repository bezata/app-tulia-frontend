'use client';
import { PeerToPeerTable } from '@/components/PeerToPeerTable/PeerToPeerTable';
import { columns } from '@/components/PeerToPeerTable/columns';
import React from 'react';

const PeerToPeerPage = ({ data }: { data: any }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Loan Request</h1>
      <PeerToPeerTable columns={columns} data={data} />
    </div>
  );
};

export default PeerToPeerPage;
