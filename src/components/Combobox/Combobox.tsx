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
    value: '0x38A3FfF5C1FebDA2CF33725d96A71271a48b257a',
    symbol: <EthIcon />,
  },
  {
    label: 'WBTC',
    value: '0x762C6842c858898C0DE653Cc0E39De51b84493c5',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDC',
    value: '0x00Dc19B6C30d06F2f0B1aF8934c9fb73D821F55B',
    symbol: <USDCIcon />,
  },
  {
    label: 'ARB',
    value: '0xC7De508085c395E9a2e5fd738e3b7ddfg804e641Cd84',
    symbol: <ArbIcon />,
  },
  {
    label: 'DAI',
    value: '0x9A9f2BC83c2071bc458844A1421875d8D08B1e31',
    symbol: <DaiIcon />,
  },
  {
    label: 'UNI',
    value: '0x6a81A32DE20937c4235AA8F81AeD1b6B079c810D',
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
