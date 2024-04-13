'use client';
import { PoolOrganizerABI } from './abi/PoolOrganizer';
import {
  useWriteContract,
  useAccount,
  useReadContracts,
  useReadContract,
  useSignMessage,
  useAccountEffect,
} from 'wagmi';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';
import { useEffect, useState } from 'react';

export const useGetAllPools = () => {
  const { data: allPoolAddresses } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
    functionName: 'getAllPoolAddresses',
  });

  return allPoolAddresses as string[] | undefined;
};

export const useSignit = () => {
  const { signMessage } = useSignMessage();

  useAccountEffect({
    onConnect(data) {
      signMessage({ message: 'OROSBU' });
    },
    onDisconnect() {},
  });
};

export const useGetTotalPoolCount = () => {
  const { data: totalPoolCount } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
    functionName: 'getTotalPools',
  });

  return totalPoolCount as number | undefined;
};

export const useGetPoolDetails = (poolAddress: string) => {
  const { data: poolDetails } = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
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
        address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
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

  const createTuliaPool = (coinAmount: string) => {
    writeContract({
      abi: TuliaPoolFactoryABI,
      address: '0x0Fd2B9Dd8E3896Cb0b5b1fb6D1afdfd11421d06b',
      functionName: 'createTuliaPool',
      args: [
        userAddress?.address as any,
        '0xe083B68240A9f44369b7F1fA25F4DD97c3eCc754',
        '0xe083B68240A9f44369b7F1fA25F4DD97c3eCc754',
        coinAmount as any,
        1 as any,
        1 as any,
        '0xB27Ad4200C613d7667699Eb1eC7B622d6Fcd260B',
      ],
    });
  };
  return createTuliaPool;
};
