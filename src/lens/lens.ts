'use client';
import { useReadContract } from 'wagmi';
import { PoolOrganizerABI } from './abi/PoolOrganizer';
import { useWriteContract, useAccount } from 'wagmi';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';

export const useGetAllPools = () => {
  const getAllPools = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
    functionName: 'getAllPoolAddresses',
  });

  return getAllPools;
};

export const useGetPoolDetails = () => {
  const getPoolDetails = useReadContract({
    abi: PoolOrganizerABI,
    address: '0xE103DA4c880fc64624B4f1140404b15678Ff68d1',
    functionName: 'getPoolDetails',
  });

  console.log(getPoolDetails);

  return getPoolDetails;
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
