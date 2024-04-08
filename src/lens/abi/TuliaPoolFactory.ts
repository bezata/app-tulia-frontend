export const TuliaPoolFactoryABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_poolOrganizer',
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
        indexed: true,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
    ],
    name: 'PoolCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'vault',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'assetToken',
        type: 'address',
      },
    ],
    name: 'VaultCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'loanTokenAddress',
        type: 'address',
      },
      {
        internalType: 'contract IERC20',
        name: 'assetToken',
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
    name: 'createTuliaPool',
    outputs: [
      {
        internalType: 'address',
        name: 'poolAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'vaultAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'vaults',
    outputs: [
      {
        internalType: 'contract TuliaVault',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;