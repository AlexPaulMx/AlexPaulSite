import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

// Contract addresses
const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
const DONATION_ADDRESS = '0xe395360333F8f8B335C8b8E2619CfcF530dFc429'
const NFT_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
})

export type Config = typeof config 