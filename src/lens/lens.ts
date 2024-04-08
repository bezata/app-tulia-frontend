import { useReadContract } from 'wagmi';
import { PoolOrganizerABI } from './abi/PoolOrganizer';

export const useGetAllPools = () => {
  const getAllPools = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x93C992e88098F439a81696259987194dDA8f7F4F',
    functionName: 'getAllPoolAddresses',
  });

  return getAllPools;
};

export const useGetPoolDetails = () => {
  const getPoolDetails = useReadContract({
    abi: PoolOrganizerABI,
    address: '0x93C992e88098F439a81696259987194dDA8f7F4F',
    functionName: 'getPoolDetails',
  });

  console.log(getPoolDetails);

  return getPoolDetails;
};
