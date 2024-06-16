'use client';
import { MyPoolsTable } from '@/components/MyPoolsTable/MyPoolsTable';
import {
  columns,
  InterestModal,
  IPoolsdata,
  PoolState,
} from '@/components/MyPoolsTable/columns';
import { useAppDispatch } from '@/lib/hooks';
import { HelpCircle, Landmark, MoveLeft } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { useGetAllPoolDetails, useGetTotalPoolCount } from '@/lens/lens';
import { PoolDetail } from './IMyPools';
import ChooseSectionCard from '@/components/ChooseSectionCard/ChooseSectionCard';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import ConnectYourWalletPage from '@/components/ConnectYourWalletPage/ConnectYourWalletPage';

const MyPoolspage = () => {
  const account = useAccount();
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<IPoolsdata[]>([
    {
      lending_id: Math.random().toString(),
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-10-10',
      type: 1,
      state: PoolState.Defaulted,
      interest_modal: InterestModal.FlashLoan,
    },
    {
      lending_id: Math.random().toString(),
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 200,
      created_at: '2022-10-10',
      type: 1,
      state: PoolState.Defaulted,
      interest_modal: InterestModal.Simple,
    },
    {
      lending_id: '2',
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-10-10',
      type: 2,
      state: PoolState.Active,
      interest_modal: InterestModal.FlashLoan,
    },
  ]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  const [poolSection, setPoolSection] = useState<'lend' | 'borrow' | null>(
    null
  );

  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map((detail, index): IPoolsdata => {
        const poolDetail = detail.result as unknown as PoolDetail;
        console.log(detail.result);
        return {
          lending_id: (index + 1).toString(),
          wallet_address: poolDetail.lender.slice(0, 7),
          coin: 'ETH',
          amount: Number(poolDetail.loanAmount),
          created_at: new Date().toISOString().split('T')[0],
          type: Number(poolDetail.interestRate),
          state: PoolState.Active,
          interest_modal: InterestModal.Simple,
        };
      });
      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount]);
  
  const [filteredData, setFilteredData] = React.useState<IPoolsdata[]>(data);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    return () => {
      setPoolSection(null);
    };
  }, []);

  React.useEffect(() => {
    if (poolSection === 'lend') {
      setFilteredData(data.filter((item: any) => item.type === 2));
    } else {
      return setFilteredData(data.filter((item: any) => item.type === 1));
    }
  }, [poolSection, data]);

  if (account.status === 'disconnected') {
    return <ConnectYourWalletPage />;
  }

  if (account.status === 'connected') {
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

        {/* Back to card button */}
        {!poolSection && (
          <div className="grid grid-cols-12 gap-8">
            <ChooseSectionCard
              positionTitle="Your Lend Pools"
              positionDescription="You can see the lend pools"
              section="lend"
              setSection={(section: 'lend' | 'borrow') =>
                setPoolSection(section)
              }
            />
            <ChooseSectionCard
              positionTitle="Your Borrow Pools"
              positionDescription="You can see the borrow pools"
              section="borrow"
              setSection={(section: 'lend' | 'borrow') =>
                setPoolSection(section)
              }
            />
          </div>
        )}
        {poolSection && (
          <>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setPoolSection(null)}
                className="tulia_main_button mt-2 mb-4"
              >
                <MoveLeft className="w-4 h-4 mr-2" />
                <span className="mr-2">Back to section selection</span>
              </Button>
              <h2 className="text-md font-light mb-4 ">
                All Pools (Total: {Number(filteredData.length)})
              </h2>{' '}
            </div>
            <MyPoolsTable columns={columns} data={filteredData} />
          </>
        )}
      </div>
    );
  }
};

export default MyPoolspage;
