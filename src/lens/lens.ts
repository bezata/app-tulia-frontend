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
        '0x0DC33D4A2aB60E5F06AeaBAC71198CD99Bee1a64',
        '0x0DC33D4A2aB60E5F06AeaBAC71198CD99Bee1a64',
        coinAmount as any,
        1 as any,
        1 as any,
        '0x1460469138cB9D1A71809db6518FBBC10731D35c',
      ],
    });
  };

  return createTuliaPool;
};
