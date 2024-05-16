export const RewardManagerABI = [
  [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_apyManager',
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
      ],
      name: 'PoolRegistered',
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
          indexed: false,
          internalType: 'uint256',
          name: 'reward',
          type: 'uint256',
        },
      ],
      name: 'RewardAccrued',
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
          indexed: false,
          internalType: 'address',
          name: 'claimant',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reward',
          type: 'uint256',
        },
      ],
      name: 'RewardClaimed',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'accrueRewards',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'apyManager',
      outputs: [
        {
          internalType: 'contract IAdvancedAPYManager',
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
          internalType: 'bool',
          name: 'isLender',
          type: 'bool',
        },
      ],
      name: 'claimRewards',
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
          name: 'pool',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'rewardToken',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'isFlashPool',
          type: 'bool',
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
          name: '',
          type: 'address',
        },
      ],
      name: 'rewardDetails',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: 'rewardToken',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'rewardsAccrued',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lastRewardBlock',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'rewardRate',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'totalInterestRewards',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lenderClaimedRewards',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'borrowerClaimedRewards',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: 'isFlashPool',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
];