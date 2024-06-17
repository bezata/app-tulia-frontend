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
  //NOTE: state tutmak lazim direk variable ile tutamayiz.
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([
    {
      lending_id: '1',
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 100,
      interestRate: '%21',
      numericValue: '%21',
      repayment_period: '',
      loan_state: 1,
    },
    {
      lending_id: '2',
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 100,
      interestRate: '%21',
      numericValue: '%5.32',
      loan_state: 122,
      repayment_period: '',
    },
  ]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map(
        (detail, index): ILendingData => {
          const poolDetail = detail.result as unknown;
          console.log(detail.result);
          return {
            numericValue: (poolDetail as PoolDetail)?.numericValue,
            interestRate: (poolDetail as PoolDetail)?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
            coin: 'ETH',
            amount: Number((poolDetail as PoolDetail)?.loanAmount),
            repayment_period: (poolDetail as PoolDetail)?.repayment_period,
            loan_state: Number((poolDetail as PoolDetail)?.loan_state),
          };
        }
      );
      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount]);

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
      <div className="mb-4 flex items-center justify-between">
        <LendingReqModal />
        <h2 className="text-md font-light">
          All Lending Requests (Total: {Number(poolCount)})
        </h2>
      </div>

      <PeerToPeerTable columns={columns} data={filteredData} />
    </div>
  );
};

export default PeerToPeerPage;
