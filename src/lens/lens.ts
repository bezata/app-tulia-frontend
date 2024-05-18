'use client';
import { PoolOrganizerABI } from '@/lens/abi/PoolOrganizer';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { VaultManagerABI } from '@/lens/abi/VaultManager';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';
import { SimpleInterestABI } from '@/lens/abi/SimpleInterestModel';
import {
  useWriteContract,
  useAccount,
  useReadContracts,
  useReadContract,
  useSignMessage,
  useAccountEffect,
} from 'wagmi';
import { useEffect, useState } from 'react';

interface CalculationProps {
  principal: number;
  rate: number;
}

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

export const useCalculateInterest = ({ principal, rate }: CalculationProps) => {
  const { data } = useReadContract({
    abi: SimpleInterestABI,
    address: '0x9a07dc388a44c5A87eD6e5D0D5bB810FC3B7cDA8',
    functionName: 'calculateInterest',
    args: [principal, rate],
  });

  return { interest: data as number | undefined };
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
