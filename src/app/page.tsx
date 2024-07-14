'use client';
import { TuliaSwap } from '@/configs/widgetConfig';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-12rem)]">
      <div className="pt-8 sm:pt-22">
        <TuliaSwap />
      </div>
    </div>
  );
}
