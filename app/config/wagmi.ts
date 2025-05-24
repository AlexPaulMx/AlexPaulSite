import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// ABI imports
import { USDC_ABI } from '../utils/usdc'
import { DONATION_ABI } from '../utils/donation'
import { NFT_ABI } from '../utils/nft'

// Contract addresses
const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
const DONATION_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const NFT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'YOUR_PROJECT_ID',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  contracts: {
    usdc: {
      address: USDC_ADDRESS,
      abi: USDC_ABI,
    },
    donation: {
      address: DONATION_ADDRESS,
      abi: DONATION_ABI,
    },
    nft: {
      address: NFT_ADDRESS,
      abi: NFT_ABI,
    },
  },
}) 