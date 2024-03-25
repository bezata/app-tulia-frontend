import React from 'react';

const SectionSelector = () => {
  return (
    <div>
      <div className="flex justify-center">
        <button className="bg-tulia_primary hover:bg-tulia_primary/30 hover:text-indigo-500 border-[0.5px] border-indigo-500 transition-all ease-in text-white font-light text-sm py-2 px-4 rounded-l">
          Loan Request
        </button>
        <button className="bg-tulia_primary hover:bg-tulia_primary/30 hover:text-indigo-500 border-[0.5px] border-indigo-500 transition-all ease-in text-white font-light text-sm py-2 px-4 rounded-r">
          Loan Offer
        </button>
      </div>
    </div>
  );
};

export default SectionSelector;
