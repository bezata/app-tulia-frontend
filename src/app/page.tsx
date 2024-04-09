'use client';
import { TuliaSwap } from '@/configs/widgetConfig';
import { useSignit } from '@/lens/lens';

export default function Home() {
  return (
    <div>
      <TuliaSwap />
    </div>
  );
}
