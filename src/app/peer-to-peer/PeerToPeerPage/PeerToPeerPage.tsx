'use client';
import { PeerToPeerTable } from '@/components/PeerToPeerTable/PeerToPeerTable';
import { columns, ILandingData } from '@/components/PeerToPeerTable/columns';
import SectionSelector from '@/components/SectionSelector/SectionSelector';
import { Button } from '@/components/ui/button';
import { setExample, setSection } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { HelpCircle, Landmark, PlusCircle } from 'lucide-react';
import React from 'react';

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
          <HelpCircle className="w-4 h-4 inline-block mr-1" />
          This is the open market lending page.Here you can see all the lending
          requests.
        </p>
      </div>
      <SectionSelector />
      {section && (
        <Button
          variant="outline"
          className="mb-4 capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
        >
          {section} Request <PlusCircle className="w-4 h-4 inline-block ml-2" />
        </Button>
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
