import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarDays } from 'lucide-react';
import { useCreateTuliaPool } from '@/lens/lens';
import { ComboBoxResponsive } from '../Combobox/Combobox';
import { useForm } from 'react-hook-form';
import ILendRequest, { InterestModal } from '@/types/LendRequest/ILendRequest';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

const schema = z.object({
  lendCoin: z.object({
    label: z.string(),
    value: z.string(),
    symbol: z.any(),
  }),
  barrowCoin: z.object({
    label: z.string(),
    value: z.string(),
    symbol: z.any(),
  }),
  loanAmount: z.number(),
  interestModal: z.nativeEnum(InterestModal),
  publishDate: z.date(),
  endDate: z.date(),
});

const LendingReqModal = () => {
  const createTuliaPool = useCreateTuliaPool();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ILendRequest.ILendRequestInputs>({
    defaultValues: {
      lendCoin: { label: 'ETH', value: 'ETH', symbol: <EthIcon /> },
      barrowCoin: { label: 'BTC', value: 'BTC', symbol: <BtcIcon /> },
      loanAmount: 0,
      interestModal: InterestModal.Compound,
      publishDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(schema),
  });

  const lendCoin = watch('lendCoin');
  const barrowCoin = watch('barrowCoin');

  const onSubmit = (data: ILendRequest.ILendRequestInputs) => {
    console.log(data);
  };

  const onCloseClick = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTrigger>
        <Button
          onClick={() => setOpen(true)}
          className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
        >
          Lending Request <PlusCircle className="w-4 h-4 inline-block ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent onClose={onCloseClick}>
        <DialogHeader>
          <DialogTitle>Add Lend Request</DialogTitle>
          <DialogDescription>
            Here you can add a new lending request.
          </DialogDescription>
        </DialogHeader>
        {/* //form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="lendCoin">Lend Coin</Label>
              <ComboBoxResponsive
                setValue={setValue}
                mode="lend"
                selectedItem={lendCoin}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="lendCoin">Barrow Coin</Label>
              <ComboBoxResponsive
                setValue={setValue}
                mode="barrow"
                selectedItem={barrowCoin}
              />
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <Label htmlFor="loanAmount">Loan Amount</Label>
              <div className="relative">
                <Input
                  type="number"
                  {...register('loanAmount', { required: true })}
                />
                <span className="absolute right-8 text-gray-500 top-2">
                  {lendCoin?.label}
                </span>
                <span className="text-gray-500 text-xs">
                  {watch('loanAmount') ? watch('loanAmount') : 0}{' '}
                  {lendCoin?.label} ={' '}
                  {watch('loanAmount') ? watch('loanAmount') : 0}{' '}
                  {barrowCoin?.label}
                </span>
              </div>
              {errors.loanAmount && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <Label>Interest Modal</Label>
              <RadioGroup
                className="flex gap-4 mt-1"
                defaultValue={InterestModal.Compound}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    {...register('interestModal')}
                    value={InterestModal.Compound}
                    id="compound"
                  />
                  <Label htmlFor="compound">
                    Compound <span className="text-red-500">- 5%</span>
                  </Label>
                </div>
                <RadioGroupItem
                  {...register('interestModal')}
                  value={InterestModal.Simple}
                  id="simple"
                />
                <Label htmlFor="simple">
                  Simple <span className="text-red-500">- 5%</span>
                </Label>
                <RadioGroupItem
                  {...register('interestModal')}
                  value={InterestModal.MarketBased}
                  id="marketBased"
                />
                <Label htmlFor="marketBased">
                  Market Based <span className="text-red-500">- 5%</span>
                </Label>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={`flex items-center gap-1 ${
                      errors.publishDate ? 'border-red-500' : ''
                    }`}
                  >
                    {watch('publishDate') ? (
                      format(watch('publishDate'), 'PP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch('publishDate')}
                    onSelect={(date: Date | undefined) =>
                      date && setValue('publishDate', date)
                    }
                    disabled={(date: Date) => {
                      return date < new Date();
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.publishDate && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="endDate">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={`flex items-center gap-1 ${
                      errors.endDate ? 'border-red-500' : ''
                    }`}
                  >
                    {watch('endDate') ? (
                      format(watch('endDate'), 'PP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch('endDate')}
                    onSelect={(date: Date | undefined) =>
                      date && setValue('endDate', date)
                    }
                    disabled={(date: Date) => {
                      return date < new Date(watch('publishDate'));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <DialogClose>
              <Button
                variant="outline"
                className="border-tulia_primary"
                type="button"
                onClick={onCloseClick}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-tulia_primary/50">
              Create <PlusCircle className="w-4 h-4 inline-block ml-2" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LendingReqModal;
