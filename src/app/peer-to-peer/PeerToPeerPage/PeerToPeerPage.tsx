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
import TransactionProcessModal from '@/components/TransactionProcessModal/TransactionProcessModal';
import { useCalculateRewardApy } from '@/lens/lens';
import ILendRequest from '@/types/LendRequest/ILendRequest';
import BtcIcon from '../../../../public/BtcIcon';
import EthIcon from '../../../../public/EthIcon';
import USDCIcon from '../../../../public/USDCIcon';
import ArbIcon from '../../../../public/ArbIcon';
import DaiIcon from '../../../../public/DaiIcon';
import UniIcon from '../../../../public/UniIcon';



const PeerToPeerPage = () => {
  //NOTE: state tutmak lazim direk variable ile tutamayiz.

  const apy =
    useCalculateRewardApy({
      loanAmount: BigInt(10000),
      durationSeconds: 1000,
    }) ?? 0;
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([]);
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
          switch (poolDetail.repaymentToken.toLowerCase()) {
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

          // @ts-ignore
          const loanState = poolDetail?.funded ? 'Active' : 'Pending';

          return {
            numericValue: (Number(apy) / 10000) as number | undefined,
            interestRate: (poolDetail as PoolDetail)?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: (poolDetail as PoolDetail)?.lender,
            Token: currency?.label,
            amount: Number((poolDetail as PoolDetail)?.loanAmount),
            repaymentPeriod: (poolDetail as PoolDetail)?.repaymentPeriod,
            loan_state: loanState as any,
            loanToken: currency?.symbol as any,
            borrowToken: repaymentCurrency?.symbol as any,
            pool: (poolDetail as PoolDetail)?.pool,
            borrowTokenName: repaymentCurrency?.label,
            loanCurrencyAddress: currency?.address,
            repaymentCurrencyAddress: repaymentCurrency?.address,
            poolType: (poolDetail as PoolDetail)?.poolType,
          };
        }
      );

      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount, apy]);
  
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
          {/*ben beğendim kanka iyi olmuş */}
          <HelpCircle className="w-4 h-4 inline-block mr-1" />
          This is the open market lending page.Here you can see all the lending
          requests.
        </p>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <LendingReqModal />
        <h2 className="text-md font-bold">
          All Lending Requests (Total: {Number(poolCount)})
        </h2>
      </div>

      <PeerToPeerTable columns={columns} data={filteredData} />
    </div>
  );
};

export default PeerToPeerPage;
