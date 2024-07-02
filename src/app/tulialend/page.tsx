import { IconClock } from '@tabler/icons-react';
import React from 'react';
import { CardDemo } from '@/components/TuliaComingSoon/TuliaComing';
const page = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Coming soon */}
      <div className="text-center">
        {/* description */} <CardDemo />
      </div>
    </div>
  );
};

export default page;
