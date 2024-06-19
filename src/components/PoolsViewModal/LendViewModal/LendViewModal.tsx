import React from 'react';
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
import { CodeIcon, LucideBanknote, Percent, UserCheck } from 'lucide-react';
import { InterestModal, PoolState } from '@/components/MyPoolsTable/columns';
import { CopyBlock } from 'react-code-blocks';
import Alert from '@/components/Alert/Alert';
import Image from 'next/image';

const LendViewModal = ({ row }: IPoolsViewModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="capitalize border-tulia_primary bg-tulia_primary/50 hover:bg-tulia_primary/30">
          manage
        </Button>
      </DialogTrigger>
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
              {row.original.amount} {row.original.coin}
            </span>
          </div>

          <div className="col-span-12 flex flex-col border-gray-500 pb-2 border-b-[0.5px]">
            {/* Interest Details */}
            <span className="font-bold">
              <Percent size={20} className="inline-block mr-2" />
              Interest Details
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">Interest Rate</span>
            <span className="text-sm text-gray-400">5%</span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold text-primary">
              Interest Discount
            </span>
            <span className="text-sm text-green-500">+0.5% </span>
            <span className="text-sm text-green-500">(0.05 ETH)</span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">Interest Modal</span>
            <span className="text-sm text-gray-400">
              {row.original.interest_modal}
            </span>
          </div>
          <div className="col-span-3 flex flex-col">
            <span className="text-sm font-semibold">Claimable Interest </span>
            <span className="text-sm text-green-500">120 ETH</span>{' '}
            <span className="flex px-1 items-center min-w-16 w-16 border text-xs border-white/[0.2] bg-transparent  rounded-sm">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="flex"
              />
              %12
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
            <span className="text-sm text-gray-400">1.05 ETH</span>
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Loan State</span>
            {row.original.state === PoolState.Active ? (
              <span className="text-sm text-green-500">Active</span>
            ) : row.original.state === PoolState.Closed ? (
              <span className="text-sm text-red-500">Closed</span>
            ) : row.original.state === PoolState.Pending ? (
              <span className="text-sm text-yellow-500">Pending</span>
            ) : (
              <span className="text-sm text-blue-500">Defaulted</span>
            )}
          </div>
          <div className="col-span-4 flex flex-col">
            <span className="text-sm font-semibold">Repayment Period</span>
            <span className="text-sm text-gray-400">2024-12-12</span>
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
                      Claim Interest.
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
              </div>
            )}
            <Alert
              actionButton={
                <Button className="capitalize border-tulia_primary bg-red-900 hover:bg-red-950 w-full">
                  Close Deal
                </Button>
              }
              actionText="Close Deal"
              description="Are you sure you want to close the loan deal?"
              title="Close Loan Deal"
              actionFunction={() => {
                console.log('Closing loan deal');
              }}
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
