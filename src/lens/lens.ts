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
import { TokenABI } from './abi/Token';
import { TuliaVaultABI } from './abi/TuliaVault';
import { useBlockNumber } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';

interface CalculationProps {
  principal: number;
  rate: number;
}
interface AdvancedAPYManagerProps {
  loanAmount: BigInt;
  durationSeconds: number;
}

export const useGetAllBorrowerPoolDetails = () => {
  const account = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();

  const { data: borrowerPoolDetails, queryKey } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
    functionName: 'getBorrowerPoolDetails',
    args: [account?.address as any],
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return borrowerPoolDetails as any;
};

export const useCalculateRewardApy = ({
  loanAmount,
  durationSeconds,
}: AdvancedAPYManagerProps) => {
  const { data: apy } = useReadContract({
    abi: AdvancedAPYManagerABI,
    address: '0x7957228108834EEF881655A1f58f3a950c3d3c71',
    functionName: 'calculateAPY',
    args: [loanAmount as any, durationSeconds as any],
  });

  return apy as number | undefined;
};

export const useGetTotalPoolCount = () => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { data: totalPoolCount, queryKey } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
    functionName: 'getTotalPools',
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return totalPoolCount as number | undefined;
};

// Function to fetch details of a single pool
export const useGetPoolDetails = (poolAddress: string) => {
  const { data: poolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
    functionName: 'getPoolDetails',
    args: [poolAddress as any],
  });

  return poolDetails as any;
};

export const useGetAllPoolAddresses = () => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: allPoolAddresses, queryKey } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
    functionName: 'getAllPoolAddresses',
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return allPoolAddresses as string[] | undefined;
};

export const useGetAllLenderPoolDetails = () => {
  const account = useAccount();
  const { data: allLenderPoolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
    functionName: 'getAllLenderPoolDetails',
    args: [account?.address as any],
  });
  return allLenderPoolDetails as any;
};

export const useCheckCoinAllowance = (
  coinAddress: string,
  approveAddress: 'string'
) => {
  const account = useAccount();
  const { data: allowance } = useReadContract({
    abi: TokenABI,
    address: coinAddress as any,
    functionName: 'allowance',
    args: [account?.address as any, approveAddress as any],
  });

  return allowance as number | undefined;
};

export const useCheckVaultAllowance = (poolAddress: string) => {
  const account = useAccount();
  const { data: vaultAllowance } = useReadContract({
    abi: TuliaVaultABI,
    address: poolAddress as any,
    functionName: 'allowance',
    args: [account?.address as any, poolAddress as any],
  });

  return vaultAllowance as number | undefined;
};

export const useGetLoanState = (poolAddress: string) => {
  const { data: loanState } = useReadContract({
    abi: TuliaPoolABI,
    address: poolAddress as any,
    functionName: 'getLoanState',
  });

  return loanState as number | undefined;
};

export const useApproveCoin = (
  coinAddress: string,
  amount: number,
  approveAddress: string
) => {
  const { writeContract, data: hash } = useWriteContract();
  writeContract({
    address: coinAddress as any,
    abi: TokenABI,
    functionName: 'approve',
    args: [approveAddress, amount],
  });
  return hash as string | undefined;
};

export const useGetAllPoolDetails = () => {
  const allPoolAddresses = useGetAllPoolAddresses();
  const poolCounts = useGetTotalPoolCount();
  const [contractsConfig, setContractsConfig] = useState([]);

  useEffect(() => {
    if (allPoolAddresses && allPoolAddresses.length > 0) {
      const newContractsConfig = allPoolAddresses.map(address => ({
        abi: PoolOrganizerABI,
        address: '0xC7356Ea7460A0e56c0bEAa91e82Ce0F4846db3DE',
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
    address: '0x06D98c1AA31d84c51F150d6cC929E3095796Fae2',
    functionName: 'calculateInterest',
    args: [principal, rate],
  });

  return { interest: data as number | undefined };
};

export const useCalculateClaimableInterest = ({ pool, isLender }: any) => {
  const { data } = useReadContract({
    abi: RewardManagerABI,
    address: '0xa5Fe443f5D1e2Af4D62583308Dc428494C19C915',
    functionName: 'calculateClaimableRewards',
    args: [pool, isLender],
  });

  return { interest: data as number | undefined };
};

export const useVaultManagerInterest = ({ pool }: any) => {
  const { data } = useReadContract({
    abi: VaultManagerABI,
    address: '0x8D3520C41d6eca54ab638d85F22a414fB2264114',
    functionName: 'calculateClaimableInterest',
    args: [pool],
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



