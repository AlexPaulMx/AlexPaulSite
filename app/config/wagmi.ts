import { http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
})

export type Config = typeof config 