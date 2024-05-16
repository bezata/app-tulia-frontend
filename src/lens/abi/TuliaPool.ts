export const TuliaPoolABI = [
  [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'AccessControlBadConfirmation',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'neededRole',
          type: 'bytes32',
        },
      ],
      name: 'AccessControlUnauthorizedAccount',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'vaultManager',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'rewardManager',
          type: 'address',
        },
      ],
      name: 'ManagerRegistered',
      type: 'event',
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
      ],
      name: 'PoolDeregistered',
      type: 'event',
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
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'vault',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'enum IPoolOrganizer.PoolType',
          name: 'poolType',
          type: 'uint8',
        },
      ],
      name: 'PoolRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'previousAdminRole',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'newAdminRole',
          type: 'bytes32',
        },
      ],
      name: 'RoleAdminChanged',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
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
          name: 'vault',
          type: 'address',
        },
      ],
      name: 'VaultRegistered',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
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
      name: 'POOL_MANAGER_ROLE',
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
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'deregisterPool',
      outputs: [],
      stateMutability: 'nonpayable',
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
      name: 'fundedPools',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
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
      ],
      name: 'getAllBorrowerPoolDetails',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'lender',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'borrower',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'creationTime',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'vault',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'loanToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'assetToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'repaymentToken',
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
              internalType: 'enum IPoolOrganizer.PoolType',
              name: 'poolType',
              type: 'uint8',
            },
          ],
          internalType: 'struct IPoolOrganizer.PoolDetails[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAllFundedPoolDetails',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'lender',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'borrower',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'creationTime',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'vault',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'loanToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'assetToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'repaymentToken',
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
              internalType: 'enum IPoolOrganizer.PoolType',
              name: 'poolType',
              type: 'uint8',
            },
          ],
          internalType: 'struct IPoolOrganizer.PoolDetails[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'lender',
          type: 'address',
        },
      ],
      name: 'getAllLenderPoolDetails',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'lender',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'borrower',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'creationTime',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'vault',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'loanToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'assetToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'repaymentToken',
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
              internalType: 'enum IPoolOrganizer.PoolType',
              name: 'poolType',
              type: 'uint8',
            },
          ],
          internalType: 'struct IPoolOrganizer.PoolDetails[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getManagers',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
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
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'getPoolDetails',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'lender',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'borrower',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'creationTime',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'vault',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'loanToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'assetToken',
              type: 'address',
            },
            {
              internalType: 'contract IERC20',
              name: 'repaymentToken',
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
              internalType: 'enum IPoolOrganizer.PoolType',
              name: 'poolType',
              type: 'uint8',
            },
          ],
          internalType: 'struct IPoolOrganizer.PoolDetails',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'lender',
          type: 'address',
        },
      ],
      name: 'getPoolsByLender',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
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
      name: 'getTotalPools',
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
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'getVaultForPool',
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
          name: 'factoryAddress',
          type: 'address',
        },
      ],
      name: 'grantFactoryAccess',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'markPoolAsFunded',
      outputs: [],
      stateMutability: 'nonpayable',
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
      name: 'poolVaults',
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
          name: '_vaultManager',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_rewardManager',
          type: 'address',
        },
      ],
      name: 'registerManagers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'lender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'vault',
          type: 'address',
        },
        {
          internalType: 'contract IERC20',
          name: 'loanToken',
          type: 'address',
        },
        {
          internalType: 'contract IERC20',
          name: 'assetToken',
          type: 'address',
        },
        {
          internalType: 'contract IERC20',
          name: 'repaymentToken',
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
          internalType: 'enum IPoolOrganizer.PoolType',
          name: 'poolType',
          type: 'uint8',
        },
      ],
      name: 'registerPool',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'vault',
          type: 'address',
        },
      ],
      name: 'registerVault',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'callerConfirmation',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
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
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'newBorrower',
          type: 'address',
        },
      ],
      name: 'setBorrowerForPool',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'interfaceId',
          type: 'bytes4',
        },
      ],
      name: 'supportsInterface',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
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
  ],
] as const;
