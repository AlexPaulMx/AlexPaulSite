import { parseUnits } from "viem";

// USDC Contract Address on Base
export const USDC_ADDRESS = "0xd9AAEC86B65d86F6A7B5b1b0c42FFA531710b6CA";
export const PROJECT_WALLET = "0x5aF876e2DA6f8324B5Ac866B0C7e73c619c95DC8";
export const USDC_DECIMALS = 6;

// USDC ABI - only the functions we need
export const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function"
  }
] as const;

export function formatUSDCAmount(amount: number): bigint {
  return parseUnits(amount.toString(), USDC_DECIMALS);
}

export function parseUSDCAmount(amount: number): bigint {
  // USDC has 6 decimals
  return BigInt(Math.floor(amount * 1_000_000));
} 