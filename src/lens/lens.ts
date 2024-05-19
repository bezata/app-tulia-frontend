'use client';
import { PoolOrganizerABI } from '@/lens/abi/PoolOrganizer';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { VaultManagerABI } from '@/lens/abi/VaultManager';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';
import { SimpleInterestABI } from '@/lens/abi/SimpleInterestModel';
import { CompoundInterestABI } from '@/lens/abi/CompoundInterestModel';
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

export const useGetTotalPoolCount = () => {
  const { data: totalPoolCount } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x0DF9b624E212F7ca9A8c10B9b089344eA9303833',
    functionName: 'getTotalPools',
  });

  return totalPoolCount as number | undefined;
};

// Function to fetch details of a single pool
export const useGetPoolDetails = (poolAddress: string) => {
  const { data: poolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x0DF9b624E212F7ca9A8c10B9b089344eA9303833',
    functionName: 'getPoolDetails',
    args: [poolAddress as any],
  });

  return poolDetails as any;
};

export const useGetAllPoolAddresses = () => {
  const { data: allPoolAddresses } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x0DF9b624E212F7ca9A8c10B9b089344eA9303833',
    functionName: 'getAllPoolAddresses',
  });

  return allPoolAddresses as string[] | undefined;
};

// Function to fetch details of all pools
export const useGetAllPoolDetails = () => {
  const [allPoolDetails, setAllPoolDetails] = useState<any[]>([]);
  const poolCount = useGetTotalPoolCount();
  const allPoolAddresses = useGetAllPoolAddresses();

  useEffect(() => {
    if (allPoolAddresses && allPoolAddresses.length > 0) {
      const allPoolDetails = allPoolAddresses.map(address => ({
        address: '0x0DF9b624E212F7ca9A8c10B9b089344eA9303833',
        abi: PoolOrganizerABI,
        functionName: 'getPoolDetails',
        args: [address],
      }));
      setAllPoolDetails(allPoolDetails);
    }
  }, [allPoolAddresses, poolCount]);

  return allPoolDetails;
};

// Function to fetch details of only funded pools
export const useGetAllFundedPoolDetails = () => {
  const allPoolDetails = useGetAllPoolDetails();

  const fundedPoolDetails = allPoolDetails?.filter(pool => pool.funded);

  return fundedPoolDetails;
};

export const useCalculateInterest = ({ principal, rate }: CalculationProps) => {
  const { data } = useReadContract({
    abi: SimpleInterestABI,
    address: '0x0F5534A65e5433a551b648D8634b6db3138F863D',
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
      address: '0x4c08762698c9DcBdF8df7f1eBe61Bc1ce5211d3c',
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
