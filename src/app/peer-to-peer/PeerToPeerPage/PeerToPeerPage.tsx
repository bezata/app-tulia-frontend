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

const cryptoCurrencies = [
  {
    label: 'WETH',
    value: '0xD34738726C013a0184965A5C6603C0AA7BCF6B80',
    symbol: <EthIcon />,
  },
  {
    label: 'WBTC',
    value: '0x3E34D176dc568414f3DB022C2DE8c4076e3B6043',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDC',
    value: '0x569da455F23155612437eEd8CfF2106aE7e6C158',
    symbol: <USDCIcon />,
  },
  {
    label: 'ARB',
    value: '0xdB722aD58d55cE8FdCa16c86462BCBa8739E3e58',
    symbol: <ArbIcon />,
  },
  {
    label: 'DAI',
    value: '0xc399E512Ff58882305A9C38f2C6d806f6F77f178',
    symbol: <DaiIcon />,
  },
  {
    label: 'UNI',
    value: '0x5632a6D2E2aF12f20f69F78ee85AB2aE77F9949d',
    symbol: <UniIcon />,
  },
];

const PeerToPeerPage = () => {
  //NOTE: state tutmak lazim direk variable ile tutamayiz.

  const apy =
    useCalculateRewardApy({
      loanAmount: BigInt(10000),
      durationSeconds: 1000,
    }) ?? 0;
  console.log(apy);
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([
    {
      lending_id: '1',
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 100,
      interestRate: BigInt(0),
      numericValue: 0.2,
      repaymentPeriod: BigInt(1),
      loan_state: 1,
    },
    {
      lending_id: '2',
      wallet_address: '0x123456',
      coin: 'ETH',
      amount: 102,
      interestRate: BigInt(0),
      numericValue: 0.2,
      loan_state: 122,
      repaymentPeriod: BigInt(123),
    },
  ]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allPoolDetails) {
      console.log(allPoolDetails);
      const formattedData = allPoolDetails.map(
        (detail, index): ILendingData => {
          const poolDetail = detail.result as unknown;
          console.log(detail.result);
          console.log(poolDetail);
          return {
            numericValue: (Number(apy) / 10000) as number | undefined,
            interestRate: (poolDetail as PoolDetail)?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
            coin: 'ETH',
            amount: Number((poolDetail as PoolDetail)?.loanAmount),
            repaymentPeriod: (poolDetail as PoolDetail)?.repaymentPeriod,
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
