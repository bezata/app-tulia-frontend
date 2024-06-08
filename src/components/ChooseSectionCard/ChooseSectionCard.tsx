import React from 'react';
import LendIcon from '../../../public/LendIcon';
import BorrowIcon from '../../../public/BorrowIcon';

interface ChooseSectionCardProps {
  positionTitle: string;
  positionDescription: string;
  section: 'lend' | 'borrow';
  setSection: (section: 'lend' | 'borrow') => void;
}

const ChooseSectionCard = ({
  section,
  setSection,
  positionTitle,
  positionDescription,
}: ChooseSectionCardProps) => {
  return (
    <button
      onClick={() => setSection(section)}
      className="md:col-span-6 col-span-12 flex flex-col justify-center items-center h-48 w-full border mb-4 p-8 bg-tulia_primary/50 border-tulia_primary/50 hover:bg-tulia_primary/30 cursor-pointer hover:scale-105 transition-transform rounded-lg"
    >
      {section === 'borrow' && <BorrowIcon className="w-48 h-48 fill-white" />}
      {section === 'lend' && (
        <LendIcon className="w-48 h-48 stroke-tulia_primary fill-white" />
      )}
      <span className="text-xl font-bold">{positionTitle}</span>
      <span className="text-sm text-gray-400">{positionDescription}</span>
    </button>
  );
};

export default ChooseSectionCard;
