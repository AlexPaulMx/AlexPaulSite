import { parseUnits } from "viem";

// USDC Contract Address on Base
export const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as `0x${string}`;
export const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";
export const USDC_DECIMALS = 6;

// USDC ABI - only the functions we need
export const USDC_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export function formatUSDCAmount(amount: number): bigint {
  return parseUnits(amount.toString(), USDC_DECIMALS);
}

export const parseUSDCAmount = (amount: number): bigint => {
  return BigInt(Math.floor(amount * 1e6));
}; 