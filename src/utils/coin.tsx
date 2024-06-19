'use client';
import EthIcon from '../../public/EthIcon';
import BtcIcon from '../../public/BtcIcon';
import USDCIcon from '../../public/USDCIcon';
import ArbIcon from '../../public/ArbIcon';
import DaiIcon from '../../public/DaiIcon';
import UniIcon from '../../public/UniIcon';

const tokenAddressMap = {
  '0xD34738726C013a0184965A5C6603C0AA7BCF6B80': {
    name: 'WETH',
    icon: <EthIcon />,
  },
  '0x3E34D176dc568414f3DB022C2DE8c4076e3B6043': {
    name: 'WBTC',
    icon: <BtcIcon />,
  },
  '0x569da455F23155612437eEd8CfF2106aE7e6C158': {
    name: 'USDC',
    icon: <USDCIcon />,
  },
  '0xdB722aD58d55cE8FdCa16c86462BCBa8739E3e58': {
    name: 'ARB',
    icon: <ArbIcon />,
  },
  '0xc399E512Ff58882305A9C38f2C6d806f6F77f178': {
    name: 'DAI',
    icon: <DaiIcon />,
  },
  '0x5632a6D2E2aF12f20f69F78ee85AB2aE77F9949d': {
    name: 'UNI',
    icon: <UniIcon />,
  },
};

//@ts-ignore
export const getTokenDetails = address =>
  // @ts-ignore
  tokenAddressMap[address] || { name: 'UNKNOWN', icon: null };
