'use client';
import { PoolOrganizerABI } from './abi/PoolOrganizer';
import { TuliaPoolABI } from './abi/TuliaPool';
import { VaultManagerABI } from './abi/VaultManager';
import { RewardManagerABI } from './abi/RewardManager';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';
import {
  useWriteContract,
  useAccount,
  useReadContracts,
  useReadContract,
  useSignMessage,
  useAccountEffect,
} from 'wagmi';
import { useEffect, useState } from 'react';

export const useGetAllPools = () => {
  const { data: allPoolAddresses } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xd848AFB987ef7a424f377903EDA1126584201a86',
    functionName: 'getAllPoolDetails',
  });

  return allPoolAddresses as string[] | undefined;
};

export const useSignit = () => {
  const { signMessage } = useSignMessage();

  useAccountEffect({
    onConnect(data) {
      signMessage({ message: '' });
    },
    onDisconnect() {},
  });
};

export const useGetTotalPoolCount = () => {
  const { data: totalPoolCount } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xd848AFB987ef7a424f377903EDA1126584201a86',
    functionName: 'getTotalPools',
  });

  return totalPoolCount as number | undefined;
};

export const useGetPoolDetails = (poolAddress: string) => {
  const { data: poolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xd848AFB987ef7a424f377903EDA1126584201a86',
    functionName: 'getPoolDetails',
    args: [poolAddress as any],
  });

  return poolDetails as any;
};

export const useGetAllPoolDetails = () => {
  const allPoolAddresses = useGetAllPools();
  const [contractReadsConfig, setContractReadsConfig] = useState([]);

  useEffect(() => {
    if (allPoolAddresses && allPoolAddresses.length > 0) {
      const config = allPoolAddresses.map(address => ({
        address: '0xd848AFB987ef7a424f377903EDA1126584201a86',
        abi: PoolOrganizerABI,
        functionName: 'getPoolDetails',
        args: [address],
      }));
      setContractReadsConfig(config as any);
    }
  }, [allPoolAddresses]);

  const { data: allPoolDetails } = useReadContracts({
    contracts: contractReadsConfig,
  });

  return allPoolDetails;
};

export const useCreateTuliaPool = () => {
  const userAddress = useAccount();
  const { writeContract } = useWriteContract();

  return (
    loanAmount: number,
    loanToken: string,
    assetToken: string,
    repaymentToken: string,
    interestRate: number,
    repaymentPeriod: number,
    interestModel: string,
    poolType: number,
    optionalFlashLoanFeeRate: number
  ) => {
    writeContract({
      abi: TuliaPoolFactoryABI,
      address: '0x5943aF98762bD50cc6179867c93d16cb164e31B6',
      functionName: 'createTuliaPool',
      args: [
        userAddress?.address as any,
        loanToken as any,
        assetToken as any,
        repaymentToken as any,
        loanAmount as any,
        interestRate as any,
        repaymentPeriod as any,
        interestModel as any,
        poolType,
        optionalFlashLoanFeeRate as any,
      ],
    });
  };
};
