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
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import UniIcon from '../../../../public/UniIcon';
import { useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

const PeerToPeerPage = () => {
  const account = useAccount();
  const { open } = useWeb3Modal();
  const apy =
    useCalculateRewardApy({
      loanAmount: BigInt(10000),
      durationSeconds: 1000,
    }) ?? 0;
  const allPoolDetails = useGetAllPoolDetails();
  const [data, setData] = useState<ILendingData[]>([]);
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  const [isChainValid, setIsChainValid] = useState(false);
  const [userChainId, setUserChainID] = useState<number>(421614);
  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  const allowedChainIds = [
    '421614',
    '17000',
    '43113',
    '80002',
    '11155420',
    '84532',
    '97',
  ];
  useEffect(() => {
    if (account) {
      setUserChainID(account?.chainId as any);
    }
  }, [account.chainId]);

  useEffect(() => {
    if (userChainId && !allowedChainIds.includes(userChainId.toString())) {
      setIsChainValid(false);
      toast(
        'Network not supported in Open Market Protocol. Please switch your chain to a supported testnet network.',
        {
          action: {
            label: 'Switch Network',
            onClick: () => open({ view: 'Networks' }),
          },
          duration: Infinity, // Keeps the toast open indefinitely
        }
      );
    } else {
      setIsChainValid(true);
      toast.dismiss(); // Dismisses the toast when the chain is valid
    }
  }, [userChainId]);
  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map(
        (detail, index): ILendingData => {
          const poolDetail = detail.result as unknown;

          let repaymentCurrency = {
            label: 'mARB',
            symbol: <ArbIcon />,
            address: '0xd4a2b111c346200b131d668594bfaf52dee8fae7',
          };

          let currency = {
            label: 'mETH',
            symbol: <EthIcon />,
            address: '0x46eae7f1f2155d3a7f799c96a2c52e0a634ed186',
          };

          // @ts-ignore
          switch (poolDetail?.loanToken.toLowerCase()) {
            case '0x46eae7f1f2155d3a7f799c96a2c52e0a634ed186':
              currency = {
                label: 'mETH',
                symbol: <EthIcon />,
                address: '0x46eae7f1f2155d3a7f799c96a2c52e0a634ed186',
              };
              break;
            case '0xaf8442cfc7491b9cc6fc2ce94199084d39e85a09':
              currency = {
                label: 'mWBTC',
                symbol: <BtcIcon />,
                address: '0xaf8442cfc7491b9cc6fc2ce94199084d39e85a09',
              };
              break;
            case '0x485d5df7178c2413771914df0910b326c308b5c3':
              currency = {
                label: 'mUSDC',
                symbol: <USDCIcon />,
                address: '0x485d5df7178c2413771914df0910b326c308b5c3',
              };
              break;
            case '0xd4a2b111c346200b131d668594bfaf52dee8fae7':
              currency = {
                label: 'mARB',
                symbol: <ArbIcon />,
                address: '0xd4a2b111c346200b131d668594bfaf52dee8fae7',
              };
              break;
            case '0xdafb89d8dd8ecdd369e02542e965e23a3bc4b074':
              currency = {
                label: 'mDAI',
                symbol: <DaiIcon />,
                address: '0xdafb89d8dd8ecdd369e02542e965e23a3bc4b074',
              };
              break;
            case '0x8c9ae3da7c53470d86edf14771586431136dd270':
              currency = {
                label: 'mUNI',
                symbol: <UniIcon />,
                address: '0x8c9ae3da7c53470d86edf14771586431136dd270',
              };
              break;
            case '0xf401b345175e19b9705fb186b474982c76e7b80f':
              currency = {
                label: 'mTulia',
                symbol: <EthIcon />, // Replace with appropriate Tulia icon if available
                address: '0xf401b345175e19b9705fb186b474982c76e7b80f',
              };
              break;
          }

          // @ts-ignore
          switch (poolDetail?.repaymentToken.toLowerCase()) {
            case '0x46eae7f1f2155d3a7f799c96a2c52e0a634ed186':
              repaymentCurrency = {
                label: 'mETH',
                symbol: <EthIcon />,
                address: '0x46eae7f1f2155d3a7f799c96a2c52e0a634ed186',
              };
              break;
            case '0xaf8442cfc7491b9cc6fc2ce94199084d39e85a09':
              repaymentCurrency = {
                label: 'mWBTC',
                symbol: <BtcIcon />,
                address: '0xaf8442cfc7491b9cc6fc2ce94199084d39e85a09',
              };
              break;
            case '0x485d5df7178c2413771914df0910b326c308b5c3':
              repaymentCurrency = {
                label: 'mUSDC',
                symbol: <USDCIcon />,
                address: '0x485d5df7178c2413771914df0910b326c308b5c3',
              };
              break;
            case '0xd4a2b111c346200b131d668594bfaf52dee8fae7':
              repaymentCurrency = {
                label: 'mARB',
                symbol: <ArbIcon />,
                address: '0xd4a2b111c346200b131d668594bfaf52dee8fae7',
              };
              break;
            case '0xdafb89d8dd8ecdd369e02542e965e23a3bc4b074':
              repaymentCurrency = {
                label: 'mDAI',
                symbol: <DaiIcon />,
                address: '0xdafb89d8dd8ecdd369e02542e965e23a3bc4b074',
              };
              break;
            case '0x8c9ae3da7c53470d86edf14771586431136dd270':
              repaymentCurrency = {
                label: 'mUNI',
                symbol: <UniIcon />,
                address: '0x8c9ae3da7c53470d86edf14771586431136dd270',
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
          All Lending Requests (Total: {Number(poolCount?.toString() || 0)})
        </h2>
      </div>

      <PeerToPeerTable columns={columns} data={filteredData} />
    </div>
  );
};

export default PeerToPeerPage;
