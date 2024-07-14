import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IPoolsViewModalProps } from '../IPoolsViewModal';
import {
  CodeIcon,
  Gift,
  LucideBanknote,
  Percent,
  UserCheck,
} from 'lucide-react';
import { InterestModal } from '@/components/MyPoolsTable/columns';
import { CopyBlock } from 'react-code-blocks';
import Alert from '@/components/Alert/Alert';
import Image from 'next/image';
import { formatEther, parseEther } from 'viem';
import {
  useCalculateRewardApy,
  useCheckCoinAllowance,
  useGetFlashPoolLoanState,
} from '@/lens/lens';
import { useWriteContract } from 'wagmi';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { VaultManagerABI } from '@/lens/abi/VaultManager';
import { TuliaFlashPool } from '@/lens/abi/TuliaFlashPool';
import { TokenABI } from '@/lens/abi/Token';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import { useCalculateClaimableInterest } from '@/lens/lens';
import { useReadContract } from 'wagmi';
import {
  useGetLoanState,
  useGetRemainingRepaymentPeriod,
  useGetFlashPoolRewards,
} from '@/lens/lens';
import { useBlockNumber } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { FlashPoolRewardManager } from '@/lens/abi/FlashPoolRewardManager';

const LendViewModal = ({ row }: IPoolsViewModalProps) => {
  const account = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  const currentLoanState = useGetLoanState(row.original.pool);
  const currentFlashPoolState: ReturnType<typeof useGetFlashPoolLoanState> =
    useGetFlashPoolLoanState(row.original.pool);

  const [isAccrue, setIsAccrue] = useState(false);
  const [uiCollateral, setUiCollateral] = useState<number>(0);
  const {
    writeContract,
    data: hash,
    error: contractError,
    status: contractStatus,
  } = useWriteContract();

  const flashPoolRewards = useGetFlashPoolRewards(row.original.pool);

  const { data: acrruesReward, queryKey } = useReadContract({
    abi: RewardManagerABI,
    address: '0x141ae66f56f8B3FA01d5Ce08806568378c956483',
    functionName: 'getRewardDetails',
    args: [row.original.pool as any],
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  useEffect(() => {
    if (acrruesReward) {
      setIsAccrue(acrruesReward?.isAccruing);
    }
  }, [acrruesReward]);

  const calculateRewardAPY = useCalculateRewardApy({
    loanAmount: BigInt(row.original.amount),
    durationSeconds: Number(currentLoanState),
  });

  const [apy, setApy] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);
  const [approvalNeeded, setApprovalNeeded] = useState<boolean>(false);
  const [activateLoanCheck, setActivateLoanCheck] = useState('');
  const [claimableInterest, setClaimableInterest] = useState<number>(0);
  const [currentVaultManagerReward, setCurrentVaultManagerReward] =
    useState<number>(0);
  const [formattedRepaymentTime, setFormattedRepaymentTime] =
    useState<string>('');
  const [uiLoanState, setUiLoanState] = useState<string>('');

  const [newLoanState, setNewLoanState] = useState<number | undefined>(
    currentFlashPoolState || currentLoanState || 0
  );

  const {
    writeContract: approve,
    isSuccess: approveSuccess,
    error: approveError,
    status: approveStatus,
  } = useWriteContract();
  const checkAllowance = useCheckCoinAllowance(
    row.original.Token as any,
    row.original.pool as any
  );
  const { data: vaultManagerReward } = useReadContract({
    abi: VaultManagerABI,
    address: '0xb3A0398630831D7b39d6eE2292F6274DeC5427AE',
    functionName: 'calculateClaimableInterest',
    args: [row.original.pool],
  });

  useEffect(() => {
    if (newLoanState === 2) {
      setUiLoanState('Borrower Found');
    }
    if (newLoanState === 1) {
      setUiLoanState('Waiting for Borrower');
    }
  }, [newLoanState]);

  const latestRepayment = useGetRemainingRepaymentPeriod(row.original.pool);

  useEffect(() => {
    setNewLoanState(
      row.original.poolType === 1 ? currentFlashPoolState : currentLoanState
    );
  }, [currentLoanState, currentFlashPoolState]);

  const {
    writeContract: activateLoan,
    data: activateLoanHash,
    status: activeLoanStatus,
    error: activeLoanError,
  } = useWriteContract();

  useEffect(() => {
    if (activeLoanStatus === 'success') {
      setActivateLoanCheck('success');
    }
    if (activeLoanStatus === 'error') {
      setActivateLoanCheck('error');
    }
    if (activeLoanStatus === 'pending') {
      setActivateLoanCheck('pending');
    }
  }, [activeLoanStatus]);

  useEffect(() => {
    if (activateLoanCheck === 'success') {
      toast.success('Loan activated successfully');
    }
    if (activateLoanCheck === 'error') {
      toast.error('Error activating loan');
    }
    if (activateLoanCheck === 'pending') {
      toast.info('Loan activation pending');
    }
  }, [activateLoanCheck]);

  useEffect(() => {
    if (calculateRewardAPY) {
      setApy(Number(calculateRewardAPY));
    }
  }, [calculateRewardAPY]);

  useEffect(() => {
    if (vaultManagerReward) {
      setCurrentVaultManagerReward(Number(vaultManagerReward));
    }
  }, [vaultManagerReward]);

  const calculateCollateral = (
    loanAmount: number,
    interestRate: number
  ): number => {
    const principal = parseFloat(loanAmount.toString());
    const rate = parseFloat(interestRate.toString());
    const interest = (principal * rate) / 100;
    const total = principal + interest;
    const netTotal = formatEther(BigInt(total));
    setUiCollateral(Number(netTotal));
    return total;
  };

  useEffect(() => {
    calculateCollateral(row.original.amount, Number(row.original.interestRate));
  }, [row.original.amount, row.original.interestRate]);

  const formatDuration = (seconds: number): string => {
    const days: number = Math.floor(seconds / (3600 * 24) / 86400);
    const hours: number = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m `;
  };

  useEffect(() => {
    if (latestRepayment !== undefined) {
      const formatted = formatDuration(Number(latestRepayment));
      setFormattedRepaymentTime(formatted);
    }
  }, [latestRepayment]);

  useEffect(() => {
    const fetchAllowance = async () => {
      const currentAllowance = checkAllowance;
      if (currentAllowance) {
        setAllowance(Number(currentAllowance));
        setApprovalNeeded(
          Number(currentAllowance) < Number(row.original.amount)
        );
      }
    };
    fetchAllowance();
  }, [checkAllowance, row.original.amount]);

  useEffect(() => {
    if (approveSuccess) {
      toast.success('Approve transaction successful');
      setApprovalNeeded(false);
    }
  }, [approveSuccess]);

  const currentClaimableInterest = useCalculateClaimableInterest({
    pool: row.original.pool,
    isLender: true,
  });

  useEffect(() => {
    if (currentClaimableInterest?.interest !== undefined) {
      setClaimableInterest(currentClaimableInterest.interest);
    }
  }, [currentClaimableInterest]);

  const activatePendingLoan = () => {
    activateLoan({
      abi: TuliaPoolABI,
      address: row.original.pool as any,
      functionName: 'fundLoan',
    });
  };

  const activatePendingFlashLoan = () => {
    activateLoan({
      abi: TuliaFlashPool,
      address: row.original.pool as any,
      functionName: 'fundLoan',
    });
  };

  const handleApprove = () => {
    approve({
      address: row.original.loanCurrencyAddress as any,
      abi: TokenABI,
      functionName: 'approve',
      args: [row.original.pool as any, parseEther(String(1000000000), 'wei')],
    });
  };

  useEffect(() => {
    if (allowance < row.original.amount) {
      setApprovalNeeded(true);
    } else if (allowance >= row.original.amount) {
      setApprovalNeeded(false);
    }
  }, [allowance, row.original.amount]);

  const formattedInterest = formatEther(
    BigInt(currentVaultManagerReward)
  ).toString();

  const handleClaimRewards = () => {
    if (row.original.poolType === 1) {
      writeContract({
        abi: FlashPoolRewardManager,
        address: '0xf422034e0e404e930FCD37c5e5b3FF5f3a2AB1E5',
        functionName: 'claimRewards',
        args: [row.original.pool as any],
      });
      toast.info(
        `Claiming ${formatEther(BigInt(flashPoolRewards)).toString()} ${row.original.Token}`
      );
    } else {
      writeContract({
        abi: RewardManagerABI,
        address: '0x141ae66f56f8B3FA01d5Ce08806568378c956483',
        functionName: 'claimRewards',
        args: [row.original.pool as any, true],
      });
      toast.info(
        `Claiming ${formatEther(BigInt(claimableInterest)).toString()} ${row.original.Token}`
      );
    }
  };

  const handleCloseDeal = () => {
    if (row.original.poolType === 1) {
      writeContract({
        abi: TuliaFlashPool,
        address: row.original.pool as any,
        functionName: 'closeLoan',
      });
      toast.info('Flash loan deal closing.');
    } else {
      writeContract({
        abi: TuliaPoolABI,
        address: row.original.pool as any,
        functionName: 'reclaimLoanAndClosePool',
      });
      toast.info('Loan deal closing.');
    }
  };

  useEffect(() => {
    switch (contractStatus) {
      case 'pending':
        toast.info('Transaction is pending...');
        break;
      case 'error':
        toast.error('Transaction failed.');
        break;
      case 'success':
        toast.success('Transaction successful!');
        break;
    }
  }, [contractStatus]);

  return (
    <Dialog>
      {newLoanState === 0 ? (
        approvalNeeded ? (
          <Button
            onClick={handleApprove}
            className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
            disabled={approveStatus === 'pending'}
          >
            Approve Transaction
          </Button>
        ) : row.original.poolType === 1 ? (
          <Button
            onClick={activatePendingFlashLoan}
            className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
          >
            Activate Flash Loan
          </Button>
        ) : (
          <Button
            onClick={activatePendingLoan}
            className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
          >
            Activate Loan
          </Button>
        )
      ) : (
        <DialogTrigger>
          <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
            Manage
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Your Lending Pool</DialogTitle>
          <DialogDescription>
            Here you can see your lending details
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
              {row.original.wallet_address}
            </span>
          </div>
          <div className="col-span-6 flex flex-col">
            <span className="text-sm font-semibold">Loan Amount</span>
            <span className="text-sm text-gray-400">
              {formatEther(BigInt(row.original.amount))} {row.original.Token}
            </span>
          </div>
          {row.original.poolType !== 1 && (
            <>
              <div className="col-span-12 border-gray-500 pb-2 border-b-[0.5px]">
                <span className="font-bold">
                  <UserCheck size={20} className="inline-block mr-2" />
                  Borrower&apos;s Information
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-semibold">Wallet Address</span>
                <span className="text-sm text-gray-400">
                  {row.original.borrower.slice(0, 7)}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-semibold">Loan Status</span>
                <span className="text-sm text-gray-400">{uiLoanState}</span>
              </div>
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-semibold">Remaining Time</span>
                <span className="text-sm text-gray-400">
                  {formattedRepaymentTime}
                </span>
              </div>
            </>
          )}
          <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <Percent size={20} className="inline-block mr-2" />
              Interest Details
            </span>
          </div>
          <div
            className={`${row.original.poolType !== 1 ? 'col-span-3' : 'col-span-6'} flex flex-col`}
          >
            <span className="text-sm font-semibold">Interest Rate</span>
            <span className="text-sm text-gray-400">
              {Number(row.original.interestRate)}%
            </span>
          </div>
          {row.original.poolType !== 1 && (
            <>
              <div className="col-span-3 flex flex-col">
                <span className="text-sm font-semibold ">
                  Claimable Interest
                </span>
                <span className="text-sm text-purple-400">
                  {formattedInterest.slice(0, 5)} {row.original.borrowTokenName}{' '}
                </span>
              </div>
              <div className="col-span-3 flex flex-col">
                <span className="text-sm font-semibold">Interest Modal</span>
                <span className="text-sm text-gray-400">
                  {row.original.interest_modal}
                </span>
              </div>
            </>
          )}
          <div
            className={`${row.original.poolType !== 1 ? 'col-span-3' : 'col-span-6'} flex flex-col`}
          >
            <span className="text-sm font-semibold">Claimable Rewards </span>
            {row.original.poolType === 1 ? (
              <span className="text-sm text-green-500 ">
                {formatEther(BigInt(flashPoolRewards || 0))
                  .toString()
                  .slice(0, 8)}{' '}
                {row.original.Token}
              </span>
            ) : (
              <span className="text-sm text-green-500 ">
                {formatEther(BigInt(claimableInterest)).toString().slice(0, 8)}{' '}
                {row.original.Token}
              </span>
            )}
            <span className="flex px-1 items-center min-w-16 w-16 border text-xs text-purple-500 border-white/[0.2] bg-transparent rounded-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="flex"
              />
              {10}%
            </span>
          </div>

          {row.original.poolType !== 1 && (
            <>
              <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
                <span className="font-bold">
                  <LucideBanknote size={20} className="inline-block mr-2" />
                  Loan Details
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-semibold">Collateral Amount</span>
                <span className="text-sm text-gray-400">
                  {uiCollateral} {row.original.borrowTokenName}
                </span>
              </div>
              <div className="col-span-4 flex flex-col">
                <span className="text-sm font-semibold">Repayment Period</span>
                <span className="text-sm text-gray-400">
                  {Number(row.original.repaymentPeriod) / 86400} Days
                </span>
              </div>
            </>
          )}
          <div className="col-span-12 flex gap-2 flex-col">
            <div className="col-span-12 flex flex-row border-gray-500 pb-2 border-b-[0.5px] gap-4">
              {row.original.poolType !== 1 && (
                <Alert
                  actionButton={
                    <Button
                      disabled={contractStatus === 'pending'}
                      className="capitalize border-tulia_primary bg-primary/50 hover:bg-primary/20 w-[100%]"
                    >
                      Claim Interest <Gift size={16} className="ml-2" />
                    </Button>
                  }
                  actionText="Claim Interest"
                  description="Are you sure you want to claim the rewards?"
                  title="Claim Rewards"
                  actionFunction={() => {
                    // @ts-ignore
                    if (newLoanState <= 1) {
                      toast.error('Waiting for borrower to give interest');
                    } else
                      writeContract({
                        abi: VaultManagerABI,
                        address: '0xb3A0398630831D7b39d6eE2292F6274DeC5427AE',
                        functionName: 'distributeInterest',
                        args: [row.original.pool, account?.address],
                      });
                    toast.info(
                      `Claiming ${formatEther(BigInt(currentVaultManagerReward)).toString()} ${row.original.borrowTokenName}`
                    );
                  }}
                  actionButtonStyle="!bg-primary/50 hover:!bg-primary/20 !w-full"
                  triggerClassName="w-full"
                  cancelText="Cancel"
                />
              )}
              <Alert
                actionButton={
                  <Button
                    disabled={contractStatus === 'pending'}
                    className="capitalize border-tulia_primary bg-primary/50 hover:bg-primary/20 w-[100%]"
                  >
                    Claim Rewards <Gift size={16} className="ml-2" />
                  </Button>
                }
                actionText="Claim Rewards"
                description="Are you sure you want to claim the rewards?"
                title="Claim Rewards"
                actionFunction={handleClaimRewards}
                actionButtonStyle="!bg-primary/50 hover:!bg-primary/20 !w-full"
                triggerClassName="w-full"
                cancelText="Cancel"
              />
            </div>
            {isAccrue === false && row.original.poolType !== 1 && (
              <Alert
                actionButton={
                  <Button
                    disabled={contractStatus === 'pending'}
                    className="capitalize border-tulia_primary bg-purple-900 hover:bg-purple-950 w-full"
                  >
                    Activate Reward Mechanism
                  </Button>
                }
                actionText="Do you want to activate the reward mechanism?"
                description="It should be automatically but if it didn't you can activate it manually."
                title="Activate Reward Mechanism"
                actionFunction={() => {
                  writeContract({
                    abi: RewardManagerABI,
                    address: '0x141ae66f56f8B3FA01d5Ce08806568378c956483',
                    functionName: 'accrueRewards',
                    args: [row.original.pool as any],
                  });
                }}
                actionButtonStyle="!bg-purple-900 hover:bg-purple-950"
                cancelText="Cancel"
              />
            )}
            {row.original.poolType !== 1 && (
              <Alert
                actionButton={
                  <Button
                    disabled={contractStatus === 'pending'}
                    className="capitalize border-tulia_primary bg-green-900 hover:bg-green-950 w-full"
                  >
                    Default Loan
                  </Button>
                }
                actionText="Default The Loan"
                description="Are you sure you want to default the loan? Collateral amount and remaining interest will return to you."
                title="Default Loan Deal"
                actionFunction={() => {
                  if (latestRepayment !== 0) {
                    toast.error(
                      `There is still ${formattedRepaymentTime} remaining before you can default the loan.`
                    );
                  } else {
                    writeContract({
                      abi: TuliaPoolABI,
                      address: row.original.pool as any,
                      functionName: 'checkAndHandleDefault',
                    });
                  }
                }}
                actionButtonStyle="!bg-green-900 hover:bg-green-950"
                cancelText="Cancel"
              />
            )}
            <Alert
              actionButton={
                <Button
                  disabled={contractStatus === 'pending'}
                  className="capitalize border-tulia_primary bg-red-900 hover:bg-red-950 w-full"
                >
                  Close Deal
                </Button>
              }
              actionText="Close Deal"
              description="Are you sure you want to reclaim the loan deal? Funded amount will be returned to the lender and the pool will be closed."
              title="Close Loan Deal"
              actionFunction={handleCloseDeal}
              actionButtonStyle="!bg-red-900 hover:!bg-red-950"
              cancelText="Cancel"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LendViewModal;
