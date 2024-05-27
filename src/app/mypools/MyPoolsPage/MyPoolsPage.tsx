'use client';
import { MyPoolsTable } from '@/components/MyPoolsTable/MyPoolsTable';
import { columns, IPoolsdata } from '@/components/MyPoolsTable/columns';
import { setSection } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { HelpCircle, Landmark } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useGetAllPoolDetails, useGetTotalPoolCount } from '@/lens/lens';
import { PoolDetail } from './IMyPools';

const MyPoolspage = () => {
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<IPoolsdata[]>([]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map((detail, index): IPoolsdata => {
        const poolDetail = detail.result as unknown;
        console.log(detail.result);
        return {
          lending_id: (index + 1)?.toString(),
          wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
          coin: 'ETH',
          amount: Number((poolDetail as PoolDetail)?.loanAmount),
          created_at: new Date()?.toISOString().split('T')[0],
          type: Number((poolDetail as PoolDetail)?.interestRate),
        };
      });
      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount]);

  const { section } = useAppSelector(state => state.example);
  const [filteredData, setFilteredData] = React.useState<IPoolsdata[]>(data);
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
          My Pools
        </h2>
        <p className="text-sm text-gray-500 mb-4 flex items-center">
          {/* TODO: DCSELEK: Guzel bir aciklama ? Tekin bakmali */}
          <HelpCircle className="w-4 h-4 inline-block mr-1" />
          You can see the pools you have created here.
        </p>
      </div>

      <h2 className="text-md font-light mb-4 ">
        All Pools (Total: {Number(poolCount)})
      </h2>

      <MyPoolsTable columns={columns} data={filteredData} />
    </div>
  );
};

export default MyPoolspage;
