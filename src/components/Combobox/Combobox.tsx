'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ILendRequest from '@/types/LendRequest/ILendRequest';
import BtcIcon from '../../../public/BtcIcon';
import EthIcon from '../../../public/EthIcon';
import USDCIcon from '../../../public/USDCIcon';
import ArbIcon from '../../../public/ArbIcon';
import DaiIcon from '../../../public/DaiIcon';
import UniIcon from '../../../public/UniIcon';

const cryptoCurrencies: ILendRequest.CryptoCurrency[] = [
  {
    label: 'ETH',
    value: '0x2ABFB11CBF39B135237bdF6c04782718253bA7D4',
    symbol: <EthIcon />,
  },
  {
    label: 'WBTC',
    value: '0x6ff9e328b50f1d81ec7a828EB1C7F27b4A3e0e09',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDC',
    value: '0x15E38De09a6453Ae9D1acc591b47baa5dA5C03dE',
    symbol: <USDCIcon />,
  },
  {
    label: 'ARB',
    value: '0x416A4cA8a82c6aDc2fD49a417C4D5f9CcfbbDE1e',
    symbol: <ArbIcon />,
  },
  {
    label: 'DAI',
    value: '0x90bD86E8E74D6A28a4cDEABf3c6Db2890818AD7B',
    symbol: <DaiIcon />,
  },
  {
    label: 'UNI',
    value: '0x087E9fb036843d25E6F7bC6D6531258A10749fE7',
    symbol: <UniIcon />,
  },
];

export function ComboBoxResponsive({
  mode,
  selectedItem,
  setValue,
}: {
  mode: 'lend' | 'borrow';
  selectedItem: ILendRequest.CryptoCurrency;
  setValue: any;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<ILendRequest.CryptoCurrency | null>(selectedItem);

  React.useEffect(() => {
    setValue(`${mode}Coin`, selectedCurrency);
  }, [selectedCurrency]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedCurrency ? (
              <>
                {selectedCurrency.symbol}
                {selectedCurrency.label}
              </>
            ) : (
              <>+ Set {mode} currency</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedCurrency={setSelectedCurrency}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedCurrency ? <>{selectedCurrency.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (currency: ILendRequest.CryptoCurrency | null) => void;
}) {
  //NOTE: neden disabled amk???
  //NOTE: kanka cidden niye disabled amk???
  //NOTE: yağız çözdü kanka
  //Note: Abi çözdüm
  return (
    <Command>
      <CommandInput placeholder="Filter currency..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {cryptoCurrencies.map(currency => (
            <CommandItem
              key={`${currency.label}-${currency.value}`}
              value={currency.value}
              onSelect={value => {
                setSelectedCurrency(
                  cryptoCurrencies.find(priority => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
