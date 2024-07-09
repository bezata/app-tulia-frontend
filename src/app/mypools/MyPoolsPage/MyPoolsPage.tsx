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
import React, { useState, useEffect } from 'react';
import {
  useGetTotalPoolCount,
  useCalculateRewardApy,
  useGetAllLenderPoolDetails,
  useGetAllBorrowerPoolDetails,
} from '@/lens/lens';
import { PoolDetail } from './IMyPools';
import ChooseSectionCard from '@/components/ChooseSectionCard/ChooseSectionCard';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import ConnectYourWalletPage from '@/components/ConnectYourWalletPage/ConnectYourWalletPage';
import ArbIcon from '../../../../public/ArbIcon';
import BtcIcon from '../../../../public/BtcIcon';
import DaiIcon from '../../../../public/DaiIcon';
import EthIcon from '../../../../public/EthIcon';
import UniIcon from '../../../../public/UniIcon';
import USDCIcon from '../../../../public/USDCIcon';
import { useGetLoanState } from '@/lens/lens';

const MyPoolspage = () => {
  const account = useAccount();
  const allLenderPoolDetails = useGetAllLenderPoolDetails();
  const allBorrowerPoolDetails = useGetAllBorrowerPoolDetails();
  const totalPoolCount = useGetTotalPoolCount();
  const apy =
    useCalculateRewardApy({
      loanAmount: BigInt(10000),
      durationSeconds: 1000,
    }) ?? 0;

  const [data, setData] = useState<IPoolsdata[]>([]);
  const [filteredData, setFilteredData] = useState<IPoolsdata[]>([]);
  const [poolCount, setPoolCount] = useState<number>(0);
  const [poolSection, setPoolSection] = useState<'lend' | 'borrow' | null>(
    null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);

  useEffect(() => {
    const formatPoolDetails = (poolDetails: PoolDetail[], type: 1 | 2) => {
      return poolDetails.map(
        (poolDetail: PoolDetail, index: number): IPoolsdata => {
    
          let repaymentCurrency = {
            label: 'ARB',
            symbol: <ArbIcon />,
            address: '0x416a4ca8a82c6adc2fd49a417c4d5f9ccfbbde1e',
          };

          let currency = {
            label: 'ETH',
            symbol: <EthIcon />,
            address: '0x2abfb11cbf39b135237bdf6c04782718253ba7d4',
          };
          // @ts-ignore
          switch (poolDetail?.loanToken.toLowerCase()) {
            case '0x2abfb11cbf39b135237bdf6c04782718253ba7d4':
              currency = {
                label: 'WETH',
                symbol: <EthIcon />,
                address: '0x2abfb11cbf39b135237bdf6c04782718253ba7d4',
              };
              break;
            case '0x6ff9e328b50f1d81ec7a828eb1c7f27b4a3e0e09':
              currency = {
                label: 'WBTC',
                symbol: <BtcIcon />,
                address: '0x6ff9e328b50f1d81ec7a828eb1c7f27b4a3e0e09',
              };
              break;
            case '0x15e38de09a6453ae9d1acc591b47baa5da5c03de':
              currency = {
                label: 'USDC',
                symbol: <USDCIcon />,
                address: '0x15e38de09a6453ae9d1acc591b47baa5da5c03de',
              };
              break;
            case '0x416a4ca8a82c6adc2fd49a417c4d5f9ccfbbde1e':
              currency = {
                label: 'ARB',
                symbol: <ArbIcon />,
                address: '0x416a4ca8a82c6adc2fd49a417c4d5f9ccfbbde1e',
              };
              break;
            case '0x90bd86e8e74d6a28a4cdeabf3c6db2890818ad7b':
              currency = {
                label: 'DAI',
                symbol: <DaiIcon />,
                address: '0x90bd86e8e74d6a28a4cdeabf3c6db2890818ad7b',
              };
              break;
            case '0x087e9fb036843d25e6f7bc6d6531258a10749fe7':
              currency = {
                label: 'UNI',
                symbol: <UniIcon />,
                address: '0x087e9fb036843d25e6f7bc6d6531258a10749fe7',
              };
              break;
          }

          // @ts-ignore
          switch (poolDetail?.repaymentToken.toLowerCase()) {
            case '0x2abfb11cbf39b135237bdf6c04782718253ba7d4':
              repaymentCurrency = {
                label: 'WETH',
                symbol: <EthIcon />,
                address: '0x2abfb11cbf39b135237bdf6c04782718253ba7d4',
              };
              break;
            case '0x6ff9e328b50f1d81ec7a828eb1c7f27b4a3e0e09':
              repaymentCurrency = {
                label: 'WBTC',
                symbol: <BtcIcon />,
                address: '0x6ff9e328b50f1d81ec7a828eb1c7f27b4a3e0e09',
              };
              break;
            case '0x15e38de09a6453ae9d1acc591b47baa5da5c03de':
              repaymentCurrency = {
                label: 'USDC',
                symbol: <USDCIcon />,
                address: '0x15e38de09a6453ae9d1acc591b47baa5da5c03de',
              };
              break;
            case '0x416a4ca8a82c6adc2fd49a417c4d5f9ccfbbde1e':
              repaymentCurrency = {
                label: 'ARB',
                symbol: <ArbIcon />,
                address: '0x416a4ca8a82c6adc2fd49a417c4d5f9ccfbbde1e',
              };
              break;
            case '0x90bd86e8e74d6a28a4cdeabf3c6db2890818ad7b':
              repaymentCurrency = {
                label: 'DAI',
                symbol: <DaiIcon />,
                address: '0x90bd86e8e74d6a28a4cdeabf3c6db2890818ad7b',
              };
              break;
            case '0x087e9fb036843d25e6f7bc6d6531258a10749fe7':
              repaymentCurrency = {
                label: 'UNI',
                symbol: <UniIcon />,
                address: '0x087e9fb036843d25e6f7bc6d6531258a10749fe7',
              };
              break;
          }
          

          const loanState = poolDetail?.funded ? 'Active' : 'Pending';

          return {
            numericValue: (Number(apy) / 10000) as number | undefined,
            interestRate: poolDetail?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: poolDetail?.lender.slice(0, 7),
            Token: currency.label,
            amount: Number(poolDetail?.loanAmount),
            repaymentPeriod: poolDetail?.repaymentPeriod,
            loan_state: loanState as any,
            loanToken: currency.symbol as any,
            borrowToken: repaymentCurrency.symbol as any,
            type,
            interest_modal: InterestModal.Simple,
            pool: poolDetail?.pool,
            borrowTokenName: repaymentCurrency.label,
            loanCurrencyAddress: currency.address,
            repaymentCurrencyAddress: repaymentCurrency.address,
            pool_state: PoolState.Defaulted,
            borrower: poolDetail?.borrower,
            vault: poolDetail?.vault,
            poolType: poolDetail?.poolType,
          };
        }
      );
    };

    const lenderData = formatPoolDetails(allLenderPoolDetails || [], 2);
    const borrowerData = formatPoolDetails(allBorrowerPoolDetails || [], 1);
    setData([...lenderData, ...borrowerData]);
  }, [allLenderPoolDetails, allBorrowerPoolDetails, totalPoolCount, apy]);

  useEffect(() => {
    if (poolSection === 'lend') {
      setFilteredData(data.filter((item: IPoolsdata) => item.type === 2));
    } else if (poolSection === 'borrow') {
      setFilteredData(data.filter((item: IPoolsdata) => item.type === 1));
    }
  }, [poolSection, data]);

  useEffect(() => {
    return () => {
      setPoolSection(null);
    };
  }, []);

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
            <HelpCircle className="w-4 h-4 inline-block mr-1" />
            You can see the pools you have created here.
          </p>
        </div>

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
              </h2>
            </div>
            <MyPoolsTable columns={columns} data={filteredData} />
          </>
        )}
      </div>
    );
  }

  return null;
};

export default MyPoolspage;
