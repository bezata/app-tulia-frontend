import { Clock10 } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Coming soon */}
      <div className="text-center">
        <Clock10 className="w-16 h-16 mx-auto text-white" />
        <h1 className="text-4xl font-extrabold mt-8 text-primary sm:text-5xl">
          Tulia Decentralized Personalized Lending Protocol
        </h1>
        <p className="text-xl mt-4">Coming soon for Mainnet</p>
        <p className="text-xl">Stay tuned!</p>
        {/* description */}
        <div className="mt-8 text-gray-500">
          <p className="text-md">
            Tulia is an open source and non-custodial protocol enabling users to
            earn interest on deposits and borrow assets.
          </p>
          <p className="text-md">
            Tulia is a decentralized finance protocol that allows people to lend
            and borrow crypto. Lenders earn interest by depositing digital
            assets into specially created liquidity pools. Borrowers can then
            use their crypto as collateral to take out a flash loan using this
            liquidity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
