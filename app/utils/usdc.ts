import { parseUnits } from "viem";

// USDC Contract Address on Base
export const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
export const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";
export const USDC_DECIMALS = 6;

// USDC ABI - only the functions we need
export const USDC_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
] as const;

export function formatUSDCAmount(amount: number): bigint {
  return parseUnits(amount.toFixed(USDC_DECIMALS), USDC_DECIMALS);
}

export function parseUSDCAmount(amount: bigint): number {
  return Number(amount) / Math.pow(10, USDC_DECIMALS);
} 