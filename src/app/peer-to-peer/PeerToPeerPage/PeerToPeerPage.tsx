'use client';
import { PeerToPeerTable } from '@/components/PeerToPeerTable/PeerToPeerTable';
import { columns, ILandingData } from '@/components/PeerToPeerTable/columns';
import SectionSelector from '@/components/SectionSelector/SectionSelector';
import { Button } from '@/components/ui/button';
import { setSection } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { HelpCircle, Landmark, PlusCircle } from 'lucide-react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PeerToPeerPage = ({ data }: { data: any }) => {
  const { section } = useAppSelector(state => state.example);
  const [filteredData, setFilteredData] = React.useState<ILandingData[]>(data);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(setSection(null));
    };
  }, []);

  React.useEffect(() => {
    if (section === 'barrow') {
      setFilteredData(data.filter((item: any) => item.type === 'barrow'));
    } else if (section === 'lend') {
      setFilteredData(data.filter((item: any) => item.type === 'lend'));
    } else {
      return setFilteredData(data);
    }
  }, [section]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-start border-b mb-4 p-2 border-tulia_primary/50">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Landmark className="w-4 h-4 inline-block mr-2" />
          Open Market Lending
        </h2>
        <p className="text-sm text-gray-500 mb-4 flex items-center">
          {/* TODO: DCSELEK: Guzel bir aciklama ? */}
          <HelpCircle className="w-4 h-4 inline-block mr-1" />
          This is the open market lending page.Here you can see all the lending
          requests.
        </p>
      </div>
      <SectionSelector />
      {/* TODO: DCSELEK: Convert component to this dialog */}
      {section && (
        <Dialog>
          <DialogTrigger>
            <Button
              variant="outline"
              className="mb-4 capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
            >
              {section} Request{' '}
              <PlusCircle className="w-4 h-4 inline-block ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {section === 'barrow'
                  ? 'Add Barrow Request'
                  : 'Add Lend Request'}
              </DialogTitle>
              <DialogDescription>
                Here you can add a new {section} request.
              </DialogDescription>
              {/* //form */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="coin" className="text-sm text-gray-500">
                    Coin
                  </label>
                  <select
                    name="coin"
                    id="coin"
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="ETH">ETH</option>
                    <option value="BTC">BTC</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="amount" className="text-sm text-gray-500">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" className="border-tulia_primary">
                  Cancel
                </Button>
                <Button className="bg-tulia_primary/50">Submit</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {section === null && (
        <h2 className="text-md font-light mb-4 ">
          All Lending Requests (Total: 321314)
        </h2>
      )}
      <PeerToPeerTable columns={columns} data={filteredData} />
    </div>
  );
};

export default PeerToPeerPage;
