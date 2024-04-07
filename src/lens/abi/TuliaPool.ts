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
        name: 'loanToken',
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
        name: 'repaymentPeriod',
        type: 'uint256',
      },
      {
        internalType: 'contract IInterestModel',
        name: 'interestModel',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'AddressInsufficientBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'required',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'provided',
        type: 'uint256',
      },
    ],
    name: 'InsufficientAmount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidState',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotActiveLoan',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'claimant',
        type: 'address',
      },
    ],
    name: 'CollateralClaimed',
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
    name: 'CollateralFunded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'interestAmount',
        type: 'uint256',
      },
    ],
    name: 'InterestPaid',
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
    inputs: [],
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
    name: 'BORROWER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LENDER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'interestTokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'collateralAmount',
        type: 'uint256',
      },
    ],
    name: 'activateLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'declareDefault',
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
        internalType: 'contract TuliaVault',
        name: 'collateralVault',
        type: 'address',
      },
      {
        internalType: 'contract TuliaToken',
        name: 'interestToken',
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
        internalType: 'contract IInterestModel',
        name: 'interestModel',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
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
] as const;
