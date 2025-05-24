import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { NFT_ABI } from '@/app/utils/nft';

const NFT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    const client = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    const hasNFT = await client.readContract({
      address: NFT_ADDRESS as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'hasReceivedNFT',
      args: [address],
    });

    return NextResponse.json({ hasNFT });
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return NextResponse.json(
      { error: 'Failed to check NFT ownership' },
      { status: 500 }
    );
  }
} 