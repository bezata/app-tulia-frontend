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
import { InterestModal, PoolState } from '@/components/MyPoolsTable/columns';
import { CopyBlock } from 'react-code-blocks';
import Alert from '@/components/Alert/Alert';
import Image from 'next/image';
import { formatEther, parseEther } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import { RewardManagerABI } from '@/lens/abi/RewardManager';
import { TokenABI } from '@/lens/abi/Token';
import { toast } from 'sonner';
import {
  useCalculateClaimableInterest,
  useCalculateRewardApy,
  useGetRemainingRepaymentPeriod,
} from '@/lens/lens';
import { TuliaVaultABI } from '@/lens/abi/TuliaVault';
import { useBlockNumber } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';

const BorrowViewModal = ({ row }: IPoolsViewModalProps) => {
  const account = useAccount();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [apy, setApy] = useState<number>(0);
  const [claimableInterest, setClaimableInterest] = useState<number>(0);
  const [approvalNeeded, setApprovalNeeded] = useState<boolean>(false);
  const [uiCollateral, setUiCollateral] = useState<number>(0);
  const [formattedRepaymentTime, setFormattedRepaymentTime] =
    useState<string>('');

  const calculateRewardAPY = useCalculateRewardApy({
    loanAmount: BigInt(row.original.amount),
    durationSeconds: Number(row.original.repaymentPeriod),
  });

  const { writeContract, status: contractStatus } = useWriteContract();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: vaultData });
  }, [blockNumber]);

  useEffect(() => {
    setApy(calculateRewardAPY ?? 0);
  }, [calculateRewardAPY]);

  const currentClaimableInterest = useCalculateClaimableInterest({
    pool: row.original.pool,
    isLender: false,
  });

  useEffect(() => {
    if (currentClaimableInterest?.interest !== undefined) {
      setClaimableInterest(currentClaimableInterest.interest);
    }
  }, [currentClaimableInterest]);

  const { data: vaultAllowances, queryKey: vaultData } = useReadContract({
    abi: TuliaVaultABI,
    address: row.original.vault as any,
    functionName: 'allowance',
    args: [account?.address as any, row.original.pool as any],
  });

  const { writeContract: approve, isSuccess: approveSuccess } =
    useWriteContract();

  useEffect(() => {
    if (approveSuccess) {
      toast.success('Approve transaction successful');
      setApprovalNeeded(false);
    }
  }, [approveSuccess]);

  const handleApprove = () => {
    approve({
      address: row.original.loanCurrencyAddress as any,
      abi: TokenABI,
      functionName: 'approve',
      args: [
        row.original.pool as any,
        parseEther(String(100000000000000), 'gwei'),
      ],
    });
  };

  const handleVaultApprove = () => {
    approve({
      address: row.original.vault as any,
      abi: TuliaVaultABI,
      functionName: 'approve',
      args: [
        row.original.pool as any,
        parseEther(String(100000000000000), 'gwei'),
      ],
    });
  };

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

  // Function to format the remaining time in seconds to a human-readable format
  const formatDuration = (seconds: number): string => {
    const days: number = Math.floor(seconds / (3600 * 24) / 86400);
    const hours: number = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m `;
  };

  const latestRepayment = useGetRemainingRepaymentPeriod(row.original.pool);

  useEffect(() => {
    if (latestRepayment !== undefined) {
      const formatted = formatDuration(Number(latestRepayment));
      setFormattedRepaymentTime(formatted);
    }
  }, [latestRepayment]);

  return (
    <Dialog>
      {row.original.loan_state === 'Pending' ? (
        approvalNeeded ? (
          <Button
            onClick={handleApprove}
            className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
          >
            Approve Transaction
          </Button>
        ) : (
          <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
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
          <DialogTitle>Manage Your Borrow Pool</DialogTitle>
          <DialogDescription>
            Here you can see your loan details
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <UserCheck size={20} className="inline-block mr-2" />
              Loan Information
            </span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Wallet Address</span>
            <span className="text-sm text-gray-400">
              {row.original.wallet_address}
            </span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Coin Amount</span>
            <span className="text-sm text-gray-400">
              {formatEther(BigInt(row.original.amount))} {row.original.Token}
            </span>{' '}
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Repayment Time Left </span>
            <span className="text-sm text-gray-400">
              {formattedRepaymentTime}
            </span>
          </div>
          <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
            <span className="font-bold">
              <Percent size={20} className="inline-block mr-2" />
              Interest Details
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">
              Interest Rate on Loan Amount
            </span>
            <span className="text-sm text-gray-400">
              {Number(row.original.interestRate)}%
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold text-primary">
              Interest Discount
            </span>
            <span className="text-sm text-green-500">
              {Number(apy) / 10000}%{' '}
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">Interest Modal</span>
            <span className="text-sm text-gray-400">
              {row.original.interest_modal}
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">Claimable Interest </span>
            <span className="text-sm text-green-500">
              {formatEther(BigInt(claimableInterest)).toString().slice(0, 8)}{' '}
              {row.original.borrowTokenName}
            </span>{' '}
            <span className="flex px-1 items-center min-w-16 w-16 border text-xs text-purple-500 border-white/[0.2] bg-transparent  rounded-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="flex"
              />
              {Number(apy) / 10000}%{' '}
            </span>
          </div>

          {/* Loan Details */}
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
            <span className="text-sm font-semibold">Debt Amount</span>
            <span className="text-sm text-gray-400">
              {formatEther(BigInt(row.original.amount))}{' '}
              {row.original.borrowTokenName}
            </span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Repayment Period</span>
            <span className="text-sm text-gray-400">
              {Number(row.original.repaymentPeriod) / 86400} Days
            </span>
          </div>
          <div className="col-span-12 flex gap-2 flex-col">
            {row.original.interest_modal === InterestModal.FlashLoan && (
              <div className=" flex flex-col items-center justify-center md:col-span-4 col-span-12 md:pt-0 pt-4 md:border-t-0 border-t border-tulia_primary w-full">
                <div className="w-full">
                  <span>
                    <Button
                      type="button"
                      className="capitalize bg-tulia_primary/50 w-full mt-2"
                    >
                      Claim Interest
                    </Button>
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger type="button" className="w-full">
                    <Button
                      type="button"
                      className="bg-tulia_primary/50 w-full mt-2"
                    >
                      <CodeIcon className="w-4 h-4 inline-block mr-2" />
                      View Flash Loan Code
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
               SPDX-License-Identifier: MIT
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

 This function initiates a flash loan request
function requestFlashLoan(address token, uint256 amount, bytes calldata data) external {
    require(msg.sender == admin, "Only admin can initiate flash loan");
    lender.flashLoan(this, token, amount, data);
}

 This is the callback function that the lender will call
function onFlashLoan(
    address initiator,
    address token,
    uint256 amount,
    uint256 fee,
    bytes calldata data
) external override returns (bytes32) {
    require(msg.sender == address(lender), "Only lender can call this function");
    require(initiator == address(this), "Unrecognized initiator");

     Placeholder for custom logic to utilize the flash loaned amount
     Example: arbitrage, collateral swap, etc.
     data can be used to pass custom parameters needed for the operation

     Repay the flash loan
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
              </div>
            )}
            <Alert
              actionButton={
                <Button
                  disabled={contractStatus === 'pending'}
                  className="capitalize border-tulia_primary bg-primary/50 hover:bg-primary/20 w-full"
                >
                  Claim Rewards <Gift size={16} className="ml-2" />
                </Button>
              }
              actionText="Claim Rewards"
              description="Are you sure you want to claim the rewards?"
              title="Claim Rewards"
              actionFunction={() => {
                writeContract({
                  abi: RewardManagerABI,
                  address: '0xDC1dbDf0A97BF4456B7582978fD5CDefc79C5173',
                  functionName: 'claimRewards',
                  args: [row.original.pool as any, false],
                });
                toast.info(
                  `Claiming ${formatEther(BigInt(claimableInterest)).toString()} ${row.original.borrowTokenName} `
                );
              }}
              actionButtonStyle="!bg-primary/50 hover:!bg-primary/20"
              cancelText="Cancel"
            />
            {/* seperator */}
            <div className="w-full h-[1px] bg-gray-500"></div>

            <Alert
              actionButton={
                <Button
                  disabled={contractStatus === 'pending'}
                  className="capitalize border-tulia_primary bg-emerald-700 hover:bg-emerald-800 w-full"
                >
                  Repay
                </Button>
              }
              actionText="Repay"
              description="Are you sure you want to repay the loan?"
              title="Repay Loan"
              actionFunction={() => {
                if (Number(vaultAllowances?.toString()) < 10) {
                  handleVaultApprove();
                  toast.info('Approve the vault first...');
                } else {
                  writeContract({
                    abi: TuliaPoolABI,
                    address: row.original.pool as any,
                    functionName: 'repay',
                  });
                  toast.info('Repaying the loan...');
                }
              }}
              actionButtonStyle="!bg-emerald-700 hover:bg-emerald-800"
              cancelText="Cancel"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowViewModal;
