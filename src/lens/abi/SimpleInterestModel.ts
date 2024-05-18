export const SimpleInterestABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'principal',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rate',
        type: 'uint256',
      },
    ],
    name: 'calculateInterest',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
