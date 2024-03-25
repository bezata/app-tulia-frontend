import { setSection } from '@/lib/features/example/exampleSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { HandCoins, Handshake, HelpCircle } from 'lucide-react';
import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const SectionSelector = () => {
  const dispatch = useAppDispatch();
  const { section } = useAppSelector(state => state.example);

  const onClickSelector = (section: 'barrow' | 'lend') => {
    dispatch(setSection(section));
  };

  return (
    <div className="pb-10 flex flex-col items-center mx-auto justify-start w-full gap-2">
      <span className="text-sm text-gray-500">
        Select position type:{' '}
        <HoverCard>
          <HoverCardTrigger>
            <HelpCircle className="w-4 h-4 inline-block mr-2 text-white cursor-pointer" />
          </HoverCardTrigger>
          <HoverCardContent side="top">
            <p>
              Choose between barrow and lend to filter the data based on the
              type and add new request for your selected type.
            </p>
          </HoverCardContent>
        </HoverCard>
      </span>

      <div className="flex justify-center">
        <button
          onClick={() => onClickSelector('barrow')}
          className={`${section === 'barrow' && 'bg-tulia_primary/30'} cursor-pointer bg-tulia_primary hover:bg-tulia_primary/30 hover:text-indigo-500w border-[0.5px] border-indigo-500 transition-all ease-in text-white font-light text-sm py-2 px-4 rounded-l`}
        >
          <HandCoins className="w-4 h-4 inline-block mr-2" />
          Barrow
        </button>
        <button
          onClick={() => onClickSelector('lend')}
          className={`${section === 'lend' && 'bg-tulia_primary/30'} cursor-pointer bg-tulia_primary hover:bg-tulia_primary/30 hover:text-indigo-500w border-[0.5px] border-indigo-500 transition-all ease-in text-white font-light text-sm py-2 px-4 rounded-r`}
        >
          Lend
          <Handshake className="w-4 h-4 inline-block ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SectionSelector;
