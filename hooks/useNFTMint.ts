import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "mintNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export function useNFTMint() {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { write: mintNFT, data: mintData } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'mintNFT',
  });

  const { isLoading: isTransactionLoading } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const mint = async (recipientAddress: string) => {
    try {
      setIsMinting(true);
      setError(null);
      
      await mintNFT({
        args: [recipientAddress],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error minting NFT');
    } finally {
      setIsMinting(false);
    }
  };

  return {
    mint,
    isMinting: isMinting || isTransactionLoading,
    error,
  };
} 