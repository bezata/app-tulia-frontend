'use client';
import { PoolOrganizerABI } from '@/lens/abi/PoolOrganizer';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { VaultManagerABI } from '@/lens/abi/VaultManager';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { FlashPoolRewardManager } from './abi/FlashPoolRewardManager';
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
import { TuliaFlashPool } from './abi/TuliaFlashPool';

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
    address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
    functionName: 'getBorrowerPoolDetails',
    args: [account?.address as any],
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return borrowerPoolDetails as any;
};
export const useGetFlashPoolRewards = (pool: any) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { data: flashPoolRewards, queryKey } = useReadContract({
    abi: FlashPoolRewardManager,
    address: '0x076f592c1371F41140b45328c1cc7644823E2D8C',
    functionName: 'calculateClaimableInterest',
    args: [pool],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return flashPoolRewards as any;
};

export const useGetFlashPoolLoanState = (pool: any) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { data: loanState, queryKey } = useReadContract({
    abi: TuliaFlashPool,
    address: pool as any,
    functionName: 'getFlashLoanState',
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return loanState as number | undefined;
};
export const useGetRemainingRepaymentPeriod = (pool: any) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const { data: periodData, queryKey } = useReadContract({
    abi: TuliaPoolABI,
    address: pool as any,
    functionName: 'getRemainingRepaymentPeriod',
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);
  return Math.floor(Number(periodData)) as any;
};

export const useCalculateRewardApy = ({
  loanAmount,
  durationSeconds,
}: AdvancedAPYManagerProps) => {
  const { data: apy } = useReadContract({
    abi: AdvancedAPYManagerABI,
    address: '0x84F2b371A76F1178E5f0560f36b39118FD4aAdb9 ',
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
    address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
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
    address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
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
    address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
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
    address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
    functionName: 'getAllLenderPoolDetails',
    args: [account?.address as any],
  });
  return allLenderPoolDetails as any;
};

export const useCheckCoinAllowance = (
  coinAddress: string,
  approveAddress: 'string'
) => {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const account = useAccount();
  const { data: allowance, queryKey } = useReadContract({
    abi: TokenABI,
    address: coinAddress as any,
    functionName: 'allowance',
    args: [account?.address as any, approveAddress as any],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return allowance as number | undefined;
};

export const useCheckVaultAllowance = (
  poolAddress: string,
  vaultAddress: string
) => {
  const account = useAccount();
  const { data: vaultAllowance } = useReadContract({
    abi: TuliaVaultABI,
    address: vaultAddress as any,
    functionName: 'allowance',
    args: [account?.address as any, poolAddress as any],
  });

  return vaultAllowance as number | undefined;
};

export const useGetLoanState = (poolAddress: string) => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: loanState, queryKey } = useReadContract({
    abi: TuliaPoolABI,
    address: poolAddress as any,
    functionName: 'getLoanState',
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

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
        address: '0x2dE66006A9769438613042ad6DB03293F1E739Bc',
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
    address: '0x7BD46bF5df17E7fe9F998fe9185b63D1324bA65c',
    functionName: 'calculateInterest',
    args: [principal, rate],
  });

  return { interest: data as number | undefined };
};

export const useCalculateClaimableInterest = ({ pool, isLender }: any) => {
  const { data } = useReadContract({
    abi: RewardManagerABI,
    address: '0x82B7B9715273f7063AeD2c1b5136e241bc342d34',
    functionName: 'calculateClaimableRewards',
    args: [pool, isLender],
  });

  return { interest: data as number | undefined };
};

export const useActivateRewardMechanism = ({ pool }: any) => {
  const { writeContract, data: hash } = useWriteContract();
  writeContract({
    address: '0x82B7B9715273f7063AeD2c1b5136e241bc342d34',
    abi: RewardManagerABI,
    functionName: 'accrueRewards',
    args: [pool],
  });

  return hash as string | undefined;
};

export const useVaultManagerInterest = ({ pool }: any) => {
  const { data } = useReadContract({
    abi: VaultManagerABI,
    address: '0x5a27651600F4115FE966b9bb72DB3F28e2bBAb54',
    functionName: 'calculateClaimableInterest',
    args: [pool],
  });

  return { interest: data as number | undefined };
};
export const useAccruingRewardCheck = ({ pool }: any) => {
  const { data: accrueRewardINFO } = useReadContract({
    abi: RewardManagerABI,
    address: '0x82B7B9715273f7063AeD2c1b5136e241bc342d34',
    functionName: 'getRewardDetails',
    args: [pool],
  });

  return accrueRewardINFO as any;
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



