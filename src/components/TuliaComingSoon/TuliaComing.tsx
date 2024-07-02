'use client';
import { animate, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>Coming Soon</CardTitle>
      <CardDescription>
        Conventional lending will be public on the mainnet. Stay tuned
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ['translateY(0px)', 'translateY(-4px)', 'translateY(0px)'];
  const sequence = [
    [
      '.circle-1',
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      '.circle-2',
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      '.circle-3',
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      '.circle-4',
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      '.circle-5',
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    // @ts-ignore
    animate(sequence, {
      repeat: Infinity,
      repeatDelay: 1,
    });
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
        <Container className="h-8 w-8 circle-1">
          <ClaudeLogo className="h-4 w-4 " />
        </Container>
        <Container className="h-12 w-12 circle-2">
          <Vector className="h-6 w-6 text-white" />
        </Container>
        <Container className="circle-3">
          <OpenAILogo className="h-8 w-8 text-white" />
        </Container>
        <Container className="h-12 w-12 circle-4">
          <MetaIconOutline className="h-6 w-6 " />
        </Container>
        <Container className="h-8 w-8 circle-5">
          <GeminiLogo className="h-4 w-4 " />
        </Container>
      </div>

      <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: '50%',
            zIndex: 1,
          }}
          className="inline-block bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'max-w-sm w-full mx-auto p-8 rounded-xl bg-transparent  group',
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn('text-lg font-semibold text-white py-2', className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn('text-sm font-normal text-neutral-400 max-w-sm', className)}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        'h-[18rem] md:h-[22rem] rounded-xl z-40',
        className,
        showGradient &&
          ' [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]'
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};

export const ClaudeLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 2000 2000"
      className={className}
    >
      <style type="text/css">
        {`.st0 { fill: #070A0E; }
          .st1 { fill-rule:evenodd; clip-rule:evenodd; fill: #00D395; }`}
      </style>
      <rect className="st0" width="2000" height="2000" />
      <path
        className="st1"
        d="M577.7,1335.3c-29.9-18.3-48.2-50.8-48.2-85.8v-195.4c0-23.2,18.9-42,42.1-41.9c7.4,0,14.7,2,21.1,5.7
        l440.9,257.1c25.8,15,41.7,42.6,41.7,72.5v202.4c0.1,27.8-22.4,50.4-50.2,50.4c-9.3,0-18.5-2.6-26.4-7.4L577.7,1335.3z
        M1234.9,964.4c25.8,15,41.6,42.7,41.7,72.5v410.8c0,12.1-6.5,23.3-17.1,29.2l-96.5,54.3c-1.2,0.7-2.5,1.2-3.9,1.6v-228.1
        c0-29.5-15.5-56.9-40.9-72.1L731,1001V743.5c0-23.2,18.9-42,42.1-41.9c7.4,0,14.7,2,21.1,5.7L1234.9,964.4z
        M1427.9,661c25.9,15,41.8,42.7,41.8,72.6v600c-0.1,12.3-6.9,23.6-17.7,29.5l-91.5,49.4V994.8c0-29.5-15.5-56.8-40.7-72L924,685.4V441.2
        c0-7.4,2-14.7,5.6-21.1c11.7-20,37.4-26.8,57.4-15.2L1427.9,661z"
      />
    </svg>
  );
};
export const Vector = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      className={className}
    >
      <style type="text/css">
        {`.st0 { clip-path: url(#SVGID_2_); }
          .st1 { fill: url(#SVGID_3_); }
          .st2 { fill: #FFFFFF; }`}
      </style>
      <defs>
        <rect id="SVGID_1_" width="800" height="800" />
        <clipPath id="SVGID_2_">
          <use xlinkHref="#SVGID_1_" style={{ overflow: 'visible' }} />
        </clipPath>
        <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="-597.3553"
          y1="900.6861"
          x2="-598.0993"
          y2="900.0601"
          gradientTransform="matrix(776 0 0 -776 464237 699089)"
        >
          <stop offset="0" style={{ stopColor: '#B6509E' }} />
          <stop offset="1" style={{ stopColor: '#2EBAC6' }} />
        </linearGradient>
      </defs>
      <g className="st0">
        <circle className="st1" cx="400" cy="400" r="388" />
        <path
          className="st2"
          d="M569.8,554.6L438.6,237.4c-7.4-16.4-18.4-24.4-32.9-24.4h-11.6c-14.5,0-25.5,8-32.9,24.4l-57.1,138.2h-43.2
            c-12.9,0.1-23.4,10.5-23.5,23.5v0.3c0.1,12.9,10.6,23.4,23.5,23.5h23.2l-54.5,131.7c-1,2.9-1.6,5.9-1.6,9c0,7.4,2.3,13.2,6.4,17.7
            s10,6.7,17.4,6.7c4.9-0.1,9.6-1.6,13.5-4.5c4.2-2.9,7.1-7.1,9.4-11.9l60-148.8h41.6c12.9-0.1,23.4-10.5,23.5-23.5v-0.6
            c-0.1-12.9-10.6-23.4-23.5-23.5h-22.2l45.8-114.1l124.8,310.4c2.3,4.8,5.2,9,9.4,11.9c3.9,2.9,8.7,4.4,13.5,4.5
            c7.4,0,13.2-2.2,17.4-6.7c4.2-4.5,6.4-10.3,6.4-17.7C571.5,560.5,571,557.4,569.8,554.6z"
        />
      </g>
    </svg>
  );
};

export const OpenAILogo = ({ className }: { className?: string }) => {
  return <Image src="/logo.png" layout="fill" alt="Tulia" objectFit="cover" />;
};
export const GeminiLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      className={className}
    >
      <style type="text/css">
        {`.st0 { clip-path: url(#SVGID_2_); }
          .st1 { fill: url(#SVGID_3_); }
          .st2 { fill: #FFFFFF; }`}
      </style>
      <defs>
        <rect id="SVGID_1_" width="800" height="800" />
        <clipPath id="SVGID_2_">
          <use xlinkHref="#SVGID_1_" style={{ overflow: 'visible' }} />
        </clipPath>
        <linearGradient
          id="SVGID_3_"
          gradientUnits="userSpaceOnUse"
          x1="-597.3553"
          y1="900.6861"
          x2="-598.0993"
          y2="900.0601"
          gradientTransform="matrix(776 0 0 -776 464237 699089)"
        >
          <stop offset="0" style={{ stopColor: '#B6509E' }} />
          <stop offset="1" style={{ stopColor: '#2EBAC6' }} />
        </linearGradient>
      </defs>
      <g className="st0">
        <circle className="st1" cx="400" cy="400" r="388" />
        <path
          className="st2"
          d="M569.8,554.6L438.6,237.4c-7.4-16.4-18.4-24.4-32.9-24.4h-11.6c-14.5,0-25.5,8-32.9,24.4l-57.1,138.2h-43.2
            c-12.9,0.1-23.4,10.5-23.5,23.5v0.3c0.1,12.9,10.6,23.4,23.5,23.5h23.2l-54.5,131.7c-1,2.9-1.6,5.9-1.6,9c0,7.4,2.3,13.2,6.4,17.7
            s10,6.7,17.4,6.7c4.9-0.1,9.6-1.6,13.5-4.5c4.2-2.9,7.1-7.1,9.4-11.9l60-148.8h41.6c12.9-0.1,23.4-10.5,23.5-23.5v-0.6
            c-0.1-12.9-10.6-23.4-23.5-23.5h-22.2l45.8-114.1l124.8,310.4c2.3,4.8,5.2,9,9.4,11.9c3.9,2.9,8.7,4.4,13.5,4.5
            c7.4,0,13.2-2.2,17.4-6.7c4.2-4.5,6.4-10.3,6.4-17.7C571.5,560.5,571,557.4,569.8,554.6z"
        />
      </g>
    </svg>
  );
};

export const MetaIconOutline = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 2000 2000"
      className={className}
    >
      <style type="text/css">
        {`.st0 { fill: #070A0E; }
          .st1 { fill-rule:evenodd; clip-rule:evenodd; fill: #00D395; }`}
      </style>
      <rect className="st0" width="2000" height="2000" />
      <path
        className="st1"
        d="M577.7,1335.3c-29.9-18.3-48.2-50.8-48.2-85.8v-195.4c0-23.2,18.9-42,42.1-41.9c7.4,0,14.7,2,21.1,5.7
        l440.9,257.1c25.8,15,41.7,42.6,41.7,72.5v202.4c0.1,27.8-22.4,50.4-50.2,50.4c-9.3,0-18.5-2.6-26.4-7.4L577.7,1335.3z
        M1234.9,964.4c25.8,15,41.6,42.7,41.7,72.5v410.8c0,12.1-6.5,23.3-17.1,29.2l-96.5,54.3c-1.2,0.7-2.5,1.2-3.9,1.6v-228.1
        c0-29.5-15.5-56.9-40.9-72.1L731,1001V743.5c0-23.2,18.9-42,42.1-41.9c7.4,0,14.7,2,21.1,5.7L1234.9,964.4z
        M1427.9,661c25.9,15,41.8,42.7,41.8,72.6v600c-0.1,12.3-6.9,23.6-17.7,29.5l-91.5,49.4V994.8c0-29.5-15.5-56.8-40.7-72L924,685.4V441.2
        c0-7.4,2-14.7,5.6-21.1c11.7-20,37.4-26.8,57.4-15.2L1427.9,661z"
      />
    </svg>
  );
};
