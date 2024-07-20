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
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { toast } from 'sonner';

const MyPoolspage = () => {
  const account = useAccount();
  const { open } = useWeb3Modal();
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

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userChainId && !allowedChainIds.includes(userChainId.toString())) {
      setIsChainValid(false);
      toast(
        'This network is only supported in Swap App. Please switch your chain to a supported testnet networks.',
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

  useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);

  useEffect(() => {
    const formatPoolDetails = (poolDetails: PoolDetail[], type: 1 | 2) => {
      return poolDetails.map(
        (poolDetail: PoolDetail, index: number): IPoolsdata => {
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

          const loanState = poolDetail?.funded ? 'Active' : 'Pending';

          return {
            numericValue: (Number(apy) / 10000) as number | undefined,
            interestRate: poolDetail?.interestRate,
            lending_id: (index + 1)?.toString(),
            wallet_address: poolDetail?.lender.slice(0, 7) || '0x000',
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
