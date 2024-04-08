'use client';
import React, { useEffect, useState } from 'react';
import PeerToPeerPage from './PeerToPeerPage/PeerToPeerPage';
import { ILendingData } from '@/components/PeerToPeerTable/columns';
import { useGetAllPoolDetails, useGetTotalPoolCount } from '@/lens/lens';

interface PoolDetail {
  lender: string;
  loanAmount: bigint;
  creationTime: bigint;
}

const Page: React.FC = () => {
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([]);
  const totalPoolCount = useGetTotalPoolCount();

  useEffect(() => {
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

  return <PeerToPeerPage data={data} />;
};

export default Page;
