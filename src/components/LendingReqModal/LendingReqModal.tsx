import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { parseEther, formatEther, formatUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarDays } from 'lucide-react';
import {
  useCalculateInterest,
  useCalculateCompoundInterest,
  useCalculateRewardApy,
} from '@/lens/lens';
import { ComboBoxResponsive } from '../Combobox/Combobox';
import { useForm } from 'react-hook-form';
import ILendRequest, { InterestModal } from '@/types/LendRequest/ILendRequest';
import EthIcon from '../../../public/EthIcon';
import ArbIcon from '../../../public/ArbIcon';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import TransactionProcessModal from '../TransactionProcessModal/TransactionProcessModal';
import { useWriteContract } from 'wagmi';
import { TuliaPoolFactoryABI } from '@/lens/abi/TuliaPoolFactory';

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
  endDate: z.string().refine(v => parseFloat(v) > 0),
  interestAddress: z.string().optional(),
});

const LendingReqModal = () => {
  const { writeContract, data: hash } = useWriteContract();
  const [open, setOpen] = React.useState(false);
  const [collateral, setCollateral] = React.useState(0);
  const [uiCollateral, setUiCollateral] = React.useState(0);
  const [rewardApy, setRewardApy] = React.useState(0);
  const [feeAmount, setFeeAmount] = useState(0);
  const account = useAccount();
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  const [date, setDate] = useState(newDate);
  const form = useForm<ILendRequest.ILendRequestInputs>({
    defaultValues: {
      lendCoin: {
        label: 'WETH',
        value: '0x38A3FfF5C1FebDA2CF33725d96A71271a48b257a',
        symbol: <EthIcon />,
      },
      borrowCoin: {
        label: 'ARB',
        value: '0x348f6BFAdd2F95906094692eE879f28CB2af1eC9',
        symbol: <ArbIcon />,
      },
      loanAmount: undefined,
      interestModal: InterestModal.Simple,
      endDate: undefined,
      interestRate: undefined,
    },
    resolver: zodResolver(schema),
  });

  const calculateFlashFee = (
    amount: number,
    flashLoanFeeRate: number
  ): number => {
    return (amount * flashLoanFeeRate) / 10000;
  };

  const interest = useCalculateInterest({
    principal: parseFloat(form.watch('loanAmount')?.toString() || '0'),
    rate: form.watch('interestRate'),
  });

  const compoundInterest = useCalculateCompoundInterest({
    principal: parseFloat(form.watch('loanAmount')?.toString() || '0'),
    rate: form.watch('interestRate'),
  });
  console.log(hash, 'hash');
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === 'loanAmount' ||
        name === 'interestRate' ||
        name === 'interestModal'
      ) {
        const calculatedCollateral = calculateCollateral(
          parseFloat(value.loanAmount?.toString() || '0'),
          parseFloat(value.interestRate?.toString() || '0')
        );
        setCollateral(calculatedCollateral);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, interest, compoundInterest]);

  const updateInterestAddress = (modal: InterestModal) => {
    let newAddress = '';
    switch (modal) {
      case InterestModal.Compound:
        newAddress = '0x1B1d3f3bdfa7D28eF818c268b59A20e5932dC706';
        break;
      case InterestModal.Simple:
        newAddress = '0x771EE257Ccea2918474d881cfB6e11e2B34e9e93';
        break;
      case InterestModal.FlashLoan:
        newAddress = '0x9a07dc388a44c5A87eD6e5D0D5bB810FC3B7cDA8';
        break;
      case InterestModal.MarketBased:
        newAddress = '0x9a07dc388a44c5A87eD6e5D0D5bB810FC3B7cDA8';
        break;
      default:
        break;
    }
    return newAddress;
  };

  const lendCoin = form.watch('lendCoin');
  const borrowCoin = form.watch('borrowCoin');

  const calculateRewardAPY = useCalculateRewardApy({
    loanAmount: parseEther(form.watch('loanAmount')?.toString() || '0'),
    durationSeconds: 1000,
  });

  const calculateCollateral = (
    loanAmount: number,
    interestRate: number
  ): number => {
    const principal = parseFloat(loanAmount.toString());
    const rate = parseFloat(interestRate.toString());

    const interest = (principal * rate) / 100;
    console.log(
      `Principal: ${principal}, Rate: ${rate}, Interest: ${interest}`
    );
    const total = principal + interest;
    setUiCollateral(total);
    return total;
  };

  useEffect(() => {
    if (calculateRewardAPY) {
      setRewardApy(Number(calculateRewardAPY));
    }
  }, [calculateRewardAPY]);

  const onSubmit = (data: ILendRequest.ILendRequestInputs) => {
    const currentDate = Date.now();
    const currentDateInSeconds = currentDate / 1000;
    // @ts-ignore
    const repaymentEndDateInSeconds = Number(new Date(data.endDate) / 1000);
    const repaymentDifference = Math.trunc(
      repaymentEndDateInSeconds - currentDateInSeconds
    );
    const optionalFlashLoanFeeRate =
      data.interestModal === InterestModal.FlashLoan ? data.interestRate : 0;
    const newInterestAddress = updateInterestAddress(data.interestModal);
    const poolType = data.interestModal === InterestModal.FlashLoan ? 1 : 0;
    const loanAmount = parseEther(String(data?.loanAmount));
    writeContract({
      abi: TuliaPoolFactoryABI,
      address: '0xF3D0a6a51c153445c563d37Ee1d3B8C2C268e468',
      functionName: 'createTuliaPool',
      args: [
        account?.address as any,
        data.lendCoin.value as any,
        data.borrowCoin.value as any,
        data.borrowCoin.value as any,
        loanAmount as any,
        data.interestRate as any,
        10000 as any,
        newInterestAddress as any,
        poolType,
        optionalFlashLoanFeeRate as any,
      ],
    });

    console.log(
      loanAmount,
      data.lendCoin.value,
      data.borrowCoin.value,
      data.borrowCoin.value,
      100000,
      100000,
      newInterestAddress,
      poolType,
      optionalFlashLoanFeeRate
    );
  };

  const onCloseClick = () => {
    setOpen(false);
    form.reset();
    setRewardApy(0);
    setCollateral(0);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'loanAmount' || name === 'interestRate') {
        const loanAmount = parseFloat(value.loanAmount?.toString() || '0');
        const interestRate = parseFloat(value.interestRate?.toString() || '0');
        const calculatedFee = calculateFlashFee(loanAmount, interestRate);
        setFeeAmount(calculatedFee);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  return (
    <Dialog open={open} setOpen={setOpen}>
      <DialogTrigger>
        <Button
          onClick={() => {
            if (account.status === 'connected') {
              setOpen(true);
            } else {
              toast.error('Please connect your wallet to continue');
            }
          }}
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
                    mode="borrow"
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
                          <Input
                            type="number"
                            defaultValue={undefined}
                            {...field}
                          />
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
                          onValueChange={value => {
                            field.onChange(value);
                          }}
                          className="grid grid-cols-2 gap-4 mt-1"
                          defaultValue={InterestModal.Simple}
                        >
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
                              Simple{' '}
                              <span className="text-green-500">- 5%</span>
                            </Label>
                          </div>
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
                                disabled={true}
                              />
                            </FormControl>
                            <Label htmlFor="compound">
                              Compound{' '}
                              <span className="text-red-500">- Soon</span>
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
                              <span className="text-green-500">- 5%</span>
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
                                disabled={true}
                              />
                            </FormControl>
                            <Label htmlFor="marketBased">
                              Market Based{' '}
                              <span className="text-red-500">- Soon</span>
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
                          <Input type="number" defaultValue={0} {...field} />
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
                {form.watch('interestModal') !== InterestModal.FlashLoan && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 col-span-2">
                        <FormLabel htmlFor="endDate">Repayment Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              min={1}
                              type="number"
                              defaultValue={0}
                              {...field}
                            />
                            <span className="absolute right-8 text-gray-500 top-2">
                              {'Days'}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              {form.watch('interestModal') === InterestModal.FlashLoan ? (
                <div className="md:col-span-4 col-span-12 md:pl-4 pl-0 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full">
                  <div className="flex flex-col gap-4">
                    {/* Collateral Amount */}
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-sm font-semibold">Fee Amount</span>
                      <span className="text-green-500">
                        {feeAmount * 100} {borrowCoin?.label}
                      </span>
                    </div>
                    {/* You will gain NUMBER THT Coin for this position */}
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-xs font-semibold">
                        You will gain{' '}
                        <span className="text-green-600">
                          {`${String(rewardApy)}%`}{' '}
                          <span className="text-indigo-600">
                            {' '}
                            {borrowCoin?.label}{' '}
                          </span>
                        </span>
                        <span> interest reward while waiting</span> in this lend
                        position
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Borrowers will pay a fee for the flash loan and accepit it
                      with our mock flash loan contract.
                    </span>
                  </div>
                </div>
              ) : (
                /* <div className=" flex flex-col items-center justify-center md:col-span-4 col-span-12 md:pl-4 pl-0 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full">
                    <span className="text-sm font-semibold mb-2">
                      Flash Loan Contract
                    </span>
                    <Dialog>
                      <DialogTrigger type="button" className="w-full">
                        <Button
                          type="button"
                          className="bg-tulia_primary/50 w-full mt-2"
                        >
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
                      </DialogContent>
                    </Dialog>
                  </div> */

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
                        {uiCollateral} {borrowCoin?.label}
                      </span>
                    </div>
                    {/* You will gain NUMBER THT Coin for this position */}
                    <div className="flex flex-col border-b border-tulia_primary pb-4">
                      <span className="text-xs font-semibold">
                        You will gain{' '}
                        <span className="text-green-600">
                          {`${String(rewardApy / 10000)}%`}
                        </span>
                        <span> interest reward for</span>{' '}
                        <span className="text-indigo-600">
                          {' '}
                          {lendCoin?.label}{' '}
                        </span>
                        in this lend position
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Collateral amount is calculated based on the interest rate
                      and the loan amount. It is taken from borrower.
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
