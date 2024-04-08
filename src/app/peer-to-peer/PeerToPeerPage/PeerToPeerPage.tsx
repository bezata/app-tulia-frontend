'use client';
import { PeerToPeerTable } from '@/components/PeerToPeerTable/PeerToPeerTable';
import { columns, ILendingData } from '@/components/PeerToPeerTable/columns';
import { setSection } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { HelpCircle, Landmark } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useGetAllPoolDetails, useGetTotalPoolCount } from '@/lens/lens';
import { PoolDetail } from './IPeerToPeer';
import LendingReqModal from '@/components/LendingReqModal/LendingReqModal';


const PeerToPeerPage = () => {
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);

  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map(
        (detail, index): ILendingData => {
          const poolDetail = detail.result as unknown;
          return {
            lending_id: (index + 1)?.toString(),
            wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
            coin: 'ETH',
            amount: Number((poolDetail as PoolDetail)?.loanAmount),
            created_at: new Date(
              Number((poolDetail as PoolDetail).creationTime) * 1000
            )
              ?.toISOString()
              .split('T')[0],
            type: 'lend',
          };
        }
      );
      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount]);

  React.useEffect(() => {
    if (totalPoolCount)
    setPoolCount(totalPoolCount);
  }, [totalPoolCount]);

  const { section } = useAppSelector(state => state.example);
  const [filteredData, setFilteredData] = React.useState<ILendingData[]>(data);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(setSection(null));
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (section === 'lend') {
      setFilteredData(data.filter((item: any) => item.type === 'lend'));
    } else {
      return setFilteredData(data);
    }
  }, [section, data]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-start border-b mb-4 p-2 border-tulia_primary/50">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Landmark className="w-4 h-4 inline-block mr-2" />
          Open Market Lending
        </h2>
        <p className="text-sm text-gray-500 mb-4 flex items-center">
          {/* TODO: DCSELEK: Guzel bir aciklama ? Tekin bakmali */}
          <HelpCircle className="w-4 h-4 inline-block mr-1" />
          This is the open market lending page.Here you can see all the lending
          requests.
        </p>
      </div>
      <div className='mb-4'>
      <LendingReqModal />
      </div>
      <h2 className="text-md font-light mb-4 ">
        All Lending Requests (Total: {totalPoolCount})
      </h2>

      <PeerToPeerTable columns={columns} data={filteredData} />
    </div>
  );
};

export default PeerToPeerPage;
