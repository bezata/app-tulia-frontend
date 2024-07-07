import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { ILendingViewModalProps } from './ILendingViewModal';
import { LoaderIcon, LucideBanknote, Percent, UserCheck } from 'lucide-react';
import Alert from '../Alert/Alert';
import { useRouter } from 'next/navigation';
import USDCIcon from '../../../public/USDCIcon';
import ArbIcon from '../../../public/ArbIcon';
import DaiIcon from '../../../public/DaiIcon';
import UniIcon from '../../../public/UniIcon';
import EthIcon from '../../../public/EthIcon';
import BtcIcon from '../../../public/BtcIcon';
import { formatEther, parseEther } from 'viem';
import { useCalculateRewardApy, useCheckCoinAllowance } from '@/lens/lens';
import { toast } from 'sonner';
import { useWriteContract } from 'wagmi';
import { TokenABI } from '@/lens/abi/Token';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import TransactionProcessModal from '../TransactionProcessModal/TransactionProcessModal';
import { useAccount } from 'wagmi';

const LendingViewModal = ({ row }: ILendingViewModalProps) => {
  const router = useRouter();
  const account = useAccount();
  const loanAmount = Number(row.original.amount);
  const interestRate = Number(row.original.interestRate);
  const [loading, setLoading] = useState<boolean>(false);
  const [openTransactionModal, setOpenTransactionModal] =
    useState<boolean>(false);
  const [uiCollateral, setUiCollateral] = useState<number>(0);
  const [apy, setApy] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [approvalNeeded, setApprovalNeeded] = useState<boolean>(false);
  const [currentLoanState, setLoanState] = useState<string>('');
  const [approveTransactionStatus, setApprove] = useState<string>('');
  const [lendRequestTransactionStatus, setLendRequest] = useState<string>('');

  const {
    writeContract: approve,
    data: approveHash,
    isSuccess: approveSuccess,
    status: approveStatus,
  } = useWriteContract();
  useEffect(() => {
    if (approveStatus === 'success') {
      toast.success('Approve transaction successful');
      setApprovalNeeded(false);
      setLoading(false);
      setApprove('success');
    }
    if (approveStatus === 'error') {
      toast.error('Approve transaction failed');
      setLoading(false);
      setApprove('error');
    }
    if (approveStatus === 'pending') {
      toast.info('Approve transaction pending');
      setLoading(true);
      setApprove('pending');
    }
  }, [approveStatus]);
  const {
    writeContract: fundLoanTx,
    data: hash,
    isSuccess: fundLoanSuccess,
    status: fundLoanStatus,
  } = useWriteContract();

  useEffect(() => {
    if (fundLoanStatus === 'success') {
      setLendRequest('success');
    }
    if (fundLoanStatus === 'error') {
      setLendRequest('error');
    }
    if (fundLoanStatus === 'pending') {
      setLendRequest('pending');
    }
  }, [fundLoanStatus]);

  useEffect(() => {
    if (lendRequestTransactionStatus === 'success') {
      toast.success('Transaction successful');
      setOpenTransactionModal(true);
      setLoading(false);
    }
    if (lendRequestTransactionStatus === 'error') {
      setOpenTransactionModal(false);
      setLoading(false);
    }
    if (lendRequestTransactionStatus === 'pending') {
      setLoading(true);
    }
  }, [lendRequestTransactionStatus]);

  const loanState = row.original.loan_state;
  useEffect(() => {
    setLoanState(loanState);
  }, [loanState]);

  const calculateRewardAPY = useCalculateRewardApy({
    loanAmount: BigInt(loanAmount),
    durationSeconds: Number(row.original.repaymentPeriod),
  });

  const checkAllowance = useCheckCoinAllowance(
    row.original.repaymentCurrencyAddress,
    row.original.pool as any
  );

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
    setApy(Number(calculateRewardAPY));
    calculateCollateral(loanAmount, interestRate);
  }, [calculateRewardAPY, loanAmount, interestRate]);

  useEffect(() => {
    const fetchAllowance = async () => {
      const currentAllowance = checkAllowance;
      if (currentAllowance) {
        setAllowance(Number(currentAllowance));
        setApprovalNeeded(Number(currentAllowance) < loanAmount);
      }
    };
    fetchAllowance();
  }, [checkAllowance, loanAmount]);

  const fundLoan = async () => {
    fundLoanTx({
      address: row.original.pool as any,
      abi: TuliaPoolABI,
      functionName: 'activateLoan',
    });
    return hash as string | undefined;
  };

  useEffect(() => {
    if (openTransactionModal) {
      setTimeout(() => {
        toast.success('Transaction successful. Redirecting to My Pools.');
        router.push('/mypools');
      }, 5000);
    }
  }, [openTransactionModal, router]);
console.log(row.original.repaymentCurrencyAddress);
const handleAcceptLendRequest = () => {
  setLoading(true);
  const currentAllowance = checkAllowance;
  setAllowance(Number(currentAllowance));

  if (Number(currentAllowance) < loanAmount) {
    toast.error('Insufficient allowance');
    setApprovalNeeded(true);
  }
  if (approveSuccess == true) {
    setLoading(false);
    setApprovalNeeded(false);
  }
};

return (
  <>
    <TransactionProcessModal
      hash={hash}
      setOpen={setOpenTransactionModal}
      open={openTransactionModal}
    />
    <Dialog>
      <DialogTrigger
        onClick={() => {
          if (account?.address === row.original.wallet_address) {
            toast.error('You cannot lend to yourself!');
          }
        }}
      >
        <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
          Request Details
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Lend</DialogTitle>
          <DialogDescription>
            View the details of the lend position.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <UserCheck size={20} className="inline-block mr-2" />
              Lender&apos;s Information
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Wallet Address</span>
            <span className="text-sm text-gray-400">
              {row.original.wallet_address.slice(0, 7)}
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Loan Amount</span>
            <span className="text-sm text-gray-400">
              {formatEther(BigInt(row.original.amount))} {row.original.Token}
            </span>
          </div>
          <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <Percent size={20} className="inline-block mr-2" />
              Interest Details
            </span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Interest Rate</span>
            <span className="text-sm text-gray-400">
              {`${String(row.original.interestRate)}%`}
            </span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Interest Modal</span>
            <span>Simple</span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold text-primary">
              Interest Discount
            </span>
            <span className="text-sm text-green-500">
              {String(apy / 10000)}% {row.original.Token}
            </span>
          </div>
          <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <LucideBanknote size={20} className="inline-block mr-2" />
              Payment Details
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Collateral Amount</span>
            <span className="text-sm text-gray-400">
              {formatEther(BigInt(uiCollateral))}
              {``} {row.original.borrowTokenName}
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Debt Payment Period</span>
            <span className="text-sm text-gray-400">
              {`${String(Number(row.original.repaymentPeriod) / 86400)} Days`}
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Lend Coin</span>
            <span className="text-sm text-gray-400">
              <div className="flex items-center ml-5 gap-4">
                {row.original.loanToken === 'ETH' && (
                  <EthIcon width={24} height={24} />
                )}
                {row.original.loanToken === 'BTC' && (
                  <BtcIcon width={24} height={24} />
                )}
                {row.original.loanToken === 'USDC' && (
                  <USDCIcon width={24} height={24} />
                )}
                {row.original.loanToken === 'ARB' && (
                  <ArbIcon width={24} height={24} />
                )}
                {row.original.loanToken === 'DAI' && (
                  <DaiIcon width={24} height={24} />
                )}
                {row.original.loanToken === 'UNI' && (
                  <UniIcon width={24} height={24} />
                )}
                <span>{row.original.loanToken}</span>
              </div>
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Borrow Coin</span>
            <span className="text-sm text-gray-400">
              <div className="flex items-center ml-9  gap-4">
                {row.original.borrowToken === 'ETH' && (
                  <EthIcon width={24} height={24} />
                )}
                {row.original.borrowToken === 'BTC' && (
                  <BtcIcon width={24} height={24} />
                )}
                {row.original.borrowToken === 'USDC' && (
                  <USDCIcon width={24} height={24} />
                )}
                {row.original.borrowToken === 'ARB' && (
                  <ArbIcon width={24} height={24} />
                )}
                {row.original.borrowToken === 'DAI' && (
                  <DaiIcon width={24} height={24} />
                )}
                {row.original.borrowToken === 'UNI' && (
                  <UniIcon width={24} height={24} />
                )}
                <span>{row.original.borrowToken}</span>
              </div>
            </span>
          </div>
          <div className="col-span-12 flex flex-col">
            {approvalNeeded ? (
              <Button
                onClick={() =>
                  approve({
                    address: row.original.repaymentCurrencyAddress as any,
                    abi: TokenABI,
                    functionName: 'approve',
                    args: [
                      row.original.pool,
                      parseEther(String(1000000000), 'wei'),
                    ],
                  })
                }
                className="capitalize tulia_main_button w-full"
              >
                Approve Transaction
              </Button>
            ) : (
              <Alert
                actionButton={
                  loading ? (
                    <Button className="capitalize tulia_main_button w-full">
                      <LoaderIcon size={16} className="animate-spin mr-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAcceptLendRequest}
                      className="capitalize tulia_main_button w-full"
                    >
                      Accept Lend Request
                    </Button>
                  )
                }
                title="Accept Lend Request"
                disabled={loading}
                description="Are you sure you want to accept this lend request?"
                cancelText="Cancel"
                actionText="Accept"
                cancelFunction={() => {
                  setLoading(false);
                }}
                actionFunction={() => {
                  if (currentLoanState === 'Pending') {
                    toast.error('Loan needs to be activated by lender!');
                    setLoading(false);
                  }
                  if (account?.address === row.original.wallet_address) {
                    toast.error('You cannot lend to yourself!');
                  } else {
                    fundLoan();
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                    }, 2000);
                  }
                }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
);
};

export default LendingViewModal;
