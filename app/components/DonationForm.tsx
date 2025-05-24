"use client";

import { useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseUSDCAmount } from '../utils/usdc';
import { hasNFT } from '../utils/nft';

export default function DonationForm() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { write: approve, data: approveData } = useContractWrite({
    address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    abi: [
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
    ],
    functionName: 'approve',
  });

  const { write: donate, data: donateData } = useContractWrite({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: [
      {
        name: 'donate',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ name: 'amount', type: 'uint256' }],
        outputs: [],
      },
    ],
    functionName: 'donate',
  });

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const { isLoading: isDonating } = useWaitForTransaction({
    hash: donateData?.hash,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      if (!address) {
        throw new Error('Please connect your wallet first');
      }

      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Check if user already has an NFT
      const hasNFTAlready = await hasNFT(address);
      if (hasNFTAlready) {
        setSuccess('You already have an NFT from a previous donation!');
      }

      // First approve USDC spending
      approve({
        args: [
          '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          parseUSDCAmount(parsedAmount),
        ],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  // Handle approval success
  if (approveData?.hash && !isApproving && !donateData?.hash) {
    donate({
      args: [parseUSDCAmount(parseFloat(amount))],
    });
  }

  // Handle donation success
  if (donateData?.hash && !isDonating) {
    setSuccess('Thank you for your donation! Your NFT will be minted automatically.');
    setAmount('');
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
          Donation Amount (USDC)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-red-500 focus:ring-red-500"
          placeholder="Enter amount"
          step="0.01"
          min="0"
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-sm">{success}</div>
      )}

      <button
        type="submit"
        disabled={isLoading || isApproving || isDonating}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isApproving || isDonating ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Donate'
        )}
      </button>
    </form>
  );
} 