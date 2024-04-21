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
import { PlusCircle, CalendarDays, CodeIcon } from 'lucide-react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { CopyBlock } from 'react-code-blocks';

const schema = z.object({
  lendCoin: z.object({
    label: z.string(),
    value: z.string(),
    symbol: z.any(),
  }),
  borrowCoin: z.object({
    label: z.string(),
    value: z.string(),
    symbol: z.any(),
  }),
  loanAmount: z.string().refine(v => parseFloat(v) > 0),
  interestModal: z.nativeEnum(InterestModal),
  interestRate: z.string().refine(v => parseFloat(v) > 0),
  endDate: z.date(),
});

const LendingReqModal = () => {
  const createTuliaPool = useCreateTuliaPool();
  const [open, setOpen] = React.useState(false);
  const form = useForm<ILendRequest.ILendRequestInputs>({
    defaultValues: {
      lendCoin: { label: 'ETH', value: 'ETH', symbol: <EthIcon /> },
      barrowCoin: { label: 'BTC', value: 'BTC', symbol: <BtcIcon /> },
      loanAmount: 0,
      interestModal: InterestModal.Compound,
      endDate: new Date(),
      interestRate: 0,
    },
    resolver: zodResolver(schema),
  });

  const lendCoin = form.watch('lendCoin');
  const borrowCoin = form.watch('barrowCoin');

  const onSubmit = (data: ILendRequest.ILendRequestInputs) => {
    console.log(data);
  };

  const onCloseClick = () => {
    setOpen(false);
    form.reset();
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
      <DialogContent onClose={onCloseClick} className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Lend Request</DialogTitle>
          <DialogDescription>
            Here you can add a new lending request.
          </DialogDescription>
        </DialogHeader>
        {/* //form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-2 md:max-h-full max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 md:col-span-8 col-span-12 border-r-0 md:pr-4 pr-0 md:pb-0 pb-4 md:border-r border-tulia_primary">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="lendCoin">Lend Coin</Label>
                  <ComboBoxResponsive
                    setValue={form.setValue}
                    mode="lend"
                    selectedItem={lendCoin}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="lendCoin">Borrow Coin</Label>
                  <ComboBoxResponsive
                    setValue={form.setValue}
                    mode="barrow"
                    selectedItem={borrowCoin}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="loanAmount"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 col-span-2">
                      <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input type="number" defaultValue={0} {...field} />
                        </FormControl>
                        <span className="absolute right-8 text-gray-500 top-2">
                          {lendCoin?.label}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {form.watch('loanAmount')
                            ? form.watch('loanAmount')
                            : 0}{' '}
                          {lendCoin?.label} ={' '}
                          {form.watch('loanAmount')
                            ? form.watch('loanAmount')
                            : 0}{' '}
                          {borrowCoin?.label}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interestModal"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 col-span-2">
                      <FormLabel>Interest Modal</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 gap-4 mt-1"
                          defaultValue={InterestModal.Compound}
                        >
                          <div
                            data-selected={
                              form.watch('interestModal') ===
                              InterestModal.Compound
                            }
                            className="flex items-center gap-2 border border-tulia_primary p-2 data-[selected=true]:bg-tulia_primary/50 transition-all rounded-sm"
                          >
                            <FormControl>
                              <RadioGroupItem
                                {...field}
                                value={InterestModal.Compound}
                                id="compound"
                              />
                            </FormControl>
                            <Label htmlFor="compound">
                              Compound{' '}
                              <span className="text-red-500">- 5%</span>
                            </Label>
                          </div>
                          <div
                            data-selected={
                              form.watch('interestModal') ===
                              InterestModal.Simple
                            }
                            className="flex items-center gap-2 border border-tulia_primary p-2 data-[selected=true]:bg-tulia_primary/50 transition-all rounded-sm"
                          >
                            <FormControl>
                              <RadioGroupItem
                                {...field}
                                value={InterestModal.Simple}
                                id="simple"
                              />
                            </FormControl>
                            <Label htmlFor="simple">
                              Simple <span className="text-red-500">- 5%</span>
                            </Label>
                          </div>
                          <div
                            data-selected={
                              form.watch('interestModal') ===
                              InterestModal.FlashLoan
                            }
                            className="flex items-center gap-2 border border-tulia_primary p-2 data-[selected=true]:bg-tulia_primary/50 transition-all rounded-sm"
                          >
                            <FormControl>
                              <RadioGroupItem
                                {...field}
                                value={InterestModal.FlashLoan}
                                id="flashLoan"
                              />
                            </FormControl>
                            <Label htmlFor="flashLoan">
                              Flash Loan{' '}
                              <span className="text-red-500">- 5%</span>
                            </Label>
                          </div>
                          <div
                            data-selected={
                              form.watch('interestModal') ===
                              InterestModal.MarketBased
                            }
                            className="flex items-center gap-2 border border-tulia_primary p-2 data-[selected=true]:bg-tulia_primary/50 transition-all rounded-sm"
                          >
                            <FormControl>
                              <RadioGroupItem
                                {...field}
                                value={InterestModal.MarketBased}
                                id="marketBased"
                              />
                            </FormControl>
                            <Label htmlFor="marketBased">
                              Market Based{' '}
                              <span className="text-red-500">- 5%</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 col-span-2">
                      <FormLabel htmlFor="interestRate">
                        Interest Rate
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            disabled={
                              form.watch('interestModal') === 'MarketBased'
                            }
                            type="number"
                            defaultValue={0}
                            {...field}
                          />
                          <span className="absolute right-8 text-gray-500 top-2">
                            {'%'}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* calendars */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1 col-span-2">
                      <FormLabel htmlFor="endDate">Repayment Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={`flex items-center gap-1`}
                            >
                              {form.watch('endDate') ? (
                                format(form.watch('endDate'), 'PP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={form.watch('endDate')}
                              onSelect={(date: Date | undefined) =>
                                date && form.setValue('endDate', date)
                              }
                              disabled={(date: Date) => {
                                return date < new Date();
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {form.watch('interestModal') === InterestModal.FlashLoan ? (
                <>
                  <div className=" flex flex-col items-center justify-center md:col-span-4 col-span-12 md:pl-4 pl-0 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full">
                    <span className="text-sm font-semibold mb-2">
                      Flash Loan Contract
                    </span>
                    <Dialog>
                      <DialogTrigger className="w-full">
                        <Button className="bg-tulia_primary/50 w-full mt-2">
                          <CodeIcon className="w-4 h-4 inline-block mr-2" />
                          View Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl h-[520px] overflow-y-auto">
                        <DialogTitle>Flash Loan Contract</DialogTitle>
                        <DialogDescription>
                          This is the flash loan contract that you can use to
                          initiate a flash loan request.
                        </DialogDescription>
                        {/* <div className="overflow-y-auto h-[400px] md:col-span-4 col-span-12 md:pl-4 pl-0 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full"> */}
                        <CopyBlock
                          language="solidity"
                          wrapLongLines
                          showLineNumbers
                          text={`
                  // SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";

contract MockFlashBorrower is IERC3156FlashBorrower {
    using SafeERC20 for IERC20;

    IERC3156FlashLender public lender;
    address public admin;

    constructor(address _lender) {
        lender = IERC3156FlashLender(_lender);
        admin = msg.sender;
    }

    // This function initiates a flash loan request
    function requestFlashLoan(address token, uint256 amount, bytes calldata data) external {
        require(msg.sender == admin, "Only admin can initiate flash loan");
        lender.flashLoan(this, token, amount, data);
    }

    // This is the callback function that the lender will call
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        require(msg.sender == address(lender), "Only lender can call this function");
        require(initiator == address(this), "Unrecognized initiator");

        // Placeholder for custom logic to utilize the flash loaned amount
        // Example: arbitrage, collateral swap, etc.
        // data can be used to pass custom parameters needed for the operation

        // Repay the flash loan
        uint256 totalRepayment = amount + fee;
        IERC20(token).safeTransfer(msg.sender, totalRepayment);

        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function setLender(address _lender) external {
        require(msg.sender == admin, "Only admin can set lender");
        lender = IERC3156FlashLender(_lender);
    }
}
`}
                        />
                        {/* </div> */}
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              ) : (
                <div className="md:col-span-4 col-span-12 md:pl-4 pl-0 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-sm font-semibold">
                        Borrow Coin Amount
                      </span>
                      <span className="text-green-500">
                        {form.watch('loanAmount')
                          ? form.watch('loanAmount')
                          : 0}{' '}
                        {borrowCoin?.label}
                      </span>
                    </div>
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-sm font-semibold">
                        Interest Rate
                      </span>
                      <span className="text-green-500">
                        {form.watch('interestRate')
                          ? form.watch('interestRate')
                          : 0}
                        {'%'}
                      </span>
                    </div>
                    {/* Collateral Amount */}
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-sm font-semibold">
                        Collateral Amount
                      </span>
                      <span className="text-green-500">
                        0 {lendCoin?.label}
                      </span>
                    </div>
                    {/* You will gain NUMBER THT Coin for this position */}
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-xs font-semibold">
                        You will gain{' '}
                        <span className="text-green-600"> {'{NUMBER}'} </span>{' '}
                        <span className="text-indigo-600">THT Coins </span> for
                        this lend position
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Collateral amount is calculated based on the interest rate
                      and the loan amount
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4 mt-4 border-t border-indigo-900 pt-4">
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LendingReqModal;
