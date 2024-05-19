export const TuliaPoolABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'loanTokenAddress',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'repaymentTokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'collateralVaultAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'loanAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'interestRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'repaymentPeriodInDays',
        type: 'uint256',
      },
      {
        internalType: 'contract IInterestModel',
        name: 'interestModel',
        type: 'address',
      },
      {
        internalType: 'contract IPermit2',
        name: '_permit2',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'poolOrganizerAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'vaultManagerAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'rewardManagerAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralAmount',
        type: 'uint256',
      },
    ],
    name: 'CollateralFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'collateralAmount',
        type: 'uint256',
      },
    ],
    name: 'LoanActivated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'LoanClosed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
    ],
    name: 'LoanDefaulted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loanAmount',
        type: 'uint256',
      },
    ],
    name: 'LoanFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'loanAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'loanToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'contract IERC20',
        name: 'repaymentToken',
        type: 'address',
      },
    ],
    name: 'LoanOfferCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountRepaid',
        type: 'uint256',
      },
    ],
    name: 'RepaymentMade',
    type: 'event',
  },
  {
    inputs: [],
    name: 'activateLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'calculateInterest',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'calculateRequiredCollateral',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'checkAndHandleDefault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'closeDeal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fundLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBorrower',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getCollateralAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFundedBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getInterestRate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLender',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLoanAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLoanState',
    outputs: [
      {
        internalType: 'enum TuliaPool.LoanState',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRepaymentPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRepaymentToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'loanDetails',
    outputs: [
      {
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'loanToken',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'repaymentToken',
        type: 'address',
      },
      {
        internalType: 'contract TuliaVault',
        name: 'collateralVault',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'loanAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'interestRate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'repaymentPeriod',
        type: 'uint256',
      },
      {
        internalType: 'contract IVaultManager',
        name: 'vaultManager',
        type: 'address',
      },
      {
        internalType: 'contract IInterestModel',
        name: 'interestModel',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'startBlock',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'fundedBlock',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'permit2',
    outputs: [
      {
        internalType: 'contract IPermit2',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolOrganizer',
    outputs: [
      {
        internalType: 'contract IPoolOrganizer',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardManager',
    outputs: [
      {
        internalType: 'contract IRewardManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'state',
    outputs: [
      {
        internalType: 'enum TuliaPool.LoanState',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vaultManager',
    outputs: [
      {
        internalType: 'contract IVaultManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
