import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { NFT_ABI } from '@/app/utils/nft';

const NFT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  try {
    const { tokenId } = params;

    if (!tokenId) {
      return NextResponse.json(
        { error: 'Token ID is required' },
        { status: 400 }
      );
    }

    const client = createPublicClient({
      chain: mainnet,
      transport: http(),
    });

    // Get the donor address for this token
    const donor = await client.readContract({
      address: NFT_ADDRESS as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'getDonor',
      args: [BigInt(tokenId)],
    });

    // Get the token URI
    const tokenURI = await client.readContract({
      address: NFT_ADDRESS as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    });

    // Construct the metadata
    const metadata = {
      name: "The Lab Video NFT",
      description: "A unique NFT representing ownership of The Lab video",
      image: "https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4",
      attributes: [
        {
          trait_type: "Donor",
          value: donor,
        },
        {
          trait_type: "Token ID",
          value: tokenId,
        },
      ],
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NFT metadata' },
      { status: 500 }
    );
  }
} 