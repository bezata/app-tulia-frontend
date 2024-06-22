'use client';
import { PoolOrganizerABI } from '@/lens/abi/PoolOrganizer';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { VaultManagerABI } from '@/lens/abi/VaultManager';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';
import { SimpleInterestABI } from '@/lens/abi/SimpleInterestModel';
import { CompoundInterestABI } from '@/lens/abi/CompoundInterestModel';
import { AdvancedAPYManagerABI } from './abi/AdvancedAPYManager';
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
interface AdvancedAPYManagerProps {
  loanAmount: BigInt;
  durationSeconds: number;
}

export const useCalculateRewardApy = ({
  loanAmount,
  durationSeconds,
}: AdvancedAPYManagerProps) => {
  const { data: apy } = useReadContract({
    abi: AdvancedAPYManagerABI,
    address: '0xB617FeFB730DaDEC8f982bE620420dA320503e9f',
    functionName: 'calculateAPY',
    args: [loanAmount as any, durationSeconds as any],
  });

  return apy as number | undefined;
};

export const useGetTotalPoolCount = () => {
  const { data: totalPoolCount } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x419Fda8a9fb3C7FEC4dF89cB8Cf9d72C13756412',
    functionName: 'getTotalPools',
  });

  return totalPoolCount as number | undefined;
};

// Function to fetch details of a single pool
export const useGetPoolDetails = (poolAddress: string) => {
  const { data: poolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x419Fda8a9fb3C7FEC4dF89cB8Cf9d72C13756412',
    functionName: 'getPoolDetails',
    args: [poolAddress as any],
  });

  return poolDetails as any;
};

export const useGetAllPoolAddresses = () => {
  const { data: allPoolAddresses } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x419Fda8a9fb3C7FEC4dF89cB8Cf9d72C13756412',
    functionName: 'getAllPoolAddresses',
  });

  return allPoolAddresses as string[] | undefined;
};

export const useGetAllPoolDetails = () => {
  const allPoolAddresses = useGetAllPoolAddresses();
  const poolCounts = useGetTotalPoolCount();
  const [contractsConfig, setContractsConfig] = useState([]);

  useEffect(() => {
    if (allPoolAddresses && allPoolAddresses.length > 0) {
      const newContractsConfig = allPoolAddresses.map(address => ({
        abi: PoolOrganizerABI,
        address: '0x419Fda8a9fb3C7FEC4dF89cB8Cf9d72C13756412',
        functionName: 'getPoolDetails',
        args: [address],
      }));
      setContractsConfig(newContractsConfig as any);
    }
  }, [allPoolAddresses, poolCounts]);

  const { data, error } = useReadContracts({
    contracts: contractsConfig,
  });

  if (error) {
    console.error('Error fetching pool details:', error);
  }

  return data;
};

export const useGetAllFundedPoolDetails = () => {
  const allPoolDetails = useGetAllPoolDetails();
  const fundedPoolDetails = allPoolDetails?.filter(
    (pool: any) => pool.result?.loanAmount > 0
  );

  return fundedPoolDetails;
};

export const useCalculateInterest = ({ principal, rate }: CalculationProps) => {
  const { data } = useReadContract({
    abi: SimpleInterestABI,
    address: '0x771EE257Ccea2918474d881cfB6e11e2B34e9e93',
    functionName: 'calculateInterest',
    args: [principal, rate],
  });

  return { interest: data as number | undefined };
};

export const useCalculateCompoundInterest = ({
  principal,
  rate,
}: CalculationProps) => {
  const { data } = useReadContract({
    abi: CompoundInterestABI,
    address: '0x1B1d3f3bdfa7D28eF818c268b59A20e5932dC706',
    functionName: 'calculateInterest',
    args: [principal, rate],
  });

  return { interest: data as number | undefined };
};



