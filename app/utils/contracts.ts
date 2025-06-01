import { parseUnits } from 'viem';

export const PROJECT_WALLET = '0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8';

export const PROJECT_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'message', type: 'string' },
    ],
    name: 'support',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalSupport',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getSupporters',
    outputs: [
      {
        components: [
          { name: 'supporter', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'message', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
        ],
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const PROJECT_ADDRESS = '0x1234567890123456789012345678901234567890';

export function formatAmount(amount: number): bigint {
  return parseUnits(amount.toString(), 6);
} 