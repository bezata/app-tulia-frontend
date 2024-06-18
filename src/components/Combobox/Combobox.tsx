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
    label: 'WETH',
    value: '0xD34738726C013a0184965A5C6603C0AA7BCF6B80',
    symbol: <EthIcon />,
  },
  {
    label: 'WBTC',
    value: '0x3E34D176dc568414f3DB022C2DE8c4076e3B6043',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDC',
    value: '0x569da455F23155612437eEd8CfF2106aE7e6C158',
    symbol: <USDCIcon />,
  },
  {
    label: 'ARB',
    value: '0xdB722aD58d55cE8FdCa16c86462BCBa8739E3e58',
    symbol: <ArbIcon />,
  },
  {
    label: 'DAI',
    value: '0xc399E512Ff58882305A9C38f2C6d806f6F77f178',
    symbol: <DaiIcon />,
  },
  {
    label: 'UNI',
    value: '0x5632a6D2E2aF12f20f69F78ee85AB2aE77F9949d',
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
