import { IconClock } from '@tabler/icons-react';
import React from 'react';
import { CardDemo } from '@/components/TuliaComingSoon/TuliaComing';
const page = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Coming soon */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mt-8 text-primary sm:text-5xl">
          Tulia Decentralized Personalized Lending Protocol
        </h1>
        <p className="text-xl mt-4">Coming soon for Mainnet</p>
        <p className="text-xl">Stay tuned!</p>
        {/* description */} <CardDemo />
      </div>
    </div>
  );
};

export default page;
