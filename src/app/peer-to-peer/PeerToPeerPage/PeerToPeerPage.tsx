'use client';
import { PeerToPeerTable } from '@/components/PeerToPeerTable/PeerToPeerTable';
import { columns } from '@/components/PeerToPeerTable/columns';
import SectionSelector from '@/components/SectionSelector/SectionSelector';
import { setExample } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react';

const PeerToPeerPage = ({ data }: { data: any }) => {
  const example = useAppSelector(state => state.example.example);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setExample('ciguli deneme'));
  }, []);

  React.useEffect(() => {
    console.log(example);
  }, [example]);

  return (
    <div className="container mx-auto py-10">
      <SectionSelector />
      <h1 className="text-3xl font-bold mb-5">Loan Request</h1>
      <PeerToPeerTable columns={columns} data={data} />
    </div>
  );
};

export default PeerToPeerPage;
