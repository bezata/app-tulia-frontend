'use client';
import { LiFiWidget } from '@lifi/widget';

export const Widget = () => {
  return (
    <LiFiWidget
      integrator="Tulia"
      config={{
        containerStyle: {
          borderRadius: '16px',
          display: 'flex',
          maxWidth: 392,
          boxShadow: '0px 4px 8px rgba(125, 44, 197, 0.06)',
          backgroundColor: '#082D5A',
        },
        theme: {
          palette: {
            primary: { main: '#082D5A' },
            secondary: { main: '#00000' },
            background: {
              paper: '#010E2E',
              default: '#010E2E',
            },
            grey: {},
          },
          shape: {},
          typography: {},
        },
        hiddenUI: ['appearance'],

        variant: 'expandable',
        languages: {
          default: 'en',
        },
      }}
    />
  );
};
