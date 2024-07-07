'use client';
import EthIcon from '../../public/EthIcon';
import BtcIcon from '../../public/BtcIcon';
import USDCIcon from '../../public/USDCIcon';
import ArbIcon from '../../public/ArbIcon';
import DaiIcon from '../../public/DaiIcon';
import UniIcon from '../../public/UniIcon';

const tokenAddressMap = {
  '0x2ABFB11CBF39B135237bdF6c04782718253bA7D4': {
    name: 'WETH',
    icon: <EthIcon />,
  },
  '0x6ff9e328b50f1d81ec7a828EB1C7F27b4A3e0e09': {
    name: 'WBTC',
    icon: <BtcIcon />,
  },
  '0x15E38De09a6453Ae9D1acc591b47baa5dA5C03dE': {
    name: 'USDC',
    icon: <USDCIcon />,
  },
  '0x416A4cA8a82c6aDc2fD49a417C4D5f9CcfbbDE1e ': {
    name: 'ARB',
    icon: <ArbIcon />,
  },
  '0x90bD86E8E74D6A28a4cDEABf3c6Db2890818AD7B': {
    name: 'DAI',
    icon: <DaiIcon />,
  },
  '0x087E9fb036843d25E6F7bC6D6531258A10749fE7': {
    name: 'UNI',
    icon: <UniIcon />,
  },
};

//@ts-ignore
export const getTokenDetails = address =>
  // @ts-ignore
  tokenAddressMap[address] || { name: 'UNKNOWN', icon: null };
