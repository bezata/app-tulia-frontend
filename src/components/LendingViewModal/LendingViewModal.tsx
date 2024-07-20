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
import {
  useCalculateRewardApy,
  useCheckCoinAllowance,
  useGetFlashPoolLoanState,
} from '@/lens/lens';
import { toast } from 'sonner';
import { useWriteContract } from 'wagmi';
import { TokenABI } from '@/lens/abi/Token';
import { TuliaPoolABI } from '@/lens/abi/TuliaPool';
import TransactionProcessModal from '../TransactionProcessModal/TransactionProcessModal';
import { useAccount } from 'wagmi';
import { CodeIcon } from 'lucide-react';
import { CopyBlock } from 'react-code-blocks';
import { addAsteroidPoints } from '@/utils/addAsteroidPoints';

const LendingViewModal = ({ row }: ILendingViewModalProps) => {
  const router = useRouter();
  const account = useAccount();
  const flashPoolLoanState = useGetFlashPoolLoanState(row.original.pool);
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
      addAsteroidPoints(account?.address as string, 200, 'acceptLendRequest');
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
    loanAmount: BigInt(loanAmount || 1),
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
      {row.original.poolType === 1 ? (
        <div>
          <Dialog>
            <DialogTrigger
              type="button"
              className="w-full mt-2 rounded-md bg-tulia_primary/50 hover:bg-tulia_primary/30 p-2"
              onClick={() => {
                if (flashPoolLoanState?.toString() === '0') {
                  toast.error(
                    'Loan needs to be activated by lender be aware of it!'
                  );
                }
              }}
            >
              <CodeIcon className="w-4 h-4 inline-block mr-1" />
              View Code
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[520px] overflow-y-auto">
              <DialogTitle>Flash Loan Contract</DialogTitle>
              <DialogDescription>
                This is the flash loan contract that you can use to initiate a
                flash loan request.
              </DialogDescription>
              <CopyBlock
                language="solidity"
                wrapLongLines
                showLineNumbers
                text={`
        Flash Loan Pool Address = ${row.original.pool}
       // SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";

contract TuliaFlashLoanBorrower is IERC3156FlashBorrower {
    using SafeERC20 for IERC20;

    IERC3156FlashLender public lender;
    bytes32 public constant CALLBACK_SUCCESS = keccak256("ERC3156FlashBorrower.onFlashLoan");

    /// @notice Sets the lender address on deployment
    /// @param _lender The address of the flash loan lender contract
    constructor(address _lender) {
        lender = IERC3156FlashLender(_lender);
    }

    /// @notice Initiates a flash loan
    /// @param token The address of the ERC20 token to borrow
    /// @param amount The amount of tokens to borrow
    function initiateFlashLoan(address token, uint256 amount) external {
        // Initiating a flash loan
        lender.flashLoan(this, token, amount, bytes("Arbitrary data"));
    }

    /// @notice Callback function after receiving the flash loan
    /// @dev Must be called by the lender contract only
    /// @param initiator The address that initiated the loan
    /// @param token The ERC20 token address
    /// @param amount The borrowed amount
    /// @param fee The fee amount for the flash loan
    /// @param data Arbitrary data passed in flash loan
    /// @return The success callback signal
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        require(msg.sender == address(lender), "Only lender can call this function");
        require(initiator == address(this), "Untrusted loan initiator");

        // Custom logic with the borrowed amount
        // Example: arbitrage, swaps, or other operations

        // Total amount that needs to be repaid
        uint256 totalRepayment = amount + fee;
        IERC20(token).safeIncreaseAllowance(address(lender), totalRepayment);
        IERC20(token).safeTransferFrom(address(this), address(lender), totalRepayment);

        return CALLBACK_SUCCESS; // Signaling that the flash loan was handled successfully
    }
}


          `}
              />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger
            onClick={() => {
              if (account?.address === row.original.wallet_address) {
                toast.error('You cannot lend to yourself!');
              }
            }}
          >
            <Button
              disabled={row.original.loan_state === 'Funded'}
              className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30"
            >
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
                  {formatEther(BigInt(row.original.amount || 1))}{' '}
                  {row.original.Token}
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
                  {'10'}% {row.original.Token}
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
                  {formatEther(BigInt(uiCollateral || 1))}
                  {``} {row.original.borrowTokenName}
                </span>
              </div>
              <div className="col-span-6 flex flex-col">
                <span className="text-sm font-semibold">
                  Debt Payment Period
                </span>
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
                    disabled={approveStatus === 'pending'}
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
                          disabled={fundLoanStatus === 'pending'}
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
      )}
    </>
  );
};

export default LendingViewModal;
