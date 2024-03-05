'use client';

import dynamic from 'next/dynamic';
export const WidgetPage = dynamic(
  () => import('@/configs/widgetConfig').then(module => module.Widget) as any,
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <div>
      <WidgetPage />
    </div>
  );
}
