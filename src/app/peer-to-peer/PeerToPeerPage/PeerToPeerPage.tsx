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
  const [data, setData] = useState<ILendingData[]>([
    {
      lending_id: '1',
      wallet_address: '0x123456',
      Token: 'ETH',
      amount: 100,
      interestRate: BigInt(0),
      numericValue: 0.2,
      repaymentPeriod: BigInt(1),
      loan_state: 'Active',
      loanToken: '0xD',
      borrowToken: 'ETH',
      pool: '0x123456',
      borrowTokenName: 'DAI',
    },
    {
      lending_id: '1',
      wallet_address: '0x123456',
      Token: 'ETH',
      amount: 100,
      interestRate: BigInt(0),
      numericValue: 0.2,
      repaymentPeriod: BigInt(1),
      loan_state: 'Pending',
      loanToken: '0xD',
      borrowToken: 'ETH',
      pool: '0x123456',
      borrowTokenName: 'DAI',
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
          console.log(allPoolDetails, 'allPoolDetails');
          let repaymentCurrency = { label: 'ARB', symbol: <ArbIcon /> };

          let currency = { label: 'ETH', symbol: <EthIcon /> };
          // @ts-ignore
          switch (poolDetail?.loanToken.toLowerCase()) {
            case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
              currency = { label: 'WETH', symbol: <EthIcon /> };
              break;
            case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
              currency = { label: 'WBTC', symbol: <BtcIcon /> };
              break;
            case '0x569da455f23155612437eed8cff2106ae7e6c158':
              currency = { label: 'USDC', symbol: <USDCIcon /> };
              break;
            case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
              currency = { label: 'ARB', symbol: <ArbIcon /> };
              break;
            case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
              currency = { label: 'DAI', symbol: <DaiIcon /> };
              break;
            case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
              currency = { label: 'UNI', symbol: <UniIcon /> };
              break;
          }

          // @ts-ignore
          switch (poolDetail.repaymentToken.toLowerCase()) {
            case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
              repaymentCurrency = {
                label: 'WETH',
                symbol: <EthIcon />,
              };
              break;
            case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
              repaymentCurrency = { label: 'WBTC', symbol: <BtcIcon /> };
              break;
            case '0x569da455f23155612437eed8cff2106ae7e6c158':
              repaymentCurrency = { label: 'USDC', symbol: <USDCIcon /> };
              break;
            case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
              repaymentCurrency = { label: 'ARB', symbol: <ArbIcon /> };
              break;
            case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
              repaymentCurrency = { label: 'DAI', symbol: <DaiIcon /> };
              break;
            case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
              repaymentCurrency = { label: 'UNI', symbol: <UniIcon /> };
              break;
          }

          // @ts-ignore
          const loanState = poolDetail?.funded ? 'Active' : 'Pending';

          return {
            numericValue: (Number(apy) / 10000) as number | undefined,
            interestRate: (poolDetail as PoolDetail)?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
            Token: currency.label,
            amount: Number((poolDetail as PoolDetail)?.loanAmount),
            repaymentPeriod: (poolDetail as PoolDetail)?.repaymentPeriod,
            loan_state: loanState as any,
            loanToken: currency.symbol as any,
            borrowToken: repaymentCurrency.symbol as any,
            pool: (poolDetail as PoolDetail)?.pool,
            borrowTokenName: repaymentCurrency.label,
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
