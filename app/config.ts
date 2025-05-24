import { http } from 'wagmi'
import { base } from 'wagmi/chains'
import { createConfig } from 'wagmi'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

const projectId = 'thelab-crowdfund'

export const config = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({ 
      projectId,
      showQrModal: true,
      metadata: {
        name: 'The Lab Crowdfund',
        description: 'Support The Lab\'s Journey',
        url: 'https://alex-paul-site.vercel.app',
        icons: ['https://alex-paul-site.vercel.app/icon.png']
      }
    }),
    coinbaseWallet({ appName: 'The Lab Crowdfund' })
  ],
  transports: {
    [base.id]: http(),
  },
}) 