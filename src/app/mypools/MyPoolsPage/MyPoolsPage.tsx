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
import ArbIcon from '../../../../public/ArbIcon';
import BtcIcon from '../../../../public/BtcIcon';
import DaiIcon from '../../../../public/DaiIcon';
import EthIcon from '../../../../public/EthIcon';
import UniIcon from '../../../../public/UniIcon';
import USDCIcon from '../../../../public/USDCIcon';
import { useCalculateRewardApy } from '@/lens/lens';
import { useGetAllLenderPoolDetails } from '@/lens/lens';

const MyPoolspage = () => {
  const account = useAccount();
  const allPoolDetails = useGetAllPoolDetails();
  const allLenderPoolDetails = useGetAllLenderPoolDetails();

  console.log(allLenderPoolDetails);

  const [data, setData] = useState<IPoolsdata[]>([]);
  const apy =
    useCalculateRewardApy({
      loanAmount: BigInt(10000),
      durationSeconds: 1000,
    }) ?? 0;
  const totalPoolCount = useGetTotalPoolCount();
  const [poolCount, setPoolCount] = useState<number>(0);
  const [poolSection, setPoolSection] = useState<'lend' | 'borrow' | null>(
    null
  );
  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allLenderPoolDetails) {
      const formattedData = allLenderPoolDetails.map(
        (poolDetail: PoolDetail, index: number): IPoolsdata => {
          let repaymentCurrency = {
            label: 'ARB',
            symbol: <ArbIcon />,
            address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
          };

          let currency = {
            label: 'ETH',
            symbol: <EthIcon />,
            address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
          };
          // @ts-ignore
          switch (poolDetail?.loanToken.toLowerCase()) {
            case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
              currency = {
                label: 'WETH',
                symbol: <EthIcon />,
                address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
              };
              break;
            case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
              currency = {
                label: 'WBTC',
                symbol: <BtcIcon />,
                address: '0x3e34d176dc568414f3db022c2de8c4076e3b6043',
              };
              break;
            case '0x569da455f23155612437eed8cff2106ae7e6c158':
              currency = {
                label: 'USDC',
                symbol: <USDCIcon />,
                address: '0x569da455f23155612437eed8cff2106ae7e6c158',
              };
              break;
            case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
              currency = {
                label: 'ARB',
                symbol: <ArbIcon />,
                address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
              };
              break;
            case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
              currency = {
                label: 'DAI',
                symbol: <DaiIcon />,
                address: '0xc399e512ff58882305a9c38f2c6d806f6f77f178',
              };
              break;
            case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
              currency = {
                label: 'UNI',
                symbol: <UniIcon />,
                address: '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d',
              };
              break;
          }

          // @ts-ignore
          switch (poolDetail.repaymentToken.toLowerCase()) {
            case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
              repaymentCurrency = {
                label: 'WETH',
                symbol: <EthIcon />,
                address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
              };
              break;
            case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
              repaymentCurrency = {
                label: 'WBTC',
                symbol: <BtcIcon />,
                address: '0x3e34d176dc568414f3db022c2de8c4076e3b6043',
              };
              break;
            case '0x569da455f23155612437eed8cff2106ae7e6c158':
              repaymentCurrency = {
                label: 'USDC',
                symbol: <USDCIcon />,
                address: '0x569da455f23155612437eed8cff2106ae7e6c158',
              };
              break;
            case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
              repaymentCurrency = {
                label: 'ARB',
                symbol: <ArbIcon />,
                address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
              };
              break;
            case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
              repaymentCurrency = {
                label: 'DAI',
                symbol: <DaiIcon />,
                address: '0xc399e512ff58882305a9c38f2c6d806f6f77f178',
              };
              break;
            case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
              repaymentCurrency = {
                label: 'UNI',
                symbol: <UniIcon />,
                address: '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d',
              };
              break;
          }

          // @ts-ignore
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
            type: 2,
            interest_modal: InterestModal.Simple,
            pool: (poolDetail as PoolDetail)?.pool,
            borrowTokenName: repaymentCurrency.label,
            loanCurrencyAddress: currency.address,
            repaymentCurrencyAddress: repaymentCurrency.address,
            pool_state: PoolState.Defaulted,
          };
        }
      );
      setData(formattedData);
    }
  }, [totalPoolCount, apy, allLenderPoolDetails]);

  React.useEffect(() => {
    setPoolCount(totalPoolCount as any);
  }, [totalPoolCount]);
  React.useEffect(() => {
    if (allPoolDetails) {
      const formattedData = allPoolDetails.map((detail, index): IPoolsdata => {
        const poolDetail = detail.result as unknown;

        // @ts-ignore
        let repaymentCurrency = {
          label: 'ARB',
          symbol: <ArbIcon />,
          address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
        };

        let currency = {
          label: 'ETH',
          symbol: <EthIcon />,
          address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
        };
        // @ts-ignore
        switch (poolDetail?.loanToken.toLowerCase()) {
          case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
            currency = {
              label: 'WETH',
              symbol: <EthIcon />,
              address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
            };
            break;
          case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
            currency = {
              label: 'WBTC',
              symbol: <BtcIcon />,
              address: '0x3e34d176dc568414f3db022c2de8c4076e3b6043',
            };
            break;
          case '0x569da455f23155612437eed8cff2106ae7e6c158':
            currency = {
              label: 'USDC',
              symbol: <USDCIcon />,
              address: '0x569da455f23155612437eed8cff2106ae7e6c158',
            };
            break;
          case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
            currency = {
              label: 'ARB',
              symbol: <ArbIcon />,
              address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
            };
            break;
          case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
            currency = {
              label: 'DAI',
              symbol: <DaiIcon />,
              address: '0xc399e512ff58882305a9c38f2c6d806f6f77f178',
            };
            break;
          case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
            currency = {
              label: 'UNI',
              symbol: <UniIcon />,
              address: '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d',
            };
            break;
        }

        // @ts-ignore
        switch (poolDetail.repaymentToken.toLowerCase()) {
          case '0xd34738726c013a0184965a5c6603c0aa7bcf6b80':
            repaymentCurrency = {
              label: 'WETH',
              symbol: <EthIcon />,
              address: '0xd34738726c013a0184965a5c6603c0aa7bcf6b80',
            };
            break;
          case '0x3e34d176dc568414f3db022c2de8c4076e3b6043':
            repaymentCurrency = {
              label: 'WBTC',
              symbol: <BtcIcon />,
              address: '0x3e34d176dc568414f3db022c2de8c4076e3b6043',
            };
            break;
          case '0x569da455f23155612437eed8cff2106ae7e6c158':
            repaymentCurrency = {
              label: 'USDC',
              symbol: <USDCIcon />,
              address: '0x569da455f23155612437eed8cff2106ae7e6c158',
            };
            break;
          case '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58':
            repaymentCurrency = {
              label: 'ARB',
              symbol: <ArbIcon />,
              address: '0xdb722ad58d55ce8fdca16c86462bcba8739e3e58',
            };
            break;
          case '0xc399e512ff58882305a9c38f2c6d806f6f77f178':
            repaymentCurrency = {
              label: 'DAI',
              symbol: <DaiIcon />,
              address: '0xc399e512ff58882305a9c38f2c6d806f6f77f178',
            };
            break;
          case '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d':
            repaymentCurrency = {
              label: 'UNI',
              symbol: <UniIcon />,
              address: '0x5632a6d2e2af12f20f69f78ee85ab2ae77f9949d',
            };
            break;
        }

        // @ts-ignore
        const loanState = poolDetail?.funded ? 'Active' : 'Pending';

        return {
          numericValue: (Number(apy) / 10000) as number,
          interestRate: (poolDetail as PoolDetail)?.interestRate,
          lending_id: (index + 1)?.toString(),
          wallet_address: (poolDetail as PoolDetail)?.lender.slice(0, 7),
          Token: currency.label,
          amount: Number((poolDetail as PoolDetail)?.loanAmount),
          repaymentPeriod: (poolDetail as PoolDetail)?.repaymentPeriod,
          loan_state: loanState as any,
          loanToken: currency.symbol as any,
          borrowToken: repaymentCurrency.symbol as any,
          type: 1,
          interest_modal: InterestModal.Simple,
          pool: (poolDetail as PoolDetail)?.pool,
          borrowTokenName: repaymentCurrency.label,
          loanCurrencyAddress: currency.address,
          repaymentCurrencyAddress: repaymentCurrency.address,
          pool_state: PoolState.Defaulted,
        };
      });

      setData(formattedData);
    }
  }, [allPoolDetails, totalPoolCount, apy]);

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
    } else if (poolSection === 'borrow') {
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
