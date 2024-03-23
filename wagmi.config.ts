import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins';
import { polygonMumbai } from 'wagmi/chains';

import abi1 from '@/lens/abi/PoolOrganizer.json';
import abi2 from '@/lens/abi//TuliaPool.json';
import abi3 from '@/lens/abi//TuliaPoolFactory.json';

const PoolOrganizer = abi1 as any[];
const TuliaPool = abi2 as any[];
const TuliaPoolFactory = abi3 as any[];

export default defineConfig({
  out: 'src/lens/lensTulia.ts',
  contracts: [
    {
      name: 'PoolOrganizer',
      abi: PoolOrganizer,
      address: {
        [polygonMumbai.id]: '0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2',
      },
    },
    {
      name: 'TuliaPool',
      abi: TuliaPool,
      address: {
        [polygonMumbai.id]: '0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2',
      },
    },
    {
      name: 'TuliaPoolFactory',
      abi: TuliaPoolFactory,
      address: {
        [polygonMumbai.id]: '0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0',
      },
    },
  ],
  plugins: [
    react({
      getHookName({ contractName, itemName, type }) {
        return `use${contractName}${type}${itemName}`;
      },
    }),
  ],
});