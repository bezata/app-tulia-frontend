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
import { parseEther, parseUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
import { useRouter } from 'next/navigation';
import { addAsteroidPoints } from '@/utils/addAsteroidPoints';
import { useChainId } from 'wagmi';
import { ChainId } from '@lifi/types';

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
  loanAmount: z
    .string()
    .refine(v => parseFloat(v) > 0, "Loan amount can't be 0"),
  interestModal: z.nativeEnum(InterestModal),
  interestRate: z
    .string()
    .refine(v => parseFloat(v) > 0 && parseFloat(v) <= 100, 'Invalid rate'),
  endDate: z.string().refine(v => parseFloat(v) > 0, 'Repayment days required'),
  interestAddress: z.string().optional(),
});
// BECAUSE OF TULIAPOOLFACTORY BIGGER THAN 24KB SIZE CAN'T BE DEPLOYED WITH CREATE2 IT STUCK AT 24KB LIMIT
const contractAddresses = {
  '421614': '0xF05570Baff1e3918986b37E8Fc0a755123C8b304',
  '17000': '0x2F2c167eFaF016bB179b6A97f98234aC26E4d6bb',
  '43113': '0x011E58b4D5cbB14D052273EEbcFa80b6B6C06fd3',
  '80002': '0x0e41936CFDc3cD1932c77729c510B3a5196162A2',
  '11155420': '0x971690F3F7C708E62ea7f03f24eEa5A939a923a4',
  '84532': '0x2F2c167eFaF016bB179b6A97f98234aC26E4d6bb',
  '97': '0x2F2c167eFaF016bB179b6A97f98234aC26E4d6bb',
} as const;

const LendingReqModal = () => {
  const router = useRouter();
  const {
    writeContract,
    data: hash,
    status: openPoolRequest,
  } = useWriteContract();
  const chainID = useChainId();

  const [open, setOpen] = React.useState(false);
  const [openTxModal, setOpenTxModal] = useState<boolean>(false);
  const [uiCollateral, setUiCollateral] = React.useState(0);
  const [rewardApy, setRewardApy] = React.useState(0);
  const [feeAmount, setFeeAmount] = useState(0);
  const [openPoolRequestStatus, setOpenPoolRequestStatus] = useState('idle');
  const [userChainID, setUserChainID] = useState(421614);
  useEffect(() => {
    if (chainID) {
      setUserChainID(chainID);
    }
  }, [chainID]);
  const account = useAccount();

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  const [date, setDate] = useState(newDate);
  const form = useForm<ILendRequest.ILendRequestInputs>({
    defaultValues: {
      lendCoin: {
        label: 'WETH',
        value: '0x46EAE7F1f2155D3A7f799C96a2c52e0a634Ed186',
        symbol: <EthIcon />,
      },
      borrowCoin: {
        label: 'ARB',
        value: '0xD4a2b111c346200b131D668594BfaF52dee8FAE7',
        symbol: <ArbIcon />,
      },
      loanAmount: undefined,
      interestModal: InterestModal.Simple,
      endDate: undefined,
      interestRate: undefined,
      collateral: 0,
    },
    resolver: zodResolver(schema),
  });

  const calculateFlashFee = (
    amount: number,
    flashLoanFeeRate: number
  ): number => {
    return (amount * flashLoanFeeRate) / 10000;
  };

  useEffect(() => {
    if (openPoolRequest === 'success') {
      setOpenPoolRequestStatus('success');
      addAsteroidPoints(account?.address as string, 200, 'createdPool');
    }
    if (openPoolRequest === 'error') {
      setOpenPoolRequestStatus('error');
    }
    if (openPoolRequest === 'pending') {
      setOpenPoolRequestStatus('pending');
    }
  }, [openPoolRequest]);

  useEffect(() => {
    if (openTxModal) {
      setTimeout(() => {
        toast.success('Transaction successful. Redirecting to My Pools.');
        router.push('/mypools');
      }, 10000);
    }
  }, [openTxModal, router]);

  useEffect(() => {
    if (openPoolRequestStatus === 'success') {
      setOpenTxModal(true);
      toast.success('Pool request created successfully');
    }
    if (openPoolRequestStatus === 'error') {
      toast.error('Pool request failed');
    }
    if (openPoolRequestStatus === 'pending') {
      toast.info('Pool request is pending');
    }
  }, [openPoolRequestStatus]);

  const interest = useCalculateInterest({
    principal: parseFloat(form.watch('loanAmount')?.toString() || '0'),
    rate: form.watch('interestRate'),
  });

  const compoundInterest = useCalculateCompoundInterest({
    principal: parseFloat(form.watch('loanAmount')?.toString() || '0'),
    rate: form.watch('interestRate'),
  });

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

        form.setValue('collateral', calculatedCollateral);
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
        newAddress = '0x06D98c1AA31d84c51F150d6cC929E3095796Fae2';
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
    const endDate = form.watch('endDate');
    const formattedInterestRate = parseUnits(String(data.interestRate), 0);
    const days = parseFloat(endDate);
    const endDateInSeconds = !isNaN(days) ? days * 86400 : 0;
    const optionalFlashLoanFeeRate =
      data.interestModal === InterestModal.FlashLoan
        ? formattedInterestRate
        : 0;
    const newInterestAddress = updateInterestAddress(data.interestModal);
    const poolType = data.interestModal === InterestModal.FlashLoan ? 1 : 0;
    const loanAmount = parseEther(String(data?.loanAmount));
    const contractAddress =
      contractAddresses[
        userChainID?.toString() as keyof typeof contractAddresses
      ] || '0xF05570Baff1e3918986b37E8Fc0a755123C8b304';

    writeContract({
      abi: TuliaPoolFactoryABI,
      address: contractAddress,
      functionName: 'createTuliaPool',
      args: [
        account?.address as any,
        data.lendCoin.value as any,
        data.borrowCoin.value as any,
        data.borrowCoin.value as any,
        loanAmount as any,
        formattedInterestRate as any,
        endDateInSeconds as any,
        newInterestAddress as any,
        poolType,
        optionalFlashLoanFeeRate as any,
      ],
    });
  };

  const onCloseClick = () => {
    setOpen(false);
    form.reset();
    setRewardApy(0);
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
              <div className="grid grid-cols-2 ml-1 mb-1 gap-4 md:col-span-8 col-span-12 border-r-0 md:pr-4 pr-0 md:pb-0 pb-4 md:border-r border-tulia_primary">
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
                            defaultValue={0}
                            maxLength={6}
                            {...field}
                            onKeyDown={e => {
                              // Allow numbers, backspace, delete, tab, escape, enter, and dot
                              if (
                                !/^[0-9.]$/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Tab' &&
                                e.key !== 'Enter' &&
                                e.key !== 'Escape' &&
                                e.key !== 'Delete'
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                              <span className="text-green-500">
                                -{' '}
                                {form.watch('interestRate')
                                  ? form.watch('interestRate')
                                  : 0}
                                {'%'}
                              </span>
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
                              <span className="text-green-500">
                                -{' '}
                                {form.watch('interestRate')
                                  ? form.watch('interestRate')
                                  : 0}
                                {'%'}
                              </span>
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
                          <Input
                            defaultValue={0}
                            maxLength={6}
                            {...field}
                            onKeyDown={e => {
                              // Allow numbers, backspace, delete, tab, escape, enter, and dot
                              if (
                                !/^[0-9.]$/.test(e.key) &&
                                e.key !== 'Backspace' &&
                                e.key !== 'Tab' &&
                                e.key !== 'Enter' &&
                                e.key !== 'Escape' &&
                                e.key !== 'Delete'
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                {form.watch('interestModal') === InterestModal.FlashLoan && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 col-span-2">
                        <FormLabel htmlFor="endDate">Loan Duration</FormLabel>
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
                {form.watch('interestModal') !== InterestModal.FlashLoan && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-1 col-span-2">
                        <FormLabel htmlFor="endDate">Repayment Days</FormLabel>
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
                          {`${String(rewardApy / 10000)}%`}{' '}
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
                      Borrowers will pay a fee for the flash loan and accept it
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
              <Button
                disabled={openPoolRequestStatus === 'pending'}
                type="submit"
                className="bg-tulia_primary/50"
              >
                Create <PlusCircle className="w-4 h-4 inline-block ml-2" />
              </Button>
            </div>
          </form>
        </Form>{' '}
        <div className="z-1">
          <TransactionProcessModal
            open={openTxModal}
            setOpen={setOpenTxModal}
            hash={hash}
          />
        </div>
      </DialogContent>{' '}
    </Dialog>
  );
};

export default LendingReqModal;
