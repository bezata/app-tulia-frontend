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

const cryptoCurrencies: ILendRequest.CryptoCurrency[] = [
  {
    label: 'ETH',
    value: '0xC7De508085c395E9a2e5fd738e3b7804e641Cd84',
    symbol: <EthIcon />,
  },
  {
    label: 'BTC',
    value: '0xC7De508085c395E9a2e5fd738e3b7804e641Cd84',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDT',
    value: '0xC7De508085c395E9a2e5fd738edfgfdg3b7804e641Cd84',
    symbol: <BtcIcon />,
  },
  {
    label: 'USDC',
    value: '0xC7De508085c395E9a2e5fd738e3b7ddfg804e641Cd84',
    symbol: <EthIcon />,
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
              <>{selectedCurrency.label}</>
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
  //NOTE: kanka cidden niye disabled amk??? -behzat
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
