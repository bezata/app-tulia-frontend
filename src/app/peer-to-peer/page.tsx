import React from 'react';
import PeerToPeerPage from './PeerToPeerPage/PeerToPeerPage';
import { ILandingData } from '@/components/PeerToPeerTable/columns';

async function getData(): Promise<ILandingData[]> {
  // Fetch data from your API here.
  return [
    {
      landing_id: '1',
      wallet_address: '0x1234',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-01-01',
    },
    {
      landing_id: '2',
      wallet_address: '0x5678',
      coin: 'BTC',
      amount: 200,
      created_at: '2021-01-02',
    },
    // ...
  ];
}

const page = async () => {
  const data = await getData();
  return <PeerToPeerPage data={data} />;
};

export default page;
