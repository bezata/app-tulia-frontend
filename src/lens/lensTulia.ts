import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolOrganizer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const poolOrganizerAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'PoolRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOL_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'lender', internalType: 'address', type: 'address' }],
    name: 'getPoolsByLender',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalPools',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'lender', internalType: 'address', type: 'address' },
      { name: 'borrower', internalType: 'address', type: 'address' },
    ],
    name: 'registerPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const poolOrganizerAddress = {
  80001: '0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const poolOrganizerConfig = {
  address: poolOrganizerAddress,
  abi: poolOrganizerAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TuliaPool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const tuliaPoolAbi = [
  { type: 'error', inputs: [], name: 'AccessControlBadConfirmation' },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'neededRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AccessControlUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'event', anonymous: false, inputs: [], name: 'CollateralAccessed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'accessTime',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CooldownInitiated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [],
    name: 'ExcessCollateralReturned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'LoanClosed' },
  { type: 'event', anonymous: false, inputs: [], name: 'LoanDefaulted' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'loanAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LoanFunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'loanAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'PoolInitialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amountRepaid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RepaymentMade',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BORROWER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LENDER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accessCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'borrower',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralAccessTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'collateralVault',
    outputs: [
      {
        name: '',
        internalType: 'contract ERC4626Upgradeable',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cooldownPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fundLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentCollateralValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLatestPrice',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'handleDefault',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_borrower', internalType: 'address', type: 'address' },
      {
        name: '_loanToken',
        internalType: 'contract IERC20Upgradeable',
        type: 'address',
      },
      {
        name: '_collateralVault',
        internalType: 'contract ERC4626Upgradeable',
        type: 'address',
      },
      {
        name: '_interestToken',
        internalType: 'contract TuliaToken',
        type: 'address',
      },
      { name: '_loanAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_interestRate', internalType: 'uint256', type: 'uint256' },
      {
        name: '_interestModel',
        internalType: 'contract IInterestModel',
        type: 'address',
      },
      { name: '_collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_repaymentPeriod', internalType: 'uint256', type: 'uint256' },
      {
        name: '_priceFeed',
        internalType: 'contract AggregatorV3Interface',
        type: 'address',
      },
      { name: '_cooldownPeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initiateCooldown',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'interestModel',
    outputs: [
      { name: '', internalType: 'contract IInterestModel', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'interestRate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'interestToken',
    outputs: [
      { name: '', internalType: 'contract TuliaToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lender',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'loanAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'loanToken',
    outputs: [
      { name: '', internalType: 'contract IERC20Upgradeable', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceFeed',
    outputs: [
      {
        name: '',
        internalType: 'contract AggregatorV3Interface',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'callerConfirmation', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'repay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'repaymentPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'state',
    outputs: [
      { name: '', internalType: 'enum TuliaPool.LoanState', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const tuliaPoolAddress = {
  80001: '0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const tuliaPoolConfig = {
  address: tuliaPoolAddress,
  abi: tuliaPoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TuliaPoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const tuliaPoolFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_simpleInterestModel',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_compoundInterestModel',
        internalType: 'address',
        type: 'address',
      },
      { name: '_loanImplementation', internalType: 'address', type: 'address' },
      { name: '_poolOrganizer', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'lender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'borrower',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TuliaPoolCreated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'compoundInterestModel',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'loanToken', internalType: 'address', type: 'address' },
      {
        name: 'assetToken',
        internalType: 'contract IERC20Upgradeable',
        type: 'address',
      },
      { name: 'loanAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'interestRate', internalType: 'uint256', type: 'uint256' },
      { name: 'useCompoundInterest', internalType: 'bool', type: 'bool' },
      { name: 'collateralAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'repaymentPeriod', internalType: 'uint256', type: 'uint256' },
      {
        name: 'erc4626Implementation',
        internalType: 'address',
        type: 'address',
      },
      { name: 'adminAddress', internalType: 'address', type: 'address' },
    ],
    name: 'createTuliaPool',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'loanImplementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolOrganizer',
    outputs: [
      { name: '', internalType: 'contract IPoolOrganizer', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'simpleInterestModel',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const tuliaPoolFactoryAddress = {
  80001: '0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0',
} as const

/**
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const tuliaPoolFactoryConfig = {
  address: tuliaPoolFactoryAddress,
  abi: tuliaPoolFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadundefined =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"POOL_MANAGER_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadPoolManagerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'POOL_MANAGER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"getPoolsByLender"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadGetPoolsByLender =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'getPoolsByLender',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"getTotalPools"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadGetTotalPools =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'getTotalPools',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadHasRole = /*#__PURE__*/ createUseReadContract({
  abi: poolOrganizerAbi,
  address: poolOrganizerAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerreadSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteundefined =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"registerPool"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteRegisterPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'registerPool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwriteRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateundefined =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"registerPool"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateRegisterPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'registerPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolOrganizerAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizersimulateRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchundefined =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchInitialized =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__ and `eventName` set to `"PoolRegistered"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchPoolRegistered =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    eventName: 'PoolRegistered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchRoleAdminChanged =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchRoleGranted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolOrganizerAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF81625AA7A3e3E751275C6b760a8DDAccE27E5e2)
 */
export const usePoolOrganizerwatchRoleRevoked =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolOrganizerAbi,
    address: poolOrganizerAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadundefined = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'ADMIN_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"BORROWER_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadBorrowerRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'BORROWER_ROLE',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"LENDER_ROLE"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadLenderRole = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'LENDER_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"borrower"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadBorrower = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'borrower',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"collateralAccessTime"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadCollateralAccessTime =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'collateralAccessTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"collateralAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadCollateralAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'collateralAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"collateralVault"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadCollateralVault =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'collateralVault',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"cooldownPeriod"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadCooldownPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'cooldownPeriod',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"getCurrentCollateralValue"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadGetCurrentCollateralValue =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'getCurrentCollateralValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"getLatestPrice"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadGetLatestPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'getLatestPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadGetRoleAdmin = /*#__PURE__*/ createUseReadContract(
  {
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'getRoleAdmin',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadHasRole = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"interestModel"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadInterestModel =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'interestModel',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"interestRate"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadInterestRate = /*#__PURE__*/ createUseReadContract(
  {
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'interestRate',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"interestToken"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadInterestToken =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'interestToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"lender"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadLender = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'lender',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"loanAmount"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadLoanAmount = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'loanAmount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"loanToken"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadLoanToken = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'loanToken',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"paused"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadPaused = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"priceFeed"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadPriceFeed = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'priceFeed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"repaymentPeriod"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadRepaymentPeriod =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'repaymentPeriod',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"state"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadState = /*#__PURE__*/ createUseReadContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'state',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolreadSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteundefined = /*#__PURE__*/ createUseWriteContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"accessCollateral"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteAccessCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'accessCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"fundLoan"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteFundLoan = /*#__PURE__*/ createUseWriteContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'fundLoan',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"handleDefault"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteHandleDefault =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'handleDefault',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteInitialize = /*#__PURE__*/ createUseWriteContract(
  { abi: tuliaPoolAbi, address: tuliaPoolAddress, functionName: 'initialize' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"initiateCooldown"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteInitiateCooldown =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'initiateCooldown',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"repay"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteRepay = /*#__PURE__*/ createUseWriteContract({
  abi: tuliaPoolAbi,
  address: tuliaPoolAddress,
  functionName: 'repay',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwriteRevokeRole = /*#__PURE__*/ createUseWriteContract(
  { abi: tuliaPoolAbi, address: tuliaPoolAddress, functionName: 'revokeRole' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateundefined =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"accessCollateral"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateAccessCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'accessCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"fundLoan"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateFundLoan =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'fundLoan',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"handleDefault"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateHandleDefault =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'handleDefault',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"initiateCooldown"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateInitiateCooldown =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'initiateCooldown',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"repay"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateRepay =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'repay',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolsimulateRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchundefined =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"CollateralAccessed"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchCollateralAccessed =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'CollateralAccessed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"CooldownInitiated"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchCooldownInitiated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'CooldownInitiated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"ExcessCollateralReturned"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchExcessCollateralReturned =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'ExcessCollateralReturned',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchInitialized =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"LoanClosed"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchLoanClosed =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'LoanClosed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"LoanDefaulted"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchLoanDefaulted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'LoanDefaulted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"LoanFunded"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchLoanFunded =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'LoanFunded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"Paused"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchPaused =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"PoolInitialized"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchPoolInitialized =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'PoolInitialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"RepaymentMade"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchRepaymentMade =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'RepaymentMade',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchRoleAdminChanged =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchRoleGranted =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchRoleRevoked =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolAbi}__ and `eventName` set to `"Unpaused"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xF3a5Dc77650e75aC1C271fE2BE7730088E7081f2)
 */
export const useTuliaPoolwatchUnpaused =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolAbi,
    address: tuliaPoolAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactoryreadundefined =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"compoundInterestModel"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactoryreadCompoundInterestModel =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'compoundInterestModel',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"loanImplementation"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactoryreadLoanImplementation =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'loanImplementation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"poolOrganizer"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactoryreadPoolOrganizer =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'poolOrganizer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"simpleInterestModel"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactoryreadSimpleInterestModel =
  /*#__PURE__*/ createUseReadContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'simpleInterestModel',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorywriteundefined =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"createTuliaPool"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorywriteCreateTuliaPool =
  /*#__PURE__*/ createUseWriteContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'createTuliaPool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorysimulateundefined =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `functionName` set to `"createTuliaPool"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorysimulateCreateTuliaPool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    functionName: 'createTuliaPool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorywatchundefined =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tuliaPoolFactoryAbi}__ and `eventName` set to `"TuliaPoolCreated"`
 *
 * [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4A3258Cf367377eA8CBbbAB2C31DA5A94B4f4ab0)
 */
export const useTuliaPoolFactorywatchTuliaPoolCreated =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tuliaPoolFactoryAbi,
    address: tuliaPoolFactoryAddress,
    eventName: 'TuliaPoolCreated',
  })
