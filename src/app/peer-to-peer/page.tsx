import React from 'react';
import PeerToPeerPage from './PeerToPeerPage/PeerToPeerPage';
import { ILendingData } from '@/components/PeerToPeerTable/columns';

async function getData(): Promise<ILendingData[]> {
  // Fetch data from your API here.
  return [
    {
      lending_id: '1',
      wallet_address: '0x1234',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-01-01',
      type: 'lend',
    },
    {
      lending_id: '2',
      wallet_address: '0x5678',
      coin: 'BTC',
      amount: 200,
      created_at: '2021-01-02',
      type: 'lend',
    },
    {
      lending_id: '3',
      wallet_address: '0x9101',
      coin: 'ETH',
      amount: 300,
      created_at: '2021-01-03',
      type: 'lend',
    },
    {
      lending_id: '4',
      wallet_address: '0x1121',
      coin: 'BTC',
      amount: 400,
      created_at: '2021-01-04',
      type: 'lend',
    },
    //add 10 more data
    {
      lending_id: '5',
      wallet_address: '0x1234',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-01-01',
      type: 'lend',
    },
    {
      lending_id: '6',
      wallet_address: '0x5678',
      coin: 'BTC',
      amount: 200,
      created_at: '2021-01-02',
      type: 'lend',
    },
    {
      lending_id: '7',
      wallet_address: '0x9101',
      coin: 'ETH',
      amount: 300,
      created_at: '2021-01-03',
      type: 'lend',
    },
    {
      lending_id: '8',
      wallet_address: '0x1121',
      coin: 'BTC',
      amount: 400,
      created_at: '2021-01-04',
      type: 'lend',
    },
    {
      lending_id: '9',
      wallet_address: '0x1234',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-01-01',
      type: 'lend',
    },
    {
      lending_id: '10',
      wallet_address: '0x5678',
      coin: 'BTC',
      amount: 200,
      created_at: '2021-01-02',
      type: 'lend',
    },
    {
      lending_id: '11',
      wallet_address: '0x9101',
      coin: 'ETH',
      amount: 300,
      created_at: '2021-01-03',
      type: 'lend',
    },
    {
      lending_id: '12',
      wallet_address: '0x1121',
      coin: 'BTC',
      amount: 400,
      created_at: '2021-01-04',
      type: 'lend',
    },
    {
      lending_id: '13',
      wallet_address: '0x1234',
      coin: 'ETH',
      amount: 100,
      created_at: '2021-01-01',
      type: 'lend',
    },
    {
      lending_id: '14',
      wallet_address: '0x5678',
      coin: 'BTC',
      amount: 200,
      created_at: '2021-01-02',
      type: 'lend',
    },
    // ...
  ];
}

const page = async () => {
  const data = await getData();
  return <PeerToPeerPage data={data} />;
};

export default page;
